import { ConfirmCancelButtons } from '@/components/button'
import { DatePicker } from '@/components/date-picker'
import { InputWithIcon } from '@/components/input'
import { ItemContainer } from '@/components/item-container'
import { Column, JustifyBetweenColumn, JustifyBetweenRow, JustifyCenterRow } from '@/components/layout'
import { H1 } from '@/components/texts'
import colors from '@/constants/colors'
import useAccessStore from '@/hooks/useAccessStore'
import { ICustomer } from '@/models'
import { closeModal } from '@/store'
import { toastError } from '@/utils/toastUtil'
import { isValueNull } from '@/utils/validationUtils'
import moment from 'moment'
import React, { useState } from 'react'
import { User } from 'react-feather'
import { ModalHeader, ModalBody, ModalFooter } from '../types'

interface IProps {
  contact: ICustomer
  onSubmit: (data: any) => void
}

const MakeContactToClientModal: React.FC<IProps> = ({ contact, onSubmit }) => {
  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

  const [birthday, setBirthday] = useState('')
  const [contactExtraInformations, setContactExtraInformations] = useState({
    birthplace: '',
    country: '',
    city: '',
    state: '',
    zipcode: '',
    address: '',
    aSharpNumber: ''
  })

  const [validationErrors, setValidationErrors] = useState({
    birthdayError: false,
    birthplaceError: false,
    countryError: false,
    cityError: false,
    stateError: false,
    zipcodeError: false,
    addressError: false,
    aSharpNumberError: false
  })

  const validateFormFields = (): boolean => {
    const tempValidationErrors = {
      birthdayError: false,
      birthplaceError: false,
      countryError: false,
      cityError: false,
      stateError: false,
      zipcodeError: false,
      addressError: false,
      aSharpNumberError: false
    }

    if (!isValueNull(birthday)) {
      toastError('Please enter a valid birthday')
      tempValidationErrors.birthdayError = true
      setValidationErrors(tempValidationErrors)
      return false
    }

    if (!isValueNull(contactExtraInformations.birthplace)) {
      toastError('Please enter a valid birthplace')
      tempValidationErrors.birthplaceError = true
      setValidationErrors(tempValidationErrors)
      return false
    }

    if (!isValueNull(contactExtraInformations.country)) {
      toastError('Please enter a valid country')
      tempValidationErrors.countryError = true
      setValidationErrors(tempValidationErrors)
    }

    if (!isValueNull(contactExtraInformations.city)) {
      toastError('Please enter a valid city')
      tempValidationErrors.cityError = true
      setValidationErrors(tempValidationErrors)
    }

    if (!isValueNull(contactExtraInformations.state)) {
      toastError('Please enter a valid state')
      tempValidationErrors.stateError = true
      setValidationErrors(tempValidationErrors)
      return false
    }

    if (!isValueNull(contactExtraInformations.zipcode)) {
      toastError('Please enter a valid zipcode')
      tempValidationErrors.zipcodeError = true
      setValidationErrors(tempValidationErrors)
    }

    if (!isValueNull(contactExtraInformations.address)) {
      toastError('Please enter a valid address')
      tempValidationErrors.addressError = true
      setValidationErrors(tempValidationErrors)
      return false
    }

    if (!isValueNull(contactExtraInformations.aSharpNumber)) {
      toastError('Please enter a valid A# Number')
      tempValidationErrors.aSharpNumberError = true
      setValidationErrors(tempValidationErrors)
    }

    setValidationErrors(tempValidationErrors)
    return true
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContactExtraInformations({ ...contactExtraInformations, [event.target.name]: event.target.value })
  }

  const handleBirhdayChange = (date: Date[]) => {
    setBirthday(moment(date[0]).format('MM-DD-YYYY'))
  }

  const handleConfirm = () => {
    const validationResult = validateFormFields()
    if (validationResult) {
      onSubmit({ ...contactExtraInformations, birthday })
    }
  }

  const handleCancel = () => {
    dispatch(closeModal(`makeContactToClient-${contact._id}`))
  }

  return (
    <Column height="100%">
      <ModalHeader>
        <JustifyCenterRow width="100%">
          <H1 margin="0" textAlign="center" fontWeight="700" color={colors.white.primary}>
            Make Client - ({contact.firstname + ' ' + contact.lastname})
          </H1>
        </JustifyCenterRow>
      </ModalHeader>

      <ModalBody height="calc(100% - 63px)">
        <JustifyBetweenColumn height="100%">
          <JustifyBetweenColumn height="100%">
            <JustifyBetweenRow width="100%">
              <ItemContainer margin="0.5rem 0.5rem 0 0">
                <DatePicker
                  labelText="Birthday"
                  validationError={validationErrors.birthdayError}
                  name={'birthday'}
                  onChange={(date: Date[], dateText: string) => handleBirhdayChange(date)}
                  value={birthday}
                />
              </ItemContainer>

              <ItemContainer margin="0.5rem 0 0 0.5rem">
                <InputWithIcon
                  children={<User size={16} />}
                  name="birthplace"
                  placeholder="Enter birth location..."
                  onChange={handleInputChange}
                  type="text"
                  labelText="Birth Location"
                  validationError={validationErrors.birthplaceError}
                  value={contactExtraInformations.birthplace}
                />
              </ItemContainer>
            </JustifyBetweenRow>

            <JustifyBetweenRow>
              <ItemContainer margin="0 0.5rem 0 0" width="calc((100% - 1rem)/2)">
                <InputWithIcon
                  children={<User size={16} />}
                  name="country"
                  placeholder="Enter country..."
                  onChange={handleInputChange}
                  type="text"
                  labelText="Country"
                  validationError={validationErrors.countryError}
                  value={contactExtraInformations.country}
                />
              </ItemContainer>

              <ItemContainer margin="0 0 0 0.5rem" width="calc((100% - 1rem)/2)">
                <InputWithIcon
                  children={<User size={16} />}
                  name="city"
                  placeholder="Enter city..."
                  onChange={handleInputChange}
                  type="text"
                  labelText="City"
                  validationError={validationErrors.cityError}
                  value={contactExtraInformations.city}
                />
              </ItemContainer>
            </JustifyBetweenRow>

            <JustifyBetweenRow>
              <ItemContainer margin="0 0.5rem 0 0 ">
                <InputWithIcon
                  children={<User size={16} />}
                  name="state"
                  placeholder="Enter state..."
                  onChange={handleInputChange}
                  type="text"
                  labelText="State"
                  validationError={validationErrors.stateError}
                  value={contactExtraInformations.state}
                />
              </ItemContainer>
              <ItemContainer margin="0.5rem 0 0 0.5rem">
                <InputWithIcon
                  children={<User size={16} />}
                  name="zipcode"
                  placeholder="Enter zip code..."
                  onChange={handleInputChange}
                  type="text"
                  labelText="Zip Code"
                  validationError={validationErrors.zipcodeError}
                  value={contactExtraInformations.zipcode}
                />
              </ItemContainer>
            </JustifyBetweenRow>

            <JustifyBetweenRow width="100%">
              <ItemContainer margin="0.5rem 0.5rem 0 0">
                <InputWithIcon
                  children={<User size={16} />}
                  name="address"
                  placeholder="Enter your address..."
                  onChange={handleInputChange}
                  type="text"
                  labelText="Address"
                  validationError={validationErrors.addressError}
                  value={contactExtraInformations.address}
                />
              </ItemContainer>

              <ItemContainer margin="0.5rem  0 0 0.5rem">
                <InputWithIcon
                  children={<User size={16} />}
                  name="aSharpNumber"
                  placeholder="Enter your A# number..."
                  onChange={handleInputChange}
                  type="text"
                  labelText="A# Number"
                  validationError={validationErrors.aSharpNumberError}
                  value={contactExtraInformations.aSharpNumber}
                />
              </ItemContainer>
            </JustifyBetweenRow>
          </JustifyBetweenColumn>
        </JustifyBetweenColumn>
      </ModalBody>

      <ModalFooter>
        <ConfirmCancelButtons onCancel={handleCancel} onConfirm={handleConfirm} />
      </ModalFooter>
    </Column>
  )
}

export default MakeContactToClientModal
