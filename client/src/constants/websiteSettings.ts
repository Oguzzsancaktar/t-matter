import { IWebsiteStylesData, IWebsiteTextsData } from '@/models'

export const defaultWebsiteTextSettings: IWebsiteTextsData = {
  contactInformations: [
    {
      icon: '',
      title: '',
      content: ''
    }
  ],
  informationButtonText: '',
  informationDescription: '',
  informationHeader: '',
  modalSections: [
    { header: '', text: '' },
    { header: '', text: '' },
    { header: '', text: '' },
    { header: '', text: '' }
  ],
  navlinks: [
    { name: '', show: true, index: 0 },
    { name: '', show: true, index: 1 },
    { name: '', show: true, index: 2 },
    { name: '', show: true, index: 3 },
    { name: '', show: true, index: 4 },
    { name: '', show: true, index: 5 }
  ]
}

export const defaultWebsiteStyleSettings: IWebsiteStylesData = {
  navbarBorderColor: { _id: '', color: '#F2F200', status: 0 },
  websitePaddingColor: { _id: '', color: '#F2F200', status: 0 },
  websiteBackgroundColor: { _id: '', color: '#F2F200', status: 0 },
  websiteBorderRadius: 0,
  websitePaddingVertical: 0,
  websitePaddingHorizontal: 0,
  websiteModalButtonsBackgroundColor: { _id: '', color: '#F2F2FF', status: 0 },
  websiteModalButtonsBorderRadius: 0,
  websiteModalButtonsBorderColor: { _id: '', color: '#A2F2AF', status: 0 },
  websiteModalButtonsBorderWidth: 0,
  websiteImageBorderRadius: 0,

  navlinkTextColor: { _id: '', color: '#F2F2FF', status: 0 },
  navlinkHoverTextColor: { _id: '', color: '#F2F2FF', status: 0 },
  informationHeaderTextColor: { _id: '', color: '#F2F2FF', status: 0 },
  informationDescriptionTextColor: { _id: '', color: '#F2F2FF', status: 0 },
  informationButtonTextColor: { _id: '', color: '#F2F2FF', status: 0 },

  contactIconColor: { _id: '', color: '#F2F2FF', status: 0 },
  contactTitleColor: { _id: '', color: '#F2F2FF', status: 0 },
  contactContentColor: { _id: '', color: '#F2F2FF', status: 0 },

  websiteModalIconColor: { _id: '', color: '#F2F2FF', status: 0 },
  websiteModalTitleColor: { _id: '', color: '#F2F2FF', status: 0 },
  websiteModalContentColor: { _id: '', color: '#F2F2FF', status: 0 }
}
