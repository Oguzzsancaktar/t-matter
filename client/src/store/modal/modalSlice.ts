import { IModal } from '@/models'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import ReactTooltip from 'react-tooltip'
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
    setModalOnClose(state: IModalsState, action: PayloadAction<{ onClose: () => void; modalId: string }>) {
      const index = state.openModals.findIndex(modal => modal.id === action.payload.modalId)
      if (index !== -1) {
        state.openModals[index].onClose = action.payload.onClose
      }
    },
    closeModal(state: IModalsState, action: PayloadAction<IModal['id']>) {
      state.openModals = state.openModals.filter(modal => modal.id !== action.payload)
      state.minimizedModals = state.minimizedModals.filter(modal => modal.id !== action.payload)
    },
    minimizeModal(state: IModalsState, action: PayloadAction<IModal>) {
      state.openModals = state.openModals.filter(modal => modal.id !== action.payload.id)
      state.minimizedModals = [...state.minimizedModals].concat(action.payload)
    }
  }
})

export const selectOpenModals = (state: IRootState) => state.modal.openModals
export const selectMinimizedModals = (state: IRootState) => state.modal.minimizedModals

export const { openModal, closeModal, minimizeModal, setModalOnClose } = modalSlice.actions
export default modalSlice.reducer
