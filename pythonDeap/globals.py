# Selekcje co działają
from sklearn.model_selection import StratifiedKFold, StratifiedShuffleSplit, KFold, ShuffleSplit, RepeatedKFold
modelSelection = RepeatedKFold

filename = "RepeatedKFold"
testCount  = 5

sizePopulation = 10
probabilityMutation = 0.1
probabilityCrossover = 0.8
numberIteration=50
min_or_max = "max"
