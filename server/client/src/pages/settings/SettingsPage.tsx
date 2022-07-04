import React from 'react'
import {
  CompanyPlanningModal,
  InnerWrapper,
  PageWrapper,
  SettingsCard,
  UserPlanningModal,
  WorkflowPlanningModal
} from '@components/index'
import { ESize } from '@models/index'
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
          <SettingsCard
            modal={{
              id: 'companyPlanningModal',
              title: 'Company Planning',
              size: ESize.XLarge,
              body: <CompanyPlanningModal />
            }}
          />
          <SettingsCard
            modal={{ id: 'userPlanningModal', title: 'User Planning', size: ESize.XLarge, body: <UserPlanningModal /> }}
          />

          <SettingsCard
            modal={{
              id: 'workflowPlanningModal',
              title: 'Workflow Planning',
              size: ESize.XLarge,
              body: <WorkflowPlanningModal />
            }}
          />
        </WrapLayout>
      </InnerWrapper>
    </PageWrapper>
  )
}

export default SettingsPage
