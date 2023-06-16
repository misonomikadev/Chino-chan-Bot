const { Client, Message } = require('messenger-api.js')
const config = require('../../config/config.js')
const { Configuration, OpenAIApi } = require('openai')
const ms = require('ms')

const openaiConfig = new Configuration({ apiKey: config.openaikey })
const api = new OpenAIApi(openaiConfig)

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
        
        await message.thread.messages.markAsRead()
        await api.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: !history ? [
                { role: 'user', content: msg }
            ] : [
                { role: 'user', content: history.question },
                { role: 'assistant', content: history.answer },
                { role: 'user', content: msg }
            ],
            max_tokens: 2048
        }).then(res => {
            const success = res.data.choices[0].message.content
            config.cache.del(message.thread.id)

            config.cache.set(message.thread.id, { question: msg, answer: success }, ms('5m'))
            config.ratelimit.delete(message.thread.id)
            
            return message.reply(success, { typing: true })
        }).catch(error => {
            console.error(error)
            config.ratelimit.delete(message.thread.id)
        })
    }
}
