import React, { useEffect, useState } from 'react'
import { InputWithIcon, SelectInput } from '@/components/input'
import { JustifyBetweenColumn, JustifyBetweenRow } from '@/components/layout'
import { DatePicker, InnerWrapper, ItemContainer } from '@/components'
import { IContactCreateDTO, IOption, IUserCreateDTO } from '@/models'
import { Key, User } from 'react-feather'
import { genderOptions } from '@/constants/genders'
import { statusOptions } from '@/constants/statuses'

interface IProps {
  validationErrors: any
  createContactDTO: Omit<IContactCreateDTO, '_id'>
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBirthdayChange: (date: Date[]) => void
  onGenderChange: (option: IOption) => void
  onRefferTypeChange: (option: IOption) => void
}

const ContactInformationsStep: React.FC<IProps> = ({
  validationErrors,
  createContactDTO,
  onBirthdayChange,
  onInputChange,
  onGenderChange,
  onRefferTypeChange
}) => {
  return (
    <InnerWrapper>
      <JustifyBetweenColumn height="100%">
        <JustifyBetweenColumn height="auto" padding="2rem 0">
          <JustifyBetweenRow width="100%">
            <ItemContainer margin="0 0.5rem 0 0">
              <InputWithIcon
                children={<User size={16} />}
                name="firstname"
                placeholder="Enter first name..."
                onChange={onInputChange}
                // onBlur={validateFormFields}
                type="text"
                labelText="First Name"
                validationError={validationErrors.firstnameError}
                value={createContactDTO.firstname}
              />
            </ItemContainer>

            <ItemContainer margin="0 0 0 0.5rem">
              <InputWithIcon
                children={<User size={16} />}
                name="lastname"
                placeholder="Enter last name..."
                onChange={onInputChange}
                // onBlur={validateFormFields}
                type="text"
                labelText="Last Name"
                validationError={validationErrors.lastnameError}
                value={createContactDTO.lastname}
              />
            </ItemContainer>
          </JustifyBetweenRow>

          <JustifyBetweenRow width="100%">
            <ItemContainer margin="0.5rem 0.5rem 0 0">
              <InputWithIcon
                children={<User size={16} />}
                name="email"
                placeholder="Enter email address..."
                onChange={onInputChange}
                // onBlur={validateFormFields}
                type="email"
                labelText="E-mail"
                validationError={validationErrors.emailError}
                value={createContactDTO.email}
              />
            </ItemContainer>

            <ItemContainer margin="0.5rem 0 0 0.5rem">
              <InputWithIcon
                children={<User size={16} />}
                name="phone"
                placeholder="Enter phone number..."
                onChange={onInputChange}
                // onBlur={validateFormFields}
                type="tel"
                labelText="Phone Number"
                validationError={validationErrors.phoneError}
                value={createContactDTO.phone}
              />
            </ItemContainer>
          </JustifyBetweenRow>

          <JustifyBetweenRow width="100%">
            <ItemContainer margin="0.5rem 0.5rem 0 0">
              <DatePicker
                labelText="Birthday"
                validationError={validationErrors.birthdayError}
                name={'birthday'}
                onChange={(date: Date[]) => onBirthdayChange(date)}
              />
            </ItemContainer>

            <ItemContainer margin="0.5rem 0 0 0.5rem">
              <InputWithIcon
                children={<User size={16} />}
                name="birthplace"
                placeholder="Enter birth location..."
                onChange={onInputChange}
                // onBlur={validateFormFields}
                type="text"
                labelText="Birth Location"
                validationError={validationErrors.birthplaceError}
                value={createContactDTO.birthplace}
              />
            </ItemContainer>
          </JustifyBetweenRow>

          <JustifyBetweenRow width="100%">
            <ItemContainer margin="0.5rem 0.5rem 0 0 ">
              <SelectInput
                children={<User size={16} />}
                name="refferType"
                // placeholder="Enter birth location..."
                onChange={(option: IOption) => onRefferTypeChange(option)}
                options={genderOptions}
                labelText="Reffered By"
                validationError={validationErrors.refferTypeError}
                selectedOption={+createContactDTO.refferType}
              />
            </ItemContainer>

            <ItemContainer margin="0.5rem 0 0 0.5rem ">
              <SelectInput
                children={<User size={16} />}
                name="gender"
                // placeholder="Enter birth location..."
                onChange={(option: IOption) => onGenderChange(option)}
                options={genderOptions}
                labelText="Gender"
                validationError={validationErrors.genderError}
                selectedOption={+createContactDTO.gender}
              />
            </ItemContainer>
          </JustifyBetweenRow>
        </JustifyBetweenColumn>
      </JustifyBetweenColumn>
    </InnerWrapper>
  )
}

export default ContactInformationsStep
