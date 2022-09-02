import React, { useState } from 'react'
import { Button, Column, ItemContainer, JustifyBetweenColumn, RelateByModal } from '@/components'
import useAccessStore from '@/hooks/useAccessStore'
import { ESize, ICustomer, ICustomerAddNew, ICustomerUpdateDTO, IOption, IRelativeType } from '@/models'
import { UpdateClientExtraInfo, UpdateClientInfo, UpdateClientReliables } from '@/pages'
import { useGetRefferedBysQuery } from '@/services/settings/company-planning/dynamicVariableService'
import { closeModal, openModal } from '@/store'
import { toastError, toastSuccess, toastWarning } from '@/utils/toastUtil'
import { isEmailValid, isValueNull } from '@/utils/validationUtils'
import emptyQueryParams from '@/constants/queryParams'
import colors from '@/constants/colors'
import { customerApi, useUpdateCustomerMutation } from '@/services/customers/customerService'
import moment from 'moment'

interface IProps {
  customer: ICustomer
}
const UpdateClientTab: React.FC<IProps> = ({ customer }) => {
  const [updateCustomer] = useUpdateCustomerMutation()
  const { data: refferedByData } = useGetRefferedBysQuery(emptyQueryParams)

  console.log(customer)
  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

  const [birthday, setBirthday] = useState(customer.birthday)

  const [updateContactDTO, setUpdateContactDTO] = useState<Omit<ICustomerUpdateDTO, 'birthday'>>({
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
    if (!isValueNull(updateContactDTO.firstname)) {
      toastError('Please enter a valid first name')
      setValidationErrors({ ...validationErrors, firstnameError: true })
      return false
    }

    if (!isValueNull(updateContactDTO.lastname)) {
      toastError('Please enter a valid last name')
      setValidationErrors({ ...validationErrors, lastnameError: true })
      return false
    }

    if (!isEmailValid(updateContactDTO.email)) {
      toastError('Please enter a valid email')
      setValidationErrors({ ...validationErrors, emailError: true })
      return false
    }

    if (!isValueNull(updateContactDTO.phone.toString())) {
      toastError('Please enter a valid phone number')
      setValidationErrors({ ...validationErrors, phoneError: true })
      return false
    }

    if (!isValueNull(updateContactDTO.jobTitle.toString())) {
      toastError('Please enter a valid job title')
      setValidationErrors({ ...validationErrors, jobTitleError: true })
      return false
    }

    if (!isValueNull(updateContactDTO.refferedBy._id)) {
      toastError('Please select user refferedBy')
      return false
    }

    if (!isValueNull(updateContactDTO.gender.toString())) {
      toastError('Please select user gender')
      return false
    }

    return true
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateContactDTO({ ...updateContactDTO, [event.target.name]: event.target.value })
  }

  const handleGenderChange = (option: IOption) => {
    setUpdateContactDTO({ ...updateContactDTO, gender: +option.value })
  }

  const handleRefferTypeChange = (option: IOption) => {
    const refBy = refferedByData?.find(rb => rb._id === option.value)
    if (refBy) {
      setUpdateContactDTO({ ...updateContactDTO, refferedBy: refBy })
    }
  }

  const handleAddReliable = (customer: ICustomer) => {
    const isSelectedBefore = updateContactDTO.reliableCustomers.find(reliable => reliable.reliableId === customer._id)
    if (isSelectedBefore) {
      toastWarning('Contact is already selected')
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

  const handleRemovePastReliable = (customerReliable: ICustomer) => {
    if (updateContactDTO.reliableCustomers) {
      setUpdateContactDTO({
        ...updateContactDTO,
        reliableCustomers: updateContactDTO.reliableCustomers.filter(
          reliable => reliable.reliableId !== customerReliable._id
        ),
        deleteReliableId: [
          ...updateContactDTO.deleteReliableId,
          updateContactDTO.reliableCustomers.filter(reliable => reliable.reliableId === customerReliable._id)[0]
            .reliableId
        ]
      })
    }
  }

  const handleRemoveNewReliable = (customer: ICustomer | ICustomerAddNew) => {
    if (updateContactDTO.reliableInCompany) {
      setUpdateContactDTO({
        ...updateContactDTO,
        reliableInCompany: updateContactDTO.reliableInCompany.filter(reliable => reliable._id !== customer._id)
      })
    }
  }

  const handleConfirmAddReliable = (customer: ICustomer, relativeType?: IRelativeType) => {
    setUpdateContactDTO({
      ...updateContactDTO,
      reliableInCompany: updateContactDTO.reliableInCompany?.concat({ ...customer, relativeType: relativeType })
    })
    dispatch(closeModal(`addRelateByModal-${customer._id}`))
    dispatch(closeModal(`updateContactCustomerSearchModal-${updateContactDTO._id}`))
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
        await updateCustomer({ ...updateContactDTO })
        dispatch(closeModal(`updateCustomerModal-${customer._id}`))
        toastSuccess(
          'Contact ' + updateContactDTO.firstname + ' ' + updateContactDTO.lastname + ' updated successfully'
        )
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
            updateContactDTO={{ ...updateContactDTO }}
            onInputChange={handleInputChange}
            onGenderChange={handleGenderChange}
            onRefferTypeChange={handleRefferTypeChange}
          />
        </ItemContainer>

        <ItemContainer>
          <UpdateClientExtraInfo
            validationErrors={validationErrors}
            birthday={birthday || ''}
            updateClientDTO={{ ...updateContactDTO }}
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
              updateContactDTO={{ ...updateContactDTO }}
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