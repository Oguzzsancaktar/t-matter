import React, { useState } from 'react'
import { Button, Column, ItemContainer, JustifyBetweenColumn, RelateByModal } from '@/components'
import useAccessStore from '@/hooks/useAccessStore'
import { ESize, ICustomer, ICustomerAddNew, ICustomerUpdateDTO, IOption, IRelativeType } from '@/models'
import { UpdateContactInfo, UpdateContactReliables } from '@/pages'
import { useGetRefferedBysQuery } from '@/services/settings/company-planning/dynamicVariableService'
import { closeModal, openModal } from '@/store'
import { toastError, toastSuccess, toastWarning } from '@/utils/toastUtil'
import { isEmailValid, isValueNull } from '@/utils/validationUtils'
import emptyQueryParams from '@/constants/queryParams'
import colors from '@/constants/colors'
import { customerApi, useUpdateCustomerMutation } from '@/services/customers/customerService'

interface IProps {
  customer: ICustomer
}
const UpdateContactTab: React.FC<IProps> = ({ customer }) => {
  const [updateCustomer] = useUpdateCustomerMutation()
  const { data: refferedByData } = useGetRefferedBysQuery(emptyQueryParams)

  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

  const [updateContactDTO, setUpdateContactDTO] = useState<Omit<ICustomerUpdateDTO, 'birthday'>>({
    _id: customer._id,
    customerType: customer.customerType,
    firstname: customer.firstname,
    lastname: customer.lastname,
    email: customer.email,
    phone: customer.phone,
    jobTitle: customer.jobTitle,
    refferedBy: customer.refferedBy,
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

    if (!isValueNull(updateContactDTO.jobTitle)) {
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

  const handleAddReliable = (reliableCustomer: ICustomer) => {
    const isSelectedBefore = updateContactDTO.reliableCustomers.find(reliable => reliable.reliableId === customer._id)
    if (isSelectedBefore) {
      toastWarning('Contact is already selected')
    } else if (reliableCustomer._id === customer._id) {
      toastWarning('You cand add relative itself')
    } else {
      dispatch(
        openModal({
          id: `addRelateByModal-${reliableCustomer._id}`,
          title: `Add relate by modal ${reliableCustomer.firstname}?`,
          body: (
            <RelateByModal
              modalId={`addRelateByModal-${reliableCustomer._id}`}
              title={`Choose relate by for ${reliableCustomer.firstname} ${reliableCustomer.lastname} ?`}
              onConfirm={relativeType => handleConfirmAddReliable(reliableCustomer, relativeType)}
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

  const handleRemoveNewReliable = (reliableCustomer: ICustomer | ICustomerAddNew) => {
    if (updateContactDTO.reliableInCompany) {
      setUpdateContactDTO({
        ...updateContactDTO,
        reliableInCompany: updateContactDTO.reliableInCompany.filter(reliable => reliable._id !== reliableCustomer._id)
      })
    }
  }

  const handleConfirmAddReliable = (reliableCustomer: ICustomer, relativeType?: IRelativeType) => {
    setUpdateContactDTO({
      ...updateContactDTO,
      reliableInCompany: updateContactDTO.reliableInCompany?.concat({ ...reliableCustomer, relativeType: relativeType })
    })
    dispatch(closeModal(`addRelateByModal-${reliableCustomer._id}`))
    dispatch(closeModal(`updateContactCustomerSearchModal-${updateContactDTO._id}`))
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
        console.log('updateContactDTO', updateContactDTO)
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
          <UpdateContactInfo
            validationErrors={validationErrors}
            updateContactDTO={{ ...updateContactDTO }}
            onInputChange={handleInputChange}
            onGenderChange={handleGenderChange}
            onRefferTypeChange={handleRefferTypeChange}
          />
        </ItemContainer>
        <Column>
          <ItemContainer margin="0 0 1rem 0">
            <UpdateContactReliables
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

export default UpdateContactTab
