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

import pandas as pd 
from sklearn import model_selection 
from sklearn.preprocessing import MinMaxScaler 
from sklearn.svm import SVC 
from sklearn.tree import DecisionTreeClassifier
import globals

def load_data():
  pd.set_option('display.max_columns', None) 
  df=pd.read_csv("data.csv",sep=',') 

  y=df['Status']
  df.drop('Status',axis=1,inplace=True)
  df.drop('ID',axis=1,inplace=True)
  df.drop('Recording',axis=1,inplace=True)

  # mms = MinMaxScaler() 
  # df_norm = mms.fit_transform(df) 
  # clf = SVC() 
  # scores = model_selection.cross_val_score(clf, df_norm, y, cv=5, scoring='accuracy', n_jobs=-1) 
  # print(scores.mean())

  numberOfAttributes=len(df.columns)
  return df, y, numberOfAttributes


if __name__ == "__main__":
  df, y, scores = load_data()

import random 

def ParametersFitness(y,df,numberOfAttributes,estimator):
  split=5 
  cv = globals.modelSelection(n_splits=split)     
  mms = MinMaxScaler()   
  df_norm = mms.fit_transform(df)     
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
  return resultSum / split,

def ParametersFeatureFitness(y,df,numberOfAtributtes,individual,estimator):
  split=5 
  cv = globals.modelSelection(n_splits=split)
  listColumnsToDrop=[] #lista cech do usuniecia 
  for i in range(numberOfAtributtes,len(individual)): 
    if individual[i]==0: #gdy atrybut ma zero to usuwamy cechę 
      listColumnsToDrop.append(i-numberOfAtributtes)
  dfSelectedFeatures=df.drop(df.columns[listColumnsToDrop], axis=1, inplace=False)
  mms = MinMaxScaler()
  df_norm = mms.fit_transform(dfSelectedFeatures)
  
  resultSum = 0 
  for train, test in cv.split(df_norm, y):
    estimator.fit(df_norm[train], y[train])
    predicted = estimator.predict(df_norm[test])
    expected = y[test]
    tn, fp, fn, tp = metrics.confusion_matrix(expected, predicted).ravel()
    result = (tp + tn) / (tp + fp + tn + fn) #w oparciu o macierze pomyłek https://www.dataschool.io/simple-guide-to-confusion-matrix-terminology/ 
    resultSum = resultSum + result #zbieramy wyniki z poszczególnych etapów walidacji krzyżowej 
  return resultSum / split,


### KNN Classifier
def _KNParameters():
  p = [1, random.uniform(1.001, 1.99), 2]
  genome = [
    random.randint(1, 10), # n_neighbors
    random.randint(10, 50),#leaf_size
    p[random.randint(0,2)],#p
  ]
  return genome

def KNParameters(numberFeatures, icls):
  return icls(_KNParameters())

def KNParametersFeatures(numberFeatures, icls):
  genome = _KNParameters()
  for i in range(0,numberFeatures):
    genome.append(random.randint(0, 1)) 
  return icls(genome)

from sklearn.neighbors import KNeighborsClassifier
def KNParametersFitness(y,df,numberOfAttributes,individual):
  est = KNeighborsClassifier(n_neighbors=individual[0], leaf_size=individual[1], p=individual[2])
  return ParametersFitness(y,df,numberOfAttributes,est)

def KNParametersFeaturesFitness(y,df,numberOfAttributes,individual):
  est = KNeighborsClassifier(n_neighbors=individual[0], leaf_size=individual[1], p=individual[2])
  return ParametersFeatureFitness(y,df,numberOfAttributes,individual,est)

def KNMutation(individual):
  numberParamer= random.randint(0,len(individual)-1) 
  if numberParamer==0: 
    individual[0] == random.randint(1, 10)
  elif numberParamer==1:  
    individual[1] = random.randint(10, 50)
  elif numberParamer == 2: 
    p = [1, random.uniform(1.001, 1.99), 2]
    individual[2] = p[random.randint(0,2)]
  else: #genetyczna selekcja cech 
    if individual[numberParamer] == 0:
      individual[numberParamer] = 1 
    else:             
      individual[numberParamer] = 0

### RandomForrest Classifier
def _RandomForestParameters():
  features = ["auto", "sqrt", "log2"]
  genome = [
  # (max_depth=5, n_estimators=10, max_features=1),
    random.randint(1, 20),
    random.randint(1,20),
    features[random.randint(0,len(features)-1)]
  ]
  return genome

def RandomForestParameters(numberFeatures, icls):
  return icls(_RandomForestParameters())

def RandomForestParametersFeatures(numberFeatures, icls):
  genome = _RandomForestParameters()
  for i in range(0,numberFeatures):
    genome.append(random.randint(0, 1)) 
  return icls(genome)

from sklearn.ensemble import RandomForestClassifier
def RandomForestFitness(y,df,numberOfAttributes,individual):
  est = RandomForestClassifier(max_depth=individual[0], n_estimators=individual[1], max_features=individual[2])
  return ParametersFitness(y,df,numberOfAttributes,est)

def RandomForestParametersFeatureFitness(y,df,numberOfAttributes,individual):
  est = RandomForestClassifier(max_depth=individual[0], n_estimators=individual[1], max_features=individual[2])
  return ParametersFeatureFitness(y,df,numberOfAttributes,individual,est)

def RandomForestMutation(individual):
  parameters = _RandomForestParameters()
  index = random.randint(0, len(individual)-1)
  if index < len(parameters) - 1:
    individual[index] = parameters[index]
  else:
    if individual[index] == 0:
      individual[index] = 1 
    else:             
      individual[index] = 0

  
