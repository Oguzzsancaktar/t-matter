import React, { useState } from 'react'
import { PageWrapper } from './internal'
import { Input, Row, Spacer, useInput, Dropdown, Button, Col } from '@nextui-org/react'
import {
  useGetJobTitlesQuery,
  useGetRefferedBysQuery
} from '@services/settings/company-planning/dynamicVariableService'
import { emptyQueryParams } from '@constants/queryParams'
import { useGetUsersQuery } from '@services/settings/user-planning/userService'
import {
  validatePhone,
  validateName,
  validateEmail,
  validationHelper
} from '@pages/check-in-pages/internal/validationHelper'
import {
  useAddOrUpdateCustomerImageMutation,
  useCheckInCreateCustomerMutation,
  useCreateCustomerMutation
} from '@services/customers/customerService'
import ICustomer from '../../models/Entities/customer/ICustomer'
import { IUser } from '@/models'
import { GENDER_TYPES } from '@constants/statuses'
import { toastSuccess } from '@utils/toastUtil'
import { useNavigate } from 'react-router-dom'
import { ItemContainer, UserImage, WebcamCapture } from '@/components'
import colors from '@constants/colors'
import { getBase64 } from '@utils/imageConvert'

const NewConsultation = () => {
  const { value: emailValue, reset: emailReset, bindings: emailBindings } = useInput('')
  const { value: phoneValue, reset: phoneReset, bindings: phoneBindings } = useInput('')
  const { value: firstNameValue, reset: firstNameReset, bindings: firstNameBindings } = useInput('')
  const { value: lastNameValue, reset: lastNameReset, bindings: lastNameBindings } = useInput('')
  const [genderSelectedKey, setGenderSelectedKey] = useState('')
  const [jobTitleSelectedKey, setJobTitleSelectedKey] = useState('')
  const [userSelectedKey, setUserSelectedKey] = useState('')
  const [referredBySelectedKey, setReferredBySelectedKey] = useState('')

  const [image, setImage] = useState('https://via.placeholder.com/150')
  const [showCamera, setShowCamera] = useState<boolean>(false)

  const navigate = useNavigate()

  const { data: referredByData, isLoading: referredByDataIsLoading } = useGetRefferedBysQuery(emptyQueryParams)
  const { data: jobTitleData, isLoading: jobTitleDataIsLoading } = useGetJobTitlesQuery(emptyQueryParams)
  const { data: users } = useGetUsersQuery(emptyQueryParams)
  const [create] = useCheckInCreateCustomerMutation()

  const emailHelper = validationHelper(emailValue, validateEmail, 'email')
  const phoneHelper = validationHelper(phoneValue, validatePhone, 'phone')
  const firstNameHelper = validationHelper(firstNameValue, validateName, 'first name')
  const lastNameHelper = validationHelper(lastNameValue, validateName, 'last name')

  const isButtonDisabled =
    emailHelper.color !== 'success' ||
    phoneHelper.color !== 'success' ||
    firstNameHelper.color !== 'success' ||
    lastNameHelper.color !== 'success' ||
    genderSelectedKey === '' ||
    jobTitleSelectedKey === '' ||
    userSelectedKey === '' ||
    referredBySelectedKey === ''

  const getDropdownData = x => {
    return Array.from(x)[0]
  }

  const handleSubmit = async () => {
    const f = new FormData()
    f.append('email', emailValue)
    f.append('phone', phoneValue)
    f.append('firstname', firstNameValue)
    f.append('lastname', lastNameValue)
    f.append('gender', (genderSelectedKey === 'female' ? GENDER_TYPES.FEMALE : GENDER_TYPES.MALE) + '')
    f.append('jobTitle', getDropdownData(jobTitleSelectedKey) as ICustomer['jobTitle']['_id'])
    f.append('refferedBy', getDropdownData(referredBySelectedKey) as ICustomer['refferedBy']['_id'])
    f.append('customerType', '636108db15070e01a633c583')
    f.append('userId', getDropdownData(userSelectedKey) as IUser['_id'])
    f.append('wfName', 'New Consultation')
    f.append('file', image)
    await create(f).unwrap()
    toastSuccess('Walk in successfully')
    navigate('/checkin')
  }

  const getJobTitleContent = () => {
    if (!jobTitleData) {
      return 'Select Job Title'
    }
    const id = getDropdownData(jobTitleSelectedKey)
    return id ? jobTitleData.find(x => x._id === id)?.name : 'Select Job Title'
  }

  const getReferredByContent = () => {
    if (!referredByData) {
      return 'Select Referred By'
    }
    const id = getDropdownData(referredBySelectedKey)
    return id ? referredByData.find(x => x._id === id)?.name : 'Select Referred By'
  }

  const getUserContent = () => {
    if (!users) {
      return 'Select User'
    }
    const id = getDropdownData(userSelectedKey)
    return id ? users.find(x => x._id === id)?.firstname + ' ' + users.find(x => x._id === id)?.lastname : 'Select User'
  }

  const handleUploadChange = async file => {
    if (typeof file === 'string') {
      try {
        setImage(file)
      } catch (error) {
        console.log(error)
      }
    } else {
      try {
        const base64Image = await getBase64(file)
        setImage(base64Image as string)
      } catch (error) {
        console.log(error)
      }
    }

    setShowCamera(false)
  }

  return (
    <PageWrapper title="Walk in">
      <div style={{ width: '900px', margin: '250px auto' }}>
        <Row style={{ position: 'relative', bottom: 40 }} fluid>
          <Col style={{ alignItems: 'center' }}>
            {!showCamera && (
              <div style={{ width: 150, margin: 'auto' }}>
                <UserImage src={image} />
              </div>
            )}
            <div
              style={{
                display: 'flex',
                margin: 'auto',
                justifyContent: 'center',
                alignItems: 'center',
                maxWidth: 300,
                maxHeight: 300
              }}
            >
              {showCamera ? (
                <WebcamCapture handleShowCamera={show => setShowCamera(show)} onCapture={handleUploadChange} />
              ) : (
                <Button color="default" onClick={setShowCamera.bind(this, true)}>
                  Take Photo
                </Button>
              )}
            </div>
          </Col>
        </Row>
        <Spacer y={3} />
        <Row fluid>
          <Input
            {...firstNameBindings}
            status={firstNameHelper.color}
            color={firstNameHelper.color}
            helperColor={firstNameHelper.color}
            helperText={firstNameHelper.text}
            onClearClick={firstNameReset}
            bordered
            width="100%"
            size="xl"
            clearable
            label="First name"
            placeholder="First name"
          />
          <Spacer x={2} />
          <Input
            {...lastNameBindings}
            status={lastNameHelper.color}
            color={lastNameHelper.color}
            helperColor={lastNameHelper.color}
            helperText={lastNameHelper.text}
            onClearClick={lastNameReset}
            bordered
            width="100%"
            size="xl"
            clearable
            label="Last name"
            placeholder="Last name"
          />
        </Row>
        <Spacer y={3} />
        <Row fluid>
          <Input
            {...phoneBindings}
            status={phoneHelper.color}
            color={phoneHelper.color}
            helperColor={phoneHelper.color}
            helperText={phoneHelper.text}
            onClearClick={phoneReset}
            clearable
            bordered
            width="100%"
            size="xl"
            label="Phone number"
            placeholder="Phone number"
          />
          <Spacer x={2} />
          <Input
            {...emailBindings}
            status={emailHelper.color}
            color={emailHelper.color}
            helperColor={emailHelper.color}
            helperText={emailHelper.text}
            onClearClick={emailReset}
            clearable
            bordered
            size="xl"
            width="100%"
            type="email"
            label="Email"
            placeholder="Please enter your email"
          />
        </Row>
        <Spacer y={3} />
        <Row>
          <Dropdown>
            <Dropdown.Button css={{ tt: 'capitalize', width: '100%' }} size="xl" flat>
              {genderSelectedKey ? genderSelectedKey : 'Select gender'}
            </Dropdown.Button>
            <Dropdown.Menu
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={genderSelectedKey}
              aria-label="gender"
              // @ts-ignore
              onSelectionChange={setGenderSelectedKey}
            >
              <Dropdown.Item key="female">Female</Dropdown.Item>
              <Dropdown.Item key="male">Male</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Spacer x={2} />

          <Dropdown>
            <Dropdown.Button css={{ tt: 'capitalize', width: '100%' }} size="xl" flat>
              {getJobTitleContent()}
            </Dropdown.Button>
            {jobTitleData && (
              <Dropdown.Menu
                disallowEmptySelection
                selectionMode="single"
                aria-label="job"
                // @ts-ignore
                onSelectionChange={setJobTitleSelectedKey}
              >
                {jobTitleData.map(jobTitle => {
                  return <Dropdown.Item key={jobTitle._id}>{jobTitle.name}</Dropdown.Item>
                })}
              </Dropdown.Menu>
            )}
          </Dropdown>

          <Spacer x={2} />
          <Dropdown>
            <Dropdown.Button css={{ tt: 'capitalize', width: '100%' }} size="xl" flat>
              {getReferredByContent()}
            </Dropdown.Button>
            {referredByData && (
              <Dropdown.Menu
                disallowEmptySelection
                selectionMode="single"
                aria-label="referredBy"
                // @ts-ignore
                onSelectionChange={setReferredBySelectedKey}
              >
                {referredByData.map(referredBy => {
                  return <Dropdown.Item key={referredBy._id}>{referredBy.name}</Dropdown.Item>
                })}
              </Dropdown.Menu>
            )}
          </Dropdown>

          <Spacer x={2} />

          <Dropdown>
            <Dropdown.Button css={{ tt: 'capitalize', width: '100%' }} size="xl" flat>
              {getUserContent()}
            </Dropdown.Button>
            {users && (
              <Dropdown.Menu
                aria-label="user"
                disallowEmptySelection
                selectionMode="single"
                // @ts-ignore
                onSelectionChange={setUserSelectedKey}
              >
                {users.map(user => {
                  return <Dropdown.Item key={user._id}>{user.firstname + ' ' + user.lastname}</Dropdown.Item>
                })}
              </Dropdown.Menu>
            )}
          </Dropdown>
        </Row>
        <Spacer y={2} />
        <Row align="center" justify="center">
          <Button onClick={handleSubmit} disabled={isButtonDisabled} size="xl" color="warning">
            Success
          </Button>
        </Row>
      </div>
    </PageWrapper>
  )
}

export default NewConsultation
