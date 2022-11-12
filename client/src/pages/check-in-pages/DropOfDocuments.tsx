import React, { useState } from 'react'
import { PageWrapper } from './internal'
import { Button, Dropdown, Input, Row, Spacer, Textarea, useInput } from '@nextui-org/react'
import { validatePhone, validationHelper } from '@pages/check-in-pages/internal/validationHelper'
import { EActivity, ICustomer, ICustomerTask, IUser } from '@/models'
import { useLazyGetCustomerByPhoneQuery } from '@services/customers/customerService'
import { BsSearch } from 'react-icons/bs'
import { UserBadge } from '@/components'
import { useLazyGetTasksByCustomerIdQuery } from '@services/customers/taskService'
import moment from 'moment'
import { getTaskActiveStep, getTaskActiveStepIndex } from '@utils/taskUtil'
import { getFullName } from '@utils/userUtil'
import { useCreateActivityMutation } from '@services/activityService'
import { useNavigate } from 'react-router-dom'
import { toastSuccess } from '@utils/toastUtil'

const DropOfDocuments = () => {
  const { value: phoneValue, reset: phoneReset, bindings: phoneBindings } = useInput('')
  const { value: noteValue, bindings: noteBindings } = useInput('')

  const navigate = useNavigate()
  const [selectedCustomer, setSelectedCustomer] = useState<ICustomer>()
  const [tasks, setTasks] = useState<ICustomerTask[]>([])
  const [selectedTask, setSelectedTask] = useState<ICustomerTask>()
  const [createActivity] = useCreateActivityMutation()

  const [getCustomerByPhone] = useLazyGetCustomerByPhoneQuery()
  const [getTaskByCustomerId] = useLazyGetTasksByCustomerIdQuery()

  const phoneHelper = validationHelper(phoneValue, validatePhone, 'phone')

  const isButtonDisabled = phoneHelper.color !== 'success' || selectedTask === undefined

  const handleSubmit = async () => {
    if (!selectedTask) {
      return
    }
    const activeStep = getTaskActiveStep(selectedTask)
    if (!activeStep) {
      return
    }
    await createActivity({
      title: 'Drop of documents',
      content: noteValue,
      customer: selectedCustomer?._id,
      stepCategory: activeStep.category._id,
      task: selectedTask?._id,
      owner: activeStep.responsibleUser._id as string,
      type: EActivity.NORMAL_NOTE,
      step: getTaskActiveStepIndex(selectedTask)
    }).unwrap()
    toastSuccess('Drop of documents successfully')
    navigate('/checkin')
  }

  const handleSearch = async () => {
    const data = await getCustomerByPhone(phoneValue).unwrap()
    setSelectedCustomer(data)
    const tasks = await getTaskByCustomerId({
      customerId: data._id,
      startDate: new Date(),
      search: 'drop of documents'
    }).unwrap()
    setTasks(tasks)
  }

  const getDropdownContent = (task: ICustomerTask) => {
    const activeStep = getTaskActiveStep(task)
    const fullNameResponsible = getFullName(activeStep.responsibleUser as IUser)
    return `${task.name} with ${fullNameResponsible} at ${moment(activeStep.startDate).format('LTS')}`
  }

  return (
    <PageWrapper title="Drop of documents">
      <div style={{ width: '900px', margin: '250px auto' }}>
        <Row fluid align="flex-end">
          <Input
            {...phoneBindings}
            status={phoneHelper.color}
            color={phoneHelper.color}
            helperColor={phoneHelper.color}
            helperText={phoneHelper.text}
            onClearClick={phoneReset}
            clearable
            bordered
            width="100%"
            size="xl"
            label="Phone number"
            placeholder="Phone number"
          />
          <Spacer x={1} />
          <Button
            onClick={handleSearch}
            disabled={phoneHelper.color !== 'success'}
            auto
            style={{ height: 55, width: 70 }}
            flat
            icon={<BsSearch fill="currentColor" size={'32px'} />}
          />
        </Row>

        {selectedCustomer && tasks && (
          <>
            <Spacer y={2} />
            <Row justify="space-between" fluid>
              <div>
                <UserBadge
                  userImage={selectedCustomer.profile_img as string}
                  userName={selectedCustomer.firstname + ' ' + selectedCustomer.lastname}
                  userEmail={selectedCustomer.email}
                />
              </div>
              {selectedTask && (
                <>
                  <span style={{ fontSize: 26 }}>to</span>
                  <div>
                    <UserBadge
                      userImage={getTaskActiveStep(selectedTask).responsibleUser.profile_img as string}
                      userName={getFullName(getTaskActiveStep(selectedTask).responsibleUser as IUser)}
                      userEmail={(getTaskActiveStep(selectedTask).responsibleUser as IUser).email}
                    />
                  </div>
                </>
              )}
            </Row>
            <Spacer y={2} />

            <Row fluid>
              <Dropdown>
                <Dropdown.Button css={{ tt: 'capitalize', width: '100%' }} size="xl" flat>
                  {selectedTask ? getDropdownContent(selectedTask) : 'Select drop of documents'}
                </Dropdown.Button>
                <Dropdown.Menu
                  css={{ $$dropdownMenuWidth: '500px' }}
                  disallowEmptySelection
                  selectionMode="single"
                  selectedKeys={selectedTask?._id as string}
                  aria-label="dropOfDocuments"
                  onSelectionChange={keys => setSelectedTask(tasks.find(task => task._id === Array.from(keys)[0]))}
                >
                  {tasks.map((task, i) => (
                    <Dropdown.Item withDivider={i !== 0} key={task._id}>
                      {getDropdownContent(task)}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Row>
            <Spacer y={2} />
            <Row fluid>
              <Textarea
                {...noteBindings}
                helperText="Note for the employee(optional)"
                width="100%"
                bordered
                label="Note"
                placeholder="You can enter note here"
              />
            </Row>
            <Spacer y={2} />
            <Row fluid align="center" justify="center">
              <Button onClick={handleSubmit} disabled={isButtonDisabled} size="xl" color="warning">
                Success
              </Button>
            </Row>
          </>
        )}
      </div>
    </PageWrapper>
  )
}

export default DropOfDocuments
