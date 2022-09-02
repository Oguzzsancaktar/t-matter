import React from 'react'
import { JustifyBetweenRow, Row } from '@/components/layout'
import { InputRegular, SelectInput } from '@/components/input'
import { Button } from '@/components/button'
import { Upload } from 'react-feather'
import { EStatus, IOption } from '@/models'
import { statusOptions } from '@/constants/statuses'
import colors from '@/constants/colors'

interface IProps {
  status?: IOption
  handleAddNew?: (a?: any, b?: any) => void
  handleSearch?: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleStatusFilter?: (status: EStatus) => void
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
  showStatus = true,
  showSearch = true,
  showExport = true,
  showAddNew = true
}) => {
  const handleStatusChange = (option: IOption) => {
    if (handleStatusFilter) {
      handleStatusFilter(+option.value)
    }
  }

  return (
    <JustifyBetweenRow margin="0 0 0.5rem 0" height="40px">
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
          <Row width="150px" margin="0 0.5rem 0 0">
            <SelectInput
              name="status"
              onChange={handleStatusChange}
              selectedOption={[status || { value: '-9', label: 'All' }]}
              options={statusOptions}
            />
          </Row>
        )}
        {showSearch && (
          <Row width="calc(100% - 150px)">
            <InputRegular name="search" placeholder="Search..." onChange={handleSearch} type="text" />
          </Row>
        )}
      </Row>

      <Row width="calc(1rem + 200px)" margin="0 0 0 0.5rem">
        {showExport && (
          <Row width={showAddNew ? '100px' : '100%'} margin="0 0.5rem 0 0">
            <Button color={colors.primary.light}>
              <Upload size={16} /> Export
            </Button>
          </Row>
        )}
        {showAddNew && (
          <Row width={showExport ? '100px' : '100%'}>
            <Button onClick={handleAddNew} color={colors.primary.light}>
              Add New
            </Button>
          </Row>
        )}
      </Row>
    </JustifyBetweenRow>
  )
}

export default DataTableHeader
