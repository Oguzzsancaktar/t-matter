import React, { useState } from 'react'
import { PageWrapper } from './internal'
import { Input, Row, Spacer, useInput, Dropdown, Button } from '@nextui-org/react'
import {
  useGetJobTitlesQuery,
  useGetRefferedBysQuery
} from '@services/settings/company-planning/dynamicVariableService'
import { emptyQueryParams } from '@constants/queryParams'
import { useGetUsersQuery } from '@services/settings/user-planning/userService'

type IHelperValidation = (
  value: string,
  validation: (value: string) => any,
  field: string
) => { text: string; color: 'default' | 'error' | 'success' }

const NewConsultation = () => {
  const { value: emailValue, reset: emailReset, bindings: emailBindings } = useInput('')
  const { value: phoneValue, reset: phoneReset, bindings: phoneBindings } = useInput('')
  const { value: firstNameValue, reset: firstNameReset, bindings: firstNameBindings } = useInput('')
  const { value: lastNameValue, reset: lastNameReset, bindings: lastNameBindings } = useInput('')
  const [genderSelectedKey, setGenderSelectedKey] = useState('')
  const [jobTitleSelectedKey, setJobTitleSelectedKey] = useState('')
  const [userSelectedKey, setUserSelectedKey] = useState('')
  const [referredBySelectedKey, setReferredBySelectedKey] = useState('')

  const { data: referredByData, isLoading: referredByDataIsLoading } = useGetRefferedBysQuery(emptyQueryParams)
  const { data: jobTitleData, isLoading: jobTitleDataIsLoading } = useGetJobTitlesQuery(emptyQueryParams)
  const { data: users } = useGetUsersQuery(emptyQueryParams)

  const validateEmail = emailValue => {
    return emailValue.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i)
  }

  const validatePhone = phoneValue => {
    return phoneValue.match(/\(?\d{3}\)?-? *\d{3}-? *-?\d{4}/)
  }

  const validateName = nameValue => {
    return nameValue.match(/^[a-z ,.'-]+$/i)
  }

  const helper: IHelperValidation = (value, validation, field) => {
    if (!value) {
      return {
        text: `please enter your ${field}`,
        color: 'default'
      }
    }
    const isValid = validation(value)
    return {
      text: isValid ? `Correct ${field}` : `Enter a valid ${field}`,
      color: isValid ? 'success' : 'error'
    }
  }

  const emailHelper = helper(emailValue, validateEmail, 'email')
  const phoneHelper = helper(phoneValue, validatePhone, 'phone')
  const firstNameHelper = helper(firstNameValue, validateName, 'first name')
  const lastNameHelper = helper(lastNameValue, validateName, 'last name')

  return (
    <PageWrapper title="New consultation">
      <div style={{ width: '900px', margin: '250px auto' }}>
        <Row fluid>
          <Input
            {...firstNameBindings}
            status={firstNameHelper.color}
            color={firstNameHelper.color}
            helperColor={firstNameHelper.color}
            helperText={firstNameHelper.text}
            onClearClick={firstNameReset}
            bordered
            width="100%"
            size="xl"
            clearable
            label="First name"
            placeholder="First name"
          />
          <Spacer x={2} />
          <Input
            {...lastNameBindings}
            status={lastNameHelper.color}
            color={lastNameHelper.color}
            helperColor={lastNameHelper.color}
            helperText={lastNameHelper.text}
            onClearClick={lastNameReset}
            bordered
            width="100%"
            size="xl"
            clearable
            label="Last name"
            placeholder="Last name"
          />
        </Row>
        <Spacer y={3} />
        <Row fluid>
          <Input
            {...phoneBindings}
            status={phoneHelper.color}
            color={phoneHelper.color}
            helperColor={phoneHelper.color}
            helperText={phoneHelper.text}
            onClearClick={phoneReset}
            clearable
            bordered
            width="100%"
            size="xl"
            label="Phone number"
            placeholder="Phone number"
          />
          <Spacer x={2} />
          <Input
            {...emailBindings}
            status={emailHelper.color}
            color={emailHelper.color}
            helperColor={emailHelper.color}
            helperText={emailHelper.text}
            onClearClick={emailReset}
            clearable
            bordered
            size="xl"
            width="100%"
            type="email"
            label="Email"
            placeholder="Please enter your email"
          />
        </Row>
        <Spacer y={3} />
        <Row>
          <Dropdown>
            <Dropdown.Button css={{ tt: 'capitalize' }} size="xl" flat>
              {genderSelectedKey ? genderSelectedKey : 'Select gender'}
            </Dropdown.Button>
            <Dropdown.Menu
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={genderSelectedKey}
              aria-label="gender"
              // @ts-ignore
              onSelectionChange={setGenderSelectedKey}
            >
              <Dropdown.Item key="female">Female</Dropdown.Item>
              <Dropdown.Item key="male">Male</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Spacer x={2} />

          <Dropdown>
            <Dropdown.Button css={{ tt: 'capitalize' }} size="xl" flat>
              {jobTitleSelectedKey ? jobTitleSelectedKey : 'Select job title'}
            </Dropdown.Button>
            {jobTitleData && (
              <Dropdown.Menu aria-label="job">
                {jobTitleData.map(jobTitle => {
                  return <Dropdown.Item key={jobTitle.name}>{jobTitle.name}</Dropdown.Item>
                })}
              </Dropdown.Menu>
            )}
          </Dropdown>

          <Spacer x={2} />

          <Dropdown>
            <Dropdown.Button css={{ tt: 'capitalize' }} size="xl" flat>
              {userSelectedKey ? userSelectedKey : 'Select user'}
            </Dropdown.Button>
            {users && (
              <Dropdown.Menu aria-label="user">
                {users.map(user => {
                  return <Dropdown.Item key={user._id}>{user.firstname + ' ' + user.lastname}</Dropdown.Item>
                })}
              </Dropdown.Menu>
            )}
          </Dropdown>

          <Spacer x={2} />
          <Dropdown>
            <Dropdown.Button css={{ tt: 'capitalize' }} size="xl" flat>
              {userSelectedKey ? userSelectedKey : 'Select referred by'}
            </Dropdown.Button>
            {referredByData && (
              <Dropdown.Menu aria-label="referredBy">
                {referredByData.map(referredBy => {
                  return <Dropdown.Item key={referredBy._id}>{referredBy.name}</Dropdown.Item>
                })}
              </Dropdown.Menu>
            )}
          </Dropdown>
        </Row>
        <Spacer y={2} />
        <Row align="center" justify="center">
          <Button size="xl" color="warning">
            Success
          </Button>
        </Row>
      </div>
    </PageWrapper>
  )
}

export default NewConsultation
