import csv
import numpy as np


def read(fn, line_num):
    with open(fn, newline='') as f:
        reader = csv.reader(f)
        X = np.empty((line_num, 4), dtype='float')
        Y = np.empty(line_num, dtype='int')
        for i, row in enumerate(reader):
            if i != 0:
                for j, v in enumerate(row[:-1]):
                    X[i - 1, j] = float(v)
                Y[i - 1] = int(row[4])
        return X, Y


def write_lines(fn, arr):
    with open(fn, mode='w') as f:
        for l in arr:
            f.write(str(l) + '\n')


def distance_square(p1, p2):
    return sum([(p1[i] - v) ** 2 for i, v in enumerate(p2)])


def confusion_matrix(a1, a2):
    tn, fp, fn, tp = 0, 0, 0, 0
    for i, v1 in enumerate(a1):
        v2 = a2[i]
        tn += 1 if v1 == 0 and v2 == 0 else 0
        fp += 1 if v1 == 0 and v2 == 1 else 0
        fn += 1 if v1 == 1 and v2 == 0 else 0
        tp += 1 if v1 == 1 and v2 == 1 else 0
    return [tn, fp, fn, tp]


def knn(p, X, Y, k):
    ds = np.empty(len(X), dtype='float')
    for i, p2 in enumerate(X):
        ds[i] = distance_square(p, p2)
    indices = np.argpartition(ds, k)[:k]
    results = Y[indices]
    u, pos = np.unique(results, return_inverse=True)
    counts = np.bincount(pos)
    maxpos = counts.argmax()
    return u[maxpos]


def knearestneighbor(trainfile, testfile, outputfile, k):
    X, Y = read(trainfile, 80)
    Xtest, Ytest = read(testfile, 20)
    Yhat = np.zeros(20, dtype='int')
    for i, p in enumerate(Xtest):
        Yhat[i] = knn(p, X, Y, k)
    write_lines(outputfile, Yhat)
    return confusion_matrix(Ytest, Yhat)

# test
# knearestneighbor('iristrain.csv', 'iristest.csv', 'irisoutput.txt', 5)
