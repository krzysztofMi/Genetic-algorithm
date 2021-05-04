from deap import base
from deap import creator
from deap import tools
import matplotlib.pyplot as plt
import random
import numpy as np
import time


def individual(icls):
    genome = list()
    genome.append(random.uniform(-15,15))
    genome.append(random.uniform(-15,15))
    return icls(genome)


def fitness_function(individuals):
    return 100*np.sqrt(np.abs(individuals[1]-0.01*individuals[0]**2)) + 0.01*np.abs(individuals[0] + 10),


# Copy paste we might create our own implementation of this algorithm
def cx_arithmetic(ind1, ind2):
    k = 0.25
    ind1[0] = k * ind1[0] + (1 - k) * ind2[0]
    ind1[1] = k * ind1[1] + (1 - k) * ind2[1]
    ind2[0] = (1 - k) * ind1[0] + k * ind2[0]
    ind2[1] = (1 - k) * ind1[1] + k * ind2[1]
    return ind1, ind2


# Copy paste we might create our own implementation of this algorithm
def cx_heuristic(ind1, ind2):
    if ind1[0]>ind1[1] and ind2[0]>ind2[1]:
        k = random.uniform(0,1)
        ind1[0] = k*(ind2[0]-ind1[0]) + ind1[0]
        ind1[1] = k * (ind2[1] - ind1[1]) + ind1[1]
        return ind1
    else:
        return None


# It is in function for purpose to clean toolbox after each algorithm pass.
def getToolbox():
    toolbox = base.Toolbox()
    toolbox.register('individual',individual, creator.Individual)
    toolbox.register("population", tools.initRepeat, list, toolbox.individual)
    toolbox.register("evaluate", fitness_function)
    toolbox.register("select", tools.selTournament, tournsize=5)
    toolbox.register("mate", cx_arithmetic)
    toolbox.register("mutate", tools.mutGaussian, mu=5, sigma=10, indpb=1)
    return toolbox


creator.create("FitnessMin", base.Fitness, weights=(-1.0,))
creator.create("Individual", list, fitness=creator.FitnessMin)

sizePopulation = 1000
probabilityMutation = 0.1
probabilityCrossover = 0.8
numberIteration=100


def algorithm(printBest = False):
    toolbox = getToolbox()
    pop = toolbox.population(n=sizePopulation)
    fitnesses = list(map(toolbox.evaluate, pop))
    for ind, fit in zip(pop, fitnesses):
        ind.fitness.values = fit
    bestValues = []
    means = []
    stds = []
    g = 0
    numberElitism = 1

    start = time.time()
    while g < numberIteration:
        g = g + 1
        # print("-- Generation %i --" % g)
        # Select the next generation individuals
        offspring = toolbox.select(pop, len(pop))
        # Clone the selected individuals
        offspring = list(map(toolbox.clone, offspring))
        listElitism = []
        for x in range(0, numberElitism):
            listElitism.append(tools.selBest(pop, 1)[0])
        # Apply crossover and mutation on the offspring
        for child1, child2 in zip(offspring[::2], offspring[1::2]):
            # cross two individuals with probability CXPB
            if random.random() < probabilityCrossover:
                toolbox.mate(child1, child2)
                # fitness values of the children
                # must be recalculated later
                del child1.fitness.values
                del child2.fitness.values
        for mutant in offspring:
        # mutate an individual with probability MUTPB
            if random.random() < probabilityMutation:
                toolbox.mutate(mutant)
                del mutant.fitness.values
        # Evaluate the individuals with an invalid fitness
        invalid_ind = [ind for ind in offspring if not ind.fitness.valid]
        fitnesses = map(toolbox.evaluate, invalid_ind)
        for ind, fit in zip(invalid_ind, fitnesses):
            ind.fitness.values = fit
        # print(" Evaluated %i individuals" % len(invalid_ind))
        pop[:] = offspring + listElitism
        # Gather all the fitnesses in one list and print the stats
        fits = [ind.fitness.values[0] for ind in pop]
        length = len(pop)
        mean = sum(fits) / length
        sum2 = sum(x * x for x in fits)
        std = abs(sum2 / length - mean ** 2) ** 0.5
        bestValues.append(min(fits))
        means.append(mean)
        stds.append(std)
        # print(" Min %s" % min(fits))
        # print(" Max %s" % max(fits))
        # print(" Avg %s" % mean)
        # print(" Std %s" % std)
        best_ind = tools.selBest(pop, 1)[0]
        # print("Best individual is %s, %s" % (best_ind, best_ind.fitness.values))
    #
    end = time.time()
    duration = end-start
    if(printBest):
        print("Best individual is %s, %s" % (best_ind, best_ind.fitness.values))
        print("Algorithm time %s" % (duration))
    #print("-- End of (successful) evolution --")
    return bestValues, means, stds, duration

def plot_data(i, title, y_label, data):
    x = np.arange(0, numberIteration, 1)
    plt.subplot(3, 1, i)
    plt.plot(x, data)
    plt.title(title)
    plt.ylabel(y_label)

def make_plots():
    bestValues, means, stds, _ = algorithm(True)
    plot_data(1, "Best values in epochs", "best value", bestValues)
    plot_data(2, "Means in epochs", "mean", means)
    plot_data(3, "Standard deviations in epochs", "std", stds)
    plt.xlabel("epoch")
    plt.tight_layout()
    plt.show()

def make_test(testSize):
    minims = []
    firstGen = []
    times = []
    for _ in range(testSize):
        bestValues, _, _, duration = algorithm()
        minims.append(np.min(bestValues))
        firstGen.append(bestValues.index(np.min(bestValues)))
        times.append(duration)
    print("\nNajlepsze znalezione rozwiązanie")
    print(np.min(minims))
    print("\nWartość średnia najlepszych rozwiązań"),
    print(np.mean(minims))
    print("\nOdchylenie standardowe najlepszych rozwiązań"),
    print(np.std(minims))
    print("\nGeneracja, w której najszybciej znaleziono optymalne rozwiązanie")
    print(np.min(firstGen))
    print("\nNajlepsze rozwiązanie znalezione najszybciej")
    print(minims[np.argmin(firstGen)])
    print("\nŚrednia generacji, w których po raz pierwszy znaleziono najlepsze rozwiązanie")
    print(np.mean(firstGen))
    print("\nOdchylenie standardowe generacji, w których po raz pierwszy znaleziono najlepsze rozwiązanie")
    print(np.std(firstGen))
    print("\nŚredni czas działania algorytmu [ms]")
    print(np.mean(times), "ms")
    print("\nOdchylenie standardowe czasów działania algorytmu [ms]")
    print(np.std(times), "ms")


make_plots()
make_test(100)

