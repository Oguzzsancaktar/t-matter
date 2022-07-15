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
import { ICustomer, ICustomerAddNew, ICustomerCreateDTO, IOption } from '@/models'
import { toastError, toastSuccess, toastWarning } from '@/utils/toastUtil'
import { isValueNull, isEmailValid, isPhoneNumberValid } from '@/utils/validationUtils'
import moment from 'moment'
import { useCreateCustomerMutation } from '@/services/customers/customerService'
import useAccessStore from '@/hooks/useAccessStore'
import { closeModal } from '@/store'

const CreateContactTab = () => {
  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()
  const [createCustomer] = useCreateCustomerMutation()

  const [activeWizzardStep, setActiveWizzardStep] = useState(0)
  const [contactWizzardSteps, setContactWizzardSteps] = useState([
    { stepName: 'Contact Informations', stepIndex: 0 },
    { stepName: 'Search Relative', stepIndex: 1 },
    { stepName: 'Add New Contacts', stepIndex: 2 }
  ])

  const [createContactDTO, setCreateContactDTO] = useState<Omit<ICustomerCreateDTO, '_id' | 'birthday'>>({
    customerType: 1,
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

    if (!isValueNull(createContactDTO.firstname)) {
      setErrorMessage('Please enter a valid first name')
      setValidationErrors({ ...validationErrors, firstnameError: true })
      setActiveWizzardStep(0)
      return false
    }

    if (!isValueNull(createContactDTO.lastname)) {
      setErrorMessage('Please enter a valid last name')
      setValidationErrors({ ...validationErrors, lastnameError: true })
      setActiveWizzardStep(0)
      return false
    }

    if (!isEmailValid(createContactDTO.email)) {
      setErrorMessage('Please enter a valid email')
      setValidationErrors({ ...validationErrors, emailError: true })
      setActiveWizzardStep(0)
      return false
    }

    if (!isValueNull(createContactDTO.phone.toString())) {
      setErrorMessage('Please enter a valid phone number')
      setValidationErrors({ ...validationErrors, phoneError: true })
      setActiveWizzardStep(0)
      return false
    }

    if (!isValueNull(createContactDTO.refferedBy)) {
      setErrorMessage('Please select user refferedBy')
      setActiveWizzardStep(0)
      return false
    }

    if (!isValueNull(createContactDTO.gender.toString())) {
      setErrorMessage('Please select user gender')
      setActiveWizzardStep(0)
      return false
    }

    return true
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCreateContactDTO({ ...createContactDTO, [event.target.name]: event.target.value })
  }

  const handleGenderChange = (option: IOption) => {
    setCreateContactDTO({ ...createContactDTO, gender: +option.value })
  }

  const handleRefferTypeChange = (option: IOption) => {
    setCreateContactDTO({ ...createContactDTO, refferedBy: option.value })
  }

  const handleAddReliable = (customer: ICustomer) => {
    if (createContactDTO.reliableInCompany) {
      const isSelectedBefore = createContactDTO.reliableInCompany.find(reliable => reliable._id === customer._id)
      if (isSelectedBefore) {
        toastWarning('Contact is already selected')
      } else {
        setCreateContactDTO({
          ...createContactDTO,
          reliableInCompany: createContactDTO.reliableInCompany?.concat(customer)
        })
      }
    }
  }

  const handleRemoveReliable = (customer: ICustomer) => {
    if (createContactDTO.reliableInCompany) {
      setCreateContactDTO({
        ...createContactDTO,
        reliableInCompany: createContactDTO.reliableInCompany?.filter(reliable => reliable._id !== customer._id)
      })
    }
  }

  const handleAddNewContact = (contact: ICustomerAddNew) => {
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
            createContactDTO={{ ...createContactDTO }}
            onInputChange={handleInputChange}
            onGenderChange={handleGenderChange}
            onRefferTypeChange={handleRefferTypeChange}
          />
        )

      case 1:
        return (
          <ContactSearchInCompanyStep
            reliableInCompanyList={createContactDTO.reliableInCompany || []}
            onAdd={handleAddReliable}
            onRemove={handleRemoveReliable}
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
            createContactDTO={{ ...createContactDTO }}
            onInputChange={handleInputChange}
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
      refferedByError: false,
      genderError: false
    })
    setErrorMessage('')
    const validationResult = validateFormFields()
    console.log(validationResult)
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
      refferedByError: false,
      genderError: false
    })
    setErrorMessage('')
    const validationResult = validateFormFields()
    try {
      if (validationResult) {
        await createCustomer({ ...createContactDTO })
        dispatch(closeModal('createCustomerModal'))
        toastSuccess(
          'Contact ' + createContactDTO.firstname + ' ' + createContactDTO.lastname + ' created successfully'
        )
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
