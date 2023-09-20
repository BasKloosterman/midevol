import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
    EvoParams,
    genEffectiveScale,
    passDiceRoll,
    range
} from '../../lib/evo';
import { NoteType, frames, scales } from '../../lib/note';

export const qSmall = [NoteType.sixteenth * frames, NoteType.eight * frames];
export const qAll = range(0, frames * 2);

export const initialState: Record<number, EvoParams> = {
    1: {
        duplicationChange: 0.1,
        toneChange: 0.1,
        toneChangeSteepness: 3,
        toneChangeValuesAbsolute: range(12, 1),
        toneMin: 36,
        toneMax: 96,
        positionChange: 0.1,
        positionChangeSteepness: 0,
        positionChangeValuesAbsolute: qSmall,
        stretchChange: 6,
        stretchChangeSteepness: 0,
        stretchChangeValues: [
            NoteType.quarter * frames,
            NoteType.half * frames
        ],
        durationChange: 0.1,
        durationChangeSteepness: 2,
        durationChangeValuesAbsolute: [
            NoteType.sixteenth,
            NoteType.eight,
            NoteType.quarter,
            NoteType.eight + NoteType.quarter
        ],
        durationMax: NoteType.whole + NoteType.half,
        durationMin: NoteType.thirtysecond,
        deleteChance: 0.02,
        volumeChange: 0.3,
        key: 0, // c
        scale: 'dorian',
        effectiveScale: [],
        effectiveScalePercentage: 0.6,
        effectiveScaleChange: 0.01
    },
    2: {
        duplicationChange: 0.1,
        toneChange: 0.1,
        toneChangeSteepness: 3,
        toneChangeValuesAbsolute: range(12, 1),
        toneMin: 36,
        toneMax: 96,
        positionChange: 0.1,
        positionChangeSteepness: 0,
        positionChangeValuesAbsolute: qSmall,
        stretchChange: 6,
        stretchChangeSteepness: 0,
        stretchChangeValues: [
            NoteType.quarter * frames,
            NoteType.half * frames
        ],
        durationChange: 0.1,
        durationChangeSteepness: 2,
        durationChangeValuesAbsolute: [
            NoteType.sixteenth,
            NoteType.eight,
            NoteType.quarter,
            NoteType.eight + NoteType.quarter
        ],
        durationMax: NoteType.whole + NoteType.half,
        durationMin: NoteType.thirtysecond,
        deleteChance: 0.02,
        volumeChange: 0.3,
        key: 0, // c
        scale: 'major',
        effectiveScale: [],
        effectiveScalePercentage: 0.6,
        effectiveScaleChange: 0.01
    }
};

initialState[1].effectiveScale = genEffectiveScale(initialState[1]);
initialState[2].effectiveScale = genEffectiveScale(initialState[2]);

export const evoParamsSlice = createSlice({
    name: 'evoParams',
    initialState,
    reducers: {
        updateEvoParams: function <K extends keyof EvoParams>(
            state: Record<number, EvoParams>,
            action: PayloadAction<{
                instrument: number;
                key: K;
                value: EvoParams[K];
            }>
        ) {
            if (
                action.payload.key == 'scale' ||
                action.payload.key == 'effectiveScalePercentage'
            ) {
                if (action.payload.key === 'scale') {
                    state[action.payload.instrument].scale = action.payload
                        .value as keyof typeof scales;
                } else {
                    state[action.payload.instrument].effectiveScalePercentage =
                        action.payload.value as number;
                }

                state[action.payload.instrument].effectiveScale =
                    genEffectiveScale(state[action.payload.instrument]);
            } else {
                state[action.payload.instrument][action.payload.key] =
                    action.payload.value;
            }

            return state;
        },
        resetEvoParams: (
            state,
            action: PayloadAction<{ instrument: number; params: EvoParams }>
        ) => {
            state[action.payload.instrument] = action.payload.params;
            return state;
        }
        // https://redux-toolkit.js.org/api/createSlice#the-extrareducers-builder-callback-notation
    }
});

// Action creators are generated for each case reducer function
export const { updateEvoParams, resetEvoParams } = evoParamsSlice.actions;

export default evoParamsSlice.reducer;
