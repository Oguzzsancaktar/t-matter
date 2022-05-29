import { Column, ItemContainer, Row, WizzardNavigation } from '@/components'
import React, { useState } from 'react'
import ClientInformationsTab from './ClientInformationsTab'

const CreateClientTab = () => {
  const [activeWizzardStep, setActiveWizzardStep] = useState(0)
  const [clientWizzardSteps, setClientWizzardSteps] = useState([
    { stepName: 'Client Informations', stepIndex: 0 },
    { stepName: 'Search Reliable Company', stepIndex: 1 },
    { stepName: 'Add New Contacts', stepIndex: 2 }
  ])

  return (
    <Column>
      <Row>
        <Column width="200px" height="100%">
          {/* <Tab
            margin="0 0 1rem 0rem"
            index={1}
            name="Client Informations"
            isActive={activeTab === 'task-category'}
            onClick={() => setActiveTab('task-category')}
          />

          <Tab
            margin="0 0 1rem 0rem"
            index={2}
            name="Search In Company"
            isActive={activeTab === 'task-title'}
            onClick={() => setActiveTab('task-title')}
          />

          <Tab
            margin="0 0 1rem 0rem"
            index={3}
            name="Add New Contacts"
            isActive={activeTab === 'task-name'}
            onClick={() => setActiveTab('task-name')}
          /> */}

          <WizzardNavigation steps={clientWizzardSteps} currentIndex={activeWizzardStep} />
        </Column>

        <ItemContainer height="100%">{activeWizzardStep === 0 && <ClientInformationsTab />}</ItemContainer>
      </Row>
    </Column>
  )
}

export default CreateClientTab
