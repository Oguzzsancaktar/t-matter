import { IColor } from '../settings'

export default interface IWebsiteStylesData {
  navbarBorderColor: IColor
  websitePaddingColor: IColor
  websiteBackgroundColor: IColor
  websiteModalButtonsBackgroundColor: IColor
  websiteModalButtonsBorderColor: IColor

  websitePaddingVertical: number
  websitePaddingHorizontal: number

  websiteBorderRadius: number
  websiteImageBorderRadius: number

  websiteModalButtonsBorderRadius: number
  websiteModalButtonsBorderWidth: number

  navlinkTextColor: IColor
  navlinkHoverTextColor: IColor
  informationHeaderTextColor: IColor
  informationDescriptionTextColor: IColor
  informationButtonTextColor: IColor

  contactIconColor: IColor
  contactTitleColor: IColor
  contactContentColor: IColor

  websiteModalIconColor: IColor
  websiteModalTitleColor: IColor
  websiteModalContentColor: IColor

  createdAt?: Date
  updatedAt?: Date
  __v?: number
}
