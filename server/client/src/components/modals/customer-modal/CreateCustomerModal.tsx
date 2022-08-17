import { Column, JustifyBetweenColumn, JustifyCenterRow } from '@/components/layout'
import { Tab } from '@/components/tab'
import { InnerWrapper } from '@/components/wrapper'
import { UserPageSettingsTab } from '@/pages'
import { CreateClientTab, CreateContactTab } from '@/pages/customer-modal'
import React, { useState } from 'react'
import { ModalHeader, ModalBody } from '../types'

const CreateCustomerModal = () => {
  const [activeTab, setActiveTab] = useState('create-contact')

  return (
    <Column>
      <ModalHeader>
        <InnerWrapper>
          <JustifyBetweenColumn>
            <JustifyCenterRow>
              <Tab
                margin="0 1rem 0 0rem"
                index={0}
                name="Create Contact"
                isActive={activeTab === 'create-contact'}
                onClick={() => setActiveTab('create-contact')}
              />

              <Tab
                margin="0 1rem 0 0rem"
                index={1}
                name="Create Client"
                isActive={activeTab === 'create-client'}
                onClick={() => setActiveTab('create-client')}
              />
            </JustifyCenterRow>
          </JustifyBetweenColumn>
        </InnerWrapper>
      </ModalHeader>

      <ModalBody>
        <InnerWrapper>
          {activeTab === 'create-client' ? (
            <CreateClientTab />
          ) : activeTab === 'create-contact' ? (
            <CreateContactTab />
          ) : (
            'Something went wrong 99'
          )}
        </InnerWrapper>
      </ModalBody>
    </Column>
  )
}

export default CreateCustomerModal
