import { Column, JustifyBetweenColumn, JustifyCenterRow } from '@/components/layout'
import React, { useState } from 'react'
import { ItemContainer, Tab } from '@/components'
import { ModalHeader, ModalBody } from '@components/modals/types'
import { WebsiteTextsTab, WebsiteStylesTab, WebsiteImagesTab } from '@/pages'

const Component = {
  WebsiteTextsTab,
  WebsiteStylesTab,
  WebsiteImagesTab
}

const WebsitePlaningModal = () => {
  const [activeTab, setActiveTab] = useState('WebsiteTextsTab')

  return (
    <ItemContainer minHeight="700px">
      <Column>
        <ModalHeader>
          <ItemContainer>
            <JustifyBetweenColumn>
              <JustifyCenterRow>
                <Tab
                  margin="0 1rem 0 0rem"
                  index={0}
                  name="Website Texts"
                  isActive={activeTab === 'WebsiteTextsTab'}
                  onClick={() => setActiveTab('WebsiteTextsTab')}
                />

                <Tab
                  margin="0 1rem 0 0rem"
                  index={1}
                  name="Website Styles"
                  isActive={activeTab === 'WebsiteStylesTab'}
                  onClick={() => setActiveTab('WebsiteStylesTab')}
                />

                <Tab
                  margin="0 1rem 0 0rem"
                  index={2}
                  name="Website Images"
                  isActive={activeTab === 'WebsiteImagesTab'}
                  onClick={() => setActiveTab('WebsiteImagesTab')}
                />
              </JustifyCenterRow>
            </JustifyBetweenColumn>
          </ItemContainer>
        </ModalHeader>

        <ModalBody height="800px">{React.createElement(Component[activeTab])}</ModalBody>
      </Column>
    </ItemContainer>
  )
}

export default WebsitePlaningModal
