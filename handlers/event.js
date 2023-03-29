const fs = require('fs')
const { Client } = require('messenger-api.js')

/**
 * @arg {Client<true>} client 
 */
module.exports = function(client) {
    let count = 0

    for (const file of fs.readdirSync('./events')) {
        if (!file.endsWith('.js')) continue

        const event = require(`../events/${file}`)
        if (typeof event !== 'function') continue

        const eventName = file.slice(0, file.indexOf('.js'))
        client.on(eventName, event.bind(null, client))
        count++
    }

    return console.log(`${count} events đã sẵn sàng!`)
}