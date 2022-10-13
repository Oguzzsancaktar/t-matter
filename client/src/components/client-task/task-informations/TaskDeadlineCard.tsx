import { DatePicker } from '@/components/date-picker'
import { ItemContainer } from '@/components/item-container'
import { Column, JustifyBetweenRow, JustifyCenterRow, Row } from '@/components/layout'
import { ProgressBar } from '@/components/progress-bar'
import { H1 } from '@/components/texts'
import colors from '@/constants/colors'
import { initialRadialChartOptions } from '@/constants/initialValues'
import { ITaskItem } from '@/models'
import { ApexOptions } from 'apexcharts'
import moment from 'moment'
import React from 'react'
import ReactApexChart from 'react-apexcharts'
import { Calendar } from 'react-feather'

interface IProps {
  taskActiveStep: ITaskItem
}
const TaskDeadlineCard: React.FC<IProps> = ({ taskActiveStep }) => {
  const percentage =
    (moment(Date.now()).diff(moment(taskActiveStep.startDate)) /
      moment(taskActiveStep.endDate).diff(moment(taskActiveStep.startDate))) *
    100

  const radialChartOptions: ApexOptions = {
    ...initialRadialChartOptions,
    plotOptions: {
      radialBar: {
        track: {
          background: '#ffffff'
        },
        hollow: {
          margin: 5,
          size: '60%',
          background: 'transparent',
          position: 'front',
          dropShadow: {
            enabled: false,
            top: 0,
            left: 0,
            blur: 3,
            opacity: 0.5
          }
        },
        startAngle: -135,
        endAngle: 135,
        dataLabels: {
          name: {
            show: false,
            fontSize: '16px',
            color: undefined,
            offsetY: 120
          },
          value: {
            offsetY: 70,
            fontSize: '13px',
            color: colors.text.primary,
            formatter: function (val) {
              return moment(taskActiveStep.startDate).format('MMM/DD/YY  HH:mm')
            }
          }
        }
      }
    }
  }

  return (
    <ItemContainer height="100%" transform="translateX(-6%)">
      <ItemContainer position="absolute" left="50%" top="40%" transform="translate(-50%,-50%)" width="100px">
        <JustifyCenterRow width="100%" height="20px">
          <Calendar size={20} color={colors.text.primary} />
        </JustifyCenterRow>
      </ItemContainer>
      <ReactApexChart options={radialChartOptions} series={[percentage]} type="radialBar" height={'100%'} />

      {/* <Column>
        <ItemContainer>
          <JustifyBetweenRow>
            <Row>
              <Calendar size={20} color={colors.text.primary} />

              <ItemContainer margin="0 0 0 0.3rem ">
                <H1 color={colors.text.primary} width="auto" fontWeight="400">
                  {moment(taskActiveStep.startDate).format('MMMM DD YYYY HH:mm')}
                </H1>
              </ItemContainer>
            </Row>
            <ItemContainer width="auto">
              <H1 color={colors.text.primary} fontWeight="400" width="max-content">
                {moment(taskActiveStep.endDate).diff(moment(Date.now()), 'days')} days
              </H1>
            </ItemContainer>
          </JustifyBetweenRow>
        </ItemContainer>
        <ItemContainer>
          <ProgressBar
            completionColor={percentage > 100 ? colors.orange.primary : colors.blue.primary}
            completionPercentage={percentage}
            // startLabel="Start Date"
            // endLabel="Expire Date"
          />
        </ItemContainer>
      </Column> */}
    </ItemContainer>
  )
}

export default TaskDeadlineCard
