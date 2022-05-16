import { IModal } from '@/models'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IRootState } from '..'

type IModalState = {
  isModalOpen: boolean
  modal: IModal | null
}

const initialState: IModalState = {
  isModalOpen: false,
  modal: null
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal(state: IModalState, action: PayloadAction<IModal>) {
      state.isModalOpen = true
      state.modal = action.payload
    },
    hideModal(state: IModalState, action: PayloadAction<IModal>) {
      state.isModalOpen = false
      state.modal = null
    }
  }
})

export const selectIsModalOpen = (state: IRootState) => state.modal.isModalOpen
export const selectModal = (state: IRootState) => state.modal.modal
export const { showModal, hideModal } = modalSlice.actions
export default modalSlice.reducer
