const HrSetting = require('../../models/hrSetting')

const getHrSettingByUserId = ({ userId }) => {
  return HrSetting.findOne({ owner: userId })
}

const updateHrSetting = ({ userId, hrSetting }) => {
  return HrSetting.findOneAndUpdate({ owner: userId }, hrSetting, { new: true, upsert: true })
}

module.exports = {
  getHrSettingByUserId,
  updateHrSetting
}
