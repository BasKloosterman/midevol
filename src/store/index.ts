import { configureStore } from '@reduxjs/toolkit'
import playerConfigReducer from './reducers/playerConfig'
import evoParamsReducer from './reducers/evoParams'
import melodyReducer from './reducers/melody'
import historyReducer from './reducers/history'
import instrumentReducer from './reducers/instruments'


export const store = configureStore({
  reducer: {
    playerConfig: playerConfigReducer,
    evoParams: evoParamsReducer,
    melody: melodyReducer,
    history: historyReducer,
    instruments: instrumentReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch