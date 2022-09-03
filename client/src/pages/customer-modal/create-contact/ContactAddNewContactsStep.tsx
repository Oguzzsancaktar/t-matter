import {
  JustifyBetweenColumn,
  JustifyBetweenRow,
  ItemContainer,
  InputWithIcon,
  Row,
  SelectInput,
  UserBadge,
  Button
} from '@/components'
import colors from '@/constants/colors'
import { genderOptions } from '@/constants/genders'
import emptyQueryParams from '@/constants/queryParams'
import { EGender, ICustomerAddNew, ICustomerCreateDTO, IJobTitle, IOption, IRefferedBy } from '@/models'
import {
  useGetJobTitlesQuery,
  useGetRefferedBysQuery
} from '@/services/settings/company-planning/dynamicVariableService'
import { isValueNull, isEmailValid } from '@/utils/validationUtils'
import React, { useEffect, useState } from 'react'
import { User, X } from 'react-feather'

interface IProps {
  newContactList: ICustomerCreateDTO[]
  onAdd: (contact: ICustomerAddNew) => void
  onRemove: (contact: ICustomerAddNew) => void
}
const ContactAddNewContactsStep: React.FC<IProps> = ({ newContactList, onAdd, onRemove }) => {
  const { data: refferedByData, isLoading: refferedByDataIsLoading } = useGetRefferedBysQuery(emptyQueryParams)
  const { data: jobTitleData, isLoading: jobTitleDataIsLoading } = useGetJobTitlesQuery(emptyQueryParams)

  const [newContact, setNewContact] = useState<ICustomerCreateDTO>({
    _id: '',
    customerType: 0,
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    jobTitle: {
      _id: '',
      name: ''
    },
    refferedBy: {
      _id: '',
      name: '',
      status: 0,
      color: '#f2f200'
    },
    gender: 0
  })

  const [validationErrors, setValidationErrors] = useState({
    firstnameError: false,
    lastnameError: false,
    emailError: false,
    phoneError: false,
    jobTitleError: false,
    refferedByError: false,
    genderError: false
  })

  const [errorMessage, toastError] = useState('')

  const validateFormFields = (): boolean => {
    const tempValidationErrors = {
      firstnameError: false,
      lastnameError: false,
      emailError: false,
      phoneError: false,
      jobTitleError: false,
      refferedByError: false,
      genderError: false
    }

    toastError('')

    if (!isValueNull(newContact.firstname)) {
      toastError('Please enter a valid first name')
      tempValidationErrors.firstnameError = true
      setValidationErrors(tempValidationErrors)
      return false
    }

    if (!isValueNull(newContact.lastname)) {
      toastError('Please enter a valid last name')
      tempValidationErrors.lastnameError = true
      setValidationErrors(tempValidationErrors)
      return false
    }

    if (!isEmailValid(newContact.email)) {
      toastError('Please enter a valid email')
      tempValidationErrors.emailError = true
      setValidationErrors(tempValidationErrors)
      return false
    }

    if (!isValueNull(newContact.jobTitle._id)) {
      toastError('Please enter a valid job title')
      tempValidationErrors.jobTitleError = true
      setValidationErrors(tempValidationErrors)
      return false
    }

    if (!isValueNull(newContact.phone)) {
      toastError('Please enter a valid phone number')
      tempValidationErrors.phoneError = true
      setValidationErrors(tempValidationErrors)
      return false
    }

    if (!isValueNull(newContact.refferedBy._id)) {
      toastError('Please select user refferedBy')
      tempValidationErrors.refferedByError = true
      setValidationErrors(tempValidationErrors)
      return false
    }

    if (!isValueNull(newContact.gender.toString())) {
      toastError('Please select user gender')
      tempValidationErrors.genderError = true
      setValidationErrors(tempValidationErrors)
      return false
    }
    setValidationErrors(tempValidationErrors)
    return true
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewContact({ ...newContact, [event.target.name]: event.target.value })
  }

  const handleGenderChange = (option: IOption) => {
    setNewContact({ ...newContact, gender: +option.value })
  }

  const handleRefferTypeChange = (option: IOption) => {
    const refBy = refferedByData?.find(rb => rb._id === option.value)
    if (refBy) {
      setNewContact({ ...newContact, refferedBy: refBy })
    }
  }

  const handleJobTitleChange = (option: IOption) => {
    const jobTitle = jobTitleData?.find(jt => jt._id === option.value)
    if (jobTitle) {
      setNewContact({ ...newContact, jobTitle: jobTitle })
    }
  }

  const handleOnAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    const validationResult = validateFormFields()
    if (validationResult) {
      onAdd(newContact)
      setNewContact({
        _id: '',
        customerType: 0,
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        jobTitle: {
          _id: '',
          name: ''
        },
        refferedBy: {
          _id: '',
          name: '',
          status: 0,
          color: '#f2f200'
        },
        gender: 0
      })
    }
  }

  useEffect(() => {
    toastError(errorMessage)
  }, [errorMessage])
  return (
    <JustifyBetweenColumn height="100%">
      <JustifyBetweenColumn height="calc(100% - 0.5rem - 0.5rem - 40px - 1rem)">
        <JustifyBetweenColumn height="100%">
          <JustifyBetweenRow width="100%">
            <ItemContainer margin="0 0.5rem 0 0">
              <InputWithIcon
                children={<User size={16} />}
                name="firstname"
                placeholder="Enter first name..."
                onChange={handleInputChange}
                type="text"
                labelText="Contact First Name"
                validationError={validationErrors.firstnameError}
                value={newContact.firstname}
              />
            </ItemContainer>

            <ItemContainer margin="0 0 0 0.5rem">
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
                selectedOption={[{ value: newContact.refferedBy._id, label: newContact.refferedBy.name }]}
              />
            </ItemContainer>
          </JustifyBetweenRow>

          <JustifyBetweenRow width="100%">
            <ItemContainer margin="0 0.5rem 0 0">
              <InputWithIcon
                children={<User size={16} />}
                name="lastname"
                placeholder="Enter last name..."
                onChange={handleInputChange}
                type="text"
                labelText="Contact Last Name"
                validationError={validationErrors.lastnameError}
                value={newContact.lastname}
              />
            </ItemContainer>
            <ItemContainer margin="0 0 0 0.5rem">
              <SelectInput
                children={<User size={16} />}
                name="gender"
                // placeholder="Enter birth location..."
                onChange={(option: IOption) => handleGenderChange(option)}
                options={genderOptions}
                labelText="Contact Gender"
                validationError={validationErrors.genderError}
                selectedOption={[{ value: newContact.gender.toString(), label: EGender[newContact.gender.toString()] }]}
              />
            </ItemContainer>
          </JustifyBetweenRow>

          <JustifyBetweenRow width="100%">
            <ItemContainer margin="0 0.5rem 0 0">
              <InputWithIcon
                children={<User size={16} />}
                name="phone"
                placeholder="Enter phone number..."
                onChange={handleInputChange}
                type="tel"
                labelText="Contact Phone Number"
                validationError={validationErrors.phoneError}
                value={newContact.phone}
              />
            </ItemContainer>

            <ItemContainer margin="0 0 0 0.5rem">
              <InputWithIcon
                children={<User size={16} />}
                name="email"
                placeholder="Enter email address..."
                onChange={handleInputChange}
                type="email"
                labelText="Contact E-mail"
                validationError={validationErrors.emailError}
                value={newContact.email}
              />
            </ItemContainer>
          </JustifyBetweenRow>

          <JustifyBetweenRow width="100%">
            <ItemContainer>
              <SelectInput
                children={<User size={16} />}
                name="jobTitle"
                onChange={(option: IOption) => handleJobTitleChange(option)}
                options={(jobTitleData || []).map((jobTitle: IJobTitle) => ({
                  label: jobTitle.name,
                  value: jobTitle._id
                }))}
                isLoading={jobTitleDataIsLoading}
                labelText="Contact Job Title"
                validationError={validationErrors.jobTitleError}
                selectedOption={[{ value: newContact.jobTitle._id, label: newContact.jobTitle.name }]}
              />
            </ItemContainer>
          </JustifyBetweenRow>
          <ItemContainer height="40px" margin="1rem 0">
            <Button onClick={handleOnAdd} color={colors.blue.primary}>
              Add
            </Button>
          </ItemContainer>
        </JustifyBetweenColumn>
      </JustifyBetweenColumn>

      <ItemContainer height="calc(40px + 1rem +  1rem)" overflow="auto">
        <Row margin="0.5rem 0">
          {newContactList.map((contact, index) => (
            <ItemContainer
              key={index}
              minWidth="300px"
              width="auto"
              margin="0 1rem 0 0"
              backgroundColor={colors.secondary.light}
              borderRadius="0.3rem"
              padding="0.5rem"
            >
              <JustifyBetweenRow>
                <ItemContainer margin="0 0.5rem 0 0" width="calc(100% - 0.5rem - 30px)">
                  <UserBadge
                    userEmail={contact.relativeType?.relateTo || ''}
                    userImage={'reliable.photo'}
                    userName={contact.firstname + ' ' + contact.lastname}
                  />
                </ItemContainer>
                <Button
                  color={colors.red.primary}
                  width="20px"
                  height="20px"
                  padding="0"
                  onClick={() => onRemove(contact)}
                >
                  <X size={16} />
                </Button>
              </JustifyBetweenRow>
            </ItemContainer>
          ))}
        </Row>
      </ItemContainer>
    </JustifyBetweenColumn>
  )
}

export default ContactAddNewContactsStep
