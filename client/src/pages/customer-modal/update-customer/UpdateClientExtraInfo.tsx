import React from 'react'
import { InputWithIcon } from '@/components/input'
import { JustifyBetweenColumn, JustifyBetweenRow } from '@/components/layout'

import { DatePicker, ItemContainer } from '@/components'
import { ICustomerCreateDTO, IOption } from '@/models'
import { User } from 'react-feather'

interface IProps {
  birthday: string
  validationErrors: any
  updateClientDTO: Omit<ICustomerCreateDTO, '_id'>
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBirthdayChange: (date: Date[]) => void
}
const UpdateCustomerExtraInfo: React.FC<IProps> = ({
  updateClientDTO,
  validationErrors,
  onInputChange,
  onBirthdayChange,
  birthday
}) => {
  return (
    <JustifyBetweenColumn height="100%">
      <JustifyBetweenColumn height="100%">
        <JustifyBetweenRow width="100%">
          <ItemContainer margin="0.5rem 0.5rem 0 0">
            <DatePicker
              labelText="Birthday"
              validationError={validationErrors.birthdayError}
              name={'birthday'}
              onChange={(date: Date[]) => onBirthdayChange(date)}
              value={birthday}
            />
          </ItemContainer>

          <ItemContainer margin="0.5rem 0 0 0.5rem">
            <InputWithIcon
              children={<User size={16} />}
              name="birthplace"
              placeholder="Enter birth location..."
              onChange={onInputChange}
              type="text"
              labelText="Birth Location"
              validationError={validationErrors.birthplaceError}
              value={updateClientDTO.birthplace}
            />
          </ItemContainer>
        </JustifyBetweenRow>

        <JustifyBetweenRow>
          <ItemContainer margin="0 0.5rem 0 0" width="calc((100% - 1rem)/2)">
            <InputWithIcon
              children={<User size={16} />}
              name="country"
              placeholder="Enter country..."
              onChange={onInputChange}
              type="text"
              labelText="Country"
              validationError={validationErrors.countryError}
              value={updateClientDTO.country}
            />
          </ItemContainer>
          <ItemContainer margin="0 0 0 0.5rem" width="calc((100% - 1rem)/2)">
            <InputWithIcon
              children={<User size={16} />}
              name="city"
              placeholder="Enter city..."
              onChange={onInputChange}
              type="text"
              labelText="City"
              validationError={validationErrors.cityError}
              value={updateClientDTO.city}
            />
          </ItemContainer>
        </JustifyBetweenRow>

        <JustifyBetweenRow>
          <ItemContainer margin="0 0.5rem 0 0 ">
            <InputWithIcon
              children={<User size={16} />}
              name="state"
              placeholder="Enter state..."
              onChange={onInputChange}
              type="text"
              labelText="State"
              validationError={validationErrors.stateError}
              value={updateClientDTO.state}
            />
          </ItemContainer>
          <ItemContainer margin="0.5rem 0 0 0.5rem">
            <InputWithIcon
              children={<User size={16} />}
              name="zipcode"
              placeholder="Enter zip code..."
              onChange={onInputChange}
              type="text"
              labelText="Zip Code"
              validationError={validationErrors.zipcodeError}
              value={updateClientDTO.zipcode}
            />
          </ItemContainer>
        </JustifyBetweenRow>

        <JustifyBetweenRow width="100%">
          <ItemContainer margin="0.5rem 0.5rem 0 0">
            <InputWithIcon
              children={<User size={16} />}
              name="address"
              placeholder="Enter your address..."
              onChange={onInputChange}
              type="text"
              labelText="Address"
              validationError={validationErrors.addressError}
              value={updateClientDTO.address}
            />
          </ItemContainer>

          <ItemContainer margin="0.5rem  0 0 0.5rem">
            <InputWithIcon
              children={<User size={16} />}
              name="aSharpNumber"
              placeholder="Enter your A# number..."
              onChange={onInputChange}
              type="text"
              labelText="A# Number"
              validationError={validationErrors.aSharpNumberError}
              value={updateClientDTO.aSharpNumber}
            />
          </ItemContainer>
        </JustifyBetweenRow>
      </JustifyBetweenColumn>
    </JustifyBetweenColumn>
  )
}

export default UpdateCustomerExtraInfo
