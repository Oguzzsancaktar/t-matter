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
import ContactAddNewContactsStep from './ContactAddNewContactsStep'
import ContactInformationsStep from './ContactInformationsStep'
import ContactSearchInCompanyStep from './ContactSearchInCompanyStep'
import { ESize, ICustomer, ICustomerAddNew, ICustomerCreateDTO, IOption, IRelativeType } from '@/models'
import { toastError, toastSuccess, toastWarning } from '@/utils/toastUtil'
import { isValueNull, isEmailValid } from '@/utils/validationUtils'
import { useCreateCustomerMutation } from '@/services/customers/customerService'
import useAccessStore from '@/hooks/useAccessStore'
import { closeModal, openModal } from '@/store'
import { useGetRefferedBysQuery } from '@/services/settings/company-planning/dynamicVariableService'
import emptyQueryParams from '@/constants/queryParams'

const CreateContactTab = () => {
  const { data: refferedByData, isLoading: refferedByDataIsLoading } = useGetRefferedBysQuery(emptyQueryParams)

  const [createCustomer] = useCreateCustomerMutation()

  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

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
    refferedBy: {
      _id: '',
      name: '',
      status: 0,
      color: '#f2f200'
    },
    gender: 0,
    reliableInCompany: [],
    createContact: []
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

    if (!isValueNull(createContactDTO.refferedBy._id)) {
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
    const refBy = refferedByData?.find(rb => rb._id === option.value)
    if (refBy) {
      setCreateContactDTO({ ...createContactDTO, refferedBy: refBy })
    }
  }

  const handleAddReliable = (customer: ICustomer) => {
    if (createContactDTO.reliableInCompany) {
      const isSelectedBefore = createContactDTO.reliableInCompany.find(reliable => reliable._id === customer._id)
      if (isSelectedBefore) {
        toastWarning('Contact is already selected')
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
            width: ESize.WXLarge,
            height: ESize.HLarge
          })
        )
      }
    }
  }

  const handleRemoveReliable = (customer: ICustomer) => {
    if (createContactDTO.reliableInCompany) {
      setCreateContactDTO({
        ...createContactDTO,
        reliableInCompany: createContactDTO.reliableInCompany.filter(reliable => reliable._id !== customer._id)
      })
    }
  }

  const handleAddNewContact = (customer: ICustomerAddNew) => {
    if (createContactDTO.createContact) {
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
          width: ESize.WXLarge,
          height: ESize.HLarge
        })
      )
    }
  }

  const handleConfirmAddReliable = (customer: ICustomer, relativeType: IRelativeType) => {
    setCreateContactDTO({
      ...createContactDTO,
      reliableInCompany: createContactDTO.reliableInCompany?.concat({
        ...customer,
        relativeType: { ...relativeType, fromOrTo: 1 }
      })
    })
    dispatch(closeModal(`addRelateByModal-${customer._id}`))
  }

  const handleConfirmAddContact = (customer: ICustomerAddNew, relativeType?: IRelativeType) => {
    setCreateContactDTO({
      ...createContactDTO,
      createContact: createContactDTO.createContact?.concat({
        ...customer,
        _id: Date.now().toString(),
        relativeType: relativeType
      })
    })
    dispatch(closeModal(`addRelateByModal-${customer.email}`))
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
