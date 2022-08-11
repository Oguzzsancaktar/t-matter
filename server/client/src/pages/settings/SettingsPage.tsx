import React from 'react'
import {
  CompanyPlanningModal,
  FinancePlaningModal,
  InnerWrapper,
  ItemContainer,
  PageWrapper,
  SettingsCard,
  UserPlanningModal,
  WorkflowPlanningModal
} from '@components/index'
import { ESize } from '@models/index'
import styled from 'styled-components'
import colors from '@/constants/colors'

const WrapLayout = styled.div`
  width: 100%;
  height: 100%;

  display: flex;

  flex-wrap: wrap;
  gap: 1rem;
`

const SettingsPage = () => {
  return (
    <ItemContainer padding="1rem" height="100%" backgroundColor={colors.white.primary}>
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

        <SettingsCard
          modal={{
            id: 'financePlanningModal',
            title: 'Finance Planning',
            size: ESize.XLarge,
            body: <FinancePlaningModal />
          }}
        />
      </WrapLayout>
    </ItemContainer>
  )
}

export default SettingsPage
