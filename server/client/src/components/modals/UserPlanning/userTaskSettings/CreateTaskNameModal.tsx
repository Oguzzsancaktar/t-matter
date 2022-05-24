import React, { useState } from 'react'
import { ConfirmCancelButtons } from '@/components/button'
import { InputRegular, SelectInput } from '@/components/input'
import { JustifyBetweenColumn, JustifyCenterColumn, JustifyCenterRow, Row } from '@/components/layout'
import { H1, Label } from '@/components/texts'
import useAccessStore from '@/hooks/useAccessStore'
import { closeModal } from '@/store'
import { InnerWrapper } from '@/components'
import { ModalBody, ModalFooter, ModalHeader } from '../../types'

const CreateTaskNameModal = () => {
  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

  const [taskData, setTaskData] = useState({
    taskCategory: '',
    taskTitle: '',
    taskName: ''
  })

  const handleCancel = () => {
    dispatch(closeModal('createTaskNameModal'))
  }

  const handleConfirm = () => {
    dispatch(closeModal('createTaskNameModal'))
  }

  const taskCategoryOptions = [
    { value: '1', label: 'Task Category 1' },
    { value: '2', label: 'Task Category 2' },
    { value: '3', label: 'Task Category 3' },
    { value: '4', label: 'Task Category 4' },
    { value: '5', label: 'Task Category 5' }
  ]

  const taskTitleOptions = [
    { value: '1', label: 'Task Title 1' },
    { value: '2', label: 'Task Title 2' },
    { value: '3', label: 'Task Title 3' },
    { value: '4', label: 'Task Title 4' },
    { value: '5', label: 'Task Title 5' }
  ]

  const handleTaskCategoryChange = (a: any) => {
    setTaskData({ ...taskData, taskCategory: a.value })
    setTaskData({ ...taskData, taskName: taskData.taskCategory + ' ' + taskData.taskTitle })
  }

  const handleTaskTitleChange = (a: any) => {
    setTaskData({ ...taskData, taskTitle: a.value })
    setTaskData({ ...taskData, taskName: taskData.taskCategory + ' ' + taskData.taskTitle })
  }

  return (
    <InnerWrapper>
      <JustifyBetweenColumn height="100%">
        <ModalHeader>
          <JustifyCenterRow width="100%">
            <H1 margin="0" textAlign="center">
              Create User Task Name
            </H1>
          </JustifyCenterRow>
        </ModalHeader>

        <ModalBody>
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setTaskData({ ...taskData, taskName: e.target.value })
                }
                value={taskData.taskTitle}
                type="text"
                labelText="Task Name"
                disabled={true}
              />
            </Row>
          </JustifyBetweenColumn>
        </ModalBody>

        <ModalFooter>
          <Row>
            <ConfirmCancelButtons onCancel={handleCancel} onConfirm={handleConfirm} />
          </Row>
        </ModalFooter>
      </JustifyBetweenColumn>
    </InnerWrapper>
  )
}

export default CreateTaskNameModal
