const cron = require('node-cron')
const { installmentFee } = require('./financeCronFunctions')

const cronJobs = () => {
  cron.schedule('* * * * *', installmentFee)
}

module.exports = cronJobs
