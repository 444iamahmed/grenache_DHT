const { PeerRPCClient } = require('grenache-nodejs-ws')
const Link = require('grenache-nodejs-link')
const { RecommendationRequest } = require('../recommendations/commons')
const { MovieCategory, Movie } = require('../commons')
const { ListItem } = require('./common')

const link = new Link({
    grape: 'http://127.0.0.1:40001',
    requestTimeout: 10000
})
link.start()
const peer = new PeerRPCClient(link, {})
peer.init()


peer.request('remove_from_list', new ListItem(1, new Movie(7)), { timeout: 10000 }, (err, result) => {
    if (err) throw err
    console.log(result)
})

