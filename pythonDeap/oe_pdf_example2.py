from deap import base
from deap import creator
from deap import tools
import multiprocessing
import matplotlib.pyplot as plt
import random
import numpy as np
import time
import sys
from pdf_code_formatted import SVCParametersFeatures, SVCParametersFeatureFitness, load_data, mutationSVC2

creator.create("FitnessMax", base.Fitness, weights=(1.0,))
creator.create("Individual", list, fitness=creator.FitnessMax)

sizePopulation = 100
probabilityMutation = 0.1
probabilityCrossover = 0.8
numberIteration=100


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
def getToolbox(pool=None):
    df, y, numberOfAtributtes = load_data()
    toolbox = base.Toolbox()
    if __name__ == "__main__" and pool is not None:
        toolbox.register("map", pool.map) 
    toolbox.register('individual',SVCParametersFeatures, numberOfAtributtes, creator.Individual) 
    toolbox.register("evaluate", SVCParametersFeatureFitness,y,df,numberOfAtributtes)
    toolbox.register("population", tools.initRepeat, list, toolbox.individual)
    toolbox.register("select", tools.selTournament, tournsize=5)
    toolbox.register("mutate", mutationSVC2)
    toolbox.register("mate", tools.cxTwoPoint)
    return toolbox


def algorithm(toolbox, printBest = False):
    pop = toolbox.population(n=sizePopulation)
    fitnesses = list(toolbox.map(toolbox.evaluate, pop))
    for ind, fit in zip(pop, fitnesses):
        ind.fitness.values = fit
    bestValues = []
    means = []
    stds = []
    g = 0
    numberElitism = 1

    start = time.time()
    while g < numberIteration:
        print("algorithm iter" + str(g) + "/" + str(numberIteration))
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
                toolbox.mutate(mutant[1:])
                del mutant.fitness.values
        # Evaluate the individuals with an invalid fitness
        invalid_ind = [ind for ind in offspring if not ind.fitness.valid]
        fitnesses = toolbox.map(toolbox.evaluate, invalid_ind)
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

def make_plots(name, toolbox):
    bestValues, means, stds, _ = algorithm(toolbox, True)
    plot_data(1, "Best values in epochs", "best value", bestValues)
    plot_data(2, "Means in epochs", "mean", means)
    plot_data(3, "Standard deviations in epochs", "std", stds)
    plt.xlabel("epoch")
    plt.tight_layout()
    plt.savefig(name + '_plot.png')
    plt.clf()
    

def make_test(name, testSize, toolbox):
    f = open(name + ".txt", "a")

    minims = []
    firstGen = []
    times = []
    for i in range(testSize):
        bestValues, _, _, duration = algorithm(toolbox)
        minims.append(np.min(bestValues))
        firstGen.append(bestValues.index(np.min(bestValues)))
        times.append(duration)
        print(f"{name}:{i + 1}/{testSize}")
    f.write(name)
    f.write("\nNajlepsze znalezione rozwiazanie ")
    f.write(str(np.min(minims)))
    f.write("\nWartosc srednia najlepszych rozwiazan" )
    f.write(str(np.mean(minims)))
    f.write("\nOdchylenie standardowe najlepszych rozwiazan " )
    f.write(str(np.std(minims)))
    f.write("\nGeneracja, w ktorej najszybciej znaleziono optymalne rozwiazanie ")
    f.write(str(np.min(firstGen)))
    f.write("\nNajlepsze rozwiazanie znalezione najszybciej ")
    f.write(str(minims[np.argmin(firstGen)]))
    f.write("\nsrednia generacji, w ktorych po raz pierwszy znaleziono najlepsze rozwiazanie ")
    f.write(str(np.mean(firstGen)))
    f.write("\nOdchylenie standardowe generacji, w ktorych po raz pierwszy znaleziono najlepsze rozwiazanie ")
    f.write(str(np.std(firstGen)))
    f.write("\nsredni czas dzialania algorytmu [ms] ")
    f.write(str(np.mean(times)) + "ms")
    f.write("\nOdchylenie standardowe czasow dzialania algorytmu [ms] ")
    f.write(str(np.std(times)) + "ms")
    f.close()


toolbox = getToolbox(None)
make_plots("To co było w pdf", toolbox)
# toolbox = getToolbox(None)
# make_test("To co było w pdf", 50, toolbox)


    
