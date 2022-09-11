import React, { useState } from 'react'
import { Invoice } from '@/models'
interface IProps {
  invoice?: Invoice
}

const AgreementDoc: React.FC<IProps> = ({ invoice }) => {
  return <object width="100%" height="450" data={invoice?.category.agreement} type="application/pdf"></object>
}

export default AgreementDoc
