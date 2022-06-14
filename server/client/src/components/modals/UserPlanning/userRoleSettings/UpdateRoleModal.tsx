import React, { useState } from 'react'
import { ConfirmCancelButtons } from '@/components/button'
import { InputRegular } from '@/components/input'
import { JustifyBetweenColumn, JustifyCenterColumn, JustifyCenterRow, Row } from '@/components/layout'
import { H1 } from '@/components/texts'
import useAccessStore from '@/hooks/useAccessStore'
import { closeModal } from '@/store'
import { InnerWrapper } from '@/components'
import { ModalBody, ModalFooter, ModalHeader } from '../../types'
import { usePatchRoleMutation } from '@/services/settings/user-planning/userRoleService'
import { isValueNull } from '@/utils/validationUtils'
import { toastSuccess, toastWarning } from '@/utils/toastUtil'
import { IRole } from '@/models'

interface IProps {
  role: IRole
}
const UpdateRoleModal: React.FC<IProps> = ({ role }) => {
  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

  const [roleName, setRoleName] = useState(role.name)
  const [patchRole] = usePatchRoleMutation()

  const handleCancel = () => {
    dispatch(closeModal('createRoleModal'))
  }

  const handleConfirm = async () => {
    if (isValueNull(roleName)) {
      await patchRole({ _id: role._id, name: roleName })
      toastSuccess('Role ' + roleName + ' updated successfully')
      dispatch(closeModal(`updateRoleModal-${role._id}`))
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

export default UpdateRoleModal
