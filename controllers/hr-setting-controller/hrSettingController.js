const dataAccess = require('../../data-access')
const { TASK_TYPES } = require('../../constants/hrConstants')

const getUserHrSetting = async (req, res) => {
  let { userId } = req.query
  userId = userId || null
  try {
    let userHrSetting = await dataAccess.hrSettingDataAccess.getHrSettingByUserId({
      userId
    })
    if (!userHrSetting) {
      if (userId) {
        userHrSetting = await dataAccess.hrSettingDataAccess.getHrSettingByUserId({ userId: undefined })
        return res.send(userHrSetting)
      }
      res.send({
        owner: userId,
        monthlyWorking: {
          isChecked: false,
          days: 1,
          taskType: TASK_TYPES.MENTAL,
          notificationReceivers: []
        },
        loginLogout: {
          isChecked: false,
          taskType: TASK_TYPES.ABSENT,
          notificationReceivers: []
        },
        vocations: [1920, 3840, 5760, 7680, 9600].map(h => ({
          isChecked: false,
          taskType: TASK_TYPES.VACATION,
          afterHours: h,
          days: 7,
          notificationReceivers: []
        })),
        specialDays: []
      })
    }
    res.status(200).json(userHrSetting)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const updateUserHrSetting = async (req, res) => {
  const { owner } = req.body
  const userId = owner || null

  try {
    const updatedHrSetting = await dataAccess.hrSettingDataAccess.updateHrSetting({
      userId,
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
