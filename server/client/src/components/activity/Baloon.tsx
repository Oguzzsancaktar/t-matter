import React from 'react'
import styled from 'styled-components'
import colors from '@constants/colors'
import moment from 'moment'
import { Link } from 'react-feather'
import { selectColorForActivityType } from '@/utils/statusColorUtil'

interface IProps {
  title: string
  content: string
  date: Date
  type?: number
  links?: [
    {
      url: string
      text: string
    }
  ]
}

const BaloonContainer = styled.div<Pick<IProps, 'type'>>`
  width: 100%;
  height: 135px;
  background-color: ${({ type }) => (type ? selectColorForActivityType(type) + '70' : '#e1edf4')};

  border-radius: 4px;
  padding: 8px 16px;
  max-width: 700px;
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

const Baloon: React.FC<IProps> = ({ title, content, date, links, type }) => {
  return (
    <BaloonContainer type={type}>
      <BaloonHeader>
        <BaloonTitle>{title}</BaloonTitle>
        <BaloonDate>{moment(date).format('Do YYYY')}</BaloonDate>
      </BaloonHeader>
      <Hr />
      <BaloonBody>
        <BaloonContent>{content}</BaloonContent>
        <BaloonHour>{moment(date).format('hh:mm a')}</BaloonHour>
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
