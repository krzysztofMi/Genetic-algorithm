# Selekcje co działają
from sklearn.model_selection import StratifiedKFold
from sklearn.neural_network import MLPClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.svm import SVC
from sklearn.gaussian_process import GaussianProcessClassifier
from sklearn.gaussian_process.kernels import RBF
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier, AdaBoostClassifier
from sklearn.naive_bayes import GaussianNB
from sklearn.discriminant_analysis import QuadraticDiscriminantAnalysis
modelSelection = StratifiedKFold

## Classifiers
# KN
# SVC
# RandomForest
# DecisionTree
# MLP

classifier = "KN"
filename = "KN"
testCount  = 5

sizePopulation = 10
probabilityMutation = 0.1
probabilityCrossover = 0.8
numberIteration=50
min_or_max = "max"
