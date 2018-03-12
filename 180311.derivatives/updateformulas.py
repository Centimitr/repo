import numpy as np


def derivativesLoops(X, Y, W, b):
    m = len(Y)
    n = len(W)
    J = 0.0
    for i in range(m):
        weighted_sum = 0.0
        for j in range(n):
            weighted_sum += W[j] * X[j][i]
        y = weighted_sum + b
        distance = Y[i] - y
        sq = distance ** 2
        J += sq
    return J


def derivativesMatrices(X, Y, W, b):
    m = len(X)
    B = np.ones(m) * b
    M = (np.dot(W, X) + B) - Y
    return np.dot(M, M.T)

# X = np.array([[1, 2, 3]])
# Y = np.array([1.5, 1.5, 3.5])
# W = np.array([0.5])
# b = 2.0 / 3.0
#
# print(derivativesMatrices(X, Y, W, b))
# print(derivativesLoops(X, Y, W, b))
# 1.916666666666667
