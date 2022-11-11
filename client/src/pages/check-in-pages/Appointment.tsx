import React, { useState } from 'react'
import { PageWrapper } from './internal'
import { Button, Dropdown, Input, Row, Spacer, useInput } from '@nextui-org/react'
import { validatePhone, validationHelper } from '@pages/check-in-pages/internal/validationHelper'
import { useGetUsersQuery } from '@services/settings/user-planning/userService'
import { emptyQueryParams } from '@constants/queryParams'

const Appointment = () => {
  const { value: phoneValue, reset: phoneReset, bindings: phoneBindings } = useInput('')
  const [userSelectedKey, setUserSelectedKey] = useState('')
  const { data: users } = useGetUsersQuery(emptyQueryParams)

  const phoneHelper = validationHelper(phoneValue, validatePhone, 'phone')

  const isButtonDisabled = phoneHelper.color !== 'success' || userSelectedKey === ''

  return (
    <PageWrapper title="Appointment">
      <div style={{ width: '900px', margin: '250px auto' }}>
        <Row fluid>
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
        </Row>
        <Spacer y={3} />
        <Row fluid>
          <Dropdown>
            <Dropdown.Button css={{ tt: 'capitalize', width: '100%' }} size="xl" flat>
              Select appointment
            </Dropdown.Button>
            <Dropdown.Menu aria-label="appointment">
              <Dropdown.Item key="mock">mock appoo</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Spacer x={2} />
          <Dropdown>
            <Dropdown.Button css={{ tt: 'capitalize', width: '100%' }} size="xl" flat>
              {userSelectedKey ? userSelectedKey : 'Select user'}
            </Dropdown.Button>
            {users && (
              <Dropdown.Menu aria-label="user">
                {users.map(user => {
                  return <Dropdown.Item key={user._id}>{user.firstname + ' ' + user.lastname}</Dropdown.Item>
                })}
              </Dropdown.Menu>
            )}
          </Dropdown>
        </Row>
        <Spacer y={2} />
        <Row fluid align="center" justify="center">
          <Button disabled={isButtonDisabled} size="xl" color="warning">
            Success
          </Button>
        </Row>
      </div>
    </PageWrapper>
  )
}

export default Appointment
