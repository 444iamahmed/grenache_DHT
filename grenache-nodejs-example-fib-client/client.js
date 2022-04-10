const { PeerRPCClient } = require('grenache-nodejs-ws')
const Link = require('grenache-nodejs-link')
const { RecommendationRequest } = require('../recommendations/commons')
const { MovieCategory } = require('../commons')

const link = new Link({
    grape: 'http://127.0.0.1:30001',
    requestTimeout: 10000
})
link.start()
const peer = new PeerRPCClient(link, {})
peer.init()


peer.request('recommend', new RecommendationRequest(1, MovieCategory.ALL, 19), { timeout: 10000 }, (err, result) => {
    if (err) throw err
    console.log(result)
})

