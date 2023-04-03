import json
from operator import itemgetter

file = open('../../../back-end/data/Player-Info/Players.json')
data = json.load(file)

coll_dict = {}
# Get size of each team
for league in data:
    for team in data[league]:
        for player in team['players']:
            if 'college' in player :
                college = player['college']
                if college in coll_dict:
                    coll_dict[college] += 1
                else:
                    coll_dict[college] = 1


coll_list = []
for c in coll_dict:
    subdict = {'Name': c, 'Players': coll_dict[c]}
    coll_list.append(subdict)


coll_list = sorted(coll_list, key=itemgetter('Players'), reverse=True)
with open("colleges.json", 'w') as outfile:
    json.dump(coll_list[0:21], outfile, indent=4)
