def readList(path, handleFn, filterFn):
    values = []
    with open(path, 'r') as f:
        for line in f:
            row = handleFn(line)
            if not filterFn or filterFn(row):
                values.append(row)
        f.close()
    return values


def printListenersTimesPlayed(userID):
    uad = readList('user_artist_data.txt',
                   lambda l: l.replace('\t', ' ').replace('\n', '').split(' '),
                   lambda row: row[0] == str(userID))

    ad = readList('artist_data.txt',
                  lambda l: l.replace('\t', ' ').replace('\n', '').split(' ', 1),
                  lambda row: len(row) == 2)
    mapping = {aid: name for aid, name in ad}
    result = [[mapping[aid] if aid in mapping else aid, times] for uid, aid, times in uad]
    for name, times in result:
        print name + ' - ' + times


printListenersTimesPlayed(1000208)
