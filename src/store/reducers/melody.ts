import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Note, NoteType, calcPos, frames } from '../../lib/note';
import { RootState } from '..';
import { changeInstrumentChannel, changeInstrumentOutput } from './actions';

export const initialState: {
    current: Note[];
    iteration: number;
} = {
    current: [
        {
            output: 0,
            channel: 1,
            volume: 1,
            note: 60,
            length: NoteType.sixteenth,
            position: calcPos(4, 1, 1, NoteType.quarter, 1),
            instrument: 1
        },
        {
            output: 0,
            channel: 2,
            volume: 1,
            note: 60,
            length: NoteType.sixteenth,
            position: calcPos(4, 1, 2, NoteType.quarter, 1),
            instrument: 2
        },
        {
            output: 0,
            channel: 1,
            volume: 1,
            note: 60,
            length: NoteType.sixteenth,
            position: calcPos(4, 1, 3, NoteType.quarter, 1),
            instrument: 1
        },
        {
            output: 0,
            channel: 2,
            volume: 1,
            note: 60,
            length: NoteType.sixteenth,
            position: calcPos(4, 1, 4, NoteType.quarter, 1),
            instrument: 2
        },
        {
            output: 0,
            channel: 1,
            volume: 1,
            note: 60,
            length: NoteType.sixteenth,
            position: calcPos(4, 2, 1, NoteType.quarter, 1),
            instrument: 1
        },
        {
            output: 0,
            channel: 2,
            volume: 1,
            note: 60,
            length: NoteType.sixteenth,
            position: calcPos(4, 2, 2, NoteType.quarter, 1),
            instrument: 2
        },
        {
            output: 0,
            channel: 1,
            volume: 1,
            note: 60,
            length: NoteType.sixteenth,
            position: calcPos(4, 2, 3, NoteType.quarter, 1),
            instrument: 1
        },
        {
            output: 0,
            channel: 2,
            volume: 1,
            note: 60,
            length: NoteType.sixteenth,
            position: calcPos(4, 2, 4, NoteType.quarter, 1),
            instrument: 2
        }
    ],
    iteration: 0
};

export const melodySlice = createSlice({
    name: 'melody',
    initialState,
    reducers: {
        updateMelody: function (
            state,
            action: PayloadAction<[Note[], boolean]>
        ) {
            state.current = action.payload[0];
            action.payload[1] && state.iteration++;
        },
        resetMelody: function (
            state,
            action: PayloadAction<{ melody: Note[]; iteration: number }>
        ) {
            state.current = action.payload.melody;
            state.iteration = action.payload.iteration;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(changeInstrumentOutput, (state, action) => {
                state.current = state.current.map((n) => {
                    if (n.instrument != action.payload.instrument) {
                        return n;
                    }
                    return { ...n, output: action.payload.output };
                });
                return state;
            })
            .addCase(changeInstrumentChannel, (state, action) => {
                state.current = state.current.map((n) => {
                    if (n.instrument != action.payload.instrument) {
                        return n;
                    }
                    return { ...n, channel: action.payload.channel };
                });
                return state;
            })
    }
});

// Action creators are generated for each case reducer function
export const { updateMelody, resetMelody } = melodySlice.actions;

export const getMelody = ({ melody }: RootState) => {
    return melody.current;
};

export const getCurrentIteration = ({ melody }: RootState) => {
    return melody.iteration;
};

export default melodySlice.reducer;
