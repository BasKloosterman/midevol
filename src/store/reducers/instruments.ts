import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { EvoParams, genEffectiveScale, passDiceRoll, range } from '../../lib/evo';
import { NoteType, frames, scales } from '../../lib/note';

export interface Instrument {
    id: number;
    output: number;
    channel: number;
    name: string
}

export const initialState: Record<number, Instrument> = {
    1: {
        id: 1,
        output: 0,
        channel: 1,
        name: 'initial'
    },
    2: {
        id: 2,
        output: 1,
        channel: 1,
        name: 'second'
    }
}

let lastId = 1;

export const evoParamsSlice = createSlice({
  name: 'evoParams',
  initialState,
  reducers: {
    updateInstrumentParams: function <K extends keyof Instrument>(
        state: Record<number, Instrument>,
        action: PayloadAction<{instrument: number; key: K; value: Instrument[K]}>,
    ) {
        state[action.payload.instrument][action.payload.key] = action.payload.value;
        return state;
    },
    // https://redux-toolkit.js.org/api/createSlice#the-extrareducers-builder-callback-notation
    addInstrument: (state, action: PayloadAction<Instrument>) => {
        lastId++;
        state[lastId] = {...action.payload, id: lastId}
        return state
    },
    removeInstrument: (state, action: PayloadAction<number>) => {
        delete state[action.payload]
        return state
    }
  },
})

// Action creators are generated for each case reducer function
export const { updateInstrumentParams, addInstrument, removeInstrument } = evoParamsSlice.actions

export default evoParamsSlice.reducer

