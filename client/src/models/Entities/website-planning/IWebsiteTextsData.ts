export default interface IWebsiteTextsData {
  navlinks: { name: string; show: boolean; index: number }[]
  informationHeader: string
  informationDescription: string
  informationButtonText: string
  contactInformations: { icon: string; title: string; content: string }[]
  modalSections: { header: string; text: string }[]
}
