import {
  InnerWrapper,
  JustifyBetweenColumn,
  JustifyBetweenRow,
  ItemContainer,
  InputWithIcon,
  DatePicker,
  Row,
  SelectInput,
  UserBadge,
  Button
} from '@/components'
import colors from '@/constants/colors'
import { genderOptions } from '@/constants/genders'
import { EGender, ICustomerAddNew, IOption, IRefferedBy } from '@/models'
import { useGetRefferedBysQuery } from '@/services/settings/company-planning/dynamicVariableService'
import { toastError } from '@/utils/toastUtil'
import { isValueNull, isEmailValid, isPhoneNumberValid } from '@/utils/validationUtils'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { User } from 'react-feather'

interface IProps {
  newContactList: ICustomerAddNew[]
  onAdd: (contact: ICustomerAddNew) => void
}
const ClientAddNewContactsStep: React.FC<IProps> = ({ newContactList, onAdd }) => {
  const { data: refferedByData, isLoading: refferedByDataIsLoading } = useGetRefferedBysQuery()

  const [newContact, setNewContact] = useState<ICustomerAddNew>({
    customerType: 0,
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    refferedBy: '',
    gender: 0
  })

  const [validationErrors, setValidationErrors] = useState({
    firstnameError: false,
    lastnameError: false,
    emailError: false,
    phoneError: false,
    refferedByError: false,
    genderError: false
  })

  const [errorMessage, setErrorMessage] = useState('')

  const validateFormFields = (): boolean => {
    setErrorMessage('')

    if (!isValueNull(newContact.firstname)) {
      setErrorMessage('Please enter a valid first name')
      setValidationErrors({ ...validationErrors, firstnameError: true })
      return false
    } else {
      setValidationErrors({ ...validationErrors, firstnameError: false })
    }

    if (!isValueNull(newContact.lastname)) {
      setErrorMessage('Please enter a valid last name')
      setValidationErrors({ ...validationErrors, lastnameError: true })
      return false
    } else {
      setValidationErrors({ ...validationErrors, lastnameError: false })
    }

    if (!isEmailValid(newContact.email)) {
      setErrorMessage('Please enter a valid email')
      setValidationErrors({ ...validationErrors, emailError: true })
      return false
    } else {
      setValidationErrors({ ...validationErrors, emailError: false })
    }

    if (!isValueNull(newContact.phone)) {
      setErrorMessage('Please enter a valid phone number')
      setValidationErrors({ ...validationErrors, phoneError: true })
      return false
    } else {
      setValidationErrors({ ...validationErrors, phoneError: false })
    }

    if (!isValueNull(newContact.refferedBy)) {
      setErrorMessage('Please select user refferedBy')
      setValidationErrors({ ...validationErrors, refferedByError: true })
      return false
    } else {
      setValidationErrors({ ...validationErrors, refferedByError: false })
    }

    if (!isValueNull(newContact.gender.toString())) {
      setErrorMessage('Please select user gender')
      setValidationErrors({ ...validationErrors, genderError: true })
      return false
    } else {
      setValidationErrors({ ...validationErrors, genderError: false })
    }

    return true
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewContact({ ...newContact, [event.target.name]: event.target.value })
  }

  const handleGenderChange = (option: IOption) => {
    setNewContact({ ...newContact, gender: +option.value })
  }

  const handleRefferTypeChange = (option: IOption) => {
    setNewContact({ ...newContact, refferedBy: option.value })
  }

  const handleOnAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    const validationResult = validateFormFields()
    if (validationResult) {
      onAdd(newContact)
      setNewContact({
        customerType: 0,
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        refferedBy: '',
        gender: 0
      })
    }
  }

  useEffect(() => {
    toastError(errorMessage)
  }, [errorMessage])

  return (
    <InnerWrapper>
      <ItemContainer height="40px">
        <Button onClick={handleOnAdd} color={colors.blue.primary}>
          Add
        </Button>
      </ItemContainer>

      <ItemContainer height="calc(100% - 40px -  40px - 2rem )" margin="1rem 0">
        <JustifyBetweenColumn height="auto">
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
                  labelText="Contact First Name"
                  validationError={validationErrors.firstnameError}
                  value={newContact.firstname}
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
                  labelText="Contact Last Name"
                  validationError={validationErrors.lastnameError}
                  value={newContact.lastname}
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
                  labelText="Contact E-mail"
                  validationError={validationErrors.emailError}
                  value={newContact.email}
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
                  labelText="Contact Phone Number"
                  validationError={validationErrors.phoneError}
                  value={newContact.phone}
                />
              </ItemContainer>
            </JustifyBetweenRow>

            <JustifyBetweenRow width="100%">
              <ItemContainer margin="0.5rem 0.5rem 0 0 ">
                <SelectInput
                  children={<User size={16} />}
                  name="refferedBy"
                  // placeholder="Enter birth location..."
                  onChange={(option: IOption) => handleRefferTypeChange(option)}
                  options={(refferedByData || []).map((refferedBy: IRefferedBy) => ({
                    label: refferedBy.name,
                    value: refferedBy._id
                  }))}
                  isLoading={refferedByDataIsLoading}
                  labelText="Reffered By"
                  validationError={validationErrors.refferedByError}
                  selectedOption={[{ value: newContact.refferedBy, label: newContact.refferedBy }]}
                />
              </ItemContainer>

              <ItemContainer margin="0.5rem 0 0 0.5rem ">
                <SelectInput
                  children={<User size={16} />}
                  name="gender"
                  // placeholder="Enter birth location..."
                  onChange={(option: IOption) => handleGenderChange(option)}
                  options={genderOptions}
                  labelText="Contact Gender"
                  validationError={validationErrors.genderError}
                  selectedOption={[
                    { value: newContact.gender.toString(), label: EGender[newContact.gender.toString()] }
                  ]}
                />
              </ItemContainer>
            </JustifyBetweenRow>
          </JustifyBetweenColumn>
        </JustifyBetweenColumn>
      </ItemContainer>

      <ItemContainer height="40px">
        <Row>
          {newContactList.map((contact, index) => (
            <UserBadge
              key={index}
              userName={contact.firstname + ' ' + contact.lastname}
              userEmail={contact.relativeType?.relateTo || ''}
              userImage={'test'} // TODO: Client side image
            />
          ))}
        </Row>
      </ItemContainer>
    </InnerWrapper>
  )
}

export default ClientAddNewContactsStep
