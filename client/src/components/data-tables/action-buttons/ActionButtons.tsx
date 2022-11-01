import React from 'react'
import { IconButton, Row } from '@/components'
import colors from '@/constants/colors'
import { Check, Edit, Eye, FileText, Trash2, Type } from 'react-feather'
import { EStatus } from '@/models'
import { CgArrowsExchangeV } from 'react-icons/cg'

interface IProps {
  iconSize?: string
  status?: number
  buttonWidth?: string
  rowWidth?: string
  // onRead?: () => void
  onEdit?: () => void
  onHistory?: () => void
  onDelete?: () => void
  onReactive?: () => void
  onCustomType?: () => void
}

const ActionButtons: React.FC<IProps> = ({
  iconSize = '25px',
  status = EStatus.Active,
  buttonWidth,
  rowWidth,
  onEdit,
  onHistory,
  onDelete,
  onReactive,
  onCustomType
}) => {
  return (
    <Row width={rowWidth ? rowWidth : 'auto'}>
      {/* {onRead && (
        <IconButton
          onClick={onRead}
          bgColor={colors.background.gray.light}
          width={buttonWidth || iconSize}
          height={iconSize}
          margin="0 .2rem 0 0"
          children={<Eye size={'16px'} color={colors.text.primary} />}
        />
      )} */}

      {onEdit && (
        <IconButton
          onClick={onEdit}
          bgColor={colors.background.gray.light}
          width={buttonWidth || iconSize}
          height={iconSize}
          margin="0 .2rem 0 0"
          children={<Edit size={'16px'} color={colors.text.primary} />}
        />
      )}

      {onHistory && (
        <IconButton
          onClick={onHistory}
          bgColor={colors.background.gray.light}
          width={buttonWidth || iconSize}
          height={iconSize}
          margin="0 .2rem 0 0"
          children={<FileText size={'16px'} color={colors.text.primary} />}
        />
      )}
      {status === EStatus.Active && onDelete ? (
        <IconButton
          onClick={onDelete}
          bgColor={colors.background.gray.light}
          width={buttonWidth || iconSize}
          height={iconSize}
          margin="0 0 0 0"
          children={<Trash2 size={'16px'} color={colors.text.primary} />}
        />
      ) : onCustomType ? (
        <IconButton
          onClick={onCustomType}
          bgColor={colors.background.gray.light}
          width={buttonWidth || iconSize}
          height={iconSize}
          margin="0 0 0 0"
          children={<CgArrowsExchangeV size={'16px'} color={colors.text.primary} />}
        />
      ) : (
        onReactive && (
          <IconButton
            onClick={onReactive}
            bgColor={colors.background.gray.light}
            width={buttonWidth || iconSize}
            height={iconSize}
            margin="0 0 0 0"
            children={<Check size={'16px'} color={colors.text.primary} />}
          />
        )
      )}
    </Row>
  )
}

export default ActionButtons
