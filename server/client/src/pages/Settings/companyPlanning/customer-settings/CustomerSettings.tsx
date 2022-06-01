import React, { useState } from 'react'
import { Column, Row, Tab } from '@components/index'
import { ClientTypeTab, RefferedByTab, RelationTypeTab } from '@/pages'

const CustomerSettings = () => {
  const [activeTab, setActiveTab] = useState('reffered-by')

  return (
    <Column>
      <Row>
        <Column width="200px">
          <Tab
            margin="0 0 1rem 0rem"
            index={1}
            name="Reffered By"
            isActive={activeTab === 'reffered-by'}
            onClick={() => setActiveTab('reffered-by')}
          />
          <Tab
            margin="0 0 1rem 0rem"
            index={2}
            name="Relation Type"
            isActive={activeTab === 'relation-type'}
            onClick={() => setActiveTab('relation-type')}
          />
          <Tab
            margin="0 0 1rem 0rem"
            index={3}
            name="Client Type"
            isActive={activeTab === 'client-type'}
            onClick={() => setActiveTab('client-type')}
          />
        </Column>

        <Column>
          {activeTab === 'reffered-by' ? (
            <RefferedByTab />
          ) : activeTab === 'client-type' ? (
            <ClientTypeTab />
          ) : activeTab === 'relation-type' ? (
            <RelationTypeTab />
          ) : (
            ''
          )}
        </Column>
      </Row>
    </Column>
  )
}

export default CustomerSettings
