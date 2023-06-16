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
        let start = 100
        if (args[0]) {
            const number = Number(args[0])
            if (!Number.isInteger(number) || number < 0)
                return message.thread.send('❎ Số không hợp lệ.')
            
            start = number
        }

        const end = start * 10
        const result = Math.floor(Math.random() * (end - start + 1)) + start
        return message.thread.send(`🎲 Con số may mắn của bạn là: ${result}`)
    }
}