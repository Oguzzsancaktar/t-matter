import { IUser } from '@models/index'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type IOnlineUsersSlice = {
  onlineUsers: IUser['_id'][]
}

const onlineUsersSlice = createSlice({
  name: 'onlineUsers',
  initialState: {
    onlineUsers: []
  } as IOnlineUsersSlice,
  reducers: {
    setOnlineUsers(state: IOnlineUsersSlice, action: PayloadAction<IUser['_id'][]>) {
      state.onlineUsers = action.payload
    }
  }
})

export const { setOnlineUsers } = onlineUsersSlice.actions

export default onlineUsersSlice.reducer
