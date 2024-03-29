import { AddOrChangeCustomerImageModal, ChangeCustomerTypeModal, NoTableData } from '@/components'
import { Badge } from '@/components/badge'
import { Button } from '@/components/button'
import { ActionButtons } from '@/components/data-tables'
import { UserImage } from '@/components/image'
import { ItemContainer } from '@/components/item-container'
import { JustifyBetweenColumn, JustifyBetweenRow, JustifyCenterColumn, JustifyCenterRow } from '@/components/layout'
import { UserSkeletonLoader } from '@/components/skelton-loader'
import ReliableSlider from '@/components/slider/ReliableSlider'
import { H1 } from '@/components/texts'
import colors from '@/constants/colors'
import { CUSTOMER_HISTORY_TYPES } from '@/constants/customerHistoryTypes'
import useAccessStore from '@/hooks/useAccessStore'
import { useAuth } from '@/hooks/useAuth'
import { ICustomer, ESize, EStatus } from '@/models'
import {
  CustomerModalActivityTab,
  CustomerModalWorkflowTab,
  CustomerModalFinanceTab,
  CustomerModalPreviewTab,
  CustomerModalCalendarTab
} from '@/pages'
import { useCreateCustomerHistoryMutation } from '@/services/customers/customerHistoryService'
import {
  useGetCustomerByIdQuery,
  useUpdateCustomerStatusMutation,
  useUpdateCustomerMutation
} from '@/services/customers/customerService'
import { openModal, closeModal } from '@/store'
import { selectColorForStatus } from '@/utils/statusColorUtil'
import { toastSuccess, toastError } from '@/utils/toastUtil'
import moment from 'moment'
import { useState } from 'react'
import { Camera } from 'react-feather'
import MakeContactToClientModal from './MakeContactToClientModal'
import UpdateCustomerModal from './UpdateCustomerModal'

interface IProps {
  customer: ICustomer
  defaultActiveTab?: string
}

