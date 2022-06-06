const {TwitterApi} = require("twitter-api-v2");

const client = new TwitterApi({
    appKey: "",
    appSecret: "",
    accessToken: "",
    accessSecret: ""
})

const rwClient = client.readWrite

module.exports = rwClient