import { JustifyBetweenColumn, JustifyCenterRow } from '@/components/layout'
import { Tab } from '@/components/tab'
import { InnerWrapper } from '@/components/wrapper'
import { UserPageSettingsTab } from '@/pages'
import { CreateClientTab, CreateContactTab } from '@/pages/customer-modal'
import React, { useState } from 'react'
import { ModalHeader, ModalBody } from '../types'

const CreateCustomerModal = () => {
  const [activeTab, setActiveTab] = useState('create-client')

  return (
    <InnerWrapper>
      <ModalHeader>
        <JustifyBetweenColumn>
          <JustifyCenterRow>
            <Tab
              margin="0 1rem 0 0rem"
              index={1}
              name="Create Client"
              isActive={activeTab === 'create-client'}
              onClick={() => setActiveTab('create-client')}
            />

            <Tab
              margin="0 1rem 0 0rem"
              index={2}
              name="Create Contact"
              isActive={activeTab === 'create-contact'}
              onClick={() => setActiveTab('create-contact')}
            />
          </JustifyCenterRow>
        </JustifyBetweenColumn>
      </ModalHeader>
      <ModalBody minHeight="700px">
        {activeTab === 'create-client' ? (
          <CreateClientTab />
        ) : activeTab === 'create-contact' ? (
          <CreateContactTab />
        ) : (
          'Something went wrong'
        )}
      </ModalBody>
    </InnerWrapper>
  )
}

export default CreateCustomerModal
