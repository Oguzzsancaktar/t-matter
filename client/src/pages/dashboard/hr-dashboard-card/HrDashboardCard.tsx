import React from 'react'
import { DashboardCard } from '@/pages'

const SmallBadge = ({ color, onClick, count, text }) => {
  return (
    <div
      onClick={onClick}
      style={{ display: 'flex', alignItems: 'center', marginRight: 16, cursor: 'pointer', flexDirection: 'column' }}
    >
      <span style={{ fontSize: 10 }}>{count}</span>
      <span
        style={{
          width: '80px',
          fontSize: 13,
          textAlign: 'center',
          fontFamily: 'Satoshi-Medium',
          padding: '0.2rem 0.3rem',
          backgroundColor: color,
          marginTop: 2,
          color: 'white',
          borderRadius: '0.3rem',
          fontWeight: '600'
        }}
      >
        {text}
      </span>
    </div>
  )
}

const HrDashboardCard = () => {
  return (
    <DashboardCard
      head={
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            height: '100%'
          }}
        >
          <SmallBadge count={10} text="Absent" color={'#ff7b00'} onClick={() => {}} />
          <SmallBadge count={10} text="Login" color={'#7adad1'} onClick={() => {}} />
          <SmallBadge count={11} text="Mental" color={'#3b4b8d'} onClick={() => {}} />
          <SmallBadge count={12} text="Sick" color={'#ca5b5b'} onClick={() => {}} />
          <SmallBadge count={13} text="Vacation" color={'#ccc'} onClick={() => {}} />
        </div>
      }
    >
      incoming chart
    </DashboardCard>
  )
}

export default HrDashboardCard
