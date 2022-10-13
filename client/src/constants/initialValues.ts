import { IActivityCategoryCountsFilter, ICustomerCreateDTO, IRole, IUser, IWorkflow } from '@models/index'
import { IColor, EStatus } from '@/models'
import { ApexOptions } from 'apexcharts'

export const initialColor: IColor = {
  _id: '',
  color: '',
  status: EStatus.Active
}

export const initialCategoryCountsFilter: IActivityCategoryCountsFilter = {
  userId: '',
  categoryId: '',
  customerId: ''
}

export const initialCreateCustomer: ICustomerCreateDTO = {
  _id: '',
  customerType: 0,
  firstname: '',
  lastname: '',
  jobTitle: {
    _id: '',
    name: ''
  },
  email: '',
  phone: '',
  birthplace: '',
  country: '',
  city: '',
  state: '',
  zipcode: '',
  address: '',
  aSharpNumber: '',
  refferedBy: {
    _id: '',
    name: '',
    status: 0,
    color: initialColor
  },
  gender: 0,
  reliableInCompany: [],
  createContact: []
}

export const initialWorkflow: IWorkflow = {
  _id: '',
  name: '',
  steps: []
}

export const initialRole: IRole = {
  _id: '',
  name: '',
  status: 0
}

export const initialUser: IUser = {
  _id: '',
  firstname: '',
  lastname: '',
  email: '',
  phone: '',
  birthday: '',
  birthplace: '',
  country: '',
  city: '',
  state: '',
  zipcode: '',
  address: '',
  role: { ...initialRole },
  gender: 0,
  password: '',
  status: 0
}

export const initialDonutChartOptions: ApexOptions = {
  chart: {
    type: 'donut',
    height: '200%'
  },

  dataLabels: {
    enabled: false
  },
  legend: {
    show: false
  },
  plotOptions: {
    pie: {
      donut: {
        size: '85%'
      }
    }
  },

  responsive: [
    {
      breakpoint: undefined
    }
  ]
}

export const initialColumnChartOptions: ApexOptions = {
  chart: {
    height: '100%',
    type: 'bar'
  },

  plotOptions: {
    bar: {
      borderRadius: 3,
      horizontal: false,
      columnWidth: '30%',
      dataLabels: {
        position: 'top' // top, center, bottom
      }
    }
  },
  dataLabels: {
    enabled: false,
    formatter: function (val) {
      return val + ''
    },
    offsetY: -20,
    style: {
      fontSize: '12px',
      colors: ['#304758']
    }
  },

  stroke: {
    show: true,
    width: 2,
    colors: ['transparent']
  },

  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    position: 'bottom',
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    },
    crosshairs: {
      fill: {
        type: 'gradient',
        gradient: {
          colorFrom: '#D8E3F0',
          colorTo: '#BED1E6',
          stops: [0, 100],
          opacityFrom: 0.4,
          opacityTo: 0.5
        }
      }
    },
    tooltip: {
      enabled: true
    }
  },
  yaxis: {
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    },
    labels: {
      show: false,
      formatter: function (val) {
        return val + ''
      }
    }
  }
}

export const initialRadialChartOptions: ApexOptions = {
  chart: {
    height: '100%',
    type: 'radialBar',
    offsetY: -10
  },
  plotOptions: {
    radialBar: {
      track: {
        background: 'red'
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
          offsetY: 76,
          fontSize: '22px',
          color: undefined,
          formatter: function (val) {
            return val + '%'
          }
        }
      }
    }
  },
  fill: {
    type: 'gradient',

    gradient: {
      shade: 'dark',
      shadeIntensity: 0.15,
      inverseColors: false,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 50, 65, 91]
    }
  },
  stroke: {
    dashArray: 4
  },
  labels: []
}
