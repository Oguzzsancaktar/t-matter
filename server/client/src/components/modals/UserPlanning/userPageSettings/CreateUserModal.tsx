import React, { useEffect, useState } from 'react'
import { ConfirmCancelButtons } from '@/components/button'
import { InputWithIcon, SelectInput } from '@/components/input'
import { JustifyBetweenColumn, JustifyBetweenRow, JustifyCenterRow, Row } from '@/components/layout'
import { H1 } from '@/components/texts'
import useAccessStore from '@/hooks/useAccessStore'
import { closeModal } from '@/store'
import { DatePicker, InnerWrapper, ItemContainer } from '@/components'
import { ModalBody, ModalFooter, ModalHeader } from '../../types'
import { IUserCreateDTO } from '@/models'
import { Key, User } from 'react-feather'
import { useToggle } from '@/hooks/useToggle'
import {
  isEmailValid,
  isPasswordAndConfirmMatch,
  isPasswordValid,
  isPhoneNumberValid,
  isValueNull,
  isZipcodeValid
} from '@/utils/validationUtils'
import { toastError } from '@/utils/toastUtil'
import { genderOptions } from '@/constants/genders'
import { statusOptions } from '@/constants/statuses'
import moment from 'moment'

const CreateUserModal = () => {
  const [isPasswordVisible, togglePasswordVisibility] = useToggle(false)
  const [isPasswordConfirmVisible, togglePasswordConfirmVisibility] = useToggle(false)

  const [passwordConfirm, setPasswordConfirm] = useState('')

  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

  const [createUserData, setCreateUserData] = useState<Omit<IUserCreateDTO, '_id'>>({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    birthday: '',
    birthplace: '',
    country: '',
    state: '',
    zipcode: '',
    address: '',
    role: '',
    gender: '',
    status: '',
    password: ''
  })

  const [firstnameError, setFirstnameError] = useState(false)
  const [lastnameError, setLastnameError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [phoneError, setPhoneError] = useState(false)
  const [birthdayError, setBirthdayError] = useState(false)
  const [birthplaceError, setBirthplaceError] = useState(false)
  const [countryError, setCountryError] = useState(false)
  const [stateError, setStateError] = useState(false)
  const [zipcodeError, setZipcodeError] = useState(false)
  const [addressError, setAddressError] = useState(false)
  const [roleError, setRoleError] = useState(false)
  const [genderError, setGenderError] = useState(false)
  const [statusError, setStatusError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [passwordConfirmError, setPasswordConfirmError] = useState(false)
  const [passwordMatchError, setPasswordMatchError] = useState(false)

  const [errorMessage, setErrorMessage] = useState('')

  const validateFormFields = (): boolean => {
    setFirstnameError(false)
    setLastnameError(false)
    setEmailError(false)
    setPhoneError(false)
    setBirthdayError(false)
    setBirthplaceError(false)
    setCountryError(false)
    setStateError(false)
    setZipcodeError(false)
    setAddressError(false)
    setRoleError(false)
    setGenderError(false)
    setStatusError(false)
    setPasswordError(false)
    setErrorMessage('')

    if (!isValueNull(createUserData.firstname)) {
      setErrorMessage('Please enter a valid first name')
      setFirstnameError(true)
      return false
    }

    if (!isValueNull(createUserData.lastname)) {
      setErrorMessage('Please enter a valid last name')
      setLastnameError(true)
      return false
    }

    if (!isEmailValid(createUserData.email)) {
      setErrorMessage('Please enter a valid email')
      setEmailError(true)
      return false
    }

    if (!isPhoneNumberValid(createUserData.phone)) {
      setErrorMessage('Please enter a valid phone number')
      setPhoneError(true)
      return false
    }

    if (!isValueNull(createUserData.birthday)) {
      setErrorMessage('Please enter a valid birthday')
      setBirthdayError(true)
      return false
    }

    if (!isValueNull(createUserData.birthplace)) {
      setErrorMessage('Please enter a valid birthplace')
      setBirthplaceError(true)
      return false
    }

    if (!isValueNull(createUserData.country)) {
      setErrorMessage('Please enter a valid country')
      setCountryError(true)
      return false
    }

    if (!isValueNull(createUserData.state)) {
      setErrorMessage('Please enter a valid state')
      setStateError(true)
      return false
    }

    if (!isZipcodeValid(createUserData.zipcode)) {
      setErrorMessage('Please enter a valid zipcode')
      setZipcodeError(true)
      return false
    }

    if (!isValueNull(createUserData.address)) {
      setErrorMessage('Please enter a valid address')
      setAddressError(true)
      return false
    }

    if (!isValueNull(createUserData.role)) {
      setErrorMessage('Please select user role')
      setRoleError(true)
      return false
    }

    if (!isValueNull(createUserData.gender)) {
      setErrorMessage('Please select user gender')
      setGenderError(true)
      return false
    }

    if (!isValueNull(createUserData.status)) {
      setErrorMessage('Please select user status')
      setStatusError(true)
      return false
    }

    if (!isPasswordValid(createUserData.password)) {
      setErrorMessage('Password must be at least 6 characters long')
      setPasswordError(true)
      return false
    }

    if (!isPasswordAndConfirmMatch(createUserData.password, passwordConfirm)) {
      setErrorMessage('Password confirm must be at least 6 characters long')
      setPasswordConfirmError(true)
      return false
    }
    if (!isPasswordValid(passwordConfirm)) {
      setErrorMessage('Password and confirm password do not match')
      setPasswordMatchError(true)
      return false
    }

    return true
  }

  const handleBirhdayChange = (date: Date[]) => {
    setCreateUserData({ ...createUserData, birthday: moment(date[0]).format('MM-DD-YYYY') })
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCreateUserData({ ...createUserData, [event.target.name]: event.target.value })
  }

  const handleCancel = () => {
    dispatch(closeModal('createUserModal'))
  }

  const handleConfirm = () => {
    const validationResult = validateFormFields()
    if (validationResult) {
      console.log('createUserData', createUserData)
    } else {
      toastError(errorMessage)
    }
    // dispatch(closeModal('createUserModal'))
  }

  useEffect(() => {
    toastError(errorMessage)
  }, [errorMessage])

  return (
    <InnerWrapper>
      <JustifyBetweenColumn height="100%">
        <ModalHeader>
          <JustifyCenterRow width="100%">
            <H1 margin="0" textAlign="center">
              Create User
            </H1>
          </JustifyCenterRow>
        </ModalHeader>

        <ModalBody>
          <JustifyBetweenColumn height="100%" padding="2rem 0">
            <JustifyBetweenRow width="100%">
              <ItemContainer margin="0 0.5rem 0 0">
                <InputWithIcon
                  children={<User size={16} />}
                  name="firstname"
                  placeholder="Enter first name..."
                  onChange={handleInputChange}
                  // onBlur={validateFormFields}
                  type="text"
                  labelText="First Name"
                  validationError={firstnameError}
                />
              </ItemContainer>

              <ItemContainer margin="0 0 0 0.5rem">
                <InputWithIcon
                  children={<User size={16} />}
                  name="lastname"
                  placeholder="Enter last name..."
                  onChange={handleInputChange}
                  // onBlur={validateFormFields}
                  type="text"
                  labelText="Last Name"
                  validationError={lastnameError}
                />
              </ItemContainer>
            </JustifyBetweenRow>

            <JustifyBetweenRow width="100%">
              <ItemContainer margin="0.5rem 0.5rem 0 0">
                <InputWithIcon
                  children={<User size={16} />}
                  name="email"
                  placeholder="Enter email address..."
                  onChange={handleInputChange}
                  // onBlur={validateFormFields}
                  type="email"
                  labelText="E-mail"
                  validationError={emailError}
                />
              </ItemContainer>

              <ItemContainer margin="0.5rem 0 0 0.5rem">
                <InputWithIcon
                  children={<User size={16} />}
                  name="phone"
                  placeholder="Enter phone number..."
                  onChange={handleInputChange}
                  // onBlur={validateFormFields}
                  type="tel"
                  labelText="Phone Number"
                  validationError={phoneError}
                />
              </ItemContainer>
            </JustifyBetweenRow>

            <JustifyBetweenRow width="100%">
              <ItemContainer margin="0.5rem 0.5rem 0 0">
                <DatePicker
                  labelText="Birthday"
                  validationError={birthdayError}
                  name={'birthday'}
                  onChange={handleBirhdayChange}
                />
              </ItemContainer>

              <ItemContainer margin="0.5rem 0 0 0.5rem">
                <InputWithIcon
                  children={<User size={16} />}
                  name="birthplace"
                  placeholder="Enter birth location..."
                  onChange={handleInputChange}
                  // onBlur={validateFormFields}
                  type="text"
                  labelText="Birth Location"
                  validationError={birthplaceError}
                />
              </ItemContainer>
            </JustifyBetweenRow>

            <JustifyBetweenRow width="100%">
              <ItemContainer margin="0.5rem 0.5rem 0 0">
                <InputWithIcon
                  children={<User size={16} />}
                  name="country"
                  placeholder="Enter country..."
                  onChange={handleInputChange}
                  // onBlur={validateFormFields}
                  type="text"
                  labelText="Country"
                  validationError={countryError}
                />
              </ItemContainer>

              <ItemContainer margin="0.5rem 0 0 0.5rem">
                <JustifyBetweenRow>
                  <ItemContainer margin="0 0.5rem 0 0 ">
                    <InputWithIcon
                      children={<User size={16} />}
                      name="state"
                      placeholder="Enter state..."
                      onChange={handleInputChange}
                      // onBlur={validateFormFields}
                      type="text"
                      labelText="State"
                      validationError={stateError}
                    />
                  </ItemContainer>
                  <ItemContainer margin="0 0 0 0.5rem" width="250px">
                    <InputWithIcon
                      children={<User size={16} />}
                      name="zipcode"
                      placeholder="Enter zip code..."
                      onChange={handleInputChange}
                      // onBlur={validateFormFields}
                      type="text"
                      labelText="Zip Code"
                      validationError={zipcodeError}
                    />
                  </ItemContainer>
                </JustifyBetweenRow>
              </ItemContainer>
            </JustifyBetweenRow>

            <JustifyBetweenRow width="100%">
              <ItemContainer margin="0.5rem 0.5rem 0 0 ">
                <InputWithIcon
                  children={<User size={16} />}
                  name="address"
                  placeholder="Enter your address..."
                  onChange={handleInputChange}
                  // onBlur={validateFormFields}
                  type="text"
                  labelText="Address"
                  validationError={addressError}
                />
              </ItemContainer>

              <ItemContainer margin="0.5rem 0 0 0.5rem ">
                <SelectInput
                  children={<User size={16} />}
                  name="gender"
                  // placeholder="Enter birth location..."
                  onChange={option => setCreateUserData({ ...createUserData, gender: option.value })}
                  options={genderOptions}
                  labelText="Gender"
                  validationError={genderError}
                />
              </ItemContainer>
            </JustifyBetweenRow>

            <JustifyBetweenRow width="100%">
              <ItemContainer margin="0.5rem 0.5rem 0 0">
                <SelectInput
                  children={<User size={16} />}
                  name="role"
                  // placeholder="Select your birthday..."
                  onChange={option => setCreateUserData({ ...createUserData, role: option.value })}
                  options={genderOptions}
                  labelText="Role"
                  validationError={roleError}
                />
              </ItemContainer>

              <ItemContainer margin="0.5rem 0 0 0.5rem">
                <SelectInput
                  children={<User size={16} />}
                  name="status"
                  // placeholder="Enter birth location..."
                  onChange={option => setCreateUserData({ ...createUserData, status: option.value })}
                  options={statusOptions}
                  labelText="Status"
                  validationError={statusError}
                />
              </ItemContainer>
            </JustifyBetweenRow>

            <JustifyBetweenRow width="100%">
              <ItemContainer margin="0.5rem 0.5rem 0 0">
                <InputWithIcon
                  children={<Key size={16} />}
                  labelText="Password"
                  validationError={passwordError}
                  // onBlur={validateFormFields}
                  onChange={handleInputChange}
                  name="password"
                  placeholder="Password"
                  value={createUserData.password}
                  handleVisibility={togglePasswordVisibility}
                  isPasswordVisible={isPasswordVisible || passwordMatchError}
                  type={isPasswordVisible ? 'text' : 'password'}
                />
              </ItemContainer>

              <ItemContainer margin="0.5rem 0 0 0.5rem">
                <InputWithIcon
                  name="passwordConfirm"
                  placeholder="Confirm your password..."
                  labelText="Confirm Password"
                  children={<Key size={16} />}
                  validationError={passwordConfirmError || passwordMatchError}
                  // onBlur={validateFormFields}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPasswordConfirm(e.target.value)}
                  value={passwordConfirm}
                  handleVisibility={togglePasswordConfirmVisibility}
                  isPasswordVisible={isPasswordConfirmVisible}
                  type={isPasswordConfirmVisible ? 'text' : 'password'}
                />
              </ItemContainer>
            </JustifyBetweenRow>
          </JustifyBetweenColumn>
        </ModalBody>

        <ModalFooter>
          <Row>
            <ConfirmCancelButtons onCancel={handleCancel} onConfirm={handleConfirm} />
          </Row>
        </ModalFooter>
      </JustifyBetweenColumn>
    </InnerWrapper>
  )
}

export default CreateUserModal
