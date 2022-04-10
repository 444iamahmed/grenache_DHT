const { PeerRPCServer } = require('grenache-nodejs-ws')
const Link = require('grenache-nodejs-link')


const { Movie, MovieCategory } = require('../common')
const { RecommendationResponse, RecommendationRequest } = require('../recommendations/commons')

var csv = require('jquery-csv');
$.csv.toArray(csv);

// list_file = open("lists.csv", "r")
// csvreader = csv.reader(list_file)

list_by_user_id = []
// list_by_user_id = defaultdict(list)



// for row in csvreader:
//     print(row)
//     if len(row) > 0:
//         list_by_user_id[int(row[0])].append(Movie(id = int(row[1]), title = row[2]))
// list_file.close()

// print(list_by_user_id)
// def save():
//     list_file = open("lists.csv", "w")
//     csvwriter = csv.writer(list_file)

//     for user, movies in list_by_user_id.items():
//         print(user, movies)
//         for movie in movies:
//             csvwriter.writerow([user, movie.id, movie.title])
//     list_file.close()