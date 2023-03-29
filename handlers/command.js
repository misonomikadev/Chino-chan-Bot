const fs = require('fs')
const config = require('../config/config.js')

module.exports = function() {
    let count = 0

    for (const dir of fs.readdirSync('./commands')) {
        const files = fs.readdirSync(`./commands/${dir}`)
        if (!files.length) continue

        for (const file of files) {
            if (!file.endsWith('.js')) continue

            const pull = require(`../commands/${dir}/${file}`)
            if (pull.name) {
                if (pull.aliases && Array.isArray(pull.aliases)) {
                    pull.aliases.forEach(alias => config.aliases.set(alias, pull.name))
                }

                config.commands.set(pull.name, pull)
                count++
            } else {
                continue
            }
        }
    }

    return console.log(`${count} lệnh đã sẵn sàng!`)
}