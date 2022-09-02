import React, { useState } from 'react'
import { Column, JustifyBetweenColumn, JustifyCenterRow } from '@/components/layout'
import { Tab } from '@/components/tab'
import { CreateClientTab, CreateContactTab } from '@/pages/customer-modal'
import { ModalHeader, ModalBody } from '../types'

const CreateCustomerModal = () => {
  const [activeTab, setActiveTab] = useState('create-contact')

  return (
    <Column height="100%">
      <ModalHeader>
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
      </ModalHeader>

      <ModalBody height="calc(100% - 63px)">
        {activeTab === 'create-client' ? (
          <CreateClientTab />
        ) : activeTab === 'create-contact' ? (
          <CreateContactTab />
        ) : (
          'Something went wrong 99'
        )}
      </ModalBody>
    </Column>
  )
}

export default CreateCustomerModal
