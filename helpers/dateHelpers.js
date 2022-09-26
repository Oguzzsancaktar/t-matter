const getISODate = date => {
  return new Date(date.toISOString().substr(0, 19))
}
module.exports = {
  getISODate
}
