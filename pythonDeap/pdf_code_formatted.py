import pandas as pd 
from sklearn import model_selection 
from sklearn.preprocessing import MinMaxScaler 
from sklearn.svm import SVC 

pd.set_option('display.max_columns', None) 
df=pd.read_csv("data.csv",sep=',') 

y=df['Status']
df.drop('Status',axis=1,inplace=True)
df.drop('ID',axis=1,inplace=True)
df.drop('Recording',axis=1,inplace=True)

numberOfAtributtes=len(df.columns) 
print(numberOfAtributtes)


mms = MinMaxScaler() 
df_norm = mms.fit_transform(df) 
clf = SVC() 
scores = model_selection.cross_val_score(clf, df_norm, y, cv=5, scoring='accuracy', n_jobs=-1) 
print(scores.mean())

import random 
def SVCParameters(numberFeatures,icls):
  genome = list() 
  #kernel 
  listKernel = ["linear","rbf", "poly","sigmoid"]
  
  genome.append(listKernel[random.randint(0, 3)]) 
  k = random.uniform(0.1, 100)
  genome.append(k) 
  #degree
  genome.append(random.int(0.1,5)) 
  #gamma 
  gamma = random.uniform(0.001,5)     
  genome.append(gamma) 
  # coeff 
  coeff = random.uniform(0.01, 10)     
  genome.append(coeff) 
  return icls(genome)

import math from sklearn 
import metrics 
def SVCParametersFitness(y,df,numberOfAtributtes,individual):     
  split=5 cv = StratifiedKFold(n_splits=split)     
  mms = MinMaxScaler()   
  df_norm = mms.fit_transform(df)     
  estimator = SVC(kernel=individual[0],C=individual[1],degree=individual[2],gamma=individual[3],coef0=individual[4],random_state=101)     
  resultSum = 0 
  for train, test in cv.split(df_norm, y):
    
  estimator.fit(df_norm[train], y[train])        
  predicted = estimator.predict(df_norm[test])
  
  expected = y[test]        
  tn, fp, fn, tp = metrics.confusion_matrix(expected, predicted).ravel()
  result = (tp + tn) / (tp + fp + tn + fn) 
  #w oparciu o macierze pomyłek https://www.dataschool.io/simple-guide-to-confusion-matrix-terminology/ 
  resultSum = resultSum + result
  #zbieramy wyniki z poszczególnych etapów walidacji krzyżowej 
  return resultSum / split

def mutationSVC(individual):
  numberParamer= random.randint(0,len(individual)-1) 
  if numberParamer==0: 
    # kernel 
    listKernel = ["linear", "rbf", "poly", "sigmoid"]
    individual[0]=listKernel[random.randint(0, 3)] 
  elif numberParamer==1:  
    k = random.uniform(0.1,100)
      individual[1]=k 
  elif numberParamer == 2: 
      #degree 
      individual[2]=random.uniform(0.1, 5) 
  elif numberParamer == 3: 
      #gamma 
      gamma = random.uniform(0.01, 5)
      individual[3]=gamma 
  elif numberParamer ==4: 
      # coeff 
      coeff = random.uniform(0.1, 20)
      individual[2] = coeff

toolbox.register('individual',SVCParameters, numberOfAtributtes, creator.Individual) 
toolbox.register("evaluate", SVCParametersFitness,y,df,numberOfAtributtes)


def SVCParametersFeatures(numberFeatures,icls):
  genome = list() 
  # kernel 
  listKernel = ["linear","rbf", "poly", "sigmoid"]
  genome.append(listKernel[random.randint(0, 3)]) 
  #c 
  k = random.uniform(0.1, 100)
  genome.append(k) 
  #degree 
  genome.append(random.uniform(0.1,5)) 
  #gamma 
  gamma = random.uniform(0.001,5)
  genome.append(gamma) 
  # coeff
  coeff = random.uniform(0.01, 10)
  genome.append(coeff) 
  for i in range(0,numberFeatures):
    genome.append(random.randint(0, 1)) 

  return icls(genome)

def SVCParametersFeatureFitness(y,df,numberOfAtributtes,individual):
  split=5 
  cv = StratifiedKFold(n_splits=split)
  listColumnsToDrop=[] #lista cech do usuniecia 
  for i in range(numberOfAtributtes,len(individual)): 
    if individual[i]==0: #gdy atrybut ma zero to usuwamy cechę 
      listColumnsToDrop.append(i-numberOfAtributtes)
  dfSelectedFeatures=df.drop(df.columns[listColumnsToDrop], axis=1, inplace=False)
  mms = MinMaxScaler()
  df_norm = mms.fit_transform(dfSelectedFeatures)
  estimator = SVC(kernel=individual[0],C=individual[1],degree=individual[2],gamma=individual[3],coef0=individual[4],random_state=101)

  resultSum = 0 
  for train, test in cv.split(df_norm, y):
    estimator.fit(df_norm[train], y[train])
    predicted = estimator.predict(df_norm[test])
    expected = y[test]
    tn, fp, fn, tp = metrics.confusion_matrix(expected, predicted).ravel()
    result = (tp + tn) / (tp + fp + tn + fn) #w oparciu o macierze pomyłek https://www.dataschool.io/simple-guide-to-confusion-matrix-terminology/ 
    resultSum = resultSum + result #zbieramy wyniki z poszczególnych etapów walidacji krzyżowej 
  return resultSum / split


def mutationSVC(individual):
  numberParamer= random.randint(0,len(individual)-1) 
  if numberParamer==0: 
    # kernel 
    listKernel = ["linear", "rbf", "poly", "sigmoid"]
      individual[0]=listKernel[random.randint(0, 3)] 
  elif numberParamer==1: 
    #C 
    k = random.uniform(0.1,100)
      individual[1]=k 
  elif numberParamer == 2: 
    #degree 
    individual[2]=random.uniform(0.1, 5) 
  elif numberParamer == 3: 
    #gamma 
    gamma = random.uniform(0.01, 1)
    individual[3]=gamma 
  elif numberParamer ==4: 
    # coeff 
    coeff = random.uniform(0.1, 1)
    individual[2] = coeff 
  else: #genetyczna selekcja cech 
    if individual[numberParamer] == 0:
      individual[numberParamer] = 1 
    else:             
      individual[numberParamer] = 0


"""
1.Przygotuj implementację genetycznej optymalizacji parametrów i 
genetycznej selekcji dodatkowo dla pięciu wybranych klasyfikatorów ze 
sklearn i porównaj wyniki uzyskane na zbiorze danych podanym w zadaniu. 

2.Wykorzystaj powyższe metody(przynajmniej 5 klasyfikatorów) na zbiorze danych, 
który opracowujesz w ramach projektu z metod odkrywania wiedzy danych. 
Zaprezentuj różnicę między twoimi dotychczasowymi rezultatami, wynikami 
osiągniętymi z wykorzystaniem algorytmów genetycznych. Zrównoleglij 
obliczenia zgodnie z instrukcją z projektu nr 3. 
"""