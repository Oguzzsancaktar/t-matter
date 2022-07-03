import React, { useState } from 'react'
import { Column, Row, Tab } from '@components/index'
import { ClientTypeTab, LocationsTab, RefferedByTab, RelativeTypeTab } from '@/pages'

const CustomerSettings = () => {
  const [activeTab, setActiveTab] = useState('reffered-by')

  return (
    <Column height="100%">
      <Row height="100%">
        <Column height="100%" width="200px">
          <Tab
            margin="0 0 1rem 0rem"
            index={0}
            name="Reffered By"
            isActive={activeTab === 'reffered-by'}
            onClick={() => setActiveTab('reffered-by')}
          />
          <Tab
            margin="0 0 1rem 0rem"
            index={1}
            name="Relative Type"
            isActive={activeTab === 'relative-type'}
            onClick={() => setActiveTab('relative-type')}
          />
          {/* <Tab
            margin="0 0 1rem 0rem"
            index={2}
            name="Client Type"
            isActive={activeTab === 'client-type'}
            onClick={() => setActiveTab('client-type')}
          /> */}
          <Tab
            margin="0 0 1rem 0rem"
            index={2}
            name="Locations"
            isActive={activeTab === 'locations'}
            onClick={() => setActiveTab('locations')}
          />
        </Column>

        <Column height="100%">
          {activeTab === 'reffered-by' ? (
            <RefferedByTab />
          ) : activeTab === 'client-type' ? (
            <ClientTypeTab />
          ) : activeTab === 'relative-type' ? (
            <RelativeTypeTab />
          ) : activeTab === 'locations' ? (
            <LocationsTab />
          ) : (
            ''
          )}
        </Column>
      </Row>
    </Column>
  )
}

export default CustomerSettings
