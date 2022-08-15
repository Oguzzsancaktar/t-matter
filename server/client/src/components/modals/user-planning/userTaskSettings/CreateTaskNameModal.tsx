import React, { useState } from 'react'
import { ConfirmCancelButtons } from '@/components/button'
import { InputRegular, SelectInput } from '@/components/input'
import { JustifyBetweenColumn, JustifyCenterRow, Row } from '@/components/layout'
import { H1 } from '@/components/texts'
import useAccessStore from '@/hooks/useAccessStore'
import { closeModal } from '@/store'
import { InnerWrapper } from '@/components'
import { ModalBody, ModalFooter, ModalHeader } from '../../types'
import { IOption } from '@/models'
import colors from '@/constants/colors'

const CreateTaskNameModal = () => {
  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

  const [taskData, setTaskData] = useState({
    taskCategory: { label: '', value: '' },
    taskTitle: { label: '', value: '' }
  })

  const handleCancel = () => {
    dispatch(closeModal('createTaskNameModal'))
  }

  const handleConfirm = () => {
    console.log(taskData)
    // dispatch(closeModal('createTaskNameModal'))
  }

  const taskCategoryOptions: IOption[] = [
    { value: '1', label: 'Task Category 1' },
    { value: '2', label: 'Task Category 2' },
    { value: '3', label: 'Task Category 3' },
    { value: '4', label: 'Task Category 4' },
    { value: '5', label: 'Task Category 5' }
  ]

  const taskTitleOptions: IOption[] = [
    { value: '1', label: 'Task Title 1' },
    { value: '2', label: 'Task Title 2' },
    { value: '3', label: 'Task Title 3' },
    { value: '4', label: 'Task Title 4' },
    { value: '5', label: 'Task Title 5' }
  ]

  const handleTaskCategoryChange = (option: IOption) => {
    setTaskData({ ...taskData, taskCategory: option })
  }

  const handleTaskTitleChange = (option: IOption) => {
    setTaskData({ ...taskData, taskTitle: option })
  }

  return (
    <JustifyBetweenColumn height="100%">
      <ModalHeader>
        <InnerWrapper>
          <JustifyCenterRow width="100%">
            <H1 margin="0" textAlign="center" fontWeight="700" color={colors.white.primary}>
              Create User Task Name
            </H1>
          </JustifyCenterRow>
        </InnerWrapper>
      </ModalHeader>

      <ModalBody>
        <InnerWrapper>
          <JustifyBetweenColumn height="100%" padding="2rem 0">
            <Row>
              <SelectInput
                onChange={handleTaskCategoryChange}
                name="taskCategory"
                options={taskCategoryOptions}
                labelText="Task Category"
              />
            </Row>

            <Row>
              <SelectInput
                onChange={handleTaskTitleChange}
                name="taskTitle"
                options={taskTitleOptions}
                labelText="Task Title"
              />
            </Row>

            <Row>
              <InputRegular
                name="taskName"
                value={taskData.taskCategory.label + ' / ' + taskData.taskTitle.label}
                type="text"
                labelText="Task Name"
                disabled={true}
              />
            </Row>
          </JustifyBetweenColumn>
        </InnerWrapper>
      </ModalBody>

      <ModalFooter>
        <InnerWrapper>
          <Row>
            <ConfirmCancelButtons onCancel={handleCancel} onConfirm={handleConfirm} />
          </Row>
        </InnerWrapper>
      </ModalFooter>
    </JustifyBetweenColumn>
  )
}

export default CreateTaskNameModal
