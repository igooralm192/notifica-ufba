import { IUserDTO } from '@notifica-ufba/domain/dtos'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AuthState, IAuthStore } from './types'

const initialState: IAuthStore = {
  state: AuthState.UNKNOWN,
  token: null,
  user: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    stateChanged(state, action: PayloadAction<AuthState>) {
      state.state = action.payload
    },
    tokenFetched(state, action: PayloadAction<string | null>) {
      state.token = action.payload
    },
    userFetched(state, action: PayloadAction<IUserDTO | null>) {
      state.user = action.payload
    },
    cleanAuth(state) {
      state.token = null
      state.user = null
    },
  },
})

export const { stateChanged, tokenFetched, userFetched, cleanAuth } =
  authSlice.actions

export default authSlice.reducer
