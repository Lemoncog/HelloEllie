import json

file=open("gitLog.raw",'r')

def parseFile(file):
    row = file.readlines();
    nextLineCommit = False;
    commitFileDiffs = 0
    commitInserts = 0
    commitDeletes = 0
    author = ""
    date = ""
    revisionHash = ""

    commits = []
    
    for line in row:
        print("line %s" % line)

        if nextLineCommit:
            print("COMMIT LINE")

            splitLine = line.split(",")

            print(splitLine)
            
            author = splitLine[0].lstrip().rstrip();
            date = splitLine[1].lstrip().rstrip();
            revisionHash = splitLine[2].lstrip().rstrip();
            
            nextLineCommit = False  
        elif line.find("COMMIT") > -1:
            print("NEXT COMMIT LINE")

            commits.append({'author' : author, 'date' : date, 'revisionHash' : revisionHash, 'insertions' : commitInserts, 'deletions' : commitDeletes, 'filesChanged' : commitFileDiffs})
            
            commitFileDiffs = 0
            commitInserts = 0
            commitDeletes = 0
            nextLineCommit = True
        else:
            print("INSDEL LINE")
            insDels = [int(s) for s in line.rstrip().split(",")]

            print(len(insDels))

            if(len(insDels) == 2):
                print("Numbers %s" % insDels)

                commitFileDiffs+=1
                commitInserts+=insDels[0]
                commitDeletes+=insDels[1]

                print("Count %i,%i" % (insDels[0], insDels[1]))

                print("Count %i,%i" % (commitInserts, commitDeletes))

    print(commits)
    with open('data/commitLog.json', 'w') as outfile:
      json.dump({ 'commits' : commits}, outfile)

parseFile(file)
