import { ClockPicker24, DatePicker, ProgressBar } from '@/components'
import { ItemContainer } from '@/components/item-container'
import {
  Column,
  JustifyBetweenColumn,
  JustifyBetweenRow,
  JustifyCenterColumn,
  JustifyCenterRow,
  Row
} from '@/components/layout'
import { H1 } from '@/components/texts'
import colors from '@/constants/colors'
import { dateTimeFormat, dateTimeFormatMoment } from '@/constants/formats'
import { initialRadialChartOptions } from '@/constants/initialValues'
import { useAuth } from '@/hooks/useAuth'
import { useOutsideTrigger } from '@/hooks/useOutsideTrigger'
import { ETaskStatus, ITaskItem } from '@/models'
import { epochToDateString } from '@/utils/timeUtils'
import { ApexOptions } from 'apexcharts'
import moment from 'moment'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import ReactApexChart from 'react-apexcharts'
import { Calendar, ExternalLink } from 'react-feather'
import Flatpickr from 'react-flatpickr'
import TimeKeeper from 'react-timekeeper'
import { ChangeTimeFn, TimeOutput } from 'react-timekeeper/lib/helpers/types'

interface IProps {
  taskActiveStep: ITaskItem
  onPostponeChange: (value: Date[], dateText: string) => void
}
const TaskPostponeCard: React.FC<IProps> = ({ taskActiveStep, onPostponeChange }) => {
  const series = useMemo(
    () => [(taskActiveStep?.usedPostpone / taskActiveStep?.postponeLimit) * 100],
    [taskActiveStep?.usedPostpone]
  )
  const [isPostponeLimitPassed, setIsPostponeLimitPassed] = useState<boolean>(
    taskActiveStep.usedPostpone > taskActiveStep.postponeLimit
  )

  const [showTime, setShowTime] = useState(false)
  const timePickerRef = useRef(null)
  useOutsideTrigger(timePickerRef, () => setShowTime(false))

  const [postponeDate, setPostponeDate] = useState({
    value: [new Date(taskActiveStep.postponedDate)],
    dateText: epochToDateString(taskActiveStep.postponedDate) || ''
  })
  const [postponeClock, setPostponeClock] = useState(
    epochToDateString(taskActiveStep.postponedDate).split(' ')[1] || '00:00'
  )
  const canTaskPostpone: boolean = taskActiveStep.stepStatus === ETaskStatus['Progress']

  const onDateChange = (value: Date[], dateText: string) => {
    setPostponeDate({ value, dateText })
    setShowTime(true)
  }

  const onClockChange: ChangeTimeFn = (t: TimeOutput) => {
    setPostponeClock(t.formatted24)
  }

  const handleDoneClick = () => {
    const date = postponeDate.dateText.split(' ')[0]
    const dateWithClock = date + ' ' + postponeClock
    onPostponeChange([new Date()], dateWithClock)

    setRadialChartOptions({
      ...initialRadialChartOptions,
      plotOptions: {
        radialBar: {
          track: {
            background: '#ffffff'
          },
          hollow: {
            margin: 5,
            size: '50%',
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
              fontSize: '3px',
              color: undefined,
              offsetY: 10
            },
            value: {
              show: false,
              offsetY: 60,
              fontSize: '15px',
              color: colors.text.primary,
              formatter: function (val) {
                if ((taskActiveStep?.postponeLimit * val) / 100 > taskActiveStep?.postponeLimit) {
                  setIsPostponeLimitPassed(true)
                }
                return epochToDateString(taskActiveStep.postponedDate)
              }
            }
          }
        }
      },

      tooltip: {
        enabled: false,
        shared: true,
        followCursor: true,
        intersect: false,
        inverseOrder: false,
        custom: undefined,
        x: {
          formatter: function (val) {
            return '$ ' + val
          }
        },

        y: {
          title: {
            formatter(timestamp) {
              return ''
            }
          },

          formatter(timestamp) {
            return taskActiveStep.usedPostpone + '/' + taskActiveStep.postponeLimit
          }
        },
        z: {
          formatter(timestamp) {
            return 'timestamp.toString()2'
          }
        },
        style: {
          fontSize: '12px',
          fontFamily: undefined
        },
        onDatasetHover: {
          highlightDataSeries: false
        },

        marker: {
          show: false
        },
        items: {
          display: 'flex'
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

    setShowTime(false)
  }

  const [radialChartOptions, setRadialChartOptions] = useState<ApexOptions>({
    ...initialRadialChartOptions,
    plotOptions: {
      radialBar: {
        track: {
          background: '#ffffff'
        },
        hollow: {
          margin: 5,
          size: '50%',
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
            fontSize: '3px',
            color: undefined,
            offsetY: 10
          },
          value: {
            show: false,
            offsetY: 60,
            fontSize: '15px',
            color: colors.text.primary,
            formatter: function (val) {
              if ((taskActiveStep?.postponeLimit * val) / 100 > taskActiveStep?.postponeLimit) {
                setIsPostponeLimitPassed(true)
              }
              return epochToDateString(taskActiveStep.postponedDate)
            }
          }
        }
      }
    },

    tooltip: {
      enabled: false,
      shared: true,
      followCursor: true,
      intersect: false,
      inverseOrder: false,
      custom: undefined,
      x: {
        formatter: function (val) {
          return '$ ' + val
        }
      },

      y: {
        title: {
          formatter(timestamp) {
            return ''
          }
        },

        formatter(timestamp) {
          return taskActiveStep.usedPostpone + '/' + taskActiveStep.postponeLimit
        }
      },
      z: {
        formatter(timestamp) {
          return 'timestamp.toString()2'
        }
      },
      style: {
        fontSize: '12px',
        fontFamily: undefined
      },
      onDatasetHover: {
        highlightDataSeries: false
      },

      marker: {
        show: false
      },
      items: {
        display: 'flex'
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

  return (
    <ItemContainer height="100%" position="relative" transform="translateX(15%)">
      <ReactApexChart
        options={radialChartOptions}
        series={series[0] > 100 ? [100] : series}
        type="radialBar"
        height={'100%'}
      />

      <ItemContainer position="absolute" left="50%" top="40%" transform="translate(-50%,-50%)" width="140px">
        <JustifyCenterColumn width="100%" height="40px">
          <ExternalLink size={20} color={colors.text.primary} />
          <H1 color={colors.text.primary} fontSize="0.8rem" textAlign="center">
            {taskActiveStep?.usedPostpone + '/' + taskActiveStep?.postponeLimit}
          </H1>
        </JustifyCenterColumn>
      </ItemContainer>

      <ItemContainer
        margin="0 0 0 -0.2rem"
        position="absolute"
        left="52%"
        top="67%"
        transform="translate(-50%,-50%)"
        zIndex="9999999999999999"
      >
        <Flatpickr
          style={{
            fontSize: 16,
            height: '20px',
            textAlign: 'center'
          }}
          disabled={!canTaskPostpone}
          options={{
            enableTime: false,
            dateFormat: dateTimeFormat,
            minDate: moment.now().valueOf(),
            maxDate: taskActiveStep.endDate
          }}
          value={taskActiveStep.postponedDate}
          onChange={onDateChange}
          placeholder="Postpone Task"
          wrap={true}
        />
        <ItemContainer position="absolute" zIndex="999">
          {showTime && (
            <div ref={timePickerRef}>
              <TimeKeeper
                // closeOnMinuteSelect={true}
                onChange={onClockChange}
                hour24Mode={true}
                time={postponeClock.trim()}
                onDoneClick={handleDoneClick}
                switchToMinuteOnHourSelect
              />
            </div>
          )}
        </ItemContainer>
      </ItemContainer>
    </ItemContainer>
  )
}

export default TaskPostponeCard
