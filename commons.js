const MovieCategory = {
    MYSTERY: 0,
    SCIENCE_FICTION: 1,
    COMEDY: 2,
    THRILLER: 3,
    ACTION: 4,
    ALL: 5,
}

// Object.freeze(MovieCategory)

class Movie
{
    id = 0;
    title = 0;

    constructor(id=-1, title="")
    {
        this.id = id;
        this.title = title;
    }
}

function generateRandom(min = 0, max = 100) {

    // find diff
    let difference = max - min;

    // generate random number 
    let rand = Math.random();

    // multiply with difference 
    rand = Math.floor( rand * difference);

    // add with min value 
    rand = rand + min;

    return rand;
}


module.exports = {MovieCategory, Movie}