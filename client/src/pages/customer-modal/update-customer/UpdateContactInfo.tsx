import React from 'react'
import { InputWithIcon, ItemContainer, JustifyBetweenColumn, JustifyBetweenRow, SelectInput } from '@/components'
import { genderOptions } from '@/constants/genders'
import { IOption, IRefferedBy, EGender, ICustomerCreateDTO, IJobTitle } from '@/models'
import { User } from 'react-feather'
import {
  useGetJobTitlesQuery,
  useGetRefferedBysQuery
} from '@/services/settings/company-planning/dynamicVariableService'
import { emptyQueryParams } from '@/constants/queryParams'

interface IProps {
  validationErrors: any
  updateContactDTO: Omit<ICustomerCreateDTO, '_id'>
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onGenderChange: (option: IOption) => void
  onRefferTypeChange: (option: IOption) => void
  onJobTitleChange: (option: IOption) => void
}

const UpdateContactInfo: React.FC<IProps> = ({
  validationErrors,
  updateContactDTO,
  onInputChange,
  onGenderChange,
  onRefferTypeChange,
  onJobTitleChange
}) => {
  const { data: refferedByData, isLoading: refferedByDataIsLoading } = useGetRefferedBysQuery(emptyQueryParams)
  const { data: jobTitleData, isLoading: jobTitleDataIsLoading } = useGetJobTitlesQuery(emptyQueryParams)

  return (
    <ItemContainer>
      <JustifyBetweenColumn height="100%">
        <JustifyBetweenColumn height="auto">
          <JustifyBetweenRow width="100%" margin="1rem 0">
            <ItemContainer margin=" 0 0.5rem 0 0">
              <InputWithIcon
                children={<User size={16} />}
                name="firstname"
                placeholder="Enter first name..."
                onChange={onInputChange}
                type="text"
                labelText="First Name"
                validationError={validationErrors.firstnameError}
                value={updateContactDTO.firstname}
              />
            </ItemContainer>
            <ItemContainer margin="0 0 0 0.5rem">
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
                selectedOption={[{ value: updateContactDTO.refferedBy._id, label: updateContactDTO.refferedBy.name }]}
              />
            </ItemContainer>
          </JustifyBetweenRow>

          <JustifyBetweenRow width="100%" margin="1rem 0">
            <ItemContainer margin="0 0.5rem 0 0">
              <InputWithIcon
                children={<User size={16} />}
                name="lastname"
                placeholder="Enter last name..."
                onChange={onInputChange}
                type="text"
                labelText="Last Name"
                validationError={validationErrors.lastnameError}
                value={updateContactDTO.lastname}
              />
            </ItemContainer>
            <ItemContainer margin="0 0 0 0.5rem ">
              <SelectInput
                children={<User size={16} />}
                name="gender"
                // placeholder="Enter birth location..."
                onChange={(option: IOption) => onGenderChange(option)}
                options={genderOptions}
                labelText="Gender"
                validationError={validationErrors.genderError}
                selectedOption={[
                  { value: updateContactDTO?.gender.toString(), label: EGender[updateContactDTO.gender.toString()] }
                ]}
              />
            </ItemContainer>
          </JustifyBetweenRow>

          <JustifyBetweenRow width="100%" margin="1rem 0">
            <ItemContainer margin="0 0.5rem 0 0">
              <InputWithIcon
                children={<User size={16} />}
                name="phone"
                placeholder="Enter phone number..."
                onChange={onInputChange}
                type="tel"
                labelText="Phone Number"
                validationError={validationErrors.phoneError}
                value={updateContactDTO.phone}
              />
            </ItemContainer>

            <ItemContainer margin="0 0 0 0.5rem">
              <InputWithIcon
                children={<User size={16} />}
                name="email"
                placeholder="Enter email address..."
                onChange={onInputChange}
                type="email"
                labelText="E-mail"
                validationError={validationErrors.emailError}
                value={updateContactDTO.email}
              />
            </ItemContainer>
          </JustifyBetweenRow>

          <JustifyBetweenRow width="100%" margin="1rem 0">
            <ItemContainer>
              <SelectInput
                children={<User size={16} />}
                name="jobTitle"
                onChange={(option: IOption) => onJobTitleChange(option)}
                options={(jobTitleData || []).map((jobTitle: IJobTitle) => ({
                  label: jobTitle.name,
                  value: jobTitle._id
                }))}
                isLoading={jobTitleDataIsLoading}
                labelText="Job Title"
                validationError={validationErrors.jobTitleError}
                selectedOption={[{ value: updateContactDTO.jobTitle._id, label: updateContactDTO.jobTitle.name }]}
              />
            </ItemContainer>
          </JustifyBetweenRow>
        </JustifyBetweenColumn>
      </JustifyBetweenColumn>
    </ItemContainer>
  )
}
export default UpdateContactInfo
