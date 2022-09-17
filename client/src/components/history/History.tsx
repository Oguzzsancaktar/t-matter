import * as React from 'react'
import { Column, IconButton, JustifyBetweenRow } from '@/components'
import colors from '@constants/colors'
import { Database, Edit2, Plus, Trash2 } from 'react-feather'
import { HISTORY_TYPES } from '@constants/historyConstants'
import { IHistory } from '@/models'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'
import moment from 'moment'

interface IProps {
  onFilter: React.Dispatch<React.SetStateAction<undefined | string>>
  history?: IHistory[]
}

const getIcon = (type: string) => {
  switch (type) {
    case HISTORY_TYPES.CREATED:
      return {
        color: colors.orange.primary,
        icon: <Plus size={'20px'} color="#fff" />
      }
    case HISTORY_TYPES.UPDATED:
      return { color: colors.blue.primary, icon: <Edit2 size={'20px'} color="#fff" /> }
    case HISTORY_TYPES.DELETED:
      return { color: colors.red.primary, icon: <Trash2 size={'20px'} color="#fff" /> }
    default:
      return { color: colors.gray.light, icon: <Database size={'20px'} color="#fff" /> }
  }
}

const History: React.FC<IProps> = props => {
  return (
    <Column padding="0.6rem" height="100%">
      <JustifyBetweenRow margin="0 0 1rem 0">
        <IconButton
          onClick={props.onFilter.bind(this, HISTORY_TYPES.CREATED)}
          bgColor={colors.orange.primary}
          width="40px"
          height="40px"
          margin="0 .2rem 0 0"
          children={<Plus size={'20px'} color="#fff" />}
          borderRadius="50%"
          boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
        />
        <IconButton
          onClick={props.onFilter.bind(this, HISTORY_TYPES.UPDATED)}
          bgColor={colors.blue.primary}
          width="40px"
          height="40px"
          margin="0 .2rem 0 0"
          children={<Edit2 size={'20px'} color="#fff" />}
          borderRadius="50%"
          boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
        />
        <IconButton
          onClick={props.onFilter.bind(this, HISTORY_TYPES.DELETED)}
          bgColor={colors.red.primary}
          width="40px"
          height="40px"
          margin="0 .2rem 0 0"
          children={<Trash2 size={'20px'} color="#fff" />}
          borderRadius="50%"
          boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
        />
        <IconButton
          onClick={props.onFilter.bind(this, undefined)}
          bgColor={colors.gray.light}
          width="40px"
          height="40px"
          margin="0 .2rem 0 0"
          children={<Database size={'20px'} color="#fff" />}
          borderRadius="50%"
          boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
        />
      </JustifyBetweenRow>
      <div style={{ overflowY: 'auto' }}>
        <VerticalTimeline layout="1-column-left">
          {props.history?.map((item, index) => (
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              contentStyle={{ border: '1px solid #ccc' }}
              contentArrowStyle={{ borderRight: '7px solid #ccc' }}
              date={moment(item.createdAt).format('DD/MM/YYYY HH:mm')}
              iconStyle={{ background: getIcon(item.type).color, color: '#fff', width: 40, height: 40, top: 11 }}
              icon={getIcon(item.type).icon}
            >
              <h3 className="vertical-timeline-element-title">{item.title}</h3>
              <h4 className="vertical-timeline-element-subtitle">{item.description}</h4>
              <p>{item.user.firstname + ' ' + item.user.lastname}</p>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </div>
    </Column>
  )
}

export default History
