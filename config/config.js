const NodeCache = require('node-cache')
const { QuickDB } = require('quick.db')

const config = {
    prefix: '/',
    database: new QuickDB({ filePath: './config/Database.sqlite' }),
    cache: new NodeCache({ checkperiod: 10000, deleteOnExpire: true }),
    ratelimit: new Map(),
    commands: new Map(),
    aliases: new Map()
}

module.exports = config