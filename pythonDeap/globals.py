# Selekcje co działają
from sklearn.model_selection import StratifiedKFold, StratifiedShuffleSplit, KFold, ShuffleSplit, RepeatedKFold
modelSelection = StratifiedShuffleSplit

filename = "StratifiedShuffleSplit"
testCount  = 5

sizePopulation = 10
probabilityMutation = 0.1
probabilityCrossover = 0.8
numberIteration=50
min_or_max = "max"

