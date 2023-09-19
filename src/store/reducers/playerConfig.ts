import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface PlayerConfigState {
    loopRange: number; //8)
    loop: boolean; //true)
    instantantQuantizeScale: boolean; //true)
    metronome: boolean; //true)
    drumsOutput: number; //1)
    melodyOutput: number; //0)
    bpm: number;
}

export const initialState: PlayerConfigState = {
    loopRange: 8,
    loop: true,
    instantantQuantizeScale: true,
    metronome: true,
    drumsOutput: 1,
    melodyOutput: 0,
    bpm: 120,
}

export const playerConfigSlice = createSlice({
  name: 'playerConfig',
  initialState,
  reducers: {
    updateSettings: function <K extends keyof PlayerConfigState>(
        state: PlayerConfigState,
        action: PayloadAction<{key: K; value: PlayerConfigState[K]}>,
    ) {
        state[action.payload.key] = action.payload.value;

        return state;
    },
    resetSettings: (state, event: PayloadAction<PlayerConfigState>) => {
      return event.payload
    } 
  },
})

// Action creators are generated for each case reducer function
export const { updateSettings, resetSettings } = playerConfigSlice.actions

export default playerConfigSlice.reducer

