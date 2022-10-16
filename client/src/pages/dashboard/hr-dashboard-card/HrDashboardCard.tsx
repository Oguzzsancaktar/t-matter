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
          width: '70px',
          fontSize: 12,
          textAlign: 'center',
          fontFamily: 'Satoshi-Light',
          padding: '0.1rem 0.2rem',
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
          <SmallBadge count={10} text="Login" color={'#7adad1'} onClick={() => {}} />
          <SmallBadge count={11} text="Mental" color={'#3b4b8d'} onClick={() => {}} />
          <SmallBadge count={12} text="Absent" color={'#ca5b5b'} onClick={() => {}} />
          <SmallBadge count={12} text="Vacation" color={'#416fc7'} onClick={() => {}} />
          <SmallBadge count={13} text="Others" color={'#ccc'} onClick={() => {}} />
        </div>
      }
    >
      incoming chart
    </DashboardCard>
  )
}

export default HrDashboardCard
