import React from 'react'
import { JustifyBetweenRow, Row } from '@/components/layout'
import { InputRegular, SelectInput } from '@/components/input'
import { Button } from '@/components/button'
import { Upload } from 'react-feather'

interface IProps {
  handleAddNew?: (a?: any, b?: any) => void
}
const DataTableHeader: React.FC<IProps> = ({ handleAddNew }) => {
  return (
    <JustifyBetweenRow>
      <Row>
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

        <Row width="150px" margin="0 0.5rem">
          <SelectInput
            name="status"
            onChange={() => console.log('onchange triggerd')}
            options={[
              { value: 'active', label: 'Active' },
              { value: 'inactive', label: 'Inactive' }
            ]}
          />
        </Row>
        <Row width="calc(100% - 150px - 100px - 1rem)">
          <InputRegular
            name="search"
            placeholder="Search..."
            onChange={() => console.log('onchange triggerd')}
            type="text"
          />
        </Row>
      </Row>

      <Row width="calc(1rem + 200px)" margin="0 0 0 1rem">
        <Row width="100px" margin="0 0.5rem 0 0">
          <Button>
            <Upload size={16} /> Export
          </Button>
        </Row>
        <Row width="100px">
          <Button onClick={handleAddNew}> Add New </Button>
        </Row>
      </Row>
    </JustifyBetweenRow>
  )
}

export default DataTableHeader
