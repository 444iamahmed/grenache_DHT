const { PeerRPCServer } = require('grenache-nodejs-ws')
const Link = require('grenache-nodejs-link')


const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const fs = require('fs');
const { parse, parseString } = require('fast-csv');

const { ListItem, MovieListResponse } = require('./common');
const { Movie } = require('../commons');

list_by_user_id = {}
fs.createReadStream('lists.csv')
    .pipe(csv({ headers: false }))
    .on('data', (row) => {
        console.log(row)
        console.log(list_by_user_id[parseInt(row['0'])])
        if (list_by_user_id[parseInt(row['0'])] != null) {
            list_by_user_id[parseInt(row['0'])].push(new Movie(parseInt(row['1']), row['2']));
            console.log("existing");
        } else {
            list_by_user_id[parseInt(row['0'])] = []
            console.log("new");
        }
    })

    .on('end', () => {
        console.log('CSV file successfully processed');
        console.log(list_by_user_id)
    });
// list_file = open("lists.csv", "r")
// csvreader = csv.reader(list_file)

// list_by_user_id = defaultdict(list)



// for row in csvreader:
//     print(row)
//     if len(row) > 0:
//         list_by_user_id[int(row[0])].append(Movie(id = int(row[1]), title = row[2]))
// list_file.close()

console.log(list_by_user_id)
function save() {
    // const csvWriter = createCsvWriter({
    //     path: 'lists.csv',
    //     header: ['user_id', 'movie_id', 'movie_title']
    // });
    const stream = parse({ headers: false });

    for (key in Object.keys(list_by_user_id)) {
        for (movie in list_by_user_id[key]) {
            console.log(key);
            stream.write(key.toString() + "," + movie.id.toString() + "," + movie.title);
        }
    }
    // stringify(list_by_user_id, {
    //     header: false
    // }, function (err, output) {
    //     fs.writeFile('lists.csv', output);
    // })    // Object.keys(list_by_user_id).forEach(function (key) {
    //     console.log(key, list_by_user_id[key]);
    //     for (movie in list_by_user_id[key]) {
    //         csvWriter.writeRecords([key, movie.id, movie.title]);
    //     }
    // });

    // for user, movies in list_by_user_id.items():
    //     print(user, movies)

}

const link = new Link({
    grape: 'http://127.0.0.1:40001'
})
link.start()


const peer = new PeerRPCServer(link, {})
peer.init()

const service = peer.transport('server')
service.listen(1337)


setInterval(() => {
    link.announce('get_list', service.port, {})
}, 1000)

setInterval(() => {
    link.announce('add_to_list', service.port, {})
}, 1000)


setInterval(() => {
    link.announce('remove_from_list', service.port, {})
}, 1000)



service.on('request', (rid, key, payload, handler) => {
    console.log(key)
    if (key == 'get_list')
        handler.reply(null, GetList(payload))
    else if (key == 'add_to_list')
        handler.reply(null, AddToList(payload))
    else if (key == 'remove_from_list')
        handler.reply(null, RemoveFromList(payload))
})


function GetList(user_id) {
    console.log("here");
    if (Object.keys(list_by_user_id).includes(user_id)) {
        console.error("User not found");
        return false;
    }
    _movie_list = list_by_user_id[user_id];

    return new MovieListResponse(movie_list = _movie_list);
}
function AddToList(request) {

    for (movie in list_by_user_id[request.user_id]) {
        if (movie.id == request.movie.id) {
            console.log("Movie Already Exists");
            return false;
        }
    }

    list_by_user_id[request.user_id].push(new Movie(request.movie.id, request.movie.title));
    save();
    return true;
}
function RemoveFromList(request) {
    if (Object.keys(list_by_user_id).includes(request.user_id)) {
        console.error("User not found");
        return false;
    }


    for (let i = 0; i < list_by_user_id[request.user_id].length; i++) {
        if (list_by_user_id[request.user_id][i].id == request.movie.id)
            list_by_user_id[request.user_id].splice(i, 1);
        save()
        return true;
    }
    return false;

}