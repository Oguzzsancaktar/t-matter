import React from 'react'
import { JustifyBetweenRow, Row } from '@/components/layout'
import { InputRegular, SelectInput } from '@/components/input'
import { Button } from '@/components/button'
import { Upload } from 'react-feather'
import { IOption } from '@/models'

interface IProps {
  status?: IOption
  handleAddNew?: (a?: any, b?: any) => void
  showPagination?: boolean
  showStatus?: boolean
  showSearch?: boolean
  showExport?: boolean
  showAddNew?: boolean
}
const DataTableHeader: React.FC<IProps> = ({
  status,
  handleAddNew,
  showPagination = true,
  showStatus = true,
  showSearch = true,
  showExport = true,
  showAddNew = true
}) => {
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
              onChange={() => console.log('onchange triggerd')}
              selectedOption={[status || { value: 'all', label: 'All' }]}
              options={[
                { value: 'all', label: 'All' },
                { value: 'active', label: 'Active' },
                { value: 'inactive', label: 'Inactive' }
              ]}
            />
          </Row>
        )}
        {showSearch && (
          <Row width="calc(100% - 150px )">
            <InputRegular
              name="search"
              placeholder="Search..."
              onChange={() => console.log('onchange triggerd')}
              type="text"
            />
          </Row>
        )}
      </Row>

      <Row width="calc(1rem + 200px)" margin="0 0 0 0.5rem">
        {showExport && (
          <Row width={showAddNew ? '100px' : '100%'} margin="0 0.5rem 0 0">
            <Button>
              <Upload size={16} /> Export
            </Button>
          </Row>
        )}
        {showAddNew && (
          <Row width={showExport ? '100px' : '100%'}>
            <Button onClick={handleAddNew}> Add New </Button>
          </Row>
        )}
      </Row>
    </JustifyBetweenRow>
  )
}

export default DataTableHeader
