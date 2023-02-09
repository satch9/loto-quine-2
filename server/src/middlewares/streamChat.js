const { StreamChat } = require('stream-chat')
const {STREAM_API_KEY, STREAM_API_SECRET} = require('../../utils')

const serverClient = StreamChat.getInstance(STREAM_API_KEY, STREAM_API_SECRET)
//console.log("serverClient streamchat", serverClient)
if (!serverClient.secret) {
    serverClient.secret = process.env.STREAM_SECRET
}

module.exports = { serverClient }