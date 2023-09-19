import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { EvoParams, genEffectiveScale, passDiceRoll, range } from '../../lib/evo';
import { NoteType, frames, scales } from '../../lib/note';

export const qSmall = [NoteType.sixteenth * frames, NoteType.eight * frames]
export const qAll = range(0,frames * 2)

export const initialState: EvoParams = {
    duplicationChange: 0.1,
    toneChange: 0.1,
    toneChangeSteepness: 3,
    toneChangeValuesAbsolute: range(12,1),
    toneMin: 36,
    toneMax: 96,
    positionChange: 0.1,
    positionChangeSteepness: 0,
    positionChangeValuesAbsolute: qSmall,
    stretchChange: 6,
    stretchChangeSteepness: 0,
    stretchChangeValues: [NoteType.quarter * frames, NoteType.half * frames],
    durationChange: 0.1,
    durationChangeSteepness: 2,
    durationChangeValuesAbsolute: [NoteType.sixteenth, NoteType.eight, NoteType.quarter, NoteType.eight + NoteType.quarter],
    durationMax: NoteType.whole + NoteType.half,
    durationMin: NoteType.thirtysecond,
    deleteChance: 0.02,
    volumeChange: 0.3,
    key: 0, // c
    scale: 'dorian',
    effectiveScale: [],
    effectiveScalePercentage: 0.6,
    effectiveScaleChange: 0.01
}

initialState.effectiveScale = genEffectiveScale(initialState)

export const evoParamsSlice = createSlice({
  name: 'evoParams',
  initialState,
  reducers: {
    updateEvoParams: function <K extends keyof EvoParams>(
        state: EvoParams,
        action: PayloadAction<{key: K; value: EvoParams[K]}>,
    ) {
        if (action.payload.key == 'scale' || action.payload.key == 'effectiveScalePercentage' ) {
            
            if (action.payload.key === 'scale') {
              state.scale = action.payload.value as keyof typeof scales
            } else {
              state.effectiveScalePercentage = action.payload.value as number
            }

            
            state.effectiveScale = genEffectiveScale(state)
            
        } else {
            state[action.payload.key] = action.payload.value;
        }

        return state;
    },
    resetEvoParams: (state, event: PayloadAction<EvoParams>) => {
      return event.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { updateEvoParams, resetEvoParams } = evoParamsSlice.actions

export default evoParamsSlice.reducer

