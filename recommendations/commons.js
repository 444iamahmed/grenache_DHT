
class RecommendationRequest {
    user_id = -1;
    category = 0;
    max_results = 0;

    constructor(user_id, category, max_results){
        this.user_id = user_id;
        this.category = category;
        this.max_results = max_results;
    }
}

class RecommendationResponse {

    recommendations = [];

    constructor(recommendations)
    {
        this.recommendations = recommendations;
    }
}



module.exports = {RecommendationRequest, RecommendationResponse}