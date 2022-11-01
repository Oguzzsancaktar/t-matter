import React, { useEffect, useState } from 'react'
import {
  Column,
  ItemContainer,
  JustifyBetweenColumn,
  RelateByModal,
  Row,
  WizzardButtons,
  WizzardNavigation
} from '@/components'
import ContactInformationsStep from './ContactInformationsStep'
import ContactSearchInCompanyStep from './ContactSearchInCompanyStep'
import { ECustomerType, ESize, ICustomer, ICustomerCreateDTO, IOption, IRelativeType } from '@/models'
import { toastSuccess, toastWarning } from '@/utils/toastUtil'
import { isValueNull, isEmailValid } from '@/utils/validationUtils'
import { useCreateCustomerMutation } from '@/services/customers/customerService'
import useAccessStore from '@/hooks/useAccessStore'
import { closeModal, openModal } from '@/store'
import {
  useGetJobTitlesQuery,
  useGetRefferedBysQuery
} from '@/services/settings/company-planning/dynamicVariableService'
import { emptyQueryParams } from '@/constants/queryParams'
import { initialContactType, initialCreateCustomer } from '@/constants/initialValues'
import { useAuth } from '@/hooks/useAuth'
import { useCreateCustomerHistoryMutation } from '@/services/customers/customerHistoryService'
import { CUSTOMER_HISTORY_TYPES } from '@/constants/customerHistoryTypes'

const CreateContactTab = () => {
  const { loggedUser } = useAuth()
  const [createCustomerHistory] = useCreateCustomerHistoryMutation()

  const { data: refferedByData } = useGetRefferedBysQuery(emptyQueryParams)
  const { data: jobTitleData } = useGetJobTitlesQuery(emptyQueryParams)

  const [createCustomer] = useCreateCustomerMutation()

  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

  const [activeWizzardStep, setActiveWizzardStep] = useState(0)
  const [contactWizzardSteps] = useState([
    { stepName: 'Contact Informations', stepIndex: 0 },
    { stepName: 'Search Relative', stepIndex: 1 }
  ])

  const [createContactDTO, setCreateContactDTO] =
    useState<Omit<ICustomerCreateDTO, '_id' | 'birthday'>>(initialCreateCustomer)

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
            onJobTitleChange={handleJobTitleChange}
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
      default:
        return (
          <ContactInformationsStep
            validationErrors={validationErrors}
            createContactDTO={{ ...createContactDTO }}
            onInputChange={handleInputChange}
            onGenderChange={handleGenderChange}
            onRefferTypeChange={handleRefferTypeChange}
            onJobTitleChange={handleJobTitleChange}
          />
        )
    }
  }

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

    if (!isValueNull(createContactDTO.firstname)) {
      toastError('Please enter a valid first name')
      tempValidationErrors.firstnameError = true
      setValidationErrors(tempValidationErrors)
      setActiveWizzardStep(0)
      return false
    }

    if (!isValueNull(createContactDTO.lastname)) {
      toastError('Please enter a valid last name')
      tempValidationErrors.lastnameError = true
      setValidationErrors(tempValidationErrors)
      setActiveWizzardStep(0)
      return false
    }

    if (!isEmailValid(createContactDTO.email)) {
      toastError('Please enter a valid email')
      tempValidationErrors.emailError = true
      setValidationErrors(tempValidationErrors)
      setActiveWizzardStep(0)
      return false
    }

    if (!isValueNull(createContactDTO.phone.toString())) {
      toastError('Please enter a valid phone number')
      tempValidationErrors.phoneError = true
      setValidationErrors(tempValidationErrors)
      setActiveWizzardStep(0)
      return false
    }

    if (!isValueNull(createContactDTO.refferedBy._id)) {
      toastError('Please select user refferedBy')
      tempValidationErrors.refferedByError = true
      setValidationErrors(tempValidationErrors)
      setActiveWizzardStep(0)
      return false
    }

    if (!isValueNull(createContactDTO.gender.toString())) {
      toastError('Please select user gender')
      tempValidationErrors.genderError = true
      setValidationErrors(tempValidationErrors)
      setActiveWizzardStep(0)
      return false
    }
    setValidationErrors(tempValidationErrors)

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

  const handleJobTitleChange = (option: IOption) => {
    const jobTitle = jobTitleData?.find(jt => jt._id === option.value)
    if (jobTitle) {
      setCreateContactDTO({ ...createContactDTO, jobTitle: jobTitle })
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
            width: ESize.WLarge,
            height: ESize.HAuto,
            maxWidth: ESize.WSmall
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

  const handleNext = () => {
    setValidationErrors({
      firstnameError: false,
      lastnameError: false,
      emailError: false,
      phoneError: false,
      jobTitleError: false,
      refferedByError: false,
      genderError: false
    })
    toastError('')
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
      jobTitleError: false,
      refferedByError: false,
      genderError: false
    })

    const validationResult = validateFormFields()
    try {
      const tempCreateContactDTO = { ...createContactDTO }
      if (validationResult) {
        // @ts-ignore
        delete tempCreateContactDTO._id
        tempCreateContactDTO.customerType = initialContactType
        const result = await createCustomer({ ...tempCreateContactDTO })

        // @ts-ignore
        if (result?.data) {
          await createCustomerHistory({
            // @ts-ignore
            customer: result.data._id,
            responsible: loggedUser.user?._id || '',
            type: CUSTOMER_HISTORY_TYPES.CUSTOMER_CREATED
          })
        }

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
      <ItemContainer borderRadius="0.3rem" height="100%" overflow="hidden" width="200px" margin="0 1rem 0 0">
        <Column height="100%">
          <WizzardNavigation
            onStepChange={setActiveWizzardStep}
            steps={contactWizzardSteps}
            activeStep={activeWizzardStep}
          />
        </Column>
      </ItemContainer>
      <JustifyBetweenColumn width="calc(100% - 200px - 1rem)" height="100%">
        <ItemContainer height="calc(100% - 35px - 1rem)">{renderSwitch()}</ItemContainer>

        <ItemContainer width="100%" height="35px" margin="1rem 0 0 0 ">
          <WizzardButtons
            actionNext={handleNext}
            actionPrevious={handlePrevious}
            actionSubmit={handleSubmit}
            steps={contactWizzardSteps}
            activeStep={activeWizzardStep}
          />
        </ItemContainer>
      </JustifyBetweenColumn>
    </Row>
  )
}

export default CreateContactTab
