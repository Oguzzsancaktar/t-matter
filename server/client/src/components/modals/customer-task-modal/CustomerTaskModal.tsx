import { ItemContainer } from '@/components/item-container'
import { Row } from '@/components/layout'
import { TaskEventSection, TaskInformations, TaskWizzardNavigation } from '@/components'
import React, { useState } from 'react'
import { ModalBody, ModalHeader } from '../types'
import colors from '@/constants/colors'
import { ITaskControlStep } from '@/models'

const TEMP_WORKFLOW: ITaskControlStep[] = [
  {
    startDate: Date.now().toString(),
    expireDuration: 10,

    postponeCount: 5,
    postponeTime: 1,

    totalDuration: 36000,
    usedTime: 3600,

    name: 'workflowname/categry',
    tabs: ['Tab1', 'Tab2'],
    stepStatus: 0,

    location: {
      _id: 'locationid',
      name: 'locationname',
      status: 0
    },

    responsibleUser: {
      _id: '62d59ecbe78c2ffdc376e876',
      email: 'Arif@gmail.com',
      password: '$2b$10$XApQoQzEQzHIFD7o/y4vyesT6EP6mDrHlo1q1KMLctOLk4Rb90CSC',
      firstname: 'Arif',
      lastname: 'Arslanturk',
      birthday: '2010-07-13T00:00:00.000Z',
      birthplace: 'Turkiye',
      phone: '2014565854',
      country: 'United States',
      city: 'Wayne',
      state: 'NJ',
      address: '456 Newyork Ave',
      zipcode: '07470',
      gender: 1,
      status: 1,
      role: {
        _id: '62a202816a02eaaf91429429',
        name: 'Paralegal',
        status: 1
      }
    },
    checklistItems: [
      {
        name: 'I - 589 Package Process',
        point: 60,
        duration: 3600,
        status: 1,
        price: 694.0142857142857,
        isCompleted: false
      },
      {
        name: 'I - 589 Package Process',
        point: 60,
        duration: 3600,
        status: 1,
        price: 694.0142857142857,
        isCompleted: true
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