### DecisionTreeClassifier(max_depth=5) 
def _DecisionTreeParameters():
  splitter = ["best", "random"]
  max_features = ["auto", "sqrt", "log2"]
  genome = [
    splitter[random.randint(0,1)], 
    random.randint(1,5), # maxdepth,
    max_features[random.randint(0,2)],
  ]
  return genome

def DecisionTreeParameters(numberFeatures,icls):
  return icls(_DecisionTreeParameters())

def DecisionTreeParametersFeatures(numberFeatures, icls):
  genome = _DecisionTreeParameters()
  for i in range(0,numberFeatures):
    genome.append(random.randint(0, 1)) 
  return icls(genome)

def DecisionTreeFitness(y,df,numberOfAttributes,individual):
  est = DecisionTreeClassifier(splitter=individual[0], max_depth=individual[1], max_features=individual[2])
  return ParametersFitness(y,df,numberOfAttributes,est)

def DecisionTreeParametersFeatureFitness(y,df,numberOfAttributes,individual):
  est = DecisionTreeClassifier(splitter=individual[0], max_depth=individual[1], max_features=individual[2])
  return ParametersFeatureFitness(y,df,numberOfAttributes,individual,est)

def DecisionTreeMutation(individual):
  parameters = _DecisionTreeParameters()
  index = random.randint(0, len(individual)-1)
  if index < len(parameters) - 1:
    individual[index] = parameters[index]
  else:
    if individual[index] == 0:
      individual[index] = 1 
    else:             
      individual[index] = 0

### GaussianProcessClassifier
def _GPCParameters():
  multi_class = ["one_vs_rest", "one_vs_one"]
  warm_start = [False, True]
  genome = [
    multi_class[random.randint(0,len(multi_class) - 1)], 
    warm_start[random.randint(0,len(warm_start) - 1)], 
    random.randint(20, 200), # max_iter_predict
  ]
  return genome

def GPCParameters(n,icls):
  return icls(_GPCParameters())

def GPCParametersFeatures(numberFeatures, icls):
  genome = _GPCParameters()
  for i in range(0,numberFeatures):
    genome.append(random.randint(0, 1)) 
  return icls(genome)

from sklearn.gaussian_process import GaussianProcessClassifier
def GPCFitness(y,df,numberOfAttributes,individual):
  est = GaussianProcessClassifier(multi_class=individual[0], warm_start=individual[1], max_iter_predict=individual[2])
  return ParametersFitness(y,df,numberOfAttributes,est)

def GPCParametersFeatureFitness(y,df,numberOfAttributes,individual):
  est = GaussianProcessClassifier(multi_class=individual[0], warm_start=individual[1], max_iter_predict=individual[2])
  return ParametersFeatureFitness(y,df,numberOfAttributes,individual,est)

def GPCMutation(individual):
  parameters = _GPCParameters()
  index = random.randint(0, len(individual)-1)
  if index < len(parameters) - 1:
    individual[index] = parameters[index]
  else:
    if individual[index] == 0:
      individual[index] = 1 
    else:             
      individual[index] = 0

### SVC
def SVCParameters(numberFeatures,icls):
  genome = list() 
  #kernel 
  listKernel = ["linear","rbf", "poly","sigmoid"]
  
  genome.append(listKernel[random.randint(0, 3)]) 
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


  return icls(genome)

from sklearn import metrics 
def SVCParametersFitness(y,df,numberOfAtributtes,individual):     
  estimator = SVC(kernel=individual[0],C=individual[1],degree=individual[2],gamma=individual[3],coef0=individual[4],random_state=101)     
  split=5 
  cv = globals.modelSelection(n_splits=split)     
  mms = MinMaxScaler()   
  df_norm = mms.fit_transform(df)     
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
  return resultSum / split,

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

# toolbox.register('individual',SVCParameters, numberOfAtributtes, creator.Individual) 
# toolbox.register("evaluate", SVCParametersFitness,y,df,numberOfAtributtes)


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
  cv = globals.modelSelection(n_splits=split)
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
  return resultSum / split,


def mutationSVC2(individual):
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


dispatch = {
  "features": {
    "KN": {
      "params": KNParametersFeatures,
      "fitness": KNParametersFeaturesFitness,
      "mutation": KNMutation
    },
    "SVC": {
      "params": SVCParametersFeatures,
      "fitness": SVCParametersFeatureFitness,
      "mutation": mutationSVC2
    },
    "RandomForest": {
      "params": RandomForestParametersFeatures,
      "fitness": RandomForestParametersFeatureFitness,
      "mutation": RandomForestMutation
    },
    "DecisionTree": {
      "params": DecisionTreeParametersFeatures,
      "fitness": DecisionTreeParametersFeatureFitness,
      "mutation": DecisionTreeMutation
    },
    "GPC": {
      "params": GPCParametersFeatures,
      "fitness": GPCParametersFeatureFitness,
      "mutation": GPCMutation
    },
  },
  "selection": {
    "KN": {
      "params": KNParameters,
      "fitness": KNParametersFitness,
      "mutation": KNMutation
    },
    "SVC": {
      "params": SVCParameters,
      "fitness": SVCParametersFitness,
      "mutation": mutationSVC
    },
    "RandomForest": {
      "params": RandomForestParameters,
      "fitness": RandomForestFitness,
      "mutation": RandomForestMutation
    },
    "DecisionTree": {
      "params": DecisionTreeParameters,
      "fitness": DecisionTreeFitness,
      "mutation": DecisionTreeMutation
    },
    "GPC": {
      "params": GPCParameters,
      "fitness": GPCFitness,
      "mutation": GPCMutation
    },
  },
}
