import React from 'react'
import { ICustomer } from '@/models'
import { CalendarView, ItemContainer } from '@/components'

interface IProps {
  customer: ICustomer
}

const CustomerModalCalendarTab: React.FC<IProps> = ({ customer }) => {
  return (
    <ItemContainer height="100%" overflow="hidden">
      <CalendarView customer={customer} />
    </ItemContainer>
  )
}

export default CustomerModalCalendarTab
