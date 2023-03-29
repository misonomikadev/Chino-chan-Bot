const config = require('../config/config.js')
const { Client, Message } = require('messenger-api.js')

/**
 * @arg {Client<true>} client 
 * @arg {Message} message 
 */
module.exports = function(client, message) {
    if (message.isClientUser) return
    if (!message.content.startsWith(config.prefix)) return

    const args = message.content.slice(config.prefix.length).trim().split(/\s+/g)
    const cmd = args.shift().toLowerCase()
    const command = config.commands.get(cmd)
        ?? config.commands.get(config.aliases.get(cmd))
    
    if (command) {
        try { command.run.call(command, client, message, args) }
        catch (error) { console.error(error) }
    }
}