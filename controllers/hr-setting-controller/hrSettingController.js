const dataAccess = require('../../data-access')

const getUserHrSetting = async (req, res) => {
  try {
    const userHrSetting = await dataAccess.hrSettingDataAccess.getHrSettingByUserId({ userId: req.params.userId })
    res.status(200).json(userHrSetting)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const updateUserHrSetting = async (req, res) => {
  try {
    const updatedHrSetting = await dataAccess.hrSettingDataAccess.updateHrSetting({
      userId: req.params.userId,
      hrSetting: req.body
    })
    res.status(200).json(updatedHrSetting)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  getUserHrSetting,
  updateUserHrSetting
}
