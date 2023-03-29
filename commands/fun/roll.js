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
        let max = 100
        if (args[0]) {
            max = Number(args[0])
            if (!max || !Number.isInteger(max)) return message.reply('❎ Số bạn vừa nhập là không hợp lệ.')
            if (max > 10000 || max < 0) return message.reply('❎ Số bạn vừa nhập phải nhỏ hơn 10000 và lớn hơn 0.')
        }

        const min = Math.pow(10, String(max).length - 1)
        const random = Math.floor(Math.random() * (max - min + 1)) + min

        return message.thread.send(`🎲 Con số may mắn của bạn là: ${random}`)
    }
}