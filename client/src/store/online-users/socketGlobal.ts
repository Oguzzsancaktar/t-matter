import { IUser } from '@models/index'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Socket } from 'socket.io-client'

type ISocketGlobal = {
  onlineUsers: IUser['_id'][]
  socket: Socket | null
}

function cleanStringify(object) {
  if (object && typeof object === 'object') {
    object = copyWithoutCircularReferences([object], object)
  }
  return JSON.stringify(object)

  function copyWithoutCircularReferences(references, object) {
    var cleanObject = {}
    Object.keys(object).forEach(function (key) {
      var value = object[key]
      if (value && typeof value === 'object') {
        if (references.indexOf(value) < 0) {
          references.push(value)
          cleanObject[key] = copyWithoutCircularReferences(references, value)
          references.pop()
        } else {
          cleanObject[key] = '###_Circular_###'
        }
      } else if (typeof value !== 'function') {
        cleanObject[key] = value
      }
    })
    return cleanObject
  }
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
      const s = JSON.parse(cleanStringify(state))
      s.socket = action.payload
      return s
    }
  }
})

export const { setOnlineUsers, setSocket } = socketGlobal.actions

export default socketGlobal.reducer
