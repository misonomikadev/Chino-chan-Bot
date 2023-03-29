const { Client, Message } = require('messenger-api.js')

module.exports = {
    name: 'uptime',
    category: 'information',
    /**
     * @arg {Client<true>} client 
     * @arg {Message} message 
     * @arg {string[]} args 
     */
    run: (client, message, args) => {
        let totalSeconds = (client.uptime / 1000);
        const days = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400;
        const hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = Math.floor(totalSeconds % 60);

        message.thread.send(`⏱ Bot đã chạy được: ${days} ngày ${hours} giờ ${minutes} phút ${seconds} giây.`)
    }
}