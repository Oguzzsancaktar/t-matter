import React from 'react'
import styled from '@emotion/styled'
import { IComponentProps } from '@models/index'

interface IProps extends IComponentProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

const FormSC = styled.form`
  width: 100%;
  height: auto;
`
const Form: React.FC<IProps> = ({ children, onSubmit, ...rest }) => {
  return <FormSC onSubmit={onSubmit}>{children}</FormSC>
}

export default Form
