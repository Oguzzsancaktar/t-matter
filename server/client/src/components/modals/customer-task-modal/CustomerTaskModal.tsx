import { ItemContainer } from '@/components/item-container'
import { Row } from '@/components/layout'
import { TaskEventSection, TaskInformations, TaskWizzardNavigation } from '@/components'
import React, { useState } from 'react'
import { ModalBody, ModalHeader } from '../types'
import colors from '@/constants/colors'

const TEMP_WORKFLOW = [
  {
    expireDuration: 10,
    postponeTime: 5,
    category: 'category name',
    location: 'location name',
    responsibleUser: 'responsivle name',
    tabs: ['note', 'tab 2', 'tab 3'],
    checklistItems: [
      {
        name: 'checklist 1',
        duration: 20,
        point: 100,
        price: 200
      },
      {
        name: 'checklist 2',
        duration: 540,
        point: 30,
        price: 100
      }
    ]
  },
  {
    expireDuration: 5,
    postponeTime: 51,
    category: 'category name 2',
    location: 'location name 2',
    responsibleUser: 'responsivle name 2',
    tabs: ['note', 'tab 2'],
    checklistItems: [
      {
        name: 'checklist 2-2',
        duration: 10,
        point: 10,
        price: 20
      },
      {
        name: 'checklist 2-3',
        duration: 54,
        point: 1,
        price: 10
      }
    ]
  },
  {
    expireDuration: 50,
    postponeTime: 3,
    category: 'category name 3',
    location: 'location name 3',
    responsibleUser: 'responsivle name3',
    tabs: ['note'],
    checklistItems: [
      {
        name: 'checklist 3-1',
        duration: 99,
        point: 88,
        price: 300
      },
      {
        name: 'checklist 3-2',
        duration: 70,
        point: 30,
        price: 55
      }
    ]
  }
]

interface IProps {
  workflowId: string
}
const CustomerTaskModal: React.FC<IProps> = ({ workflowId }) => {
  const [activeStep, setActiveStep] = useState<number>(0)

  const handleStepChange = (step: number) => {
    setActiveStep(step)
  }

  return (
    <ItemContainer minHeight="750px">
      <ModalHeader>asdf</ModalHeader>
      <ItemContainer height="calc(100% - 52px)">
        <Row height="100%">
          <ItemContainer width="auto" height="100%">
            <TaskWizzardNavigation
              activeStep={activeStep}
              workflowData={TEMP_WORKFLOW}
              onStepChange={handleStepChange}
            />
          </ItemContainer>

          <ItemContainer width="400px" height="100%" padding="0 2rem" backgroundColor={colors.white.primary}>
            <TaskInformations activeStep={activeStep} workflowData={TEMP_WORKFLOW} />
          </ItemContainer>

          <ItemContainer
            width="calc(100% - 400px)"
            height="100%"
            padding="0 2rem"
            backgroundColor={colors.white.secondary}
          >
            <TaskEventSection />
          </ItemContainer>
        </Row>
      </ItemContainer>
    </ItemContainer>
  )
}

export default CustomerTaskModal
