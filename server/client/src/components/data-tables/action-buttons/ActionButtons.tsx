import React from 'react'
import { IconButton, Row } from '@/components'
import colors from '@/constants/colors'
import { Edit, Eye, FileText, Trash2 } from 'react-feather'

interface IProps {
  iconSize?: string
  onRead: () => void
  onEdit: () => void
  onHistory: () => void
  onDelete: () => void
}

const ActionButtons: React.FC<IProps> = ({ iconSize = '25px', onRead, onEdit, onHistory, onDelete }) => {
  return (
    <Row width="auto">
      <IconButton
        onClick={onRead}
        bgColor={colors.background.gray.light}
        width={iconSize}
        height={iconSize}
        margin="0 .2rem 0 0"
        children={<Eye size={'16px'} color={colors.text.primary} />}
      />
      <IconButton
        onClick={onEdit}
        bgColor={colors.background.gray.light}
        width={iconSize}
        height={iconSize}
        margin="0 .2rem 0 0"
        children={<Edit size={'16px'} color={colors.text.primary} />}
      />
      <IconButton
        onClick={onHistory}
        bgColor={colors.background.gray.light}
        width={iconSize}
        height={iconSize}
        margin="0 .2rem 0 0"
        children={<FileText size={'16px'} color={colors.text.primary} />}
      />
      <IconButton
        onClick={onDelete}
        bgColor={colors.background.gray.light}
        width={iconSize}
        height={iconSize}
        margin="0 0 0 0"
        children={<Trash2 size={'16px'} color={colors.text.primary} />}
      />
    </Row>
  )
}

export default ActionButtons
