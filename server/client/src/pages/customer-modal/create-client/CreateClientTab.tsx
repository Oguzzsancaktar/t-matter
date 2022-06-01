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
import { IClientCreateDTO, IContact, IContactCreateDTO, IOption } from '@/models'
import { toastError, toastWarning } from '@/utils/toastUtil'
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
    if (!isValueNull(createClientDTO.firstname)) {
      setErrorMessage('Please enter a valid first name')
      console.log('firstname is  suanda true')
      setValidationErrors({ ...validationErrors, firstnameError: true })
      setActiveWizzardStep(0)
      return false
    }

    if (!isValueNull(createClientDTO.lastname)) {
      setErrorMessage('Please enter a valid last name')

      setActiveWizzardStep(0)
      return false
    }

    if (!isEmailValid(createClientDTO.email)) {
      setErrorMessage('Please enter a valid email')

      setActiveWizzardStep(0)
      return false
    }

    if (!isPhoneNumberValid(createClientDTO.phone)) {
      setErrorMessage('Please enter a valid phone number')

      setActiveWizzardStep(0)
      return false
    }

    if (!isValueNull(createClientDTO.birthday)) {
      setErrorMessage('Please enter a valid birthday')

      setActiveWizzardStep(0)
      return false
    }

    if (!isValueNull(createClientDTO.birthplace)) {
      setErrorMessage('Please enter a valid birthplace')

      setActiveWizzardStep(0)
      return false
    }

    if (!isValueNull(createClientDTO.country)) {
      setErrorMessage('Please enter a valid country')

      setActiveWizzardStep(1)
      return false
    }

    if (!isValueNull(createClientDTO.city)) {
      setErrorMessage('Please enter a valid city')

      setActiveWizzardStep(1)
      return false
    }

    if (!isValueNull(createClientDTO.state)) {
      setErrorMessage('Please enter a valid state')

      setActiveWizzardStep(1)
      return false
    }

    if (!isZipcodeValid(createClientDTO.zipcode)) {
      setErrorMessage('Please enter a valid zipcode')

      setActiveWizzardStep(1)
      return false
    }

    if (!isValueNull(createClientDTO.address)) {
      setErrorMessage('Please enter a valid address')

      setActiveWizzardStep(1)
      return false
    }

    if (!isValueNull(createClientDTO.aSharpNumber)) {
      setErrorMessage('Please enter a valid A# Number')

      setActiveWizzardStep(1)
      return false
    }

    if (!isValueNull(createClientDTO.refferType)) {
      setErrorMessage('Please select user refferType')

      setActiveWizzardStep(1)
      return false
    }

    if (!isValueNull(createClientDTO.gender)) {
      setErrorMessage('Please select user gender')

      setActiveWizzardStep(1)
      return false
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

  const handleAddClient = (id: string) => {
    if (createClientDTO.reliableInCompany) {
      const isSelectedBefore = createClientDTO.reliableInCompany.find(reliableId => reliableId === id)
      if (isSelectedBefore) {
        toastWarning('Client is already selected')
      } else {
        setCreateClientDTO({ ...createClientDTO, reliableInCompany: createClientDTO.reliableInCompany?.concat(id) })
      }
    }
  }

  const handleRemoveClient = (id: string) => {
    if (createClientDTO.reliableInCompany) {
      setCreateClientDTO({
        ...createClientDTO,
        reliableInCompany: createClientDTO.reliableInCompany?.filter(reliableId => reliableId !== id)
      })
    }
  }

  const handleAddNewContact = (contact: IContactCreateDTO) => {
    if (createClientDTO.createContact) {
      setCreateClientDTO({ ...createClientDTO, createContact: createClientDTO.createContact?.concat(contact) })
    }
  }

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
        return (
          <ClientSearchInCompanyStep
            reliableInCompanyList={createClientDTO.reliableInCompany || []}
            onAdd={handleAddClient}
            onRemove={handleRemoveClient}
          />
        )
      case 3:
        return (
          <ClientAddNewContactsStep newContactList={createClientDTO.createContact || []} onAdd={handleAddNewContact} />
        )
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
    setValidationErrors({
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
    setErrorMessage('')
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
    setValidationErrors({
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
    setErrorMessage('')
    const validationResult = validateFormFields()
    if (validationResult) {
      console.log(createClientDTO)
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
            steps={clientWizzardSteps}
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
