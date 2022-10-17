import React from 'react'
import { IUser } from '@/models'
import { JustifyBetweenColumn, JustifyBetweenRow } from '@/components'

const UserModalHrSettingsTab: React.FC<{ userId: IUser['_id'] }> = ({ userId }) => {
  return (
    <JustifyBetweenRow>
      <JustifyBetweenColumn></JustifyBetweenColumn>
    </JustifyBetweenRow>
  )
}

export default UserModalHrSettingsTab
