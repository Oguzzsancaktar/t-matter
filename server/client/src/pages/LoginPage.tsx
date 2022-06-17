import { InnerWrapper, JustifyCenterColumn, PageWrapper, SigninComponent } from '@components/index'
import colors from '@constants/colors'
import { useAuth } from '@hooks/useAuth'
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { keyframes } from 'styled-components'
import styled from 'styled-components'

const rotate = keyframes`
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
`

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  // background: ${colors.green.primary};
  // background: linear-gradient(-45deg, ${colors.black.light} 0%, ${colors.black.primary} 100%);
  background-size: 150% 150%;
  animation: ${rotate} 10s ease-in-out infinite;
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
    loggedUser: { accessToken, user, isLoading }
  } = useAuth()

  const navigate = useNavigate()

  useEffect(() => {
    if (accessToken && user && !isLoading) {
      navigate('/')
    }
  }, [accessToken, user, isLoading, navigate])

  return (
    <PageWrapper>
      <Wrapper>
        <Link to={'/'}>Home</Link>
        <Container>
          <InnerWrapper>
            <JustifyCenterColumn>
              <SigninComponent />
            </JustifyCenterColumn>
          </InnerWrapper>
        </Container>
      </Wrapper>
    </PageWrapper>
  )
}

export default LoginPage
