import { ItemContainer, JustifyCenterColumn, PageWrapper, SigninComponent } from '@components/index'
import colors from '@constants/colors'
import { useAuth } from '@hooks/useAuth'
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { keyframes } from 'styled-components'
import styled from 'styled-components'

const rotate = keyframes`
	0% {
    background: linear-gradient(90deg, ${colors.purple.primary} 0%, ${colors.blue.primary} 100%);
	}
  5% {
    background: linear-gradient(70deg, ${colors.purple.primary} 0%, ${colors.blue.primary} 100%);
  }
  10% {
    background: linear-gradient(50deg, ${colors.purple.primary} 0%, ${colors.blue.primary} 100%);
  }
  15% {
    background: linear-gradient(30deg, ${colors.purple.primary} 0%, ${colors.blue.primary} 100%);
  }
  20% {
    background: linear-gradient(10deg, ${colors.purple.primary} 0%, ${colors.blue.primary} 100%);
  }
  25% {
    background: linear-gradient(-10deg, ${colors.purple.primary} 0%, ${colors.blue.primary} 100%);
  }
  30% {
    background: linear-gradient(-30deg, ${colors.purple.primary} 0%, ${colors.blue.primary} 100%);
  }
	50% {
    background: linear-gradient(-50deg, ${colors.purple.primary} 0%, ${colors.blue.primary} 100%);
	}
  55% {
    background: linear-gradient(-70deg, ${colors.purple.primary} 0%, ${colors.blue.primary} 100%);
  }
  60% {
    background: linear-gradient(-90deg, ${colors.purple.primary} 0%, ${colors.blue.primary} 100%);
  }
  65% {
    background: linear-gradient(-110deg, ${colors.purple.primary} 0%, ${colors.blue.primary} 100%);
  }
  70% {
    background: linear-gradient(-130deg, ${colors.purple.primary} 0%, ${colors.blue.primary} 100%);
  }
  75% {
    background: linear-gradient(-150deg, ${colors.purple.primary} 0%, ${colors.blue.primary} 100%);
  }
  80% {
    background: linear-gradient(-170deg, ${colors.purple.primary} 0%, ${colors.blue.primary} 100%);
  }
  85% {
    background: linear-gradient(-190deg, ${colors.purple.primary} 0%, ${colors.blue.primary} 100%);
  }
  90% {
    background: linear-gradient(-210deg, ${colors.purple.primary} 0%, ${colors.blue.primary} 100%);
  }
  95% {
    background: linear-gradient(-230deg, ${colors.purple.primary} 0%, ${colors.blue.primary} 100%);
  }
	100% {
    background: linear-gradient(-250deg, ${colors.purple.primary} 0%, ${colors.blue.primary} 100%);
	}
`

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(-45deg, ${colors.purple.primary} 0%, ${colors.blue.primary} 100%);
  transition: 2s ease-in-out;
  animation: ${rotate} 2s ease-in-out infinite;
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
      navigate('/')
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
