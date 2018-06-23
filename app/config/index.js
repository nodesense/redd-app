const jsonfile = require("jsonfile")
process.argv.NODE_ENV = process.argv.NODE_ENV || 'development'

const configFile = `${__dirname}/../../etc/${process.argv.NODE_ENV}.json`

const config = jsonfile.readFileSync(configFile)

module.exports = config