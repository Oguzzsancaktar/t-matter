import React, { useState } from 'react'
import { Button, Column, ItemContainer, JustifyBetweenColumn, RelateByModal } from '@/components'
import useAccessStore from '@/hooks/useAccessStore'
import { ESize, ICustomer, ICustomerAddNew, ICustomerUpdateDTO, IOption, IRelativeType } from '@/models'
import { UpdateClientExtraInfo, UpdateClientInfo, UpdateClientReliables } from '@/pages'
import {
  useGetJobTitlesQuery,
  useGetRefferedBysQuery
} from '@/services/settings/company-planning/dynamicVariableService'
import { closeModal, openModal } from '@/store'
import { toastError, toastSuccess, toastWarning } from '@/utils/toastUtil'
import { isEmailValid, isValueNull } from '@/utils/validationUtils'
import { emptyQueryParams } from '@/constants/queryParams'
import colors from '@/constants/colors'
import { customerApi, useUpdateCustomerMutation } from '@/services/customers/customerService'
import moment from 'moment'
import { CUSTOMER_HISTORY_TYPES } from '@/constants/customerHistoryTypes'
import { useAuth } from '@/hooks/useAuth'
import { useCreateCustomerHistoryMutation } from '@/services/customers/customerHistoryService'

interface IProps {
  customer: ICustomer
}
const UpdateClientTab: React.FC<IProps> = ({ customer }) => {
  const { loggedUser } = useAuth()
  const [createCustomerHistory] = useCreateCustomerHistoryMutation()

  const [updateCustomer] = useUpdateCustomerMutation()
  const { data: refferedByData } = useGetRefferedBysQuery(emptyQueryParams)
  const { data: jobTitleData, isLoading: jobTitleDataIsLoading } = useGetJobTitlesQuery(emptyQueryParams)

  console.log(customer)
  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

  const [birthday, setBirthday] = useState(customer.birthday)

  const [updateClientDTO, setUpdateClientDTO] = useState<Omit<ICustomerUpdateDTO, 'birthday'>>({
    _id: customer._id,
    customerType: customer.customerType,
    firstname: customer.firstname,
    lastname: customer.lastname,
    email: customer.email,
    phone: customer.phone,
    jobTitle: customer.jobTitle,
    refferedBy: customer.refferedBy,
    aSharpNumber: customer.aSharpNumber,
    country: customer.country,
    city: customer.city,
    state: customer.state,
    address: customer.address,
    zipcode: customer.zipcode,
    birthplace: customer.birthplace,
    gender: customer.gender,
    reliableCustomers: customer.reliableCustomers,
    deleteReliableId: [],
    reliableInCompany: []
  })

  const [validationErrors, setValidationErrors] = useState({
    firstnameError: false,
    lastnameError: false,
    emailError: false,
    phoneError: false,
    refferedByError: false,
    genderError: false,
    jobTitleError: false
  })

  const validateFormFields = (): boolean => {
    if (!isValueNull(updateClientDTO.firstname)) {
      toastError('Please enter a valid first name')
      setValidationErrors({ ...validationErrors, firstnameError: true })
      return false
    }

    if (!isValueNull(updateClientDTO.lastname)) {
      toastError('Please enter a valid last name')
      setValidationErrors({ ...validationErrors, lastnameError: true })
      return false
    }

    if (!isEmailValid(updateClientDTO.email)) {
      toastError('Please enter a valid email')
      setValidationErrors({ ...validationErrors, emailError: true })
      return false
    }

    if (!isValueNull(updateClientDTO.phone.toString())) {
      toastError('Please enter a valid phone number')
      setValidationErrors({ ...validationErrors, phoneError: true })
      return false
    }

    if (!isValueNull(updateClientDTO.jobTitle._id)) {
      toastError('Please enter a valid job title')
      setValidationErrors({ ...validationErrors, jobTitleError: true })
      return false
    }

    if (!isValueNull(updateClientDTO.refferedBy._id)) {
      toastError('Please select user refferedBy')
      return false
    }

    if (!isValueNull(updateClientDTO.gender.toString())) {
      toastError('Please select user gender')
      return false
    }

    return true
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateClientDTO({ ...updateClientDTO, [event.target.name]: event.target.value })
  }

  const handleGenderChange = (option: IOption) => {
    setUpdateClientDTO({ ...updateClientDTO, gender: +option.value })
  }

  const handleRefferTypeChange = (option: IOption) => {
    const refBy = refferedByData?.find(rb => rb._id === option.value)
    if (refBy) {
      setUpdateClientDTO({ ...updateClientDTO, refferedBy: refBy })
    }
  }

  const handleAddReliable = (customer: ICustomer) => {
    const isSelectedBefore = updateClientDTO.reliableCustomers.find(reliable => reliable.reliableId === customer._id)
    if (isSelectedBefore) {
      toastWarning('Client is already selected')
    } else {
      dispatch(
        openModal({
          id: `addRelateByModal-${customer._id}`,
          title: `Add relate by modal ${customer.firstname}?`,
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

  const handleJobTitleChange = (option: IOption) => {
    const jobTitle = jobTitleData?.find(jt => jt._id === option.value)
    if (jobTitle) {
      setUpdateClientDTO({ ...updateClientDTO, jobTitle: jobTitle })
    }
  }

  const handleRemovePastReliable = (customerReliable: ICustomer) => {
    if (updateClientDTO.reliableCustomers) {
      setUpdateClientDTO({
        ...updateClientDTO,
        reliableCustomers: updateClientDTO.reliableCustomers.filter(
          reliable => reliable.reliableId !== customerReliable._id
        ),
        deleteReliableId: [
          ...updateClientDTO.deleteReliableId,
          updateClientDTO.reliableCustomers.filter(reliable => reliable.reliableId === customerReliable._id)[0]
            .reliableId
        ]
      })
    }
  }

  const handleRemoveNewReliable = (customer: ICustomer | ICustomerAddNew) => {
    if (updateClientDTO.reliableInCompany) {
      setUpdateClientDTO({
        ...updateClientDTO,
        reliableInCompany: updateClientDTO.reliableInCompany.filter(reliable => reliable._id !== customer._id)
      })
    }
  }

  const handleConfirmAddReliable = (customer: ICustomer, relativeType?: IRelativeType) => {
    setUpdateClientDTO({
      ...updateClientDTO,
      reliableInCompany: updateClientDTO.reliableInCompany?.concat({ ...customer, relativeType: relativeType })
    })
    dispatch(closeModal(`addRelateByModal-${customer._id}`))
    dispatch(closeModal(`updateClientCustomerSearchModal-${updateClientDTO._id}`))
  }

  const handleBirhdayChange = (date: Date[]) => {
    setBirthday(moment(date[0]).format('MM-DD-YYYY'))
  }

  const handleSubmit = async () => {
    setValidationErrors({
      firstnameError: false,
      lastnameError: false,
      emailError: false,
      phoneError: false,
      refferedByError: false,
      genderError: false,
      jobTitleError: false
    })

    const validationResult = validateFormFields()
    try {
      if (validationResult) {
        await updateCustomer({ ...updateClientDTO })
        dispatch(closeModal(`updateCustomerModal-${customer._id}`))

        await createCustomerHistory({
          customer: customer._id,
          responsible: loggedUser.user?._id || '',
          type: CUSTOMER_HISTORY_TYPES.CUSTOMER_UPDATED
        })

        toastSuccess('Client ' + updateClientDTO.firstname + ' ' + updateClientDTO.lastname + ' updated successfully')
        customerApi.util.resetApiState()
      }
    } catch (error) {
      toastError('error.message')
    }
  }

  return (
    <ItemContainer height="100%">
      <JustifyBetweenColumn height="100%">
        <ItemContainer>
          <UpdateClientInfo
            validationErrors={validationErrors}
            updateClientDTO={{ ...updateClientDTO }}
            onInputChange={handleInputChange}
            onGenderChange={handleGenderChange}
            onRefferTypeChange={handleRefferTypeChange}
            onJobTitleChange={function (option: IOption): void {
              throw new Error('Function not implemented.')
            }}
          />
        </ItemContainer>

        <ItemContainer>
          <UpdateClientExtraInfo
            validationErrors={validationErrors}
            birthday={birthday || ''}
            updateClientDTO={{ ...updateClientDTO }}
            onInputChange={handleInputChange}
            onBirthdayChange={handleBirhdayChange}
          />
        </ItemContainer>

        <Column>
          <ItemContainer margin="1rem 0">
            <UpdateClientReliables
              onAdd={handleAddReliable}
              onRemovePastReliable={handleRemovePastReliable}
              onRemoveNewReliable={handleRemoveNewReliable}
              updateClientDTO={{ ...updateClientDTO }}
            />
          </ItemContainer>

          <ItemContainer>
            <Button onClick={handleSubmit} color={colors.green.primary}>
              Update
            </Button>
          </ItemContainer>
        </Column>
      </JustifyBetweenColumn>
    </ItemContainer>
  )
}

export default UpdateClientTab
