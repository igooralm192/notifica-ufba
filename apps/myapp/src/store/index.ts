// import AsyncStorage from '@react-native-async-storage/async-storage'
import { configureStore } from '@reduxjs/toolkit'
import {
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
  TypedUseSelectorHook,
} from 'react-redux'
import { combineReducers } from 'redux'
// import { persistStore, persistReducer } from 'redux-persist'

import { disciplinesReducer } from './disciplines'

// const persistConfig = {
//   key: 'root',
//   storage: AsyncStorage,
// }

const store = configureStore({
  reducer: combineReducers({
    disciplines: disciplinesReducer,
  }),
  middleware: [],
})

// export const persistor = persistStore(store)

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useDispatch = () => useReduxDispatch<AppDispatch>()
export const useSelector: TypedUseSelectorHook<AppState> = useReduxSelector

export default store
