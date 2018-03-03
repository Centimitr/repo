import numpy as np


def readList(path, handleFn, filterFn):
    values = []
    with open(path, 'r') as f:
        for line in f:
            row = handleFn(line)
            if not filterFn or filterFn(row):
                values.append(row)
        f.close()
    return values


uad = readList('user_artist_data.txt',
               lambda l: l.replace('\t', ' ').replace('\n', '').split(' '), None)

ad = readList('artist_data.txt',
              lambda l: l.replace('\t', ' ').replace('\n', '').split(' ', 1),
              lambda row: len(row) == 2)
u_index = list(set([v[0] for v in uad]))
a_index = list(set([v[0] for v in ad]))

lisrtim = np.zeros((len(u_index), len(a_index)), dtype='uint16')
for v in uad:

    uid, aid, times = v
    if aid in a_index:
        ui = u_index.index(uid)
        ai = a_index.index(aid)
        lisrtim[ui, ai] = times


def getTimesForUserXArtistY(uid, aid):
    if aid in a_index and uid in u_index:
        ui = u_index.index(uid)
        ai = a_index.index(aid)
        return lisrtim[ui, ai]
    else:
        return 0


uid = 10009
aid = 10065

print getTimesForUserXArtistY(uid, aid)
