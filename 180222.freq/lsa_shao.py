import numpy as np

IGNORED_PUNCTUATIONS = [',', '.', '?', '!', ':', '_', '/', '(', ')', '“', '”']
IGNORED_STRING = ['', '\n', '&', '-']


# utils

def readLSAFile(path):
    docs = []
    with open(path, 'r') as f:
        lines = f.readlines()
        for i in range(len(lines) - 1):
            if lines[i].startswith('XXX'):
                docs.append(lines[i + 1])
    return docs


def str2terms(s):
    terms = s.translate({ord(c): ' ' for c in IGNORED_PUNCTUATIONS}).split(' ')
    terms = list(filter(lambda t: t not in IGNORED_STRING, terms))
    return set(terms)


def buildTDMatrixAndIndex(docs, discountTerms):
    terms = str2terms(' '.join(docs).lower())
    # extra credit
    terms -= set(discountTerms)
    index = sorted(terms)
    m = np.zeros([len(index), len(docs)], dtype='int')
    for col, doc in enumerate(docs):
        for term in str2terms(doc.lower()):
            if term in index:
                row = index.index(term)
                m[row, col] += 1
    return m, index


def outputMatrix(matrix, index, path):
    with open(path, 'w') as f:
        for row, term in enumerate(index):
            # header = '[{}] {}: '.format(row, term)
            header = ''
            freqs = [str(freq) for freq in matrix[row]]
            line = header + ', '.join(freqs) + '\n'
            f.write(line)
    return


# process 1

# extra credit
# IGNORED_TERMS = ['as', 'is', 'am', 'or', 'they', 'those', 'what', 'this', 'that', 'can']
IGNORED_TERMS = []

docs = readLSAFile('LSA.txt')
tdm, index = buildTDMatrixAndIndex(docs, IGNORED_TERMS)
outputMatrix(tdm, index, 'tdm.txt')


# methods

def returnTermFrequency(term, document):
    # dep: tdm, index
    row = index.index(term)
    col = document
    return tdm[row, col]


def returnTFIDF(term, document):
    # dep: tdm, index
    # tf
    freq = returnTermFrequency(term, document)
    col = document
    freqs = tdm[:, col]
    tf = freq / sum(freqs)
    # idf
    row = index.index(term)
    times = sum(tdm[row])
    idf = np.log(len(docs) / times + 0.01)
    return tf * idf


# utils

def buildTFIDFMatrix():
    # dep: index, returnTFIDF
    m = np.zeros([len(index), len(docs)], dtype='float')
    for row, term in enumerate(index):
        for col in range(len(docs)):
            m[row, col] = returnTFIDF(term, col)
    return m


# process 2
tfidfm = buildTFIDFMatrix()
outputMatrix(tfidfm, index, 'tfidf.txt')
