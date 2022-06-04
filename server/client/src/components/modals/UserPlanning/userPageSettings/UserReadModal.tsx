import { Badge } from '@/components/badge'
import { Button } from '@/components/button'
import { ActionButtons } from '@/components/data-tables'
import { UserImage } from '@/components/image'
import { ItemContainer } from '@/components/item-container'
import { JustifyBetweenColumn, JustifyBetweenRow, JustifyCenterRow } from '@/components/layout'
import { H1, Label } from '@/components/texts'
import { InnerWrapper } from '@/components/wrapper'
import colors from '@/constants/colors'
import { UserModalSettingsTab } from '@/pages'
import React, { useState } from 'react'

interface IProps {
  userId: string
}

const UserReadModal: React.FC<IProps> = ({ userId }) => {
  const [activeTab, setActiveTab] = useState('log-in')

  const renderSwitch = () => {
    switch (activeTab) {
      case 'log-in':
        return <UserModalSettingsTab />
      case 'settings':
        return <UserModalSettingsTab />
    }
  }

  return (
    <InnerWrapper>
      <JustifyBetweenRow height="100%">
        <ItemContainer width="350px" height="100%">
          <JustifyBetweenColumn height="100%">
            <ItemContainer>
              <JustifyBetweenColumn>
                <ItemContainer>
                  <UserImage width="150px" height="150px" />
                  <H1>User Name</H1>
                </ItemContainer>
                <ItemContainer>
                  <JustifyCenterRow>
                    <Badge children={<H1>User</H1>} color={colors.gray.dark} />
                    <Badge children={<H1>Active</H1>} color={colors.green.primary} />
                  </JustifyCenterRow>
                </ItemContainer>
              </JustifyBetweenColumn>
            </ItemContainer>

            <ItemContainer>
              <JustifyBetweenColumn>
                <ItemContainer>
                  <JustifyBetweenRow>
                    <ItemContainer width="90px" margin="0 0.5rem 0 0">
                      <H1 fontSize="13px" color={colors.black.dark}>
                        Address
                      </H1>
                    </ItemContainer>
                    <ItemContainer width="calc(100% - 90px - 0.5rem)">
                      <H1 fontSize="12px" color={colors.black.light}>
                        1061 Main avaneue Patterson New Jerset 07470 USA
                      </H1>
                    </ItemContainer>
                  </JustifyBetweenRow>
                </ItemContainer>

                <ItemContainer>
                  <JustifyBetweenRow>
                    <ItemContainer width="90px" margin="0 0.5rem 0 0">
                      <H1 fontSize="13px" color={colors.black.dark}>
                        Email
                      </H1>
                    </ItemContainer>
                    <ItemContainer width="calc(100% - 90px - 0.5rem)">
                      <H1 fontSize="12px" color={colors.black.light}>
                        violetmendez@gmail.com
                      </H1>
                    </ItemContainer>
                  </JustifyBetweenRow>
                </ItemContainer>
                <ItemContainer>
                  <JustifyBetweenRow>
                    <ItemContainer width="90px" margin="0 0.5rem 0 0">
                      <H1 fontSize="13px" color={colors.black.dark}>
                        Contact
                      </H1>
                    </ItemContainer>
                    <ItemContainer width="calc(100% - 90px - 0.5rem)">
                      <H1 fontSize="12px" color={colors.black.light}>
                        (201) 755 62 63
                      </H1>
                    </ItemContainer>
                  </JustifyBetweenRow>
                </ItemContainer>
                <ItemContainer>
                  <JustifyBetweenRow>
                    <ItemContainer width="90px" margin="0 0.5rem 0 0">
                      <H1 fontSize="13px" color={colors.black.dark}>
                        Birthday
                      </H1>
                    </ItemContainer>
                    <ItemContainer width="calc(100% - 90px - 0.5rem)">
                      <H1 fontSize="12px" color={colors.black.light}>
                        sep/12/1998
                      </H1>
                    </ItemContainer>
                  </JustifyBetweenRow>
                </ItemContainer>
                <ItemContainer>
                  <JustifyBetweenRow>
                    <ItemContainer width="90px" margin="0 0.5rem 0 0">
                      <H1 fontSize="13px" color={colors.black.dark}>
                        Birth Location
                      </H1>
                    </ItemContainer>
                    <ItemContainer width="calc(100% - 90px - 0.5rem)">
                      <H1 fontSize="12px" color={colors.black.light}>
                        Mexico
                      </H1>
                    </ItemContainer>
                  </JustifyBetweenRow>
                </ItemContainer>
              </JustifyBetweenColumn>
            </ItemContainer>

            <ItemContainer>
              <ActionButtons
                onRead={function (): void {
                  throw new Error('Function not implemented.')
                }}
                onEdit={function (): void {
                  throw new Error('Function not implemented.')
                }}
                onHistory={function (): void {
                  throw new Error('Function not implemented.')
                }}
                onDelete={function (): void {
                  throw new Error('Function not implemented.')
                }}
              />
            </ItemContainer>
          </JustifyBetweenColumn>
        </ItemContainer>
        <ItemContainer height="100%" width="70px">
          <JustifyBetweenColumn height="100%">
            <ItemContainer height="100%" margin="0 0 1rem 0">
              <Button onClick={() => setActiveTab('log-in')}>Log In</Button>
            </ItemContainer>
            <ItemContainer height="100%" margin="0 0 0 0">
              <Button onClick={() => setActiveTab('settings')}>Settings</Button>
            </ItemContainer>
          </JustifyBetweenColumn>
        </ItemContainer>
        <ItemContainer>{renderSwitch()}</ItemContainer>
      </JustifyBetweenRow>
    </InnerWrapper>
  )
}

export default UserReadModal
