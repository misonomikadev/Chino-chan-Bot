const { Client, Message } = require("messenger-api.js");
const config = require('../../config/config.js')

module.exports = {
    name: 'openaikey',
    category: 'config',
    alisases: ['chatgptkey'],
    /**
     * @arg {Client<true>} client 
     * @arg {Message} message 
     * @arg {string[]} args 
     */
    run: async (client, message, args) => {
        switch(args[0]) {
            case'set':
                if (!args[1]) return message.reply('❎ Hãy nhập token OpenAI bạn muốn đặt.')
                await config.database.set(message.thread.id, args[1])
            
                return message.reply(`✅ Đã đặt token OpenAI cho bot, bấm lệnh /ask <message> để chat với bot.`)
            case'delete':
                const hasToken = await config.database.has(message.thread.id)
                if (!hasToken) return message.reply('❎ Bạn không có token OpenAI nào để xoá.')

                await config.database.delete(message.thread.id)

                return message.reply('✅ Đã xoá token OpenAI bạn đặt cho bot.')
            default:
                return message.reply('❎ Câu lệnh không hợp lệ.')
        }
    }
}