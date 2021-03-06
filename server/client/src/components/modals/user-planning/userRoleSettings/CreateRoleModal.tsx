import React, { useState } from 'react'
import { ConfirmCancelButtons } from '@/components/button'
import { InputRegular } from '@/components/input'
import { JustifyBetweenColumn, JustifyCenterColumn, JustifyCenterRow, Row } from '@/components/layout'
import { H1, Label } from '@/components/texts'
import useAccessStore from '@/hooks/useAccessStore'
import { closeModal } from '@/store'
import { InnerWrapper } from '@/components'
import { ModalBody, ModalFooter, ModalHeader } from '../../types'
import { useCreateRoleMutation } from '@/services/settings/user-planning/userRoleService'
import { isValueNull } from '@/utils/validationUtils'
import { toastSuccess, toastWarning } from '@/utils/toastUtil'

const CreateRoleModal = () => {
  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

  const [roleName, setRoleName] = useState('')
  const [createRole] = useCreateRoleMutation()

  const handleCancel = () => {
    dispatch(closeModal('createRoleModal'))
  }

  const handleConfirm = async () => {
    if (isValueNull(roleName)) {
      await createRole({ name: roleName })
      toastSuccess('Role ' + roleName + ' created successfully')
      dispatch(closeModal('createRoleModal'))
    } else {
      toastWarning('Role name is required')
    }
  }
  return (
    <JustifyBetweenColumn height="100%">
      <ModalHeader>
        <InnerWrapper>
          <JustifyCenterRow width="100%">
            <H1 margin="0" textAlign="center">
              Create User Role
            </H1>
          </JustifyCenterRow>
        </InnerWrapper>
      </ModalHeader>

      <ModalBody>
        <InnerWrapper>
          <JustifyCenterColumn height="100%" padding="2rem 0">
            <InputRegular
              name="role"
              placeholder="Enter role..."
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRoleName(e.target.value)}
              value={roleName}
              type="text"
              labelText="Role Name"
            />
          </JustifyCenterColumn>
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

export default CreateRoleModal
