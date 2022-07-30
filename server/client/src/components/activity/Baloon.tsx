import React from 'react'
import styled from 'styled-components'
import colors from "@constants/colors";
import moment from "moment";
import {Link} from 'react-feather';

const BaloonContainer = styled.div`
  width: 100%;
  height: 135px;
  background-color: #e1edf4;
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
  color: ${colors.black.primary}
`

const BaloonDate = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${colors.gray.light}
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

interface Props {
  title: string
  content: string
  date: Date
  links?: [{
    url: string
    text: string
  }]
}

const Baloon: React.FC<Props> = ({title, content, date, links}) => {

  return (
    <BaloonContainer>
      <BaloonHeader>
        <BaloonTitle>{title}</BaloonTitle>
        <BaloonDate>{moment(date).format('Do YYYY')}</BaloonDate>
      </BaloonHeader>
      <Hr/>
      <BaloonBody>
        <BaloonContent>{content}</BaloonContent>
        <BaloonHour>{moment(date).format('hh:mm a')}</BaloonHour>
      </BaloonBody>
      <BaloonFooter>
      {links && links.map(({url, text}, index) => (
        <BaloonLinks href={url}><div><Link size={12}/></div>{text}</BaloonLinks>
      ))}
      </BaloonFooter>
    </BaloonContainer>
  );
}

export default Baloon;
