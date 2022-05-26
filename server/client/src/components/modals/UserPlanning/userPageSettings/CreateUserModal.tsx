import React, { useState } from 'react'
import { ConfirmCancelButtons } from '@/components/button'
import { InputRegular, InputWithIcon } from '@/components/input'
import {
  JustifyBetweenColumn,
  JustifyBetweenRow,
  JustifyCenterColumn,
  JustifyCenterRow,
  Row
} from '@/components/layout'
import { H1, Label } from '@/components/texts'
import useAccessStore from '@/hooks/useAccessStore'
import { closeModal } from '@/store'
import { InnerWrapper } from '@/components'
import { ModalBody, ModalFooter, ModalHeader } from '../../types'
import { IUserCreateDTO } from '@/models'
import { User } from 'react-feather'

const CreateUserModal = () => {
  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

  const [createUserData, setCreateUserData] = useState<Omit<IUserCreateDTO, '_id'>>({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    birthday: '',
    birthplace: '',
    country: '',
    state: '',
    zipcode: '',
    address: '',
    role: '',
    gender: '',
    status: '',
    password: ''
  })

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCreateUserData({ ...createUserData, [event.target.name]: event.target.value })
  }

  const handleCancel = () => {
    dispatch(closeModal('createUserModal'))
  }

  const handleConfirm = () => {
    dispatch(closeModal('createUserModal'))
  }
  return (
    <InnerWrapper>
      <JustifyBetweenColumn height="100%">
        <ModalHeader>
          <JustifyCenterRow width="100%">
            <H1 margin="0" textAlign="center">
              Create User
            </H1>
          </JustifyCenterRow>
        </ModalHeader>

        <ModalBody>
          <JustifyBetweenColumn height="100%" padding="2rem 0">
            <JustifyBetweenRow width="100%">
              <InputWithIcon
                children={<User size={16} />}
                name="firstname"
                placeholder="Enter firstname..."
                onChange={handleInputChange}
                type="text"
                labelText="First Name"
              />
            </JustifyBetweenRow>
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

export default CreateUserModal
