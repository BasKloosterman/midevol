import { createAction } from '@reduxjs/toolkit'
export const changeInstrumentOutput = createAction<{instrument: number, output: number}>('changeInstrumentOutput')
export const changeInstrumentChannel = createAction<{instrument: number, channel: number}>('changeInstrumentChannel')