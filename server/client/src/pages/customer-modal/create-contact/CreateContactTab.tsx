import React, { useEffect, useState } from 'react'
import {
  Column,
  InnerWrapper,
  ItemContainer,
  JustifyBetweenColumn,
  Row,
  WizzardButtons,
  WizzardNavigation
} from '@/components'
import ContactAddNewContactsStep from './ContactAddNewContactsStep'
import ContactInformationsStep from './ContactInformationsStep'
import ContactSearchInCompanyStep from './ContactSearchInCompanyStep'
import { IContactCreateDTO, IOption } from '@/models'
import { toastError, toastWarning } from '@/utils/toastUtil'
import { isValueNull, isEmailValid, isPhoneNumberValid, isZipcodeValid } from '@/utils/validationUtils'
import moment from 'moment'

const CreateContactTab = () => {
  const [activeWizzardStep, setActiveWizzardStep] = useState(0)
  const [contactWizzardSteps, setContactWizzardSteps] = useState([
    { stepName: 'Contact Informations', stepIndex: 0 },
    { stepName: 'Search Reliable Company', stepIndex: 1 },
    { stepName: 'Add New Contacts', stepIndex: 2 }
  ])

  const [createContactDTO, setCreateContactDTO] = useState<Omit<IContactCreateDTO, '_id'>>({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    birthday: '',
    birthplace: '',
    refferType: '',
    gender: '',
    reliableInCompany: [],
    createContact: []
  })

  const [validationErrors, setValidationErrors] = useState({
    firstnameError: false,
    lastnameError: false,
    emailError: false,
    phoneError: false,
    birthdayError: false,
    birthplaceError: false,
    refferTypeError: false,
    genderError: false
  })

  const [errorMessage, setErrorMessage] = useState('')

  const validateFormFields = (): boolean => {
    setErrorMessage('')

    if (!isValueNull(createContactDTO.firstname)) {
      setErrorMessage('Please enter a valid first name')
      setValidationErrors({ ...validationErrors, firstnameError: true })
      setActiveWizzardStep(0)
      return false
    } else {
      setValidationErrors({ ...validationErrors, firstnameError: false })
    }

    if (!isValueNull(createContactDTO.lastname)) {
      setErrorMessage('Please enter a valid last name')
      setValidationErrors({ ...validationErrors, lastnameError: true })
      setActiveWizzardStep(0)
      return false
    } else {
      setValidationErrors({ ...validationErrors, lastnameError: false })
    }

    if (!isEmailValid(createContactDTO.email)) {
      setErrorMessage('Please enter a valid email')
      setValidationErrors({ ...validationErrors, emailError: true })
      setActiveWizzardStep(0)
      return false
    } else {
      setValidationErrors({ ...validationErrors, emailError: false })
    }

    if (!isPhoneNumberValid(createContactDTO.phone)) {
      setErrorMessage('Please enter a valid phone number')
      setValidationErrors({ ...validationErrors, phoneError: true })
      setActiveWizzardStep(0)
      return false
    } else {
      setValidationErrors({ ...validationErrors, phoneError: false })
    }

    if (!isValueNull(createContactDTO.birthday)) {
      setErrorMessage('Please enter a valid birthday')
      setValidationErrors({ ...validationErrors, birthdayError: true })
      setActiveWizzardStep(0)
      return false
    } else {
      setValidationErrors({ ...validationErrors, birthdayError: false })
    }

    if (!isValueNull(createContactDTO.birthplace)) {
      setErrorMessage('Please enter a valid birthplace')
      setValidationErrors({ ...validationErrors, birthplaceError: true })
      setActiveWizzardStep(0)
      return false
    } else {
      setValidationErrors({ ...validationErrors, birthplaceError: false })
    }

    if (!isValueNull(createContactDTO.refferType)) {
      setErrorMessage('Please select user refferType')
      setValidationErrors({ ...validationErrors, refferTypeError: true })
      setActiveWizzardStep(1)
      return false
    } else {
      setValidationErrors({ ...validationErrors, refferTypeError: false })
    }

    if (!isValueNull(createContactDTO.gender)) {
      setErrorMessage('Please select user gender')
      setValidationErrors({ ...validationErrors, genderError: true })
      setActiveWizzardStep(1)
      return false
    } else {
      setValidationErrors({ ...validationErrors, genderError: false })
    }

    return true
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCreateContactDTO({ ...createContactDTO, [event.target.name]: event.target.value })
  }

  const handleBirhdayChange = (date: Date[]) => {
    setCreateContactDTO({ ...createContactDTO, birthday: moment(date[0]).format('MM-DD-YYYY') })
  }

  const handleGenderChange = (option: IOption) => {
    setCreateContactDTO({ ...createContactDTO, gender: option.value })
  }

  const handleRefferTypeChange = (option: IOption) => {
    setCreateContactDTO({ ...createContactDTO, refferType: option.value })
  }

  const handleAddContact = (id: string) => {
    if (createContactDTO.reliableInCompany) {
      const isSelectedBefore = createContactDTO.reliableInCompany.find(reliableId => reliableId === id)
      if (isSelectedBefore) {
        toastWarning('Contact is already selected')
      } else {
        setCreateContactDTO({ ...createContactDTO, reliableInCompany: createContactDTO.reliableInCompany?.concat(id) })
      }
    }
  }

  const handleRemoveContact = (id: string) => {
    if (createContactDTO.reliableInCompany) {
      setCreateContactDTO({
        ...createContactDTO,
        reliableInCompany: createContactDTO.reliableInCompany?.filter(reliableId => reliableId !== id)
      })
    }
  }

  const handleAddNewContact = (contact: IContactCreateDTO) => {
    if (createContactDTO.createContact) {
      setCreateContactDTO({ ...createContactDTO, createContact: createContactDTO.createContact?.concat(contact) })
    }
  }

  const renderSwitch = () => {
    switch (activeWizzardStep) {
      case 0:
        return (
          <ContactInformationsStep
            validationErrors={validationErrors}
            createContactDTO={createContactDTO}
            onInputChange={handleInputChange}
            onBirthdayChange={handleBirhdayChange}
            onGenderChange={handleGenderChange}
            onRefferTypeChange={handleRefferTypeChange}
          />
        )

      case 1:
        return (
          <ContactSearchInCompanyStep
            reliableInCompanyList={createContactDTO.reliableInCompany || []}
            onAdd={handleAddContact}
            onRemove={handleRemoveContact}
          />
        )
      case 2:
        return (
          <ContactAddNewContactsStep
            newContactList={createContactDTO.createContact || []}
            onAdd={handleAddNewContact}
          />
        )
      default:
        return (
          <ContactInformationsStep
            validationErrors={validationErrors}
            createContactDTO={createContactDTO}
            onInputChange={handleInputChange}
            onBirthdayChange={handleBirhdayChange}
            onGenderChange={handleGenderChange}
            onRefferTypeChange={handleRefferTypeChange}
          />
        )
    }
  }

  const handleNext = () => {
    const validationResult = validateFormFields()
    console.log(validationResult)
    if (validationResult) {
      console.log('qwer')
      setActiveWizzardStep(activeWizzardStep + 1)
    }
  }

  const handlePrevious = () => {
    setActiveWizzardStep(activeWizzardStep - 1)
  }

  const handleSubmit = () => {
    const validationResult = validateFormFields()
    if (validationResult) {
      console.log(createContactDTO)
    }
  }

  useEffect(() => {
    toastError(errorMessage)
  }, [errorMessage])

  return (
    <Row height="100%">
      <ItemContainer borderRadius="0.3rem" height="100%" overflow="hidden" width="200px">
        <Column height="100%">
          <WizzardNavigation
            onStepChange={setActiveWizzardStep}
            steps={contactWizzardSteps}
            activeStep={activeWizzardStep}
          />
        </Column>
      </ItemContainer>
      <JustifyBetweenColumn width="calc(100% - 200px )" height="100%">
        <ItemContainer height="calc(100% - 35px - 1rem)">{renderSwitch()}</ItemContainer>

        <ItemContainer width="100%" height="35px" margin="1rem 0 0 0 ">
          <InnerWrapper>
            <WizzardButtons
              actionNext={handleNext}
              actionPrevious={handlePrevious}
              actionSubmit={handleSubmit}
              steps={contactWizzardSteps}
              activeStep={activeWizzardStep}
            />
          </InnerWrapper>
        </ItemContainer>
      </JustifyBetweenColumn>
    </Row>
  )
}

export default CreateContactTab
