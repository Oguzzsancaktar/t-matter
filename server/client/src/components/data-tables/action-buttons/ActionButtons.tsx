import React from 'react'
import { IconButton, Row } from '@/components'
import colors from '@/constants/colors'
import { Check, Edit, Eye, FileText, Trash2 } from 'react-feather'
import { EStatus } from '@/models'

interface IProps {
  iconSize?: string
  status?: string
  buttonWidth?: string
  rowWidth?: string
  onRead: () => void
  onEdit: () => void
  onHistory: () => void
  onDelete: () => void
  onReactive?: () => void
}

const ActionButtons: React.FC<IProps> = ({
  iconSize = '25px',
  status = EStatus.Active,
  buttonWidth,
  rowWidth,
  onRead,
  onEdit,
  onHistory,
  onDelete,
  onReactive
}) => {
  return (
    <Row width={rowWidth ? rowWidth : 'auto'}>
      <IconButton
        onClick={onRead}
        bgColor={colors.background.gray.light}
        width={buttonWidth || iconSize}
        height={iconSize}
        margin="0 .2rem 0 0"
        children={<Eye size={'16px'} color={colors.text.primary} />}
      />
      <IconButton
        onClick={onEdit}
        bgColor={colors.background.gray.light}
        width={buttonWidth || iconSize}
        height={iconSize}
        margin="0 .2rem 0 0"
        children={<Edit size={'16px'} color={colors.text.primary} />}
      />
      <IconButton
        onClick={onHistory}
        bgColor={colors.background.gray.light}
        width={buttonWidth || iconSize}
        height={iconSize}
        margin="0 .2rem 0 0"
        children={<FileText size={'16px'} color={colors.text.primary} />}
      />
      {status === EStatus.Active ? (
        <IconButton
          onClick={onDelete}
          bgColor={colors.background.gray.light}
          width={buttonWidth || iconSize}
          height={iconSize}
          margin="0 0 0 0"
          children={<Trash2 size={'16px'} color={colors.text.primary} />}
        />
      ) : (
        <IconButton
          onClick={onReactive}
          bgColor={colors.background.gray.light}
          width={buttonWidth || iconSize}
          height={iconSize}
          margin="0 0 0 0"
          children={<Check size={'16px'} color={colors.text.primary} />}
        />
      )}
    </Row>
  )
}

export default ActionButtons
