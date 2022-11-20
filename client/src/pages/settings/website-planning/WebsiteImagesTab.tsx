import React, { useEffect, useState } from 'react'
import { Column, H1, ItemContainer, JustifyBetweenRow, UserImage } from '@/components'
import { FileUploader } from 'react-drag-drop-files'
import { IWebsiteImageData } from '@/models'
import { defaultWebsiteImageSettings } from '@/constants/websiteSettings'
import {
  useCreateOrUpdateWebsiteImageSettingsMutation,
  useGetWebsiteImageSettingsQuery
} from '@/services/settings/website-settings/websiteSettingsService'
import styled from 'styled-components'
import colors from '@/constants/colors'

const RowWrap = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  /* height: calc(100% - 400px); */
  overflow: auto;
`

const RowItem = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 300px;
  margin: 1rem;
  margin-left: 0;
  height: 250px;
  width: 100%;
`

const WebsiteImagesTab = () => {
  const { data: websiteImageSettings, isLoading: websiteImageSettingsIsLoading } = useGetWebsiteImageSettingsQuery()
  const [addOrUpdateWebsiteImage] = useCreateOrUpdateWebsiteImageSettingsMutation()

  const [websiteImages, setWebsiteImages] = useState<IWebsiteImageData>(defaultWebsiteImageSettings)

  const handleUploadChange = async (file, name) => {
    try {
      const tempFormData = new FormData()
      tempFormData.append('file', file)
      await addOrUpdateWebsiteImage({ file: tempFormData, fileName: name }).unwrap()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (websiteImageSettings) {
      setWebsiteImages(websiteImageSettings)
    }
  }, [websiteImageSettings, websiteImageSettingsIsLoading])

  return (
    <ItemContainer width="100%" height="calc(100%)">
      <JustifyBetweenRow width="100%" height="100%">
        <Column width="100%" margin="1rem" height="100%">
          <ItemContainer width="100%" height="100%">
            <RowWrap>
              <RowItem>
                <ItemContainer margin="1rem 0" borderBottom={'1px solid ' + colors.text.primary}>
                  <H1 fontSize="1rem" color={colors.text.primary} margin="0.5rem 0">
                    Company Logo
                  </H1>
                </ItemContainer>
                <ItemContainer>
                  <UserImage width="100%" height="200px" src={websiteImages.company_logo as string} />
                </ItemContainer>
                <FileUploader
                  handleChange={file => handleUploadChange(file, 'company_logo')}
                  name="file"
                  types={['JPG', 'PNG', 'JPEG']}
                />
              </RowItem>
              <RowItem>
                <ItemContainer margin="1rem 0" borderBottom={'1px solid ' + colors.text.primary}>
                  <H1 fontSize="1rem" color={colors.text.primary} margin="0.5rem 0">
                    Company Image
                  </H1>
                </ItemContainer>
                <ItemContainer>
                  <UserImage width="100%" height="200px" src={websiteImages.company_img as string} />
                </ItemContainer>
                <FileUploader
                  handleChange={file => handleUploadChange(file, 'company_img')}
                  name="file"
                  types={['JPG', 'PNG', 'JPEG']}
                />
              </RowItem>
            </RowWrap>
          </ItemContainer>
        </Column>

        <Column width="100%" margin="1rem" height="100%">
          <ItemContainer width="100%" height="100%">
            <RowWrap>
              <RowItem>
                <ItemContainer margin="1rem 0" borderBottom={'1px solid ' + colors.text.primary}>
                  <H1 fontSize="1rem" color={colors.text.primary} margin="0.5rem 0">
                    Company Modal Image 1
                  </H1>
                </ItemContainer>
                <ItemContainer>
                  <UserImage width="100%" height="200px" src={websiteImages.modal_section_img_1 as string} />
                </ItemContainer>
                <FileUploader
                  handleChange={file => handleUploadChange(file, 'modal_section_img_1')}
                  name="file"
                  types={['JPG', 'PNG', 'JPEG']}
                />
              </RowItem>
              <RowItem>
                <ItemContainer margin="1rem 0" borderBottom={'1px solid ' + colors.text.primary}>
                  <H1 fontSize="1rem" color={colors.text.primary} margin="0.5rem 0">
                    Company Modal Image 2
                  </H1>
                </ItemContainer>
                <ItemContainer>
                  <UserImage width="100%" height="200px" src={websiteImages.modal_section_img_2 as string} />
                </ItemContainer>
                <FileUploader
                  handleChange={file => handleUploadChange(file, 'modal_section_img_2')}
                  name="file"
                  types={['JPG', 'PNG', 'JPEG']}
                />
              </RowItem>
            </RowWrap>
          </ItemContainer>
        </Column>

        <Column width="100%" margin="1rem" height="100%">
          <ItemContainer width="100%" height="100%">
            <RowWrap>
              <RowItem>
                <ItemContainer margin="1rem 0" borderBottom={'1px solid ' + colors.text.primary}>
                  <H1 fontSize="1rem" color={colors.text.primary} margin="0.5rem 0">
                    Company Modal Image 3
                  </H1>
                </ItemContainer>
                <ItemContainer>
                  <UserImage width="100%" height="200px" src={websiteImages.modal_section_img_3 as string} />
                </ItemContainer>
                <FileUploader
                  handleChange={file => handleUploadChange(file, 'modal_section_img_3')}
                  name="file"
                  types={['JPG', 'PNG', 'JPEG']}
                />
              </RowItem>
              <RowItem>
                <ItemContainer margin="1rem 0" borderBottom={'1px solid ' + colors.text.primary}>
                  <H1 fontSize="1rem" color={colors.text.primary} margin="0.5rem 0">
                    Company Modal Image 4
                  </H1>
                </ItemContainer>
                <ItemContainer>
                  <UserImage width="100%" height="200px" src={websiteImages.modal_section_img_4 as string} />
                </ItemContainer>
                <FileUploader
                  handleChange={file => handleUploadChange(file, 'modal_section_img_4')}
                  name="file"
                  types={['JPG', 'PNG', 'JPEG']}
                />
              </RowItem>
            </RowWrap>
          </ItemContainer>
        </Column>
      </JustifyBetweenRow>
    </ItemContainer>
  )
}

export default WebsiteImagesTab
