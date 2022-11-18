import React from 'react'
import {
  CompanyPlanningModal,
  FinancePlaningModal,
  ItemContainer,
  PageWrapper,
  SettingsCard,
  UserPlanningModal,
  WebsitePlaningModal,
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
            width: ESize.WXLarge,
            height: 'calc(100% - 4rem)',
            body: <CompanyPlanningModal />
          }}
        />
        <SettingsCard
          modal={{
            id: 'userPlanningModal',
            title: 'User Planning',
            width: ESize.WXLarge,
            height: ESize.HLarge,
            body: <UserPlanningModal />
          }}
        />

        <SettingsCard
          modal={{
            id: 'workflowPlanningModal',
            title: 'Workflow Planning',
            width: ESize.WXLarge,
            height: ESize.HLarge,
            body: <WorkflowPlanningModal />
          }}
        />

        <SettingsCard
          modal={{
            id: 'financePlanningModal',
            title: 'Finance Planning',
            width: ESize.WXLarge,
            height: ESize.HLarge,
            body: <FinancePlaningModal />
          }}
        />

        <SettingsCard
          modal={{
            id: 'websitePlanningModal',
            title: 'Website Planning',
            width: ESize.WXLarge,
            height: ESize.HLarge,
            body: <WebsitePlaningModal />
          }}
        />
      </WrapLayout>
    </ItemContainer>
  )
}

export default SettingsPage
