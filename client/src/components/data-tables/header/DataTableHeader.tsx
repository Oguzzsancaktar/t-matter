import React from 'react'
import { JustifyBetweenRow, JustifyCenterRow, Row } from '@/components/layout'
import { InputRegular, SelectInput } from '@/components/input'
import { Button } from '@/components/button'
import { Upload } from 'react-feather'
import { IOption } from '@/models'
import { statusOptions } from '@/constants/statuses'
import colors from '@/constants/colors'
import { H1 } from '@/components/texts'

interface IProps {
  status?: IOption
  handleAddNew?: (a?: any, b?: any) => void
  handleSearch?: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleStatusFilter?: (status: number | string) => void
  filterStatusOptions?: IOption[]
  showStatus?: boolean
  showSearch?: boolean
  showExport?: boolean
  showAddNew?: boolean
}
const DataTableHeader: React.FC<IProps> = ({
  status,
  handleAddNew,
  handleSearch,
  handleStatusFilter,
  filterStatusOptions = statusOptions,
  showStatus = true,
  showSearch = true,
  showExport = true,
  showAddNew = true
}) => {
  const handleStatusChange = (option: IOption) => {
    if (handleStatusFilter) {
      handleStatusFilter(option.value)
    }
  }

  return (
    <JustifyBetweenRow margin="0 0 8px 0" height="40px">
      <Row>
        {/* {showPagination && (
          <Row width="100px">
            <SelectInput
              name="pagination"
              onChange={() => console.log('onchange triggerd')}
              options={[
                { value: '10', label: '10' },
                { value: '20', label: '20' },
                { value: '50', label: '50' },
                { value: '100', label: '100' }
              ]}
            />
          </Row>
        )} */}

        {showStatus && (
          <Row width="150px" margin="0 8px 0 0">
            <SelectInput
              name="status"
              onChange={handleStatusChange}
              selectedOption={[status || { value: '-9', label: 'All' }]}
              options={filterStatusOptions}
            />
          </Row>
        )}
        {showSearch && (
          <Row width="calc(100% - 150px)">
            <InputRegular name="search" placeholder="Search..." onChange={handleSearch} type="text" />
          </Row>
        )}
      </Row>

      <Row width="calc(16px + 200px)" margin="0 0 0 8px">
        {showExport && (
          <Row width={showAddNew ? '100px' : '100%'} margin="0 8px 0 0">
            <Button color={colors.primary.light} height="100%">
              <JustifyCenterRow>
                <Upload size={16} />
                <H1 fontSize="14px" cursor="pointer" color={colors.white.secondary} margin="0 0 0 8px">
                  Export
                </H1>
              </JustifyCenterRow>
            </Button>
          </Row>
        )}
        {showAddNew && (
          <Row width={showExport ? '100px' : '100%'}>
            <Button onClick={handleAddNew} color={colors.primary.light}>
              <H1 fontSize="14px" cursor="pointer" color={colors.white.secondary} textAlign="center">
                Add New
              </H1>
            </Button>
          </Row>
        )}
      </Row>
    </JustifyBetweenRow>
  )
}

export default DataTableHeader
