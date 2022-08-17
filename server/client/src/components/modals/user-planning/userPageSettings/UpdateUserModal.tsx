import React, { useEffect, useState } from 'react'
import { ConfirmCancelButtons } from '@/components/button'
import { InputWithIcon, SelectInput } from '@/components/input'
import { JustifyBetweenColumn, JustifyBetweenRow, JustifyCenterRow, Row } from '@/components/layout'
import { H1 } from '@/components/texts'
import useAccessStore from '@/hooks/useAccessStore'
import { closeModal } from '@/store'
import { DatePicker, InnerWrapper, ItemContainer } from '@/components'
import { ModalBody, ModalFooter, ModalHeader } from '../../types'
import { EGender, EStatus, IUser, IUserUpdateDTO } from '@/models'
import { User } from 'react-feather'
import { isEmailValid, isValueNull } from '@/utils/validationUtils'
import { toastError, toastSuccess } from '@/utils/toastUtil'
import { genderOptions } from '@/constants/genders'
import { statusOptions } from '@/constants/statuses'
import { useGetRolesQuery } from '@/services/settings/user-planning/userRoleService'
import { useUpdateUserMutation } from '@/services/settings/user-planning/userService'
import colors from '@/constants/colors'
import emptyQueryParams from '@/constants/queryParams'

interface IProps {
  user: IUser
}

