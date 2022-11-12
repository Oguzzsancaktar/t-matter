import { Text, Button } from '@nextui-org/react'
import { CgClose } from 'react-icons/cg'
import { useNavigate } from 'react-router-dom'

const PageWrapper = ({ children, title }) => {
  const navigate = useNavigate()
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: 24,
        background: '#f1f2f3'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div />
        <Text h2 style={{ fontFamily: 'Satoshi-Bold', color: '#96C1F2', position: 'relative', top: 80 }} size={46}>
          {title}
        </Text>
        <Button onClick={() => navigate('/checkin')} auto flat color="primary" icon={<CgClose size="24px" />} />
      </div>
      {children}
    </div>
  )
}

export default PageWrapper
