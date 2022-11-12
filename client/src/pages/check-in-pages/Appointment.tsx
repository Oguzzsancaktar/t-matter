import React, { useState } from 'react'
import { PageWrapper } from './internal'
import { Button, Dropdown, Input, Row, Spacer, useInput } from '@nextui-org/react'
import { validatePhone, validationHelper } from '@pages/check-in-pages/internal/validationHelper'
import { useGetUsersQuery } from '@services/settings/user-planning/userService'
import { emptyQueryParams } from '@constants/queryParams'
import { ICustomer } from '@/models'
import { useLazyGetCustomerByPhoneQuery } from '@services/customers/customerService'
import { BsSearch } from 'react-icons/bs'
import { UserBadge } from '@/components'

const Appointment = () => {
  const { value: phoneValue, reset: phoneReset, bindings: phoneBindings } = useInput('')
  const [userSelectedKey, setUserSelectedKey] = useState('')
  const [selectedCustomer, setSelectedCustomer] = useState<ICustomer>()
  const { data: users } = useGetUsersQuery(emptyQueryParams)
  const [getCustomerByPhone] = useLazyGetCustomerByPhoneQuery()

  const phoneHelper = validationHelper(phoneValue, validatePhone, 'phone')

  const isButtonDisabled = phoneHelper.color !== 'success' || userSelectedKey === ''

  const handleSubmit = () => {}

  const handleSearch = async () => {
    const data = await getCustomerByPhone(phoneValue).unwrap()
    setSelectedCustomer(data)
  }

  return (
    <PageWrapper title="Appointment">
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
        {selectedCustomer && (
          <>
            <Spacer y={2} />
            <UserBadge
              userImage={selectedCustomer.profile_img as string}
              userName={selectedCustomer.firstname + ' ' + selectedCustomer.lastname}
              userEmail={selectedCustomer.email}
            />
            <Spacer y={2} />

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

export default Appointment
