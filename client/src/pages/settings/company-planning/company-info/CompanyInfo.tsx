import React, { useEffect, useState } from 'react'
import { Column, InputRegular, JustifyCenterColumn, JustifyCenterRow } from '@/components'
import { FileUploader } from 'react-drag-drop-files'
import {
  useGetCompanyInfoQuery,
  useUpdateCompanyInfoMutation,
  useUploadCompanyLogoMutation
} from '@services/settings/company-info/companyInfoService'
import { ICompanyInfo } from '@/models'
import AwesomeDebouncePromise from 'awesome-debounce-promise'
import useConstant from 'use-constant'
import { useNavigate } from 'react-router-dom'
interface IProps {}

const defaultCompanyInfo = {
  name: '',
  address: '',
  phone: '',
  email: '',
  website: '',
  fax: ''
}

const CompanyInfo: React.FC<IProps> = props => {
  const { data: companyInfo, isLoading } = useGetCompanyInfoQuery()
  const [state, setState] = useState<ICompanyInfo>({ ...defaultCompanyInfo })
  const [updateCompanyInfo] = useUpdateCompanyInfoMutation()
  const [uploadCompanyLogo] = useUploadCompanyLogoMutation()
  const navigate = useNavigate()
  const updateDebounce = useConstant(() => AwesomeDebouncePromise(updateCompanyInfo, 500))

  useEffect(() => {
    if (companyInfo) {
      setState(companyInfo)
    }
  }, [companyInfo])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const newState = { ...state, [name]: value }
    setState(newState)
    updateDebounce(newState)
  }

  const handleUploadChange = file => {
    const formData = new FormData()
    formData.append('logo', file)
    uploadCompanyLogo(formData)
  }

  if (isLoading) return <div>Loading...</div>

  return (
    <JustifyCenterRow height="100%" width="auto">
      <Column width="50%">
        <JustifyCenterColumn margin="0 0 10px 0">
          {state.profile_img && (
            <a href={state.profile_img} target="_blank">
              <img
                width={500}
                style={{ maxHeight: 200, cursor: 'pointer', objectFit: 'cover' }}
                src={state.profile_img}
              />
            </a>
          )}
          <FileUploader handleChange={handleUploadChange} name="file" types={['JPG', 'PNG', 'JPEG']} />
        </JustifyCenterColumn>
        <JustifyCenterRow margin="0 0 10px 0">
          <InputRegular
            name="name"
            placeholder="Company Name"
            onChange={handleInputChange}
            value={state.name}
            type="text"
            labelText="Company Name"
          />
        </JustifyCenterRow>
        <JustifyCenterRow margin="0 0 10px 0">
          <InputRegular
            name="address"
            placeholder="Company Address"
            onChange={handleInputChange}
            value={state.address}
            type="text"
            labelText="Company Address"
          />
        </JustifyCenterRow>
        <JustifyCenterRow margin="0 0 10px 0">
          <InputRegular
            name="phone"
            placeholder="Company Phone"
            onChange={handleInputChange}
            value={state.phone}
            type="text"
            labelText="Company Phone"
          />
        </JustifyCenterRow>
        <JustifyCenterRow margin="0 0 10px 0">
          <InputRegular
            name="email"
            placeholder="Company Email"
            onChange={handleInputChange}
            value={state.email}
            type="text"
            labelText="Company Email"
          />
        </JustifyCenterRow>
        <JustifyCenterRow margin="0 0 10px 0">
          <InputRegular
            name="website"
            placeholder="Company Website"
            onChange={handleInputChange}
            value={state.website}
            type="text"
            labelText="Company Website"
          />
        </JustifyCenterRow>
        <JustifyCenterRow margin="0 0 10px 0">
          <InputRegular
            name="fax"
            placeholder="Company Fax"
            onChange={handleInputChange}
            value={state.fax}
            type="text"
            labelText="Company Fax"
          />
        </JustifyCenterRow>
      </Column>
    </JustifyCenterRow>
  )
}

export default CompanyInfo