const CustomerReadModal: React.FC<IProps> = ({ customer, defaultActiveTab }) => {
  const { loggedUser } = useAuth()
  const [createCustomerHistory] = useCreateCustomerHistoryMutation()

  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()
  const { data: customerData, isLoading: customerIsLoading } = useGetCustomerByIdQuery(customer._id)
  const [updateCustomerStatus] = useUpdateCustomerStatusMutation()

  const [updateCustomer] = useUpdateCustomerMutation()

  const [activeTab, setActiveTab] = useState(defaultActiveTab ? defaultActiveTab : 'preview')
  const [activeSliderIndex, setActiveSliderIndex] = useState(0)

  const handleEdit = (customer: ICustomer) => {
    dispatch(
      openModal({
        id: `updateCustomerModal-${customer._id}`,
        title: 'Update Customer / ' + customer.firstname + ' ' + customer.lastname,
        body: <UpdateCustomerModal customerId={customer._id} />,
        width: ESize.WXLarge,
        height: ESize.HLarge
      })
    )
  }

  const openMakeContactToClientModal = () => {
    dispatch(
      openModal({
        id: `makeContactToClient-${customer._id}`,
        title: `Are you sure to make client ${customer.firstname + ' ' + customer.lastname}?`,
        body: <MakeContactToClientModal contact={customer} onSubmit={handleMakeContactToClient} />,
        width: ESize.WLarge,
        height: ESize.HAuto,
        maxWidth: ESize.WMedium
      })
    )
  }

  const openAddOrChangeImageModal = () => {
    dispatch(
      openModal({
        id: `openAddOrChangeImageModal-${customer._id}`,
        title: `Are you sure to change customer image ${customer.firstname + ' ' + customer.lastname}?`,
        body: <AddOrChangeCustomerImageModal customer={customer} />,
        width: ESize.WSmall,
        height: ESize.HAuto,
        maxWidth: ESize.WSmall
      })
    )
  }

  const handleMakeContactToClient = async extraInformations => {
    if (customerData) {
      const tempContactData = { ...customerData }

      delete tempContactData.createdAt
      delete tempContactData.updatedAt

      tempContactData.birthday = extraInformations.birthday
      tempContactData.birthplace = extraInformations.birthplace
      tempContactData.country = extraInformations.country
      tempContactData.city = extraInformations.city
      tempContactData.state = extraInformations.state
      tempContactData.zipcode = extraInformations.zipcode
      tempContactData.address = extraInformations.address
      tempContactData.aSharpNumber = extraInformations.aSharpNumber
      tempContactData.customerType._id = '636108d115070e01a633c57d'
    }

    try {
      // @ts-ignore
      await updateCustomer(tempContactData)
      await createCustomerHistory({
        customer: customer._id,
        responsible: loggedUser.user?._id || '',
        type: CUSTOMER_HISTORY_TYPES.CUSTOMER_STATUS_CHANGED
      })
      toastSuccess('Contact ' + customer.firstname + ' ' + customer.lastname + ' updated to client successfully')
      dispatch(closeModal(`makeContactToClient-${customer._id}`))
    } catch (error) {
      console.log('updatecustomer ===>', error)
    }
  }

  const renderSwitch = () => {
    switch (activeTab) {
      case 'preview':
        return <CustomerModalPreviewTab customer={customer} />
      case 'activity':
        return <CustomerModalActivityTab customerId={customer._id} />
      case 'calendar':
        return <CustomerModalCalendarTab customer={customer} />
      case 'workflow':
        return <CustomerModalWorkflowTab customer={customer} />
      case 'file':
        return 'File'
      case 'finance':
        return <CustomerModalFinanceTab customerId={customer._id} />
    }
  }

  const handleCustomerTypeChange = (customer: ICustomer) => {
    dispatch(
      openModal({
        id: `changeCustomerType-${customer._id}`,
        title: `Are you sure to change ${customer.firstname + ' ' + customer.lastname} type?`,
        body: (
          <ChangeCustomerTypeModal
            modalId={`changeCustomerType-${customer._id}`}
            title={`Are you sure to inactivate ${customer.firstname + ' ' + customer.lastname}?`}
            onConfirm={customerType => handleOnConfirmTypeChange(customer, customerType)}
          />
        ),
        width: ESize.WLarge,
        height: ESize.HAuto,
        maxWidth: ESize.WSmall
      })
    )
  }

  const handleOnConfirmTypeChange = async (customer: ICustomer, customerType: string) => {
    try {
      await updateCustomerStatus({ _id: customer._id, customerType: customerType })
      toastSuccess('Customer ' + customer.firstname + ' ' + customer.lastname + ' type changed successfully')
      await createCustomerHistory({
        customer: customer._id,
        responsible: loggedUser.user?._id || '',
        type: CUSTOMER_HISTORY_TYPES.CUSTOMER_STATUS_CHANGED
      })

      dispatch(closeModal(`changeCustomerType-${customer._id}`))
    } catch (error) {
      toastError('Error customer type change')
    }
  }

  const handleActiveStep = (index: number) => {
    setActiveSliderIndex(index)
  }

  return (
    <ItemContainer borderRadius="0.3rem" overflow="visible" height="100%">
      <JustifyBetweenRow height="100%">
        <ItemContainer
          width="350px"
          height="100%"
          backgroundColor={colors.white.secondary}
          borderRadius="0.3rem 0 0 0.3rem"
        >
          {customerIsLoading || !customerData ? (
            <UserSkeletonLoader />
          ) : (
            <JustifyBetweenColumn height="100%" padding="1rem">
              <ItemContainer height="280px">
                <JustifyBetweenColumn>
                  <ItemContainer
                    borderBottom={'1px solid ' + colors.white.primary}
                    padding="0 0 1rem 0"
                    position="relative"
                  >
                    {customerData.customerType._id === '636108db15070e01a633c583' && (
                      <ItemContainer position="absolute" height="30px">
                        <Button
                          color={colors.primary.light}
                          width="auto"
                          onClick={() => openMakeContactToClientModal()}
                          padding="0.2rem 0.5rem"
                        >
                          <H1 color={colors.white.bg} cursor="pointer" fontSize="13px">
                            Make Client
                          </H1>
                        </Button>
                      </ItemContainer>
                    )}
                    <ItemContainer margin="2rem 0">
                      <ItemContainer position="relative" margin="auto" width="100px">
                        <JustifyCenterRow width="100%">
                          <ItemContainer
                            cursorType="pointer"
                            position="absolute"
                            left="calc(100% - 30px)"
                            top="calc(100% - 35px)"
                            zIndex="9"
                            backgroundColor={colors.secondary.dark}
                            borderRadius="0.3rem"
                            width="30px"
                            height="30px"
                            onClick={openAddOrChangeImageModal}
                          >
                            <JustifyCenterRow width="100%">
                              <Camera size={15} height="15px" width={'15px'} color={colors.white.secondary} />
                            </JustifyCenterRow>
                          </ItemContainer>

                          <UserImage width="100px" height="100px" src={customerData?.profile_img} />
                        </JustifyCenterRow>
                      </ItemContainer>
                    </ItemContainer>
                  </ItemContainer>
                </JustifyBetweenColumn>
              </ItemContainer>

              <ItemContainer height="calc(100% - 200px - 40px - 1rem )">
                <JustifyBetweenColumn>
                  <ItemContainer>
                    <H1 fontSize="18px" textAlign="center" color={colors.text.primary} margin="2rem 0 1rem 0">
                      {customerData.firstname + ' ' + customerData.lastname}
                    </H1>
                  </ItemContainer>

                  <ItemContainer>
                    <JustifyCenterRow>
                      <ItemContainer width="auto" margin="0 0.5rem 0 0">
                        <Badge
                          children={
                            <H1 color={colors.gray.dark} fontSize="14px">
                              {customerData.customerType.name}
                            </H1>
                          }
                          color={colors.gray.dark}
                          height="30px"
                        />
                      </ItemContainer>

                      <ItemContainer width="auto">
                        <Badge
                          children={
                            <H1 color={EStatus[customerData.status]} fontSize="14px">
                              {EStatus[customerData.status]}
                            </H1>
                          }
                          color={selectColorForStatus(+customerData.status)}
                          height="30px"
                        />
                      </ItemContainer>
                    </JustifyCenterRow>
                  </ItemContainer>

                  <ItemContainer margin="0.5rem 0">
                    <JustifyCenterRow>
                      <H1 fontSize="12px" color={colors.black.light} textAlign="center">
                        {customerData.address +
                          ' ' +
                          customerData.city +
                          ' ' +
                          customerData.state +
                          ' ' +
                          customerData.country +
                          ' ' +
                          customerData.zipcode}
                      </H1>
                    </JustifyCenterRow>
                  </ItemContainer>

                  <ItemContainer margin="0.5rem 0">
                    <ItemContainer>
                      <H1 fontSize="12px" color={colors.black.light} textAlign="center">
                        {customerData.email}
                      </H1>
                    </ItemContainer>
                  </ItemContainer>
                  <ItemContainer margin="0.5rem 0">
                    <ItemContainer>
                      <H1 fontSize="12px" color={colors.black.light} textAlign="center">
                        {customerData.phone}
                      </H1>
                    </ItemContainer>
                  </ItemContainer>

                  {customerData?.birthday && (
                    <ItemContainer margin="0.5rem 0">
                      <ItemContainer>
                        <H1 fontSize="12px" color={colors.black.light} textAlign="center">
                          {moment(customerData.birthday).format('MMMM-DD-YYYY')}
                        </H1>
                      </ItemContainer>
                    </ItemContainer>
                  )}
                  <ItemContainer margin="0.5rem 0">
                    <ItemContainer>
                      <H1 fontSize="12px" color={colors.black.light} textAlign="center">
                        {customerData.birthplace}
                      </H1>
                    </ItemContainer>
                  </ItemContainer>
                </JustifyBetweenColumn>
              </ItemContainer>

              <ItemContainer margin="1rem 0">
                {customerData.reliableCustomers.length > 0 &&
                customerData.reliableCustomers[0].relativeType.fromOrTo === 0 ? (
                  <ReliableSlider
                    reliableCustomers={customerData.reliableCustomers}
                    activeIndex={activeSliderIndex}
                    customerId={customerData?._id}
                    onActiveStepChange={handleActiveStep}
                  />
                ) : (
                  <NoTableData text="No Reliable" />
                )}
              </ItemContainer>

              <ItemContainer height="40px" borderBottom={'1px solid ' + colors.white.primary} padding="0 0 0.5rem 0">
                <JustifyCenterColumn width="100%">
                  <ActionButtons
                    rowWidth="100%"
                    iconSize="30px"
                    buttonWidth="100%"
                    // status={customerData.status}
                    onEdit={() => handleEdit(customerData)}
                    onCustomType={() => handleCustomerTypeChange(customerData)}
                  />
                </JustifyCenterColumn>
              </ItemContainer>
            </JustifyBetweenColumn>
          )}
        </ItemContainer>

        <ItemContainer height="100%" width="120px" padding="0.5rem" backgroundColor={colors.gray.disabled}>
          <JustifyBetweenColumn height="100%">
            <ItemContainer height="100%" margin="0 0 0.25rem 0">
              <Button
                onClick={() => setActiveTab('preview')}
                color={activeTab === 'preview' ? colors.blue.primary : colors.primary.dark}
              >
                <H1 color={activeTab === 'preview' ? colors.gray.primary : colors.white.primary} textAlign="center">
                  Preview
                </H1>
              </Button>
            </ItemContainer>

            <ItemContainer height="100%" margin="0 0 0.25rem 0">
              <Button
                onClick={() => setActiveTab('activity')}
                color={activeTab === 'activity' ? colors.blue.primary : colors.primary.dark}
              >
                <H1 color={activeTab === 'activity' ? colors.gray.primary : colors.white.primary} textAlign="center">
                  Activity
                </H1>
              </Button>
            </ItemContainer>
            <ItemContainer height="100%" margin="0 0 0.25rem 0">
              <Button
                color={activeTab === 'calendar' ? colors.blue.primary : colors.primary.dark}
                onClick={() => setActiveTab('calendar')}
              >
                <H1 color={activeTab === 'calendar' ? colors.gray.primary : colors.white.primary} textAlign="center">
                  Calendar
                </H1>
              </Button>
            </ItemContainer>

            <ItemContainer height="100%" margin="0 0 0.25rem 0">
              <Button
                color={activeTab === 'workflow' ? colors.blue.primary : colors.primary.dark}
                onClick={() => setActiveTab('workflow')}
              >
                <H1 color={activeTab === 'workflow' ? colors.gray.primary : colors.white.primary} textAlign="center">
                  Workflow
                </H1>
              </Button>
            </ItemContainer>

            <ItemContainer height="100%" margin="0 0 0.25rem 0">
              <Button
                color={activeTab === 'file' ? colors.blue.primary : colors.primary.dark}
                onClick={() => setActiveTab('file')}
              >
                <H1 color={activeTab === 'file' ? colors.gray.primary : colors.white.primary} textAlign="center">
                  File
                </H1>
              </Button>
            </ItemContainer>

            <ItemContainer height="100%" margin="0 0 0 0">
              <Button
                color={activeTab === 'finance' ? colors.blue.primary : colors.primary.dark}
                onClick={() => setActiveTab('finance')}
              >
                <H1 color={activeTab === 'finance' ? colors.gray.primary : colors.white.primary} textAlign="center">
                  Finance
                </H1>
              </Button>
            </ItemContainer>
          </JustifyBetweenColumn>
        </ItemContainer>
        <ItemContainer
          minHeight="700px"
          height="inherit"
          width="calc(100% - 120px - 350px )"
          backgroundColor={activeTab === 'preview' ? colors.gray.thirth : colors.white.secondary}
          borderRadius="0 0.3rem 0.3rem 0"
        >
          {renderSwitch()}
        </ItemContainer>
      </JustifyBetweenRow>
    </ItemContainer>
  )
}

export default CustomerReadModal
