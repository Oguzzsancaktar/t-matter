import React from 'react'
import styled from 'styled-components'
import colors from '@constants/colors'
import moment from 'moment'
import { Link } from 'react-feather'
import { selectColorForActivityType } from '@/utils/statusColorUtil'
import { H1 } from '../texts'
import { ESize, ICustomer, ITask } from '@/models'
import useAccessStore from '@/hooks/useAccessStore'
import { openModal } from '@/store'
import { CustomerTaskModal } from '../modals'

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
  height: auto;
  min-height: 100px;
  /* background-color: ${({ type }) => (type ? selectColorForActivityType(type) + '70' : '#eff3fe')};
  */

  background-color: #eff3fe;

  border-radius: 4px;
  padding: 8px 16px;
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
  font-weight: 700;
  color: ${colors.black.primary};
  display: flex;
  align-items: center;
  cursor: pointer;
`

const BaloonDate = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${colors.gray.light};
`

const Hr = styled.hr`
  margin-bottom: 8px;
  width: 100%;
  border-top: 1px solid ${colors.gray.light};
`

const BaloonBody = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
`

const BaloonHour = styled.span`
  font-size: 16px;
  color: ${colors.black.primary};
  font-weight: 700;
  margin-left: 1rem;
`

const BaloonContent = styled.span`
  font-size: 12px;
  font-weight: 300;
  color: ${colors.text.primary};
  flex: 1;
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
          body: <CustomerTaskModal customerId={customer?._id} taskId={taskId} />,
          width: ESize.WXLarge,
          height: ESize.HLarge,
          backgroundColor: colors.gray.light
        })
      )
    }
  }

  return (
    <BaloonContainer type={type}>
      <BaloonHeader>
        <BaloonTitle onClick={() => handleOpenTaskModal(task?._id)}>
          <H1 fontSize="0.8rem" cursor="pointer" width="auto" color={colors.text.primary}>
            {task?.name}
          </H1>
          <H1 cursor="pointer" margin="0 0.2rem" width="auto" color={colors.text.primary}>
            -
          </H1>
          <H1 cursor="pointer" width="auto" fontSize="0.6rem" color={selectColorForActivityType(type || 0)}>
            {title}
          </H1>
        </BaloonTitle>
        <BaloonDate>{moment(date).format('Do YYYY')}</BaloonDate>
      </BaloonHeader>
      <Hr />
      <BaloonBody>
        <BaloonContent>{content}</BaloonContent>
        <BaloonHour>
          <H1 color={colors.gray.dark} fontSize="0.7rem">
            {moment(date).format('hh:mm a')}
          </H1>
        </BaloonHour>
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
