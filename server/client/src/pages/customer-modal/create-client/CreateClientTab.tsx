import React, { useEffect, useState } from 'react'
import {
  Column,
  InnerWrapper,
  ItemContainer,
  JustifyBetweenColumn,
  RelateByModal,
  Row,
  WizzardButtons,
  WizzardNavigation
} from '@/components'
import ClientAddNewContactsStep from './ClientAddNewContactsStep'
import ClientExtraInformationsStep from './ClientExtraInformationsStep'
import ClientInformationsStep from './ClientInformationsStep'
import ClientSearchInCompanyStep from './ClientSearchInCompanyStep'
import { ESize, ICustomer, ICustomerAddNew, ICustomerCreateDTO, IOption, IRelativeType } from '@/models'
import { toastError, toastWarning } from '@/utils/toastUtil'
import { isValueNull, isEmailValid } from '@/utils/validationUtils'
import moment from 'moment'
import { useCreateCustomerMutation } from '@/services/customers/customerService'
import useAccessStore from '@/hooks/useAccessStore'
import { closeModal, openModal } from '@/store'

const CreateClientTab = () => {
  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()
  const [createCustomer] = useCreateCustomerMutation()
  const [activeWizzardStep, setActiveWizzardStep] = useState(0)
  const [clientWizzardSteps, setClientWizzardSteps] = useState([
    { stepName: 'Client Informations', stepIndex: 0 },
    { stepName: 'Detailed Informations', stepIndex: 1 },
    { stepName: 'Search Relative', stepIndex: 2 },
    { stepName: 'Add New Contacts', stepIndex: 3 }
  ])

  const [birthday, setBirthday] = useState('')
  const [createClientDTO, setCreateClientDTO] = useState<Omit<ICustomerCreateDTO, '_id' | 'birthday'>>({
    customerType: 0,
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    birthplace: '',
    country: '',
    city: '',
    state: '',
    zipcode: '',
    address: '',
    aSharpNumber: '',
    refferedBy: '',
    gender: 0,
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
    refferedByError: false,
    genderError: false
  })

  const [errorMessage, setErrorMessage] = useState('')

  const renderSwitch = () => {
    switch (activeWizzardStep) {
      case 0:
        return (
          <ClientInformationsStep
            validationErrors={validationErrors}
            createClientDTO={{ ...createClientDTO, birthday }}
            onInputChange={handleInputChange}
            onGenderChange={handleGenderChange}
            onRefferTypeChange={handleRefferTypeChange}
          />
        )
      case 1:
        return (
          <ClientExtraInformationsStep
            onBirthdayChange={handleBirhdayChange}
            validationErrors={validationErrors}
            createClientDTO={{ ...createClientDTO, birthday }}
            onInputChange={handleInputChange}
          />
        )
      case 2:
        return (
          <ClientSearchInCompanyStep
            reliableInCompanyList={createClientDTO.reliableInCompany || []}
            onAdd={handleAddReliable}
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
            createClientDTO={{ ...createClientDTO, birthday }}
            onInputChange={handleInputChange}
            onGenderChange={handleGenderChange}
            onRefferTypeChange={handleRefferTypeChange}
          />
        )
    }
  }

  const validateFormFields = (): boolean => {
    if (!isValueNull(createClientDTO.firstname)) {
      setErrorMessage('Please enter a valid first name')
      setValidationErrors({ ...validationErrors, firstnameError: true })
      setActiveWizzardStep(0)
      return false
    }

    if (!isValueNull(createClientDTO.lastname)) {
      setErrorMessage('Please enter a valid last name')
      setValidationErrors({ ...validationErrors, lastnameError: true })

      setActiveWizzardStep(0)
      return false
    }

    if (!isEmailValid(createClientDTO.email)) {
      setErrorMessage('Please enter a valid email')
      setValidationErrors({ ...validationErrors, emailError: true })

      setActiveWizzardStep(0)
      return false
    }

    if (!isValueNull(createClientDTO.phone)) {
      setErrorMessage('Please enter a valid phone number')
      setValidationErrors({ ...validationErrors, phoneError: true })
      setActiveWizzardStep(0)
      return false
    }

    if (!isValueNull(birthday)) {
      setErrorMessage('Please enter a valid birthday')
      setValidationErrors({ ...validationErrors, birthdayError: true })
      setActiveWizzardStep(1)
      return false
    }

    if (!isValueNull(createClientDTO.birthplace)) {
      setErrorMessage('Please enter a valid birthplace')
      setValidationErrors({ ...validationErrors, birthplaceError: true })

      setActiveWizzardStep(1)
      return false
    }

    if (!isValueNull(createClientDTO.country)) {
      setErrorMessage('Please enter a valid country')
      setValidationErrors({ ...validationErrors, countryError: true })

      setActiveWizzardStep(1)
      return false
    }

    if (!isValueNull(createClientDTO.city)) {
      setErrorMessage('Please enter a valid city')
      setValidationErrors({ ...validationErrors, cityError: true })

      setActiveWizzardStep(1)
      return false
    }

    if (!isValueNull(createClientDTO.state)) {
      setErrorMessage('Please enter a valid state')
      setValidationErrors({ ...validationErrors, stateError: true })

      setActiveWizzardStep(1)
      return false
    }

    if (!isValueNull(createClientDTO.zipcode)) {
      setErrorMessage('Please enter a valid zipcode')
      setValidationErrors({ ...validationErrors, zipcodeError: true })

      setActiveWizzardStep(1)
      return false
    }

    if (!isValueNull(createClientDTO.address)) {
      setErrorMessage('Please enter a valid address')
      setValidationErrors({ ...validationErrors, addressError: true })

      setActiveWizzardStep(1)
      return false
    }

    if (!isValueNull(createClientDTO.aSharpNumber)) {
      setErrorMessage('Please enter a valid A# Number')
      setValidationErrors({ ...validationErrors, aSharpNumberError: true })

      setActiveWizzardStep(1)
      return false
    }

    if (!isValueNull(createClientDTO.refferedBy)) {
      setErrorMessage('Please select user refferedBy')
      setValidationErrors({ ...validationErrors, refferedByError: true })
      setActiveWizzardStep(1)
      return false
    }

    if (!isValueNull(createClientDTO.gender.toString())) {
      setErrorMessage('Please select user gender')
      setValidationErrors({ ...validationErrors, genderError: true })

      setActiveWizzardStep(1)
      return false
    }
    // client job ekle  kutu a??t??r sor
    return true
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCreateClientDTO({ ...createClientDTO, [event.target.name]: event.target.value })
  }

  const handleBirhdayChange = (date: Date[]) => {
    setBirthday(moment(date[0]).format('MM-DD-YYYY'))
  }

  const handleGenderChange = (option: IOption) => {
    console.log(option)
    setCreateClientDTO({ ...createClientDTO, gender: +option.value })
  }

  const handleRefferTypeChange = (option: IOption) => {
    setCreateClientDTO({ ...createClientDTO, refferedBy: option.value })
  }

  const handleAddReliable = (customer: ICustomer) => {
    if (createClientDTO.reliableInCompany) {
      const isSelectedBefore = createClientDTO.reliableInCompany.find(reliable => reliable._id === customer._id)
      if (isSelectedBefore) {
        toastWarning('Client is already selected')
      } else {
        dispatch(
          openModal({
            id: `addRelateByModal-${customer._id}`,
            title: `Are you sure to inactivate ${customer.firstname}?`,
            body: (
              <RelateByModal
                modalId={`addRelateByModal-${customer._id}`}
                title={`Choose relate by for ${customer.firstname} ${customer.lastname} ?`}
                onConfirm={relativeType => handleConfirmAddReliable(customer, relativeType)}
              />
            ),
            size: ESize.Medium
          })
        )
      }
    }
  }

  const handleRemoveClient = (customer: ICustomer) => {
    if (createClientDTO.reliableInCompany) {
      setCreateClientDTO({
        ...createClientDTO,
        reliableInCompany: createClientDTO.reliableInCompany?.filter(reliable => reliable._id !== customer._id)
      })
    }
  }

  const handleAddNewContact = (customer: ICustomerAddNew) => {
    if (createClientDTO.createContact) {
      dispatch(
        openModal({
          id: `addRelateByModal-${customer.email}`,
          title: `Are you sure to inactivate ${customer.firstname}?`,
          body: (
            <RelateByModal
              modalId={`addRelateByModal-${customer.email}`}
              title={`Choose relate by for ${customer.firstname} ${customer.lastname} ?`}
              onConfirm={relativeType => handleConfirmAddContact(customer, relativeType)}
            />
          ),
          size: ESize.XLarge
        })
      )
    }
  }

  const handleConfirmAddReliable = (customer: ICustomer, relativeType?: IRelativeType) => {
    setCreateClientDTO({
      ...createClientDTO,
      reliableInCompany: createClientDTO.reliableInCompany?.concat({ ...customer, relativeType: relativeType })
    })
    dispatch(closeModal(`addRelateByModal-${customer._id}`))
  }

  const handleConfirmAddContact = (customer: ICustomerAddNew, relativeType?: IRelativeType) => {
    setCreateClientDTO({
      ...createClientDTO,
      createContact: createClientDTO.createContact?.concat({ ...customer, relativeType: relativeType })
    })
    dispatch(closeModal(`addRelateByModal-${customer.email}`))
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
      refferedByError: false,
      genderError: false
    })
    setErrorMessage('')
    const validationResult = validateFormFields()

    if (validationResult) {
      setActiveWizzardStep(activeWizzardStep + 1)
    }
  }

  const handlePrevious = () => {
    setActiveWizzardStep(activeWizzardStep - 1)
  }

  const handleSubmit = async () => {
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
      refferedByError: false,
      genderError: false
    })
    setErrorMessage('')
    const validationResult = validateFormFields()
    try {
      if (validationResult) {
        await createCustomer({ ...createClientDTO, birthday })
        dispatch(closeModal('createCustomerModal'))
      }
    } catch (error) {
      toastError('error.message')
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
      <JustifyBetweenColumn width="calc(100% - 200px)" height="100%">
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
