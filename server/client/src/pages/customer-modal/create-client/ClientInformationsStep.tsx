import React, { useEffect, useState } from 'react'
import { InputWithIcon, SelectInput } from '@/components/input'
import { JustifyBetweenColumn, JustifyBetweenRow } from '@/components/layout'
import { DatePicker, InnerWrapper, ItemContainer } from '@/components'
import { EGender, ICustomerCreateDTO, IOption, IRefferedBy } from '@/models'
import { Key, User } from 'react-feather'
import { genderOptions } from '@/constants/genders'
import { useGetRefferedBysQuery } from '@/services/settings/company-planning/dynamicVariableService'

interface IProps {
  validationErrors: any
  createClientDTO: Omit<ICustomerCreateDTO, '_id'>
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onGenderChange: (option: IOption) => void
  onRefferTypeChange: (option: IOption) => void
}

const ClientInformationsStep: React.FC<IProps> = ({
  validationErrors,
  createClientDTO,
  onInputChange,
  onGenderChange,
  onRefferTypeChange
}) => {
  const { data: refferedByData, isLoading: refferedByDataIsLoading } = useGetRefferedBysQuery()

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
                value={createClientDTO.firstname}
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
                value={createClientDTO.lastname}
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
                value={createClientDTO.email}
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
                value={createClientDTO.phone}
              />
            </ItemContainer>
          </JustifyBetweenRow>

          <JustifyBetweenRow width="100%">
            <ItemContainer margin="0.5rem 0.5rem 0 0 ">
              <SelectInput
                children={<User size={16} />}
                name="refferedBy"
                // placeholder="Enter birth location..."
                onChange={(option: IOption) => onRefferTypeChange(option)}
                options={(refferedByData || []).map((refferedBy: IRefferedBy) => ({
                  label: refferedBy.name,
                  value: refferedBy._id
                }))}
                isLoading={refferedByDataIsLoading}
                labelText="Reffered By"
                validationError={validationErrors.refferedByError}
                selectedOption={[{ value: createClientDTO.refferedBy, label: createClientDTO.refferedBy }]}
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
                selectedOption={[
                  { value: createClientDTO.gender.toString(), label: EGender[createClientDTO.gender.toString()] }
                ]}
              />
            </ItemContainer>
          </JustifyBetweenRow>
        </JustifyBetweenColumn>
      </JustifyBetweenColumn>
    </InnerWrapper>
  )
}

export default ClientInformationsStep
