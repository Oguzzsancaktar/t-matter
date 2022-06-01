import React, { useEffect, useState } from 'react'
import { InputWithIcon, SelectInput } from '@/components/input'
import { JustifyBetweenColumn, JustifyBetweenRow } from '@/components/layout'
import { closeModal } from '@/store'
import { DatePicker, InnerWrapper, ItemContainer } from '@/components'
import { IClientCreateDTO, IUserCreateDTO } from '@/models'
import { Key, User } from 'react-feather'

import { genderOptions } from '@/constants/genders'
import { statusOptions } from '@/constants/statuses'

interface IProps {
  validationErrors: any
  createClientDTO: Omit<IClientCreateDTO, '_id'>
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}
const ClientExtraInformationsStep: React.FC<IProps> = ({ createClientDTO, validationErrors, onInputChange }) => {
  return (
    <InnerWrapper>
      <JustifyBetweenColumn height="100%">
        <JustifyBetweenColumn height="100%" padding="2rem 0">
          <JustifyBetweenRow>
            <ItemContainer margin="0 0.5rem 0 0 " width="calc((100% - 1rem)/2)">
              <InputWithIcon
                children={<User size={16} />}
                name="country"
                placeholder="Enter country..."
                onChange={onInputChange}
                // onBlur={validateFormFields}
                type="text"
                labelText="Country"
                validationError={validationErrors.countryError}
                value={createClientDTO.country}
              />
            </ItemContainer>

            <ItemContainer margin="0 0 0 0.5rem" width="calc((100% - 1rem)/2)">
              <InputWithIcon
                children={<User size={16} />}
                name="city"
                placeholder="Enter city..."
                onChange={onInputChange}
                // onBlur={validateFormFields}
                type="text"
                labelText="City"
                validationError={validationErrors.cityError}
                value={createClientDTO.city}
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
                // onBlur={validateFormFields}
                type="text"
                labelText="State"
                validationError={validationErrors.stateError}
              />
            </ItemContainer>
            <ItemContainer margin="0.5rem 0 0 0.5rem">
              <InputWithIcon
                children={<User size={16} />}
                name="zipcode"
                placeholder="Enter zip code..."
                onChange={onInputChange}
                // onBlur={validateFormFields}
                type="text"
                labelText="Zip Code"
                validationError={validationErrors.zipcodeError}
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
                // onBlur={validateFormFields}
                type="text"
                labelText="Address"
                validationError={validationErrors.addressError}
              />
            </ItemContainer>

            <ItemContainer margin="0.5rem  0 0 0.5rem">
              <InputWithIcon
                children={<User size={16} />}
                name="aSharpNumber"
                placeholder="Enter your A# number..."
                onChange={onInputChange}
                // onBlur={validateFormFields}
                type="text"
                labelText="A# Number"
                validationError={validationErrors.aSharpNumberError}
              />
            </ItemContainer>
          </JustifyBetweenRow>
        </JustifyBetweenColumn>
      </JustifyBetweenColumn>
    </InnerWrapper>
  )
}

export default ClientExtraInformationsStep
