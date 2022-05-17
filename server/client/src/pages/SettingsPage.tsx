import React from 'react'
import { CompanyPlanningModal, InnerWrapper, PageWrapper, SettingsCard, UserPlanningModal } from '@/components'
import { ESize } from '@/models'
import styled from 'styled-components'

const WrapLayout = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;

  flex-wrap: wrap;
  gap: 1rem;
`

const SettingsPage = () => {
  return (
    <PageWrapper>
      <InnerWrapper>
        <WrapLayout>
          <SettingsCard modal={{ title: 'Company Planning', size: ESize.XLarge, body: <CompanyPlanningModal /> }} />
          <SettingsCard modal={{ title: 'User Planning', size: ESize.XLarge, body: <UserPlanningModal /> }} />
        </WrapLayout>
      </InnerWrapper>
    </PageWrapper>
  )
}

export default SettingsPage
