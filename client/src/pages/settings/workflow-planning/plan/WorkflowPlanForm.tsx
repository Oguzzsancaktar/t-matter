import React, { useState } from 'react'

import {
  ColorSelect,
  InputWithText,
  ItemContainer,
  JustifyBetweenColumn,
  JustifyBetweenRow,
  SelectInput
} from '@/components'
import { ILocation, IOption, ITaskCategory, ITaskChecklist, ITaskCreateDTO, IUser } from '@/models'
import { useGetCategoriesQuery, useGetChecklistsQuery } from '@/services/settings/workflow-planning/workflowService'
import { useGetUsersQuery } from '@/services/settings/user-planning/userService'
import CLIENT_TASK_TABS_ARR from '@/constants/clientTaskTabs'
import { useGetLocationsQuery } from '@/services/settings/company-planning/dynamicVariableService'
import emptyQueryParams from '@/constants/queryParams'

interface IProps {
  data: ITaskCreateDTO
  activeStep: number
  errors: any
  onDataChange: (ITaskCreateDTO) => void
}
const WorkflowPlanForm: React.FC<IProps> = ({ data, errors, onDataChange }) => {
  const { data: categoriesData, isLoading: isCategoriesLoading } = useGetCategoriesQuery(emptyQueryParams)
  const { data: checklistsData, isLoading: isChecklistsLoading } = useGetChecklistsQuery(emptyQueryParams)
  const { data: locationsData, isLoading: locationsDataIsLoading } = useGetLocationsQuery(emptyQueryParams)

  const [searchQueryParams, setSearchQueryParams] = useState(emptyQueryParams)
  const { data: usersData, isLoading: isUsersDataLoading } = useGetUsersQuery(searchQueryParams)

  const handleCategoryChange = (option: IOption) => {
    const dataInstance = { ...data }
    dataInstance.category = {
      _id: option.value,
      name: option.label
    }
    onDataChange(dataInstance)
  }

  const handleLocationChange = (option: IOption) => {
    const dataInstance = { ...data }
    dataInstance.location = {
      _id: option.value,
      name: option.label
    }
    onDataChange(dataInstance)
  }

  const handleUserChange = (option: IOption) => {
    const dataInstance = { ...data }
    dataInstance.responsibleUser = {
      _id: option.value,
      firstname: option.label,
      lastname: option.label
    }
    onDataChange(dataInstance)
  }

  const handleTabChange = (options: IOption[]) => {
    const dataInstance = { ...data }

    dataInstance.tabs = options.map((option: IOption) => option.value)
    onDataChange(dataInstance)
  }

  const handleChecklistChange = (options: IOption[]) => {
    const dataInstance = { ...data }
    const checklistIdArr = options.map(option => option.value)
    let selectedChecklists: ITaskChecklist[] = []

    if (checklistsData) {
      checklistIdArr.forEach(id => {
        const checklistDetail: ITaskChecklist[] = checklistsData.filter(checklist => checklist._id === id)
        selectedChecklists = selectedChecklists.concat(checklistDetail)
      })
    }

    dataInstance.checklistItems = selectedChecklists
    onDataChange(dataInstance)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const dataInstance = { ...data }
    dataInstance[event.target.name] = +event.target.value
    onDataChange(dataInstance)
  }

  const handleColorChange = (color: string) => {
    const dataInstance = { ...data }
    dataInstance.stepColor = color
    onDataChange(dataInstance)
  }

  return (
    <ItemContainer height="100%" padding="0 1rem">
      <JustifyBetweenColumn height="100%">
        <ItemContainer>
          <JustifyBetweenRow>
            <ItemContainer width="calc((100% - 1rem)/2)">
              <SelectInput
                name={'stepCategory'}
                labelText="Workflow Category"
                selectedOption={[
                  {
                    value: data.category._id,
                    label: data.category.name
                  }
                ]}
                options={(categoriesData || []).map((category: ITaskCategory) => ({
                  label: category.name,
                  value: category._id
                }))}
                onChange={handleCategoryChange}
                isLoading={isCategoriesLoading}
                validationError={errors.categoryError}
              />
            </ItemContainer>

            <ItemContainer width="calc((100% - 1rem)/2)">
              <InputWithText
                name={'expireDuration'}
                labelText="Task Expire Duration"
                placeholder="Task Expire Duration"
                children="Days"
                onChange={handleInputChange}
                type="number"
                value={data.expireDuration || ''}
                validationError={errors.expireDurationError}
              />
            </ItemContainer>
          </JustifyBetweenRow>
        </ItemContainer>

        <ItemContainer>
          <JustifyBetweenRow>
            <ItemContainer width="calc((100% - 1rem)/2)">
              <SelectInput
                name={'locations'}
                labelText="Task Location"
                selectedOption={[
                  {
                    value: data.location._id,
                    label: data.location.name
                  }
                ]}
                options={(locationsData || []).map((location: ILocation) => ({
                  label: location.name,
                  value: location._id
                }))}
                onChange={handleLocationChange}
                isLoading={locationsDataIsLoading}
                validationError={errors.locationError}
              />
            </ItemContainer>

            <ItemContainer width="calc((100% - 1rem)/2)">
              <InputWithText
                name={'postponeTime'}
                labelText="Task Postpone Time"
                placeholder="Task Postpone Time"
                children="Times"
                onChange={handleInputChange}
                type="number"
                value={data.postponeTime || ''}
                validationError={errors.postponeTimeError}
              />
            </ItemContainer>
          </JustifyBetweenRow>
        </ItemContainer>

        <ItemContainer>
          <SelectInput
            name={'responsibleUser'}
            labelText="Responsible User"
            selectedOption={[
              {
                value: data.responsibleUser._id,
                label: data.responsibleUser.firstname + ' ' + data.responsibleUser.lastname
              }
            ]}
            options={(usersData || []).map((user: IUser) => ({
              label: user.firstname + ' ' + user.lastname,
              value: user._id
            }))}
            onChange={handleUserChange}
            isLoading={isUsersDataLoading}
            validationError={errors.responsibleUserError}
          />
        </ItemContainer>

        <ItemContainer>
          <SelectInput
            name={'stepTabs'}
            labelText="Task Tabs"
            selectedOption={data.tabs.map((tabName: string) => ({
              label: tabName,
              value: tabName
            }))}
            isMulti={true}
            options={(CLIENT_TASK_TABS_ARR || []).map((tab: string) => ({
              label: tab,
              value: tab
            }))}
            onChange={handleTabChange}
            validationError={errors.tabsError}
          />
        </ItemContainer>

        <ItemContainer>
          <SelectInput
            name={'stepChecklists'}
            labelText="Checklist Items"
            isMulti={true}
            isLoading={isChecklistsLoading}
            selectedOption={data.checklistItems.map(checklist => ({
              label: checklist.name,
              value: checklist._id
            }))}
            options={(checklistsData || []).map((checklist: ITaskChecklist) => ({
              label: checklist.name,
              value: checklist._id
            }))}
            onChange={handleChecklistChange}
            validationError={errors.checklistItemsError}
          />
        </ItemContainer>

        <ItemContainer>
          <ColorSelect
            labelText="Task Step Color"
            value={data.stepColor}
            onClick={handleColorChange}
            validationError={errors.stepColorError}
          />
        </ItemContainer>
      </JustifyBetweenColumn>
    </ItemContainer>
  )
}

export default WorkflowPlanForm
