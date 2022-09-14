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
import { ICustomer, ICustomerTask, IExpiredTaskStep, Invoice } from '@/models'
import { DollarSign } from 'react-feather'
import { invoiceDefault } from '@constants/finance'
import { useCreateInvoiceMutation } from '@services/settings/finance-planning/financePlanningService'
import { toastError } from '@utils/toastUtil'

interface IProps {
  invoiceCategories?: IInvoiceCategory[]
  setInvoice: React.Dispatch<React.SetStateAction<any>>
  invoice?: Invoice
  createInvoiceTasks?: ICustomerTask[]
  refetch: () => void
  customerId: ICustomer['_id']
  expiredTaskSteps?: IExpiredTaskStep[]
}

const CreateInvoice: React.FC<IProps> = ({
  invoiceCategories,
  setInvoice,
  invoice,
  createInvoiceTasks,
  customerId,
  refetch,
  expiredTaskSteps
}) => {
  const [createInvoice] = useCreateInvoiceMutation()

  const onChange = o => {
    setInvoice({ ...invoice, category: { name: o.label, _id: o.value } })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInvoice({ ...invoice, [e.target.name]: e.target.value })
  }

  const handleCreate = async () => {
    if (invoice && createInvoiceTasks && !!invoice.category.name) {
      const obj = {
        ...invoice,
        category: invoice.category._id,
        tasks: createInvoiceTasks.map(t => t._id),
        customer: customerId,
        expiredTaskSteps: expiredTaskSteps?.map(t => t._id)
      }
      // @ts-ignore
      await createInvoice(obj)
      await refetch()
      setInvoice({ ...invoiceDefault })
    } else {
      toastError('Please fill all fields')
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
            placeHolder="Select Category"
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
            placeholder="Amount"
            onBlur={() => console.log('blue')}
            children={<DollarSign size="16px" />}
            name="amount"
            type="number"
            value={invoice?.amount ? +Math.ceil(invoice?.amount) : undefined}
          />
        </JustifyBetweenRow>
      </JustifyBetweenRow>
      <JustifyBetweenRow margin="0.5rem 0 0 0">
        <JustifyBetweenRow>
          <InputWithIcon
            placeholder="Discount"
            onBlur={() => console.log('blue')}
            children={<DollarSign size="16px" />}
            name="discount"
            type="number"
            onChange={handleInputChange}
            value={invoice?.discount ? +Math.ceil(invoice?.discount) : undefined}
          />
        </JustifyBetweenRow>
        <JustifyBetweenRow margin="0 0 0 0.5rem">
          <InputWithIcon
            disabled
            placeholder="Total"
            onBlur={() => console.log('blue')}
            children={<DollarSign size="16px" />}
            name="total"
            type="number"
            onChange={handleInputChange}
            value={invoice?.total ? +Math.ceil(invoice?.total) : undefined}
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
