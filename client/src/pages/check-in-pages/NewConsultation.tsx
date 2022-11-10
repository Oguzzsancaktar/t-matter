import React from 'react'
import { PageWrapper } from './internal'
import { Input, Row, Spacer, useInput, Dropdown, Button } from '@nextui-org/react'

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
      <div style={{ width: '900px', margin: '64px auto' }}>
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
            <Dropdown.Button size="xl" flat>
              Gender
            </Dropdown.Button>
            <Dropdown.Menu aria-label="gender">
              <Dropdown.Item key="female">Female</Dropdown.Item>
              <Dropdown.Item key="male">male</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown>
            <Dropdown.Button size="xl" flat>
              Gender
            </Dropdown.Button>
            <Dropdown.Menu aria-label="gender">
              <Dropdown.Item key="female">Female</Dropdown.Item>
              <Dropdown.Item key="male">male</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown>
            <Dropdown.Button size="xl" flat>
              Gender
            </Dropdown.Button>
            <Dropdown.Menu aria-label="gender">
              <Dropdown.Item key="female">Female</Dropdown.Item>
              <Dropdown.Item key="male">male</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Row>
        <Spacer y={3} />
        <Row align="center" justify="center">
          <Button size="xl" bordered color="success" auto>
            Success
          </Button>
        </Row>
      </div>
    </PageWrapper>
  )
}

export default NewConsultation
