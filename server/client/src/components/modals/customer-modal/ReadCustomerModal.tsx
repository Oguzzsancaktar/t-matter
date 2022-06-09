import { Badge } from '@/components/badge'
import { Button } from '@/components/button'
import { ActionButtons } from '@/components/data-tables'
import { UserImage } from '@/components/image'
import { ItemContainer } from '@/components/item-container'
import { JustifyBetweenColumn, JustifyBetweenRow, JustifyCenterColumn, JustifyCenterRow } from '@/components/layout'
import { H1, Label } from '@/components/texts'
import { InnerWrapper } from '@/components/wrapper'
import colors from '@/constants/colors'
import { UserModalLogInTab, UserModalSettingsTab } from '@/pages'
import React, { useState } from 'react'

interface IProps {
  userId: string
}

const UserReadModal: React.FC<IProps> = ({ userId }) => {
  const [activeTab, setActiveTab] = useState('activity')

  console.log(activeTab)
  const renderSwitch = () => {
    switch (activeTab) {
      case 'activity':
        return 'Activity'
      case 'calendar':
        return 'Calendar'
      case 'workflow':
        return 'Workflow'
      case 'file':
        return 'File'
      case 'Finance':
        return 'Finance'
    }
  }

  return (
    <InnerWrapper>
      <JustifyBetweenRow height="100%">
        <ItemContainer width="350px" height="100%">
          <JustifyBetweenColumn height="100%" padding="1rem 0">
            <ItemContainer height="150px">
              <JustifyBetweenColumn>
                <ItemContainer>
                  <JustifyCenterColumn>
                    <UserImage width="100px" height="100px" src="https://via.placeholder.com/150" />
                    <H1 margin="0.5rem 0" textAlign="center">
                      Customer Name
                    </H1>
                  </JustifyCenterColumn>
                </ItemContainer>
                <ItemContainer>
                  <JustifyCenterRow>
                    <ItemContainer width="auto" margin="0 0.5rem 0 0">
                      <Badge children={'Customer Type'} color={colors.gray.dark} />
                    </ItemContainer>
                    <ItemContainer width="auto">
                      <Badge children={'Active'} color={colors.green.primary} />
                    </ItemContainer>
                  </JustifyCenterRow>
                </ItemContainer>
              </JustifyBetweenColumn>
            </ItemContainer>

            <ItemContainer margin="1rem 0" height="calc(100% - 1rem - 1rem - 150px - 40px)">
              <JustifyBetweenColumn>
                <ItemContainer margin="1rem 0">
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

                <ItemContainer margin="1rem 0">
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
                <ItemContainer margin="1rem 0">
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
                <ItemContainer margin="1rem 0">
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
                <ItemContainer margin="1rem 0">
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

            <ItemContainer height="40px">
              <JustifyCenterColumn>
                <ActionButtons
                  iconSize="30px"
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
              </JustifyCenterColumn>
            </ItemContainer>
          </JustifyBetweenColumn>
        </ItemContainer>
        <ItemContainer height="100%" width="120px" padding="1rem" backgroundColor={colors.gray.primary}>
          <JustifyBetweenColumn height="100%">
            <ItemContainer height="100%" margin="0 0 1rem 0">
              <Button color={colors.gray.secondary} onClick={() => setActiveTab('activity')}>
                <H1 color={colors.gray.primary} textAlign="center">
                  Activity
                </H1>
              </Button>
            </ItemContainer>
            <ItemContainer height="100%" margin="0 0 1rem 0">
              <Button color={colors.gray.secondary} onClick={() => setActiveTab('calendar')}>
                <H1 color={colors.gray.primary} textAlign="center">
                  Calendar
                </H1>
              </Button>
            </ItemContainer>

            <ItemContainer height="100%" margin="0 0 1rem 0">
              <Button color={colors.gray.secondary} onClick={() => setActiveTab('workflow')}>
                <H1 color={colors.gray.primary} textAlign="center">
                  Workflow
                </H1>
              </Button>
            </ItemContainer>

            <ItemContainer height="100%" margin="0 0 1rem 0">
              <Button color={colors.gray.secondary} onClick={() => setActiveTab('file')}>
                <H1 color={colors.gray.primary} textAlign="center">
                  File
                </H1>
              </Button>
            </ItemContainer>

            <ItemContainer height="100%" margin="0 0 0 0">
              <Button color={colors.gray.secondary} onClick={() => setActiveTab('finance')}>
                <H1 color={colors.gray.primary} textAlign="center">
                  Finance
                </H1>
              </Button>
            </ItemContainer>
          </JustifyBetweenColumn>
        </ItemContainer>
        <ItemContainer minHeight="700px" height="inherit" width="calc(100% - 120px - 350px)">
          {renderSwitch()}
        </ItemContainer>
      </JustifyBetweenRow>
    </InnerWrapper>
  )
}

export default UserReadModal