const UpdateUserModal: React.FC<IProps> = ({ user }) => {
  const [searchQueryParams, setSearchQueryParams] = useState(emptyQueryParams)

  const [updateUser, { isLoading: isUserUpdateLoading }] = useUpdateUserMutation()
  const { data: roleData, isLoading: roleLoading, error: roleDataError } = useGetRolesQuery(searchQueryParams)

  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()
  console.log('user', user)

  const [birthDate, setBirthDate] = useState(user.birthday || '')
  const [updateUserData, setUpdateUserData] = useState<Omit<IUserUpdateDTO, 'password'>>({
    _id: user._id,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    phone: user.phone,
    birthday: user.birthday,
    birthplace: user.birthplace,
    country: user.country,
    city: user.city,
    state: user.state,
    zipcode: user.zipcode,
    address: user.address,
    role: {
      _id: user.role[0]?._id || user.role._id,
      name: user.role[0]?.name || user.role.name
    },
    gender: user.gender,
    status: user.status
  })

  const [firstnameError, setFirstnameError] = useState(false)
  const [lastnameError, setLastnameError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [phoneError, setPhoneError] = useState(false)
  const [birthdayError, setBirthdayError] = useState(false)
  const [birthplaceError, setBirthplaceError] = useState(false)
  const [countryError, setCountryError] = useState(false)
  const [cityError, setCityError] = useState(false)
  const [stateError, setStateError] = useState(false)
  const [zipcodeError, setZipcodeError] = useState(false)
  const [addressError, setAddressError] = useState(false)
  const [roleError, setRoleError] = useState(false)
  const [genderError, setGenderError] = useState(false)
  const [statusError, setStatusError] = useState(false)

  const [errorMessage, setErrorMessage] = useState('')

  const validateFormFields = (): boolean => {
    setFirstnameError(false)
    setLastnameError(false)
    setEmailError(false)
    setPhoneError(false)
    setBirthdayError(false)
    setBirthplaceError(false)
    setCountryError(false)
    setCityError(false)
    setStateError(false)
    setZipcodeError(false)
    setAddressError(false)
    setRoleError(false)
    setGenderError(false)
    setStatusError(false)
    setErrorMessage('')

    if (!isValueNull(updateUserData.firstname || '')) {
      setErrorMessage('Please enter a valid first name')
      setFirstnameError(true)
      return false
    }

    if (!isValueNull(updateUserData.lastname || '')) {
      setErrorMessage('Please enter a valid last name')
      setLastnameError(true)
      return false
    }

    if (!isEmailValid(updateUserData.email || '')) {
      setErrorMessage('Please enter a valid email')
      setEmailError(true)
      return false
    }

    if (!isValueNull(updateUserData.phone || '')) {
      setErrorMessage('Please enter a valid phone number')
      setPhoneError(true)
      return false
    }

    if (!isValueNull(birthDate || '')) {
      setErrorMessage('Please enter a valid birthday')
      setBirthdayError(true)
      return false
    }

    if (!isValueNull(updateUserData.birthplace || '')) {
      setErrorMessage('Please enter a valid birthplace')
      setBirthplaceError(true)
      return false
    }

    if (!isValueNull(updateUserData.country || '')) {
      setErrorMessage('Please enter a valid country')
      setCountryError(true)
      return false
    }

    if (!isValueNull(updateUserData.city || '')) {
      setErrorMessage('Please enter a valid city')
      setCityError(true)
      return false
    }

    if (!isValueNull(updateUserData.state || '')) {
      setErrorMessage('Please enter a valid state')
      setStateError(true)
      return false
    }

    if (!isValueNull(updateUserData.zipcode || '')) {
      setErrorMessage('Please enter a valid zipcode')
      setZipcodeError(true)
      return false
    }

    if (!isValueNull(updateUserData.address || '')) {
      setErrorMessage('Please enter a valid address')
      setAddressError(true)
      return false
    }

    if (!isValueNull(updateUserData.role._id || '')) {
      setErrorMessage('Please select user role')
      setRoleError(true)
      return false
    }

    if (!isValueNull(updateUserData.gender.toString() || '')) {
      setErrorMessage('Please select user gender')
      setGenderError(true)
      return false
    }

    if (!isValueNull(updateUserData.status.toString() || '')) {
      setErrorMessage('Please select user status')
      setStatusError(true)
      return false
    }

    return true
  }

  const handleBirhdayChange = (date: Date[], dateText) => {
    setBirthDate(dateText)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateUserData({ ...updateUserData, [event.target.name]: event.target.value })
  }

  const handleCancel = () => {
    dispatch(closeModal(`updateUserModal-${user._id}`))
  }

  const handleConfirm = async () => {
    const validationResult = validateFormFields()
    if (validationResult) {
      try {
        await updateUser({ ...updateUserData, _id: user._id, birthday: birthDate })
        dispatch(closeModal('createUserModal'))
        toastSuccess(`User ${user.firstname + ' ' + user.lastname} updated successfully`)
        dispatch(closeModal(`updateUserModal-${user._id}`))
      } catch (error) {
        console.log(error)
      }
    } else {
      toastError(errorMessage)
    }
  }

  useEffect(() => {
    toastError(errorMessage)
  }, [errorMessage])

  return (
    <JustifyBetweenColumn height="100%">
      <ModalHeader>
        <InnerWrapper>
          <JustifyCenterRow width="100%">
            <H1 margin="0" textAlign="center" fontWeight="700" color={colors.white.primary}>
              Update User ({user.firstname + ' ' + user.lastname})
            </H1>
          </JustifyCenterRow>
        </InnerWrapper>
      </ModalHeader>

      <ModalBody>
        <InnerWrapper>
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
                  value={updateUserData.firstname}
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
                  value={updateUserData.lastname}
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
                  value={updateUserData.email}
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
                  value={updateUserData.phone}
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
                  value={updateUserData.birthday}
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
                  value={updateUserData.birthplace}
                />
              </ItemContainer>
            </JustifyBetweenRow>

            <JustifyBetweenRow width="100%">
              <ItemContainer margin="0.5rem 0 0 0 ">
                <InputWithIcon
                  children={<User size={16} />}
                  name="address"
                  placeholder="Enter your address..."
                  onChange={handleInputChange}
                  // onBlur={validateFormFields}
                  type="text"
                  labelText="Address"
                  validationError={addressError}
                  value={updateUserData.address}
                />
              </ItemContainer>
            </JustifyBetweenRow>

            <JustifyBetweenRow width="100%">
              <ItemContainer margin="0.5rem 0 0 0">
                <JustifyBetweenRow>
                  <ItemContainer margin="0 0.5rem 0 0 ">
                    <InputWithIcon
                      children={<User size={16} />}
                      name="city"
                      placeholder="Enter city..."
                      onChange={handleInputChange}
                      // onBlur={validateFormFields}
                      type="text"
                      labelText="City"
                      validationError={cityError}
                      value={updateUserData.city}
                    />
                  </ItemContainer>
                </JustifyBetweenRow>
              </ItemContainer>

              <ItemContainer margin="0.5rem 0 0 0.5rem">
                <JustifyBetweenRow>
                  <ItemContainer margin="0 0.5rem 0 0 ">
                    <InputWithIcon
                      children={<User size={16} />}
                      name="country"
                      placeholder="Enter country..."
                      onChange={handleInputChange}
                      // onBlur={validateFormFields}
                      type="text"
                      labelText="Country"
                      validationError={countryError}
                      value={updateUserData.country}
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
                      value={updateUserData.zipcode}
                    />
                  </ItemContainer>
                </JustifyBetweenRow>
              </ItemContainer>
            </JustifyBetweenRow>

            <JustifyBetweenRow width="100%">
              <ItemContainer margin="0.5rem 0.5rem 0 0 ">
                <ItemContainer>
                  <InputWithIcon
                    children={<User size={16} />}
                    name="state"
                    placeholder="Enter state..."
                    onChange={handleInputChange}
                    // onBlur={validateFormFields}
                    type="text"
                    labelText="State"
                    validationError={stateError}
                    value={updateUserData.state}
                  />
                </ItemContainer>
              </ItemContainer>

              <ItemContainer margin="0.5rem 0 0 0.5rem ">
                <SelectInput
                  children={<User size={16} />}
                  name="gender"
                  // placeholder="Enter birth location..."
                  onChange={option => setUpdateUserData({ ...updateUserData, gender: option.value })}
                  selectedOption={[
                    { value: updateUserData.gender.toString(), label: EGender[updateUserData.gender.toString()] }
                  ]}
                  options={genderOptions}
                  labelText="Gender"
                  validationError={genderError}
                />
              </ItemContainer>
            </JustifyBetweenRow>

            <JustifyBetweenRow width="100%">
              <ItemContainer margin="0.5rem 0.5rem 0 0">
                <SelectInput
                  isLoading={roleLoading}
                  children={<User size={16} />}
                  name="role"
                  // placeholder="Select your birthday..."
                  onChange={option =>
                    setUpdateUserData({ ...updateUserData, role: { _id: option.value, name: option.label } })
                  }
                  options={(roleData || []).map(role => ({ value: role._id, label: role.name }))}
                  selectedOption={[{ label: updateUserData.role.name, value: updateUserData.role._id }]}
                  labelText="Role"
                  validationError={roleError}
                />
              </ItemContainer>

              <ItemContainer margin="0.5rem 0 0 0.5rem">
                <SelectInput
                  children={<User size={16} />}
                  name="status"
                  // placeholder="Enter birth location..."
                  onChange={option => setUpdateUserData({ ...updateUserData, status: option.value })}
                  selectedOption={[
                    {
                      value: updateUserData.status.toString(),
                      label: EStatus[updateUserData.status.toString()]
                    }
                  ]}
                  options={statusOptions}
                  labelText="Status"
                  validationError={statusError}
                />
              </ItemContainer>
            </JustifyBetweenRow>
          </JustifyBetweenColumn>
        </InnerWrapper>
      </ModalBody>

      <ModalFooter>
        <InnerWrapper>
          <Row>
            <ConfirmCancelButtons onCancel={handleCancel} onConfirm={handleConfirm} />
          </Row>
        </InnerWrapper>
      </ModalFooter>
    </JustifyBetweenColumn>
  )
}

export default UpdateUserModal
