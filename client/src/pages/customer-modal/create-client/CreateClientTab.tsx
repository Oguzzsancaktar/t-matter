import React, { useState } from 'react'
import {
  Column,
  ItemContainer,
  JustifyBetweenColumn,
  RelateByModal,
  Row,
  WizzardButtons,
  WizzardNavigation
} from '@/components'
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
import {
  useGetJobTitlesQuery,
  useGetRefferedBysQuery
} from '@/services/settings/company-planning/dynamicVariableService'
import { emptyQueryParams } from '@/constants/queryParams'
import { initialCreateCustomer } from '@/constants/initialValues'
import { useAuth } from '@/hooks/useAuth'
import { useCreateCustomerHistoryMutation } from '@/services/customers/customerHistoryService'
import { useCreateTaskMutation } from '@/services/customers/taskService'
import { CUSTOMER_HISTORY_TYPES } from '@/constants/customerHistoryTypes'

const CreateClientTab = () => {
  const { loggedUser } = useAuth()
  const [createCustomerHistory] = useCreateCustomerHistoryMutation()

  const { data: refferedByData } = useGetRefferedBysQuery(emptyQueryParams)
  const { data: jobTitleData, isLoading: jobTitleDataIsLoading } = useGetJobTitlesQuery(emptyQueryParams)

  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()
  const [createCustomer] = useCreateCustomerMutation()
  const [activeWizzardStep, setActiveWizzardStep] = useState(0)
  const [clientWizzardSteps, setClientWizzardSteps] = useState([
    { stepName: 'Client Informations', stepIndex: 0 },
    { stepName: 'Detailed Informations', stepIndex: 1 },
    { stepName: 'Search Relative', stepIndex: 2 }
  ])

  const [birthday, setBirthday] = useState('')
  const [createClientDTO, setCreateClientDTO] = useState<Omit<ICustomerCreateDTO, '_id' | 'birthday'>>({
    ...initialCreateCustomer
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
            onJobTitleChange={handleJobTitleChange}
          />
        )
      case 1:
        return (
          <ClientExtraInformationsStep
            birthday={birthday}
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

      default:
        return (
          <ClientInformationsStep
            validationErrors={validationErrors}
            createClientDTO={{ ...createClientDTO, birthday }}
            onInputChange={handleInputChange}
            onGenderChange={handleGenderChange}
            onRefferTypeChange={handleRefferTypeChange}
            onJobTitleChange={handleJobTitleChange}
          />
        )
    }
  }

  const validateFormFields = (): boolean => {
    if (!isValueNull(createClientDTO.firstname)) {
      toastError('Please enter a valid first name')
      setValidationErrors({ ...validationErrors, firstnameError: true })
      setActiveWizzardStep(0)
      return false
    }

    if (!isValueNull(createClientDTO.lastname)) {
      toastError('Please enter a valid last name')
      setValidationErrors({ ...validationErrors, lastnameError: true })

      setActiveWizzardStep(0)
      return false
    }

    if (!isEmailValid(createClientDTO.email)) {
      toastError('Please enter a valid email')
      setValidationErrors({ ...validationErrors, emailError: true })

      setActiveWizzardStep(0)
      return false
    }

    if (!isValueNull(createClientDTO.phone)) {
      toastError('Please enter a valid phone number')
      setValidationErrors({ ...validationErrors, phoneError: true })
      setActiveWizzardStep(0)
      return false
    }

    if (!isValueNull(birthday)) {
      toastError('Please enter a valid birthday')
      setValidationErrors({ ...validationErrors, birthdayError: true })
      setActiveWizzardStep(1)
      return false
    }

    if (!isValueNull(createClientDTO.birthplace)) {
      toastError('Please enter a valid birthplace')
      setValidationErrors({ ...validationErrors, birthplaceError: true })

      setActiveWizzardStep(1)
      return false
    }

    if (!isValueNull(createClientDTO.country)) {
      toastError('Please enter a valid country')
      setValidationErrors({ ...validationErrors, countryError: true })

      setActiveWizzardStep(1)
      return false
    }

    if (!isValueNull(createClientDTO.city)) {
      toastError('Please enter a valid city')
      setValidationErrors({ ...validationErrors, cityError: true })

      setActiveWizzardStep(1)
      return false
    }

    if (!isValueNull(createClientDTO.state)) {
      toastError('Please enter a valid state')
      setValidationErrors({ ...validationErrors, stateError: true })

      setActiveWizzardStep(1)
      return false
    }

    if (!isValueNull(createClientDTO.zipcode)) {
      toastError('Please enter a valid zipcode')
      setValidationErrors({ ...validationErrors, zipcodeError: true })

      setActiveWizzardStep(1)
      return false
    }

    if (!isValueNull(createClientDTO.address)) {
      toastError('Please enter a valid address')
      setValidationErrors({ ...validationErrors, addressError: true })

      setActiveWizzardStep(1)
      return false
    }

    if (!isValueNull(createClientDTO.aSharpNumber)) {
      toastError('Please enter a valid A# Number')
      setValidationErrors({ ...validationErrors, aSharpNumberError: true })

      setActiveWizzardStep(1)
      return false
    }

    if (!isValueNull(createClientDTO.refferedBy._id)) {
      toastError('Please select user refferedBy')
      setValidationErrors({ ...validationErrors, refferedByError: true })
      setActiveWizzardStep(1)
      return false
    }

    if (!isValueNull(createClientDTO.gender.toString())) {
      toastError('Please select user gender')
      setValidationErrors({ ...validationErrors, genderError: true })

      setActiveWizzardStep(1)
      return false
    }
    // client job ekle  kutu açtır sor
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
    const refBy = refferedByData?.find(rb => rb._id === option.value)
    if (refBy) {
      setCreateClientDTO({ ...createClientDTO, refferedBy: refBy })
    }
  }

  const handleJobTitleChange = (option: IOption) => {
    const jobTitle = jobTitleData?.find(jt => jt._id === option.value)
    if (jobTitle) {
      setCreateClientDTO({ ...createClientDTO, jobTitle: jobTitle })
    }
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
            width: ESize.WLarge,
            height: ESize.HAuto,
            maxWidth: ESize.WSmall
          })
        )
      }
    }
  }

  const handleRemoveClient = (customer: ICustomer) => {
    if (createClientDTO.reliableInCompany) {
      setCreateClientDTO({
        ...createClientDTO,
        reliableInCompany: createClientDTO.reliableInCompany.filter(reliable => reliable._id !== customer._id)
      })
    }
  }

  const handleConfirmAddReliable = (customer: ICustomer, relativeType?: IRelativeType) => {
    setCreateClientDTO({
      ...createClientDTO,
      reliableInCompany: createClientDTO.reliableInCompany?.concat({ ...customer, relativeType: relativeType })
    })
    dispatch(closeModal(`addRelateByModal-${customer._id}`))
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
    const validationResult = validateFormFields()
    try {
      if (validationResult) {
        const result = await createCustomer({ ...createClientDTO, birthday })

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
      }
    } catch (error) {
      toastError('error.message')
    }
  }

  return (
    <Row height="100%">
      <ItemContainer borderRadius="0.3rem" height="100%" overflow="hidden" width="200px" margin="0 1rem 0 0 ">
        <Column height="100%">
          <WizzardNavigation
            onStepChange={setActiveWizzardStep}
            steps={clientWizzardSteps}
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
            steps={clientWizzardSteps}
            activeStep={activeWizzardStep}
          />
        </ItemContainer>
      </JustifyBetweenColumn>
    </Row>
  )
}

export default CreateClientTab
