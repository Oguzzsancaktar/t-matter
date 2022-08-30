import React from 'react'
import {
  Button,
  H1,
  InputWithIcon,
  JustifyBetweenRow,
  JustifyCenterColumn,
  JustifyCenterRow,
  SelectInput
} from '@/components'
import IInvoiceCategory from '@models/Entities/finance-plannin/IInvoiceCategory'
import { ICustomer, ICustomerTask, Invoice } from '@/models'
import { DollarSign } from 'react-feather'
import { invoiceDefault } from '@constants/finance'
import { useCreateInvoiceMutation } from '@services/settings/finance-planning/financePlanningService'

interface IProps {
  invoiceCategories?: IInvoiceCategory[]
  setInvoice: React.Dispatch<React.SetStateAction<any>>
  invoice?: Invoice
  createInvoiceTasks?: ICustomerTask[]
  refetch: () => void
  customerId: ICustomer['_id']
}

const CreateInvoice: React.FC<IProps> = ({
  invoiceCategories,
  setInvoice,
  invoice,
  createInvoiceTasks,
  customerId,
  refetch
}) => {
  const [createInvoice] = useCreateInvoiceMutation()

  const onChange = o => {
    setInvoice({ ...invoice, category: { name: o.label, _id: o.value } })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInvoice({ ...invoice, [e.target.name]: e.target.value })
  }

  const handleCreate = async () => {
    if (invoice && createInvoiceTasks) {
      const obj = {
        ...invoice,
        category: invoice.category._id,
        tasks: createInvoiceTasks.map(t => t._id),
        customer: customerId
      }
      // @ts-ignore
      await createInvoice(obj)
      await refetch()
      setInvoice({ ...invoiceDefault })
    }
  }

  return (
    <JustifyCenterColumn>
      <JustifyBetweenRow>
        <JustifyBetweenRow>
          <SelectInput
            selectedOption={
              invoice?.category ? [{ label: invoice.category.name, value: invoice.category._id as string }] : []
            }
            labelText="Category"
            onChange={onChange}
            name="invoice.category"
            options={
              invoiceCategories
                ? invoiceCategories.map(invoiceCategory => ({
                    label: invoiceCategory.name,
                    value: invoiceCategory._id
                  }))
                : []
            }
          />
        </JustifyBetweenRow>
        <JustifyBetweenRow margin="0 0 0 0.5rem">
          <InputWithIcon
            disabled
            labelText="Amount"
            placeholder="Amount"
            onBlur={() => console.log('blue')}
            children={<DollarSign size="16px" />}
            name="amount"
            type="number"
            value={invoice?.amount}
          />
        </JustifyBetweenRow>
      </JustifyBetweenRow>
      <JustifyBetweenRow margin="0.5rem 0 0 0">
        <JustifyBetweenRow>
          <InputWithIcon
            labelText="Discount"
            placeholder="Discount"
            onBlur={() => console.log('blue')}
            children={<DollarSign size="16px" />}
            name="discount"
            type="number"
            onChange={handleInputChange}
            value={invoice?.discount}
          />
        </JustifyBetweenRow>
        <JustifyBetweenRow margin="0 0 0 0.5rem">
          <InputWithIcon
            disabled
            labelText="Total"
            placeholder="Total"
            onBlur={() => console.log('blue')}
            children={<DollarSign size="16px" />}
            name="total"
            type="number"
            onChange={handleInputChange}
            value={invoice?.total}
          />
        </JustifyBetweenRow>
      </JustifyBetweenRow>
      <JustifyBetweenRow margin="0.5rem 0 0 0">
        <JustifyBetweenRow>
          <InputWithIcon
            labelText="Addition"
            placeholder="Addition"
            onBlur={() => console.log('blue')}
            children={<DollarSign size="16px" />}
            name="addition"
            type="number"
            onChange={handleInputChange}
            value={invoice?.addition}
          />
        </JustifyBetweenRow>
        <JustifyBetweenRow margin="0 0 0 0.5rem">
          <InputWithIcon
            labelText="Reason"
            placeholder="Reason"
            onBlur={() => console.log('blue')}
            name="additionReason"
            type="text"
            onChange={handleInputChange}
            value={invoice?.additionReason}
          />
        </JustifyBetweenRow>
      </JustifyBetweenRow>
      <JustifyBetweenRow margin="0.5rem 0 0 0">
        <Button onClick={handleCreate}>Create</Button>
      </JustifyBetweenRow>
    </JustifyCenterColumn>
  )
}

export default CreateInvoice
