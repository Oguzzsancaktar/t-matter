const cron = require('node-cron')
const { installmentFee } = require('./financeCronFunctions')
const { hrTaskSender } = require('./hrTaskCronFunctions')

const cronJobs = () => {
  cron.schedule('* * * * *', installmentFee)
  cron.schedule('0 0 12 * *', hrTaskSender)
}

module.exports = cronJobs
