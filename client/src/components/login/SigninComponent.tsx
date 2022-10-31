import React, { useState } from 'react'
import { Button, Form, JustifyBetweenRow, Column, Row, FormErrorMessage } from '@components/index'
import { IUserLoginCredentials } from '@models/index'
import { InputWithIcon } from '../input'
import { Key, User } from 'react-feather'
import { isEmailValid, isPasswordValid } from '@utils/validationUtils'
import { useAuth } from '@hooks/useAuth'
import { useToggle } from '@hooks/useToggle'
import styled, { keyframes } from 'styled-components'

const animate = keyframes`
  0% {
    box-shadow: rgb(0 0 0 / 10%) 0px 0px 20px 20px;
  }
  50% {
    box-shadow: rgb(0 0 0 / 10%) 0px 0px 0px 0px;
  }
  100% {
    box-shadow: rgb(0 0 0 / 10%) 0px 0px 20px 20px;
  }
  `

const Wrapper = styled.div`
  border-radius: 4px;
  padding: 30px;
  background-color: #fff;
  transition: all 0.3s ease-in-out;
  animation: ${animate} 2s ease-in-out infinite;
`

interface Props {}
const SigninComponent: React.FC<Props> = () => {
  const [isPasswordVisible, togglePasswordVisibility] = useToggle(false)

  const {
    tryLogin: { login, isLoginLoading }
  } = useAuth()

  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [errorMessage, toastError] = useState('')

  const [credentials, setCredentials] = useState<IUserLoginCredentials>({
    email: 'admin@admin.com',
    password: 'admin2022'
  })

  const validateFormFields = (): boolean => {
    setEmailError(false)
    setPasswordError(false)
    toastError('')
    if (!isEmailValid(credentials.email)) {
      toastError('Please enter a valid email')
      setEmailError(true)
      return false
    }
    if (!isPasswordValid(credentials.password)) {
      toastError('Password must be at least 6 characters long')
      setPasswordError(true)
      return false
    }
    return true
  }

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const validationResult = validateFormFields()

    try {
      if (validationResult) {
        login(credentials)
      }
    } catch (error: any) {
      toastError(error.data.errors[0])
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value } as IUserLoginCredentials)
  }

  return (
    <Wrapper>
      <Form onSubmit={handleSignIn}>
        <Column>
          <div style={{ marginBottom: 16 }}>
            <InputWithIcon
              validationError={emailError}
              onChange={handleInputChange}
              onBlur={validateFormFields}
              name="email"
              placeholder="email"
              type="text"
              value={credentials.email}
            >
              <User size="16px" />
            </InputWithIcon>
          </div>
          <InputWithIcon
            validationError={passwordError}
            onBlur={validateFormFields}
            onChange={handleInputChange}
            name="password"
            placeholder="Password"
            value={credentials.password}
            handleVisibility={togglePasswordVisibility}
            isPasswordVisible={isPasswordVisible}
            type={isPasswordVisible ? 'text' : 'password'}
          >
            <Key size="16px" />
          </InputWithIcon>
          <Row>
            <FormErrorMessage message={errorMessage} />
          </Row>
        </Column>
        <JustifyBetweenRow>
          {/* <InputCheckbox /> */}
          <Button disabled={isLoginLoading}>Sign In</Button>
        </JustifyBetweenRow>
      </Form>
    </Wrapper>
  )
}

export default SigninComponent
