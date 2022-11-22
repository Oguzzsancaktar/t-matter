import React, { useEffect, useState } from 'react'

import {
  ItemContainer,
  JustifyBetweenRow,
  Column,
  H1,
  ConfirmCancelButtons,
  ColorSelect,
  InputWithIcon,
  JustifyCenterColumn
} from '@/components'
import styled from 'styled-components'
import colors from '@/constants/colors'
import { IColor, IWebsiteStylesData } from '@/models'
import { defaultWebsiteStyleSettings } from '@/constants/websiteSettings'
import { TbBorderRadius, TbBorderHorizontal } from 'react-icons/tb'
import { AiOutlineBorderHorizontal } from 'react-icons/ai'
import {
  useCreateOrUpdateWebsiteStyleSettingsMutation,
  useGetWebsiteStyleSettingsQuery
} from '@/services/settings/website-settings/websiteSettingsService'
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
  margin: 10px 0;
  margin-left: 0;
  height: 65px;
`

const WebsiteStylesTab = () => {
  const { data: websiteSettingsStyleData, isLoading: websiteStyleSettingsIsLoading } = useGetWebsiteStyleSettingsQuery()
  const [createOrUpdateStyleSettings] = useCreateOrUpdateWebsiteStyleSettingsMutation()

  const [websiteStyles, setWebsiteStyles] = useState<IWebsiteStylesData>(
    websiteSettingsStyleData || defaultWebsiteStyleSettings
  )

  const handleColorSelect = (color: IColor, name: string) => {
    setWebsiteStyles({ ...websiteStyles, [name]: color })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setWebsiteStyles({ ...websiteStyles, [name]: +value })
  }

  const handleSubmit = async () => {
    try {
      await createOrUpdateStyleSettings(websiteStyles)
      toastSuccess('Website styles updated successfully')
    } catch (error) {
      console.log(error)
      toastError('Error while updating website styles')
    }
  }

  useEffect(() => {
    if (websiteSettingsStyleData) {
      setWebsiteStyles(websiteSettingsStyleData)
    }
  }, [websiteSettingsStyleData, websiteStyleSettingsIsLoading])

  return (
    <ItemContainer width="100%" height="calc(100% - 30px - 1rem)">
      <JustifyBetweenRow width="100%" height="100%">
        <ItemContainer height="100%" margin="0 0.5rem 0 0">
          <Column width="100%" height="100%">
            <ItemContainer width="100%" height="100%">
              <ItemContainer borderBottom={'1px solid ' + colors.text.primary}>
                <H1 fontSize="25px" color={colors.text.primary} margin="0 0 5px 0">
                  Theme Settings
                </H1>
              </ItemContainer>

              <RowItem>
                <ColorSelect
                  labelText="Navbar Border  Color"
                  value={websiteStyles.navbarBorderColor}
                  onClick={color => handleColorSelect(color, 'navbarBorderColor')}
                />
              </RowItem>

              <RowItem>
                <ColorSelect
                  labelText="Website Padding Color"
                  value={websiteStyles.websitePaddingColor}
                  onClick={color => handleColorSelect(color, 'websitePaddingColor')}
                />
              </RowItem>

              <RowItem>
                <ColorSelect
                  labelText="Website Background Color"
                  value={websiteStyles.websiteBackgroundColor}
                  onClick={color => handleColorSelect(color, 'websiteBackgroundColor')}
                />
              </RowItem>

              <RowItem>
                <ColorSelect
                  labelText="Website Modal Buttons Background Color"
                  value={websiteStyles.websiteModalButtonsBackgroundColor}
                  onClick={color => handleColorSelect(color, 'websiteModalButtonsBackgroundColor')}
                />
              </RowItem>

              <RowItem>
                <ColorSelect
                  labelText="Website Modal Buttons Border Color"
                  value={websiteStyles.websiteModalButtonsBorderColor}
                  onClick={color => handleColorSelect(color, 'websiteModalButtonsBorderColor')}
                />
              </RowItem>

              <RowWrap>
                <RowItem>
                  <InputWithIcon
                    name={'websitePaddingVertical'}
                    type="number"
                    labelText={'Website Padding Vertical'}
                    placeholder="Enter website padding vertical value..."
                    children={<TbBorderHorizontal />}
                    value={websiteStyles.websitePaddingVertical}
                    onChange={handleInputChange}
                  />
                </RowItem>

                <RowItem>
                  <InputWithIcon
                    name={'websitePaddingHorizontal'}
                    type="number"
                    labelText={'Website Padding Horizontal'}
                    placeholder="Enter website padding horizontal value..."
                    children={<AiOutlineBorderHorizontal />}
                    value={websiteStyles.websitePaddingHorizontal}
                    onChange={handleInputChange}
                  />
                </RowItem>

                <RowItem>
                  <InputWithIcon
                    name={'websiteBorderRadius'}
                    type="number"
                    labelText={'Website Border Radius'}
                    placeholder="Enter website border radius value..."
                    children={<TbBorderRadius />}
                    value={websiteStyles.websiteBorderRadius}
                    onChange={handleInputChange}
                  />
                </RowItem>

                <RowItem>
                  <InputWithIcon
                    name={'websiteImageBorderRadius'}
                    type="number"
                    labelText={'Website Image Border Radius'}
                    placeholder="Enter websit image border radius value..."
                    children={<TbBorderRadius />}
                    value={websiteStyles.websiteImageBorderRadius}
                    onChange={handleInputChange}
                  />
                </RowItem>

                <RowItem>
                  <InputWithIcon
                    name={'websiteModalButtonsBorderRadius'}
                    type="number"
                    labelText={'Website Modal Buttons Border Radius'}
                    placeholder="Enter modal buttons border radius value..."
                    children={<TbBorderRadius />}
                    value={websiteStyles.websiteModalButtonsBorderRadius}
                    onChange={handleInputChange}
                  />
                </RowItem>

                <RowItem>
                  <InputWithIcon
                    name={'websiteModalButtonsBorderWidth'}
                    type="number"
                    labelText={'Website Modal Buttons Border Width'}
                    placeholder="Enter modal buttons border width value..."
                    children={<TbBorderRadius />}
                    value={websiteStyles.websiteModalButtonsBorderWidth}
                    onChange={handleInputChange}
                  />
                </RowItem>
              </RowWrap>
            </ItemContainer>
          </Column>
        </ItemContainer>
        <ItemContainer height="100%">
          <Column width="100%" height="100%">
            <ItemContainer width="100%" height="100%">
              <ItemContainer borderBottom={'1px solid ' + colors.text.primary}>
                <H1 fontSize="25px" color={colors.text.primary} margin="0 0 5px 0">
                  Text Colors
                </H1>
              </ItemContainer>

              <JustifyCenterColumn height="100%">
                <ItemContainer height="calc(100% - 30px - 1rem) " overflow="auto">
                  <RowItem>
                    <ColorSelect
                      labelText="Navlink Text Color"
                      value={websiteStyles.navlinkTextColor}
                      onClick={color => handleColorSelect(color, 'navlinkTextColor')}
                    />
                  </RowItem>
                  <RowItem>
                    <ColorSelect
                      labelText="Navlink Hover Color"
                      value={websiteStyles.navlinkHoverTextColor}
                      onClick={color => handleColorSelect(color, 'navlinkHoverTextColor')}
                    />
                  </RowItem>
                  <RowItem>
                    <ColorSelect
                      labelText="Information Header Color"
                      value={websiteStyles.informationHeaderTextColor}
                      onClick={color => handleColorSelect(color, 'informationHeaderTextColor')}
                    />
                  </RowItem>
                  <RowItem>
                    <ColorSelect
                      labelText="Information Description Color"
                      value={websiteStyles.informationDescriptionTextColor}
                      onClick={color => handleColorSelect(color, 'informationDescriptionTextColor')}
                    />
                  </RowItem>
                  <RowItem>
                    <ColorSelect
                      labelText="Information Button Text Color"
                      value={websiteStyles.informationButtonTextColor}
                      onClick={color => handleColorSelect(color, 'informationButtonTextColor')}
                    />
                  </RowItem>
                  <RowItem>
                    <ColorSelect
                      labelText="Information Contact Icon Color"
                      value={websiteStyles.contactIconColor}
                      onClick={color => handleColorSelect(color, 'contactIconColor')}
                    />
                  </RowItem>
                  <RowItem>
                    <ColorSelect
                      labelText="Information Contact Title Color"
                      value={websiteStyles.contactTitleColor}
                      onClick={color => handleColorSelect(color, 'contactTitleColor')}
                    />
                  </RowItem>
                  <RowItem>
                    <ColorSelect
                      labelText="Information Contact Content Color"
                      value={websiteStyles.contactContentColor}
                      onClick={color => handleColorSelect(color, 'contactContentColor')}
                    />
                  </RowItem>

                  <RowItem>
                    <ColorSelect
                      labelText="Website Modal Title Color"
                      value={websiteStyles.websiteModalContentColor}
                      onClick={color => handleColorSelect(color, 'websiteModalContentColor')}
                    />
                  </RowItem>

                  <RowItem>
                    <ColorSelect
                      labelText="Website Modal Icon Color"
                      value={websiteStyles.websiteModalIconColor}
                      onClick={color => handleColorSelect(color, 'websiteModalIconColor')}
                    />
                  </RowItem>

                  <RowItem>
                    <ColorSelect
                      labelText="Website Modal Content Color"
                      value={websiteStyles.websiteModalTitleColor}
                      onClick={color => handleColorSelect(color, 'websiteModalTitleColor')}
                    />
                  </RowItem>
                </ItemContainer>
              </JustifyCenterColumn>
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

export default WebsiteStylesTab
