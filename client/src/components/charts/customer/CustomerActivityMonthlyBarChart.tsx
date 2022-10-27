import { ItemContainer } from '@/components/item-container'
import colors from '@/constants/colors'
import { emptyQueryParams } from '@/constants/queryParams'
import { ICustomer } from '@/models'
import { useGetTasksByCustomerIdQuery } from '@/services/customers/taskService'
import { ApexOptions } from 'apexcharts'
import moment from 'moment'
import React, { useMemo, useState } from 'react'
import ReactApexChart from 'react-apexcharts'

interface IProps {
  customerId: ICustomer['_id']
}

const CustomerActivityMonthlyBarChart: React.FC<IProps> = ({ customerId }) => {
  const [searchQueryParams, setSearchQueryParams] = useState({ ...emptyQueryParams, status: -9 })

  const { data: customerTasksData, isLoading: customerTasksIsLoading } = useGetTasksByCustomerIdQuery({
    ...searchQueryParams,
    customerId
  })

  const monthlyCompletedUncompletedTasks = useMemo(() => {
    const monthlyCompletedUncompletedTasks: any = {
      completed: {
        data: [],
        name: 'Completed'
      },
      uncompleted: {
        data: [],
        name: 'Uncompleted'
      }
    }
    const completedTasks = customerTasksData?.filter(task => task.status === 1)
    const uncompletedTasks = customerTasksData?.filter(task => task.status !== 1)

    for (let i = 0; i < 12; i++) {
      const month = moment().month(i).format('MMM')
      const completedTasksCount = completedTasks?.filter(task => {
        return moment(task.startDate).format('MMM') === month
      }).length
      const uncompletedTasksCount = uncompletedTasks?.filter(
        task => moment(task.startDate).format('MMM') === month
      ).length

      monthlyCompletedUncompletedTasks.completed.data[i] = completedTasksCount || 0
      monthlyCompletedUncompletedTasks.uncompleted.data[i] = uncompletedTasksCount || 0
    }

    return monthlyCompletedUncompletedTasks
  }, [customerTasksData])

  const monthlyTaskCompletedUncompletedBarChartSeries = useMemo(() => {
    return [monthlyCompletedUncompletedTasks.completed, monthlyCompletedUncompletedTasks.uncompleted]
  }, [monthlyCompletedUncompletedTasks])

  const chartOptions = useMemo<ApexOptions>(
    () => ({
      colors: [colors.primary.light, colors.secondary.middle],
      chart: {
        type: 'bar',
        height: '80%',
        width: '95%',
        stacked: true,
        toolbar: {
          show: true
        },
        zoom: {
          enabled: true
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0
            }
          }
        }
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 10,
          columnWidth: '25%',

          dataLabels: {}
        }
      },
      xaxis: {
        type: 'category',
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      legend: {
        show: false,
        position: 'right',
        offsetY: 40
      },
      fill: {
        opacity: 1
      }
    }),
    []
  )

  return (
    <ItemContainer height="85%" transform="translate(0%, 7%)" position="relative" margin="0 0 0 auto" width="95%">
      <ItemContainer position="absolute" right="3rem" top="0" width="auto">
        select
      </ItemContainer>
      <ReactApexChart
        options={chartOptions}
        series={monthlyTaskCompletedUncompletedBarChartSeries}
        type="bar"
        height={'100%'}
      />
    </ItemContainer>
  )
}

export default CustomerActivityMonthlyBarChart
