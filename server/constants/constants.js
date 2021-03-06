const GENDER_TYPES = Object.freeze({
  FEMALE: 0,
  MALE: 1,
  OTHER: 2
})

const STATUS_TYPES = Object.freeze({
  INACTIVE: 0,
  ACTIVE: 1
})

const USER_ROLE_TYPES = Object.freeze({
  ADMIN: 1
})

const ONE_YEAR_DATE = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) // days, hours, minutes, seconds, milliseconds

const AUTH_COOKIE_OPTIONS = {
  // httpOnly: process.env.NODE_ENV !== "production",
  // secure: process.env.NODE_ENV === "production",
  httpOnly: true,
  expires: ONE_YEAR_DATE
}

const STATUSES = [STATUS_TYPES.ACTIVE, STATUS_TYPES.INACTIVE]
const GENDERS = [GENDER_TYPES.FEMALE, GENDER_TYPES.MALE, GENDER_TYPES.OTHER]

module.exports = {
  GENDER_TYPES,
  STATUS_TYPES,
  STATUSES,
  GENDERS,
  USER_ROLE_TYPES,
  AUTH_COOKIE_OPTIONS
}
