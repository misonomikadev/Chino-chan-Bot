const { Client, Message } = require('messenger-api.js')
const axios = require('axios').default
const config = require('../../config/config.js')
const ms = require('ms')

module.exports = {
    name: 'ask',
    category: 'fun',
    aliases: ['askgpt'],
    /**
     * @arg {Client<true>} client 
     * @arg {Message} message
     * @arg {string[]} args
    */
    run: async (client, message, args) => {
        if (!args.length) return message.reply(`❎ Hãy nhập tin nhắn bạn muốn hỏi.`)
        if (config.ratelimit.has(message.thread.id))
            return message.thread.send('❎ Bot đang xử lý câu hỏi trước đó, xin vui lòng đợi.')
        
        const msg = args.join(' ')
        config.ratelimit.set(message.thread.id, true)
        
        const history = config.cache.get(message.thread.id)
        await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-3.5-turbo',
            messages: !history ? [
                { role: 'user', content: msg },
            ] : [
                { role: 'user', content: history.question },
                { role: 'assistant', content: history.answer },
                { role: 'user', content: msg }
            ],
            max_tokens: 2048
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${config.openaikey}`
            }
        }).then(res => {
            if (!String(res.status).startsWith('2')) {
                if (String(res.status).startsWith('5'))
                    return message.reply('❎ Đã có lỗi xảy ra phía server OpenAI.')
                
                return message.reply('❎ Hình như token OpenAI của bạn không hợp lệ, hãy đặt lại token.') 
            }

            const success = res.data.choices[0].message.content
            config.cache.del(message.thread.id)

            config.cache.set(message.thread.id, { question: msg, answer: success }, ms('5m'))
            config.ratelimit.delete(message.thread.id)
            
            return message.reply(success)
        }).catch(error => {
            console.error(error)
            config.ratelimit.delete(message.thread.id)
        })
    }
}
