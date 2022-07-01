import React from 'react'

interface IProps {
  workflowId: string
}
const CustomerTaskModal: React.FC<IProps> = ({ workflowId }) => {
  return <div>{workflowId}</div>
}

export default CustomerTaskModal
