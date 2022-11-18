import { ItemContainer, JustifyCenterColumn, SigninComponent } from '@components/index'
import colors from '@constants/colors'
import { useAuth } from '@hooks/useAuth'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: #757f9a; /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #757f9a, #d7dde8); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #757f9a, #d7dde8);
  transition: 2s ease-in-out;
`
const Container = styled.div`
  height: 100%;
  width: 100%;
  max-height: 600px;
  max-width: 300px;
  margin: auto;
  position: absolute;
  padding: 0;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  margin: auto;
`

const LoginPage: React.FC = () => {
  const {
    loggedUser: { accessToken, user }
  } = useAuth()

  const navigate = useNavigate()

  useEffect(() => {
    if (accessToken && user) {
      navigate('/dashboard')
    }
  }, [accessToken, user, navigate])

  return (
    <Wrapper>
      <Container>
        <ItemContainer>
          <JustifyCenterColumn>
            <SigninComponent />
          </JustifyCenterColumn>
        </ItemContainer>
      </Container>
    </Wrapper>
  )
}

export default LoginPage
