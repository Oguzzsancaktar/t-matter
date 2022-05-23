import { IModal } from '@/models'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IRootState } from '../store'

type IModalsState = {
  openModals: IModal[] | []
  minimizedModals: IModal[] | []
}

const initialState: IModalsState = {
  openModals: [],
  minimizedModals: []
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal(state: IModalsState, action: PayloadAction<IModal>) {
      state.openModals = [...state.openModals].concat(action.payload)
      state.minimizedModals = state.minimizedModals.filter(modal => modal.id !== action.payload.id)
    },
    closeModal(state: IModalsState, action: PayloadAction<IModal>) {
      state.openModals = state.openModals.filter(modal => modal.id !== action.payload.id)
      state.minimizedModals = state.minimizedModals.filter(modal => modal.id !== action.payload.id)
    },
    minimizeModal(state: IModalsState, action: PayloadAction<IModal>) {
      state.openModals = state.openModals.filter(modal => modal.id !== action.payload.id)
      state.minimizedModals = [...state.minimizedModals].concat(action.payload)
    }
  }
})

export const selectOpenModals = (state: IRootState) => state.modal.openModals
export const selectMinimizedModals = (state: IRootState) => state.modal.minimizedModals

export const { openModal, closeModal, minimizeModal } = modalSlice.actions
export default modalSlice.reducer
