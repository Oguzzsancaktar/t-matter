import React, { useState } from 'react'
import { ConfirmCancelButtons } from '@/components/button'
import { InputRegular } from '@/components/input'
import { JustifyBetweenColumn, JustifyCenterColumn, JustifyCenterRow, Row } from '@/components/layout'
import { H1 } from '@/components/texts'
import useAccessStore from '@/hooks/useAccessStore'
import { closeModal } from '@/store'
import { ItemContainer } from '@/components'
import { ModalBody, ModalFooter, ModalHeader } from '../../types'
import { useCreateRoleMutation } from '@/services/settings/user-planning/userRoleService'
import { isValueNull } from '@/utils/validationUtils'
import { toastSuccess, toastWarning } from '@/utils/toastUtil'
import colors from '@/constants/colors'

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
        <ItemContainer>
          <JustifyCenterRow width="100%">
            <H1 margin="0" textAlign="center" fontWeight="700" color={colors.white.primary}>
              Create User Role
            </H1>
          </JustifyCenterRow>
        </ItemContainer>
      </ModalHeader>

      <ModalBody withModalFooter={true}>
        <ItemContainer>
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
        </ItemContainer>
      </ModalBody>

      <ModalFooter>
        <ItemContainer>
          <Row>
            <ConfirmCancelButtons onCancel={handleCancel} onConfirm={handleConfirm} />
          </Row>
        </ItemContainer>
      </ModalFooter>
    </JustifyBetweenColumn>
  )
}

export default CreateRoleModal
