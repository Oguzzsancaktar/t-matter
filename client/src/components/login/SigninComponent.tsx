import React, { useState } from 'react'
import { Button, Form, JustifyBetweenRow, Column, Row, FormErrorMessage } from '@components/index'
import { IUserLoginCredentials } from '@models/index'
import { InputWithIcon } from '../input'
import { Key, User } from 'react-feather'
import { isEmailValid, isPasswordValid } from '@utils/validationUtils'
import { useAuth } from '@hooks/useAuth'
import { useToggle } from '@hooks/useToggle'
import styled, { keyframes } from 'styled-components'
import colors from '@constants/colors'

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
  flex-direction: column;
  border-radius: 4px;
  width: 25vw;
  height: 20vh;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 16px;
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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
        <span style={{ rotate: '180deg', fontFamily: 'Satoshi-Bold', fontSize: 34, color: '#6ad3ca' }}>E</span>
        <span style={{ fontFamily: 'Satoshi-Bold', fontSize: 34, color: '#6ad3ca' }}>-</span>
        <span style={{ fontFamily: 'Satoshi-Bold', fontSize: 34, color: '#6ad3ca' }}>Matter</span>
      </div>
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
          <Button disabled={isLoginLoading}>Sign In</Button>
        </JustifyBetweenRow>
      </Form>
    </Wrapper>
  )
}

export default SigninComponent
