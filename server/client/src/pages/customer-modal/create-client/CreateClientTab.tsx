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
import ClientAddNewContactsStep from './ClientAddNewContactsStep'
import ClientExtraInformationsStep from './ClientExtraInformationsStep'
import ClientInformationsStep from './ClientInformationsStep'
import ClientSearchInCompanyStep from './ClientSearchInCompanyStep'
import { IClientCreateDTO, IOption } from '@/models'
import { toastError } from '@/utils/toastUtil'
import { isValueNull, isEmailValid, isPhoneNumberValid, isZipcodeValid } from '@/utils/validationUtils'
import moment from 'moment'

const CreateClientTab = () => {
  const [activeWizzardStep, setActiveWizzardStep] = useState(0)
  const [clientWizzardSteps, setClientWizzardSteps] = useState([
    { stepName: 'Client Informations', stepIndex: 0 },
    { stepName: 'Client Extra Informations', stepIndex: 1 },
    { stepName: 'Search Reliable Company', stepIndex: 2 },
    { stepName: 'Add New Contacts', stepIndex: 3 }
  ])

  const [createClientDTO, setCreateClientDTO] = useState<Omit<IClientCreateDTO, '_id'>>({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    birthday: '',
    birthplace: '',
    country: '',
    city: '',
    state: '',
    zipcode: '',
    address: '',
    aSharpNumber: '',
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
    countryError: false,
    cityError: false,
    stateError: false,
    zipcodeError: false,
    addressError: false,
    aSharpNumberError: false,
    refferTypeError: false,
    genderError: false
  })

  const [errorMessage, setErrorMessage] = useState('')

  const validateFormFields = (): boolean => {
    setErrorMessage('')

    if (!isValueNull(createClientDTO.firstname)) {
      setErrorMessage('Please enter a valid first name')
      setValidationErrors({ ...validationErrors, firstnameError: true })
      setActiveWizzardStep(0)
      return false
    } else {
      setValidationErrors({ ...validationErrors, firstnameError: false })
    }

    if (!isValueNull(createClientDTO.lastname)) {
      setErrorMessage('Please enter a valid last name')
      setValidationErrors({ ...validationErrors, lastnameError: true })
      setActiveWizzardStep(0)
      return false
    } else {
      setValidationErrors({ ...validationErrors, lastnameError: false })
    }

    if (!isEmailValid(createClientDTO.email)) {
      setErrorMessage('Please enter a valid email')
      setValidationErrors({ ...validationErrors, emailError: true })
      setActiveWizzardStep(0)
      return false
    } else {
      setValidationErrors({ ...validationErrors, emailError: false })
    }

    if (!isPhoneNumberValid(createClientDTO.phone)) {
      setErrorMessage('Please enter a valid phone number')
      setValidationErrors({ ...validationErrors, phoneError: true })
      setActiveWizzardStep(0)
      return false
    } else {
      setValidationErrors({ ...validationErrors, phoneError: false })
    }

    if (!isValueNull(createClientDTO.birthday)) {
      setErrorMessage('Please enter a valid birthday')
      setValidationErrors({ ...validationErrors, birthdayError: true })
      setActiveWizzardStep(0)
      return false
    } else {
      setValidationErrors({ ...validationErrors, birthdayError: false })
    }

    if (!isValueNull(createClientDTO.birthplace)) {
      setErrorMessage('Please enter a valid birthplace')
      setValidationErrors({ ...validationErrors, birthplaceError: true })
      setActiveWizzardStep(0)
      return false
    } else {
      setValidationErrors({ ...validationErrors, birthplaceError: false })
    }

    if (!isValueNull(createClientDTO.country)) {
      setErrorMessage('Please enter a valid country')
      setValidationErrors({ ...validationErrors, countryError: true })
      setActiveWizzardStep(1)
      return false
    } else {
      setValidationErrors({ ...validationErrors, countryError: false })
    }

    if (!isValueNull(createClientDTO.city)) {
      setErrorMessage('Please enter a valid city')
      setValidationErrors({ ...validationErrors, cityError: true })
      setActiveWizzardStep(1)
      return false
    } else {
      setValidationErrors({ ...validationErrors, cityError: false })
    }

    if (!isValueNull(createClientDTO.state)) {
      setErrorMessage('Please enter a valid state')
      setValidationErrors({ ...validationErrors, stateError: true })
      setActiveWizzardStep(1)
      return false
    } else {
      setValidationErrors({ ...validationErrors, stateError: false })
    }

    if (!isZipcodeValid(createClientDTO.zipcode)) {
      setErrorMessage('Please enter a valid zipcode')
      setValidationErrors({ ...validationErrors, zipcodeError: true })
      setActiveWizzardStep(1)
      return false
    } else {
      setValidationErrors({ ...validationErrors, zipcodeError: false })
    }

    if (!isValueNull(createClientDTO.address)) {
      setErrorMessage('Please enter a valid address')
      setValidationErrors({ ...validationErrors, addressError: true })
      setActiveWizzardStep(1)
      return false
    } else {
      setValidationErrors({ ...validationErrors, addressError: false })
    }

    if (!isValueNull(createClientDTO.aSharpNumber)) {
      setErrorMessage('Please enter a valid A# Number')
      setValidationErrors({ ...validationErrors, aSharpNumberError: true })
      setActiveWizzardStep(1)
      return false
    } else {
      setValidationErrors({ ...validationErrors, aSharpNumberError: false })
    }

    if (!isValueNull(createClientDTO.refferType)) {
      setErrorMessage('Please select user refferType')
      setValidationErrors({ ...validationErrors, refferTypeError: true })
      setActiveWizzardStep(1)
      return false
    } else {
      setValidationErrors({ ...validationErrors, refferTypeError: false })
    }

    if (!isValueNull(createClientDTO.gender)) {
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
    setCreateClientDTO({ ...createClientDTO, [event.target.name]: event.target.value })
  }

  const handleBirhdayChange = (date: Date[]) => {
    setCreateClientDTO({ ...createClientDTO, birthday: moment(date[0]).format('MM-DD-YYYY') })
  }

  const handleGenderChange = (option: IOption) => {
    setCreateClientDTO({ ...createClientDTO, gender: option.value })
  }

  const handleRefferTypeChange = (option: IOption) => {
    setCreateClientDTO({ ...createClientDTO, refferType: option.value })
  }

  useEffect(() => {
    toastError(errorMessage)
  }, [errorMessage])

  const renderSwitch = () => {
    switch (activeWizzardStep) {
      case 0:
        return (
          <ClientInformationsStep
            validationErrors={validationErrors}
            createClientDTO={createClientDTO}
            onInputChange={handleInputChange}
            onBirthdayChange={handleBirhdayChange}
            onGenderChange={handleGenderChange}
            onRefferTypeChange={handleRefferTypeChange}
          />
        )
      case 1:
        return (
          <ClientExtraInformationsStep
            validationErrors={validationErrors}
            createClientDTO={createClientDTO}
            onInputChange={handleInputChange}
          />
        )
      case 2:
        return <ClientSearchInCompanyStep />
      case 3:
        return <ClientAddNewContactsStep />
      default:
        return (
          <ClientInformationsStep
            validationErrors={validationErrors}
            createClientDTO={createClientDTO}
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
      console.log(createClientDTO)
    }
  }

  return (
    <Row height="100%">
      <ItemContainer borderRadius="0.3rem" height="100%" overflow="hidden" width="200px">
        <Column height="100%">
          <WizzardNavigation
            onStepChange={setActiveWizzardStep}
            steps={clientWizzardSteps}
            activeStep={activeWizzardStep}
          />
        </Column>
      </ItemContainer>
      <JustifyBetweenColumn width="calc(100% - 200px )" height="100%">
        <ItemContainer>{renderSwitch()}</ItemContainer>

        <ItemContainer width="100%">
          <InnerWrapper>
            <WizzardButtons
              actionNext={handleNext}
              actionPrevious={handlePrevious}
              actionSubmit={handleSubmit}
              steps={clientWizzardSteps}
              activeStep={activeWizzardStep}
            />
          </InnerWrapper>
        </ItemContainer>
      </JustifyBetweenColumn>
    </Row>
  )
}

export default CreateClientTab
