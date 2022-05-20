import React from 'react'
import { CompanyPlanningModal, InnerWrapper, PageWrapper, SettingsCard, UserPlanningModal } from '@components/index'
import { ESize } from '@models/index'
import styled from '@emotion/styled'

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
