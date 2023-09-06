import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Note, NoteType, calcPos, frames } from '../../lib/note';

const initialState: Note[] = [
    {output: 0, volume: 1,channel: 1, note: 60, length: NoteType.sixteenth, position: calcPos(4, 1, 1, NoteType.quarter, 1)},
    {output: 0, volume: 1,channel: 1, note: 60, length: NoteType.sixteenth, position: calcPos(4, 1, 2, NoteType.quarter, 1)},
    {output: 0, volume: 1,channel: 1, note: 60, length: NoteType.sixteenth, position: calcPos(4, 1, 3, NoteType.quarter, 1)},
    {output: 0, volume: 1,channel: 1, note: 60, length: NoteType.sixteenth, position: calcPos(4, 1, 4, NoteType.quarter, 1)},
    {output: 0, volume: 1,channel: 1, note: 60, length: NoteType.sixteenth, position: calcPos(4, 2, 1, NoteType.quarter, 1)},
    {output: 0, volume: 1,channel: 1, note: 60, length: NoteType.sixteenth, position: calcPos(4, 2, 2, NoteType.quarter, 1)},
    {output: 0, volume: 1,channel: 1, note: 60, length: NoteType.sixteenth, position: calcPos(4, 2, 3, NoteType.quarter, 1)},
    {output: 0, volume: 1,channel: 1, note: 60, length: NoteType.sixteenth, position: calcPos(4, 2, 4, NoteType.quarter, 1)},
]

export const melodySlice = createSlice({
  name: 'melody',
  initialState,
  reducers: {
    updateMelody: function(state, action: PayloadAction<Note[]>) {
        return action.payload
    },
  }
})

// Action creators are generated for each case reducer function
export const { updateMelody } = melodySlice.actions

export default melodySlice.reducer

