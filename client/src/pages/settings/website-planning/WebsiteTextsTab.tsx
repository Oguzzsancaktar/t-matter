import React, { useEffect, useState } from 'react'
import {
  Button,
  Checkbox,
  Column,
  ConfirmCancelButtons,
  H1,
  InputRegular,
  ItemContainer,
  JustifyBetweenRow,
  Row,
  SelectInput
} from '@/components'
import { IOption, IWebsiteTextsData } from '@/models'
import styled from 'styled-components'
import colors from '@/constants/colors'
import { iconSelectOptions } from '@/constants/iconSelect'
import { Delete } from 'react-feather'
import {
  useCreateOrUpdateWebsiteSettingsMutation,
  useGetWebsiteTextSettingsQuery
} from '@/services/settings/website-settings/websiteSettingsService'
import { defaultWebsiteTextSettings } from '@/constants/websiteSettings'
import { toastError, toastSuccess } from '@/utils/toastUtil'

const RowWrap = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  /* height: calc(100% - 400px); */
  overflow: auto;
`

const RowItem = styled.div`
  display: flex;
  flex: 1;
  min-width: 200px;
  margin: 1rem;
  margin-left: 0;
`

const WebsiteTextsTab = () => {
  const { data: websiteSettingsTextData, isLoading: websiteTextSettingsIsLoading } = useGetWebsiteTextSettingsQuery()
  const [createOrUpdateTextSettings] = useCreateOrUpdateWebsiteSettingsMutation()

  const [websiteTextsData, setWebsiteTextsData] = useState<IWebsiteTextsData>(defaultWebsiteTextSettings)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setWebsiteTextsData({
      ...websiteTextsData,
      [name]: value
    })
  }

  const handleModalButtonTextsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    const modalSections = websiteTextsData.modalSections.map((section, index) => {
      if (name.split('-')[0] === 'modalHeader') {
        return {
          ...section,
          header: index === parseInt(name.split('-')[1]) ? value : section.header
        }
      }

      return {
        ...section,
        text: index === parseInt(name.split('-')[1]) ? value : section.text
      }
    })

    setWebsiteTextsData({
      ...websiteTextsData,
      modalSections
    })
  }

  const handleNavlinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    const navlinks = websiteTextsData.navlinks.map((navlink, index) => {
      if (index === parseInt(name.split('navlink-')[1])) {
        return {
          ...navlink,
          name: value
        }
      }
      return navlink
    })

    setWebsiteTextsData({
      ...websiteTextsData,
      navlinks
    })
  }

  const handleNavlinkShowClick = (index: number) => {
    console.log('object', index)
    const newNavlinks = websiteTextsData.navlinks.map((navlink, i) => {
      if (i === index) {
        return { ...navlink, show: !navlink.show }
      }
      return navlink
    })

    setWebsiteTextsData({
      ...websiteTextsData,
      navlinks: newNavlinks
    })
  }

  const handleIconChange = (option: IOption, index: number) => {
    const tempData = { ...websiteTextsData }
    tempData.contactInformations[index].icon = option.value
    setWebsiteTextsData(tempData)
  }

  const handleContactInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    const contactInformations = websiteTextsData.contactInformations.map((section, index) => {
      if (name.split('-')[0] === 'contactTitle') {
        return {
          ...section,
          title: index === parseInt(name.split('-')[1]) ? value : section.title
        }
      }

      return {
        ...section,
        content: index === parseInt(name.split('-')[1]) ? value : section.content
      }
    })

    setWebsiteTextsData({
      ...websiteTextsData,
      contactInformations
    })
  }

  const handleAddNewContactInfo = () => {
    const tempData = { ...websiteTextsData }
    tempData.contactInformations.push({
      icon: '',
      title: '',
      content: ''
    })
    setWebsiteTextsData(tempData)
  }

  const handleRemoveContact = (index: number) => {
    const tempData = { ...websiteTextsData }
    tempData.contactInformations.splice(index, 1)
    setWebsiteTextsData(tempData)
  }

  const handleSubmit = async () => {
    try {
      await createOrUpdateTextSettings(websiteTextsData)
      toastSuccess('Website texts updated successfully')
    } catch (error) {
      console.log(error)
      toastError('Error while updating website texts')
    }
  }

  useEffect(() => {
    if (websiteSettingsTextData) {
      setWebsiteTextsData({
        contactInformations: websiteSettingsTextData?.contactInformations || [],
        informationButtonText: websiteSettingsTextData?.informationButtonText || '',
        informationDescription: websiteSettingsTextData?.informationDescription || '',
        informationHeader: websiteSettingsTextData?.informationHeader || '',
        modalSections: websiteSettingsTextData?.modalSections || [],
        navlinks: websiteSettingsTextData?.navlinks || []
      })
    }
  }, [websiteSettingsTextData, websiteTextSettingsIsLoading])

  return (
    <ItemContainer width="100%" height="calc(100% - 30px - 1rem)">
      <JustifyBetweenRow width="100%" height="100%">
        <Column width="100%" margin="1rem" height="100%">
          <ItemContainer width="100%" height="100%">
            <ItemContainer margin="1rem 0" borderBottom={'1px solid ' + colors.text.primary}>
              <H1 fontSize="2rem" color={colors.text.primary} margin="0.5rem 0">
                Navlink
              </H1>
            </ItemContainer>
            <RowWrap>
              {websiteTextsData.navlinks.map((item, index) => (
                <RowItem>
                  <Row>
                    <ItemContainer width="40px" margin="2rem 0 0 0" onClick={() => handleNavlinkShowClick(index)}>
                      <Checkbox isChecked={item.show} onChange={() => null} />
                    </ItemContainer>
                    <ItemContainer>
                      <InputRegular
                        name={'navlink-' + item.index}
                        placeholder={'Enter Navigation Link ' + (item.index + 1) + ' ...'}
                        onChange={handleNavlinkChange}
                        // validationError={validationErrors.nameError}
                        value={item.name}
                        type="text"
                        labelText={'Navigation Link ' + (item.index + 1)}
                      />
                    </ItemContainer>
                  </Row>
                </RowItem>
              ))}
            </RowWrap>
          </ItemContainer>

          <ItemContainer width="100%" height="100%">
            <ItemContainer margin="1rem 0" borderBottom={'1px solid ' + colors.text.primary}>
              <H1 fontSize="2rem" color={colors.text.primary} margin="0.5rem 0">
                Main Information
              </H1>
            </ItemContainer>
            <RowItem>
              <InputRegular
                name={'informationHeader'}
                placeholder={'Enter Information Title...'}
                onChange={handleInputChange}
                // validationError={validationErrors.nameError}
                value={websiteTextsData.informationHeader}
                type="text"
                labelText={'Information Title'}
              />
            </RowItem>
            <RowItem>
              <InputRegular
                name={'informationDescription'}
                placeholder={'Enter Information Description...'}
                onChange={handleInputChange}
                // validationError={validationErrors.nameError}
                value={websiteTextsData.informationDescription}
                type="text"
                labelText={'Information Description'}
              />
            </RowItem>

            <RowItem>
              <InputRegular
                name={'informationButtonText'}
                placeholder={'Enter Information Button Text...'}
                onChange={handleInputChange}
                // validationError={validationErrors.nameError}
                value={websiteTextsData.informationButtonText}
                type="text"
                labelText={'Information Button Text'}
              />
            </RowItem>
          </ItemContainer>
        </Column>
        <ItemContainer height="100%">
          <Column width="100%" height="100%">
            <ItemContainer width="100%" height="50%">
              <ItemContainer margin="1rem 0" borderBottom={'1px solid ' + colors.text.primary}>
                <H1 fontSize="2rem" color={colors.text.primary} margin="0.5rem 0">
                  Contact Informations
                </H1>
              </ItemContainer>

              <ItemContainer height="calc(100% - 3rem - 60px)" overflow="auto">
                {websiteTextsData.contactInformations.map((item, index) => (
                  <Row>
                    <ItemContainer width="200px">
                      <SelectInput
                        placeHolder="Select Icon"
                        labelText="Icon"
                        onChange={option => handleIconChange(option, index)}
                        selectedOption={[
                          iconSelectOptions.find(option => option.value === item.icon) || {
                            value: '-9',
                            label: 'All'
                          }
                        ]}
                        name={'contact-icon-' + index}
                        options={iconSelectOptions}
                      />
                    </ItemContainer>
                    <ItemContainer width="calc(100% - 200px - 1rem)" margin="0 0.5rem">
                      <InputRegular
                        name={'contactTitle-' + index}
                        placeholder={'Enter Contact Title ' + (index + 1) + ' ...'}
                        onChange={handleContactInfoChange}
                        // validationError={validationErrors.nameError}
                        value={item.title}
                        type="text"
                        labelText={'Contact Title ' + (index + 1)}
                      />
                    </ItemContainer>
                    <ItemContainer width="calc(100% - 200px - 1rem)">
                      <InputRegular
                        name={'contactContent-' + index}
                        placeholder={'Enter Contact Content ' + (index + 1) + ' ...'}
                        onChange={handleContactInfoChange}
                        // validationError={validationErrors.nameError}
                        value={item.content}
                        type="text"
                        labelText={'Contact Content ' + (index + 1)}
                      />
                    </ItemContainer>

                    <ItemContainer width="40px" margin="2rem 0 0 0" onClick={() => handleRemoveContact(index)}>
                      <Delete />
                    </ItemContainer>
                  </Row>
                ))}
              </ItemContainer>

              <ItemContainer margin="1rem 0 0 0">
                <Button onClick={handleAddNewContactInfo}>Create New</Button>
              </ItemContainer>
            </ItemContainer>

            <ItemContainer width="100%" height="50%">
              <ItemContainer margin="1rem 0" borderBottom={'1px solid ' + colors.text.primary}>
                <H1 fontSize="2rem" color={colors.text.primary} margin="0.5rem 0">
                  Modal Button Texts
                </H1>
              </ItemContainer>

              {websiteTextsData.modalSections.map((item, index) => (
                <RowItem>
                  <ItemContainer>
                    <InputRegular
                      name={'modalHeader-' + index}
                      placeholder={'Enter Modal Title ' + (index + 1) + '...'}
                      onChange={handleModalButtonTextsChange}
                      // validationError={validationErrors.nameError}
                      value={item.header}
                      type="text"
                      labelText={'Modal Video Title ' + (index + 1)}
                    />
                  </ItemContainer>
                  <ItemContainer>
                    <InputRegular
                      name={'modalText-' + index}
                      placeholder={'Enter Modal Text ' + (index + 1) + '...'}
                      onChange={handleModalButtonTextsChange}
                      // validationError={validationErrors.nameError}
                      value={item.text}
                      type="text"
                      labelText={'Modal Video Text ' + (index + 1)}
                    />
                  </ItemContainer>
                </RowItem>
              ))}
            </ItemContainer>
          </Column>
        </ItemContainer>
      </JustifyBetweenRow>
      <ItemContainer width="100%" height="30px" margin="1rem 0 0 0">
        <ConfirmCancelButtons
          onConfirm={handleSubmit}
          onCancel={function (): void {
            throw new Error('Function not implemented.')
          }}
        />
      </ItemContainer>
    </ItemContainer>
  )
}

export default WebsiteTextsTab
