import React, { useState } from 'react'
import { Column, ItemContainer, Row, Tab } from '@components/index'
import { ClientTypeTab, LocationsTab, RefferedByTab, RelativeTypeTab } from '@/pages'
import colors from '@/constants/colors'

const CustomerSettings = () => {
  const [activeTab, setActiveTab] = useState('reffered-by')

  return (
    <Column height="100%">
      <Row height="100%">
        <ItemContainer
          minWidth="180px"
          width="auto"
          height="100%"
          borderRight={'1px solid ' + colors.gray.disabled}
          margin="0 1rem 0 0"
        >
          <Column height="100%" width="auto">
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
        </ItemContainer>

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
