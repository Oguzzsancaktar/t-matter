import React, { useState } from 'react'
import { PageWrapper } from './internal'
import { Button, Dropdown, Input, Row, Spacer, Textarea, useInput } from '@nextui-org/react'
import { useGetUsersQuery } from '@services/settings/user-planning/userService'
import { emptyQueryParams } from '@constants/queryParams'
import { validatePhone, validationHelper } from '@pages/check-in-pages/internal/validationHelper'

const PickUpDocuments = () => {
  const { value: phoneValue, reset: phoneReset, bindings: phoneBindings } = useInput('')
  const { value: documentTypesValue, reset: documentTypesReset, bindings: documentTypesBindings } = useInput('')
  const [userSelectedKey, setUserSelectedKey] = useState('')
  const { data: users } = useGetUsersQuery(emptyQueryParams)

  const phoneHelper = validationHelper(phoneValue, validatePhone, 'phone')
  const documentTypesHelper = validationHelper(documentTypesValue, value => value.length > 2, 'document types')
  return (
    <PageWrapper title="Pick up documents">
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
          <Textarea
            {...documentTypesBindings}
            status={documentTypesHelper.color}
            color={documentTypesHelper.color}
            helperColor={documentTypesHelper.color}
            helperText={documentTypesHelper.text}
            width="100%"
            bordered
            label="Document types"
            placeholder="Please enter document types"
          />
        </Row>
        <Spacer y={3} />
        <Row fluid>
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
          <Button
            disabled={phoneHelper.color !== 'success' || documentTypesHelper.color !== 'success'}
            size="xl"
            color="warning"
          >
            Submit
          </Button>
        </Row>
      </div>
    </PageWrapper>
  )
}

export default PickUpDocuments
