import React, { useEffect, useState } from 'react'
import { ItemContainer, JustifyBetweenColumn, RelateByModal } from '@/components'
import useAccessStore from '@/hooks/useAccessStore'
import { ESize, ICustomer, ICustomerAddNew, ICustomerUpdateDTO, IOption, IRelativeType } from '@/models'
import { UpdateCustomerInfo, UpdateCustomerReliables } from '@/pages'
import { useGetRefferedBysQuery } from '@/services/settings/company-planning/dynamicVariableService'
import { closeModal, openModal } from '@/store'
import { toastError, toastSuccess, toastWarning } from '@/utils/toastUtil'
import { isEmailValid, isValueNull } from '@/utils/validationUtils'
import emptyQueryParams from '@/constants/queryParams'

interface IProps {
  customer: ICustomer
}
const UpdateContactTab: React.FC<IProps> = ({ customer }) => {
  const { data: refferedByData, isLoading: refferedByDataIsLoading } = useGetRefferedBysQuery(emptyQueryParams)

  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

  const [updateContactDTO, setUpdateContactDTO] = useState<Omit<ICustomerUpdateDTO, 'birthday'>>({
    _id: customer._id,
    customerType: customer.customerType,
    firstname: customer.firstname,
    lastname: customer.lastname,
    email: customer.email,
    phone: customer.phone,
    refferedBy: customer.refferedBy,
    gender: customer.gender,
    reliableCustomers: customer.reliableCustomers,
    reliableInCompany: []
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

    if (!isValueNull(updateContactDTO.firstname)) {
      setErrorMessage('Please enter a valid first name')
      setValidationErrors({ ...validationErrors, firstnameError: true })
      return false
    }

    if (!isValueNull(updateContactDTO.lastname)) {
      setErrorMessage('Please enter a valid last name')
      setValidationErrors({ ...validationErrors, lastnameError: true })
      return false
    }

    if (!isEmailValid(updateContactDTO.email)) {
      setErrorMessage('Please enter a valid email')
      setValidationErrors({ ...validationErrors, emailError: true })
      return false
    }

    if (!isValueNull(updateContactDTO.phone.toString())) {
      setErrorMessage('Please enter a valid phone number')
      setValidationErrors({ ...validationErrors, phoneError: true })
      return false
    }

    if (!isValueNull(updateContactDTO.refferedBy._id)) {
      setErrorMessage('Please select user refferedBy')
      return false
    }

    if (!isValueNull(updateContactDTO.gender.toString())) {
      setErrorMessage('Please select user gender')
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
    if (updateContactDTO.reliableCustomers) {
      const isSelectedBefore = updateContactDTO.reliableCustomers.find(reliable => reliable.reliableId === customer._id)
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
            width: ESize.XLarge,
            height: ESize.Large
          })
        )
      }
    }
  }

  const handleRemoveReliable = (customer: ICustomer | ICustomerAddNew) => {
    if (updateContactDTO.reliableInCompany) {
      console.log(updateContactDTO.reliableCustomers, updateContactDTO.reliableInCompany)
      setUpdateContactDTO({
        ...updateContactDTO,
        reliableCustomers: updateContactDTO.reliableCustomers.filter(reliable => reliable.reliableId !== customer._id),
        reliableInCompany: updateContactDTO.reliableInCompany.filter(reliable => reliable._id !== customer._id)
      })
    }
  }

  const handleConfirmAddReliable = (customer: ICustomer, relativeType?: IRelativeType) => {
    console.log(customer, relativeType)
    setUpdateContactDTO({
      ...updateContactDTO,
      reliableInCompany: updateContactDTO.reliableInCompany?.concat({ ...customer, relativeType: relativeType })
    })
    dispatch(closeModal(`addRelateByModal-${customer._id}`))
    dispatch(closeModal(`customerSearchModal-${updateContactDTO._id}`))
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
        // await updateCustomer({ ...updateContactDTO })
        dispatch(closeModal('updateCustomerModal'))
        toastSuccess(
          'Contact ' + updateContactDTO.firstname + ' ' + updateContactDTO.lastname + ' updated successfully'
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
    <ItemContainer>
      <JustifyBetweenColumn>
        <ItemContainer>
          <UpdateCustomerInfo
            validationErrors={validationErrors}
            updateContactDTO={{ ...updateContactDTO }}
            onInputChange={handleInputChange}
            onGenderChange={handleGenderChange}
            onRefferTypeChange={handleRefferTypeChange}
          />
        </ItemContainer>
        <ItemContainer>
          <UpdateCustomerReliables
            onAdd={handleAddReliable}
            onRemove={handleRemoveReliable}
            updateContactDTO={{ ...updateContactDTO }}
          />
        </ItemContainer>
      </JustifyBetweenColumn>
    </ItemContainer>
  )
}

export default UpdateContactTab
