class ListItem {
    user_id = 1;
    movie = null;

    constructor(user_id, movie) {
        this.user_id = user_id;
        this.movie = movie;
    }
}


class MovieListResponse {
    movie_list = [];

    constructor(movie_list) {
        this.movie_list = movie_list;
    }
}

module.exports = {ListItem, MovieListResponse}