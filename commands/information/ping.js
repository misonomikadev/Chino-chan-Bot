const { Client, Message } = require('messenger-api.js')

module.exports = {
    name: 'ping',
    category: 'information',
    /**
     * @arg {Client<true>} client 
     * @arg {Message} message 
     * @arg {string[]} args 
     */
    run: (client, message, args) => {
        const ping = Date.now() - message.createdTimestamp
        message.thread.send(`🚀 Ping hiện tại của bot là: ${ping}ms.`)
    }
}