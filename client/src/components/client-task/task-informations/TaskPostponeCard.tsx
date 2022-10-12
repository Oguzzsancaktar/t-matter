import { DatePicker, ProgressBar } from '@/components'
import { ItemContainer } from '@/components/item-container'
import { Column, JustifyBetweenRow, Row } from '@/components/layout'
import { H1 } from '@/components/texts'
import colors from '@/constants/colors'
import { initialRadialChartOptions } from '@/constants/initialValues'
import { useAuth } from '@/hooks/useAuth'
import { ETaskStatus, ITaskItem } from '@/models'
import { ApexOptions } from 'apexcharts'
import moment from 'moment'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import ReactApexChart from 'react-apexcharts'
import { Calendar, ExternalLink } from 'react-feather'
import Flatpickr from 'react-flatpickr'

interface IProps {
  taskActiveStep: ITaskItem
  onPostponeChange: (value: Date[], dateText: string) => void
}
const TaskPostponeCard: React.FC<IProps> = ({ taskActiveStep, onPostponeChange }) => {
  const series = useMemo(() => [(taskActiveStep?.usedPostpone / taskActiveStep?.postponeTime) * 100], [taskActiveStep])

  const [isPostponeLimitPassed, setIsPostponeLimitPassed] = useState<boolean>(false)

  const [postponeDate, setPostponeDate] = useState({ value: [new Date(taskActiveStep.postponedDate)], dateText: '' })
  const canTaskPostpone: boolean = taskActiveStep.stepStatus === ETaskStatus['Progress']

  const onDateChange = (value: Date[], dateText: string) => {
    setPostponeDate({ value, dateText })
    onPostponeChange(value, dateText)
  }

  const [radialChartOptions, setRadialChartOptions] = useState<ApexOptions>({
    ...initialRadialChartOptions,
    plotOptions: {
      radialBar: {
        track: {
          background: '#ffffff'
        },
        startAngle: -135,

        endAngle: 135,
        dataLabels: {
          name: {
            show: false,
            fontSize: '3px',
            color: undefined,
            offsetY: 10
          },
          value: {
            show: true,
            offsetY: 60,
            fontSize: '13x',
            color: colors.text.primary,
            formatter: function (val) {
              if ((taskActiveStep?.postponeTime * val) / 100 > taskActiveStep?.postponeTime) {
                setIsPostponeLimitPassed(true)
              }
              return (taskActiveStep?.postponeTime * val) / 100 + '/' + taskActiveStep?.postponeTime
            }
          }
        }
      }
    },
    fill: {
      type: 'gradient',
      colors: isPostponeLimitPassed ? [colors.red.primary] : [colors.blue.primary],
      gradient: {
        shade: 'dark',
        shadeIntensity: 0.15,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 65, 91]
      }
    }
  })

  console.log(isPostponeLimitPassed)

  return (
    <ItemContainer height="100%" position="relative" transform="translateX(18%)">
      <ReactApexChart options={radialChartOptions} series={series} type="radialBar" height={'100%'} />

      <ItemContainer position="absolute" left="50%" top="50%" transform="translate(-50%,-50%)">
        <Row>
          <ExternalLink size={20} color={colors.text.primary} />
          <ItemContainer margin="0 0 0 -0.2rem ">
            <Flatpickr
              disabled={!canTaskPostpone}
              options={{
                enableTime: false,
                dateFormat: 'M/d/Y'
              }}
              value={taskActiveStep.postponedDate}
              onChange={onDateChange}
              placeholder="Postpone Task"
            />
          </ItemContainer>
        </Row>
      </ItemContainer>

      {/* <Column>
        <ItemContainer>
          <JustifyBetweenRow>
            <ItemContainer width="auto">
              <H1 width="max-content" fontWeight="400" color={colors.text.primary}>
                {taskActiveStep?.usedPostpone} / {taskActiveStep?.postponeTime}
              </H1>
            </ItemContainer>
          </JustifyBetweenRow>
        </ItemContainer>
        <ItemContainer margin="-0.4rem 0 0 0">
          <ProgressBar
            completionColor={
              taskActiveStep?.usedPostpone > taskActiveStep?.postponeTime ? colors.orange.primary : colors.blue.primary
            }
            completionPercentage={(taskActiveStep?.usedPostpone / taskActiveStep?.postponeTime) * 100}
            // startLabel="Postponed"
            // endLabel="Remaining"
          />
        </ItemContainer>
      </Column> */}
    </ItemContainer>
  )
}

export default TaskPostponeCard
