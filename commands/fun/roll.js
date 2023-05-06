const { Client, Message } = require('messenger-api.js')

module.exports = {
    name: 'roll',
    category: 'fun',
    /**
     * @arg {Client<true>} client 
     * @arg {Message} message 
     * @arg {string[]} args 
     */
    run: (client, message, args) => {
        const random = Math.floor(Math.random() * args[0] ? Math.round(Number(args[0])) : 100) + 1
        return message.thread.send(`🎲 Con số may mắn của bạn là: ${random}`)
    }
}