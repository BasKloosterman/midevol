import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { EvoParams, range } from '../../lib/evo';
import { NoteType, frames } from '../../lib/note';

const initialState: EvoParams = {
    duplicationChange: 0.1,
    toneChange: 0.1,
    toneChangeSteepness: 3,
    toneChangeValuesAbsolute: range(12,1),
    toneMin: 36,
    toneMax: 96,
    positionChange: 0.1,
    positionChangeSteepness: 0,
    positionChangeValuesAbsolute: [NoteType.sixteenth * frames, NoteType.eight * frames],
    stretchChange: 0.1,
    stretchChangeSteepness: 0,
    stretchChangeValues: [NoteType.quarter * frames, NoteType.half * frames],
    durationChange: 0.1,
    durationChangeSteepness: 2,
    durationChangeValuesAbsolute: [NoteType.sixteenth, NoteType.eight, NoteType.quarter, NoteType.eight + NoteType.quarter],
    durationMax: NoteType.whole + NoteType.half,
    durationMin: NoteType.thirtysecond,
    deleteChance: 0.02,
    scale: 'blues',
    volumeChange: 0.3,
    key: 0, // c
}

export const evoParamsSlice = createSlice({
  name: 'evoParams',
  initialState,
  reducers: {
    updateEvoParams: function <K extends keyof EvoParams>(
        state: EvoParams,
        action: PayloadAction<{key: K; value: EvoParams[K]}>,
    ) {
        state[action.payload.key] = action.payload.value;

        return state;
    },
  },
})

// Action creators are generated for each case reducer function
export const { updateEvoParams } = evoParamsSlice.actions

export default evoParamsSlice.reducer

