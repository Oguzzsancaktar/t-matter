import React from 'react'
import { IconButton, Row } from '@/components'
import colors from '@/constants/colors'
import { Edit, Eye, FileText, Trash2 } from 'react-feather'

interface IProps {
  onRead: () => void
  onEdit: () => void
  onHistory: () => void
  onDelete: () => void
}

const ActionButtons: React.FC<IProps> = ({ onRead, onEdit, onHistory, onDelete }) => {
  return (
    <Row width="auto">
      <IconButton
        onClick={onRead}
        bgColor={colors.background.gray.light}
        width="25px"
        height="25px"
        margin="0 .2rem 0 0"
        children={<Eye size={'16px'} color={colors.text.primary} />}
      />
      <IconButton
        onClick={onEdit}
        bgColor={colors.background.gray.light}
        width="25px"
        height="25px"
        margin="0 .2rem 0 0"
        children={<Edit size={'16px'} color={colors.text.primary} />}
      />
      <IconButton
        onClick={onHistory}
        bgColor={colors.background.gray.light}
        width="25px"
        height="25px"
        margin="0 .2rem 0 0"
        children={<FileText size={'16px'} color={colors.text.primary} />}
      />
      <IconButton
        onClick={onDelete}
        bgColor={colors.background.gray.light}
        width="25px"
        height="25px"
        margin="0 0 0 0"
        children={<Trash2 size={'16px'} color={colors.text.primary} />}
      />
    </Row>
  )
}

export default ActionButtons
