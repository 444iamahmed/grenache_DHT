// const MovieCategory = {
//     MYSTERY: 0,
//     SCIENCE_FICTION: 1,
//     COMEDY: 2,
//     THRILLER: 3,
//     ACTION: 4,
//     ALL: 5,
// }



const { PeerRPCServer } = require('grenache-nodejs-ws')
const Link = require('grenache-nodejs-link')


const { Movie, MovieCategory } = require('../commons')
const { RecommendationResponse, RecommendationRequest } = require('../recommendations/commons')


let all_caterogies = [MovieCategory.MYSTERY, MovieCategory.COMEDY, MovieCategory.ACTION, MovieCategory.THRILLER, MovieCategory.SCIENCE_FICTION]

let movies_by_category = {};

movies_by_category[MovieCategory.MYSTERY] = [
    new Movie(id = 1, title = "Enola Holmes"),
    new Movie(id = 2, title = "The Woman in the Window"),
    new Movie(id = 3, title = "The Vanished"),
]
movies_by_category[MovieCategory.SCIENCE_FICTION] = [
    new Movie(id = 4, title = "Stowaway"),
    new Movie(id = 5, title = "Extinction"),
    new Movie(id = 6, title = "Bird Box"),
]
movies_by_category[MovieCategory.COMEDY] = [
    new Movie(id = 7, title = "Dolittle"),
        new Movie(id = 8, title = "Extinct"),
        new Movie(id = 9, title = "Groundhog Day"),
]
movies_by_category[MovieCategory.THRILLER] = [
    new Movie(id = 10, title = "Gerald’s Game"),
        new Movie(id = 11, title = "El Camino: A Breaking Bad new Movie"),
        new Movie(id = 12, title = "Looper"),
]
movies_by_category[MovieCategory.ACTION] = [
    new Movie(id = 13, title = "Extraction"),
        new Movie(id = 14, title = "The Hunger Games"),
        new Movie(id = 15, title = "Snowpiercer"),
]
movies_by_category[MovieCategory.ALL] = [
]
// movies_by_category = {
//     MovieCategory.MYSTERY: [
//         new Movie(id = 1, title = "Enola Holmes"),
//         new Movie(id = 2, title = "The Woman in the Window"),
//         new Movie(id = 3, title = "The Vanished"),
//     ],
//     MovieCategory.SCIENCE_FICTION: [
//         new Movie(id = 4, title = "Stowaway"),
//         new Movie(id = 5, title = "Extinction"),
//         new Movie(id = 6, title = "Bird Box"),
//     ],
//     MovieCategory.COMEDY: [
//         new Movie(id = 7, title = "Dolittle"),
//         new Movie(id = 8, title = "Extinct"),
//         new Movie(id = 9, title = "Groundhog Day"),
//     ],
//     MovieCategory.THRILLER: [
//         new Movie(id = 10, title = "Gerald’s Game"),
//         new Movie(id = 11, title = "El Camino: A Breaking Bad new Movie"),
//         new Movie(id = 12, title = "Looper"),
//     ],
//     MovieCategory.ACTION: [
//         new Movie(id = 13, title = "Extraction"),
//         new Movie(id = 14, title = "The Hunger Games"),
//         new Movie(id = 15, title = "Snowpiercer"),
//     ],
//     MovieCategory.ALL: [
//     ]
//   }


function fibonacci(num) {
    if (num <= 1) {
        return 1
    }

    return fibonacci(num - 1) + fibonacci(num - 2)
}



const link = new Link({
    grape: 'http://127.0.0.1:30001'
})
link.start()


const peer = new PeerRPCServer(link, {})
peer.init()

const service = peer.transport('server')
service.listen(1337)


setInterval(() => {
    link.announce('recommend', service.port, {})
}, 1000)



service.on('request', (rid, key, payload, handler) => {
    handler.reply(null, recommend(payload))
})


function recommend(request) {
    all_movies = []
    if(!all_caterogies.includes(request.category))
    {
        console.error("CATEGORY DOESN'T EXIST");
    }

    if( request.category == MovieCategory.ALL)
    {
        for(let i = 0; i < all_caterogies.length; i++)
        {
            request.category = all_caterogies[i];
            movies_for_category = movies_by_category[request.category];
            //num_results = Math.min(request.max_results, movies_for_category.length);
            all_movies.push(...movies_for_category);


        }
        movies_to_recommend = all_movies;
    }
    else {
        movies_for_category = movies_by_category[request.category];
        movies_to_recommend = movies_for_category;
    }

    return new RecommendationResponse(movies_to_recommend);

}