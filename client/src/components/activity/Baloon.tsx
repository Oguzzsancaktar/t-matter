import React from 'react'
import styled from 'styled-components'
import colors from '@constants/colors'
import { Link } from 'react-feather'
import { selectColorForActivityType } from '@/utils/statusColorUtil'
import { H1 } from '../texts'
import { ESize, ICustomer, ITask } from '@/models'
import useAccessStore from '@/hooks/useAccessStore'
import { openModal } from '@/store'
import { CustomerTaskModal } from '../modals'
import { Column } from '../layout'

interface IProps {
  title: string
  content: string
  date: Date
  customer?: ICustomer
  type?: number
  task?: ITask
  links?: [
    {
      url: string
      text: string
    }
  ]
}

const BaloonContainer = styled.div<Pick<IProps, 'type'>>`
  width: 100%;
  height: 100%;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
`

const BaloonHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2px;
`

const BaloonTitle = styled.span`
  font-size: 16px;
  height: 35px;
  font-weight: 700;
  color: ${colors.black.primary};
  display: flex;
  align-items: center;
  cursor: pointer;
`

const BaloonBody = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const BaloonContent = styled.div`
  margin-top: 1rem;
  height: auto;
  font-size: 1rem;
  font-weight: 300;
  font-family: 'Satoshi-Light';
  color: ${colors.text.primary};
  flex: 1;
  word-break: break-all;
`

const BaloonLinks = styled.a`
  text-decoration: none;
  color: ${colors.blue.primary};
  font-size: 12px;
  display: flex;
  align-items: center;
  & div {
    margin-right: 4px;
  }
  margin-right: 6px;
`

const BaloonFooter = styled.div`
  display: flex;
`

const Baloon: React.FC<IProps> = ({ task, customer, title, content, date, links, type }) => {
  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

  const handleOpenTaskModal = (taskId?: ITask['_id']) => {
    if (customer?._id && taskId) {
      dispatch(
        openModal({
          id: 'customerTaksModal' + taskId,
          title: 'Customer Task',
          body: <CustomerTaskModal customer={customer} customerId={customer?._id} taskId={taskId} />,
          width: ESize.WXLarge,
          height: ESize.HLarge,
          maxWidth: ESize.WXLarge,
          backgroundColor: colors.gray.light
        })
      )
    }
  }

  return (
    <BaloonContainer type={type}>
      <BaloonHeader>
        <Column>
          <H1>{customer?.firstname + ' ' + customer?.lastname}</H1>
          <BaloonTitle onClick={() => handleOpenTaskModal(task?._id)}>
            <H1 fontSize="1rem" cursor="pointer" width="auto" color={colors.secondary.middle}>
              {task?.name}
            </H1>
            <H1 cursor="pointer" margin="0 0.2rem" width="auto" color={colors.text.primary}>
              -
            </H1>
            <H1 cursor="pointer" width="auto" fontSize="0.8rem" color={selectColorForActivityType(type || 0)}>
              {title}
            </H1>
          </BaloonTitle>
        </Column>
      </BaloonHeader>
      <BaloonBody>
        <BaloonContent>{content}</BaloonContent>
      </BaloonBody>
      <BaloonFooter>
        {links &&
          links.map(({ url, text }, index) => (
            <BaloonLinks href={url}>
              <div>
                <Link size={12} />
              </div>
              {text}
            </BaloonLinks>
          ))}
      </BaloonFooter>
    </BaloonContainer>
  )
}

export default Baloon
