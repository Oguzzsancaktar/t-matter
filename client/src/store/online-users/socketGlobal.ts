import { IUser } from '@models/index'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Socket } from 'socket.io-client'

type ISocketGlobal = {
  onlineUsers: IUser['_id'][]
  socket: Socket | null
}

const socketGlobal = createSlice({
  name: 'socketGlobal',
  initialState: {
    onlineUsers: [],
    socket: null
  } as ISocketGlobal,
  reducers: {
    setOnlineUsers(state, action: PayloadAction<IUser['_id'][]>) {
      state.onlineUsers = action.payload
    },
    setSocket(state, action: PayloadAction<Partial<Socket>>) {
      const s = JSON.parse(JSON.stringify(state))
      s.socket = action.payload
      return s
    }
  }
})

export const { setOnlineUsers, setSocket } = socketGlobal.actions

export default socketGlobal.reducer
