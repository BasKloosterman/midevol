import React, { useCallback, useEffect, useRef, useState } from 'react'
import {Output, WebMidi} from 'webmidi'
import { Clock } from './clock'
import { Note, NoteType, calcPos, frames } from './note'
import { EvoParams, evoNote, range, scales } from './evo';
import Player, { PlayerRef } from './Player';
import { parseInt } from 'lodash';

const App = () => {
    const playerRef = useRef<PlayerRef>(null)
    const [outputs, setOutputs] = useState<Output[]>([])
    const [loopRange, setLoopRange] = useState<number>(8)
    const [loop, setLoop] = useState<boolean>(true)
    const [metronome, setMetronome] = useState<boolean>(true)

    const [melody, setMelody] = useState<Note[]>([
        {output: 0, volume: 1,channel: 1, note: 60, length: NoteType.sixteenth, position: calcPos(4, 1, 1, NoteType.quarter, 1)},
        {output: 0, volume: 1,channel: 1, note: 60, length: NoteType.sixteenth, position: calcPos(4, 1, 2, NoteType.quarter, 1)},
        {output: 0, volume: 1,channel: 1, note: 60, length: NoteType.sixteenth, position: calcPos(4, 1, 3, NoteType.quarter, 1)},
        {output: 0, volume: 1,channel: 1, note: 60, length: NoteType.sixteenth, position: calcPos(4, 1, 4, NoteType.quarter, 1)},
        {output: 0, volume: 1,channel: 1, note: 60, length: NoteType.sixteenth, position: calcPos(4, 2, 1, NoteType.quarter, 1)},
        {output: 0, volume: 1,channel: 1, note: 60, length: NoteType.sixteenth, position: calcPos(4, 2, 2, NoteType.quarter, 1)},
        {output: 0, volume: 1,channel: 1, note: 60, length: NoteType.sixteenth, position: calcPos(4, 2, 3, NoteType.quarter, 1)},
        {output: 0, volume: 1,channel: 1, note: 60, length: NoteType.sixteenth, position: calcPos(4, 2, 4, NoteType.quarter, 1)},
    ])

    const [evoParams, setEvoParams] = useState<EvoParams>({
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
    })

    const evo = () => {
        const newMelody = melody.reduce((acc, curNote) => {
            return [...acc, ...evoNote(curNote, evoParams)]
        }, [] as Note[])

        const latestNote = Math.max(...newMelody.map(x => x.position))
        setLoopRange(Math.ceil(latestNote / (NoteType.quarter * frames)))
        setMelody(newMelody)
    }

    return (
        <div>
            <Player
                ref={playerRef}
                melody={melody}
                metronome={metronome}
                bpm={120}
                loopRange={loopRange}
                loop={loop}
                beforeLoop={evo}
                outputsChanged={() => setOutputs(playerRef.current!.outputs)}
            />
            <button onClick={() => {
                playerRef.current?.stop()
                playerRef.current?.play()
            }}>Play!</button>
            <button onClick={() => {
                playerRef.current?.stop();
                playerRef.current?.play()
            }}>Loop!</button>
            <button onClick={() => {
                playerRef.current?.stop()
            }}>Stop!</button>
            <ul>
                {playerRef.current?.outputs.map((x, idx) => <li key={idx}>{x.name} ({x.manufacturer})</li>)}
            </ul>

            <label style={{display: 'block'}}>
                metronome <input type="checkbox" checked={metronome} onChange={(e) => setMetronome(e.target.checked)}/>
            </label>
            <label>delete chance: {evoParams.deleteChance * 100}%</label>
            <input style={{width: '100%'}} type="range" min="0" max="100" step="1" onChange={e => setEvoParams({
                ...evoParams,
                deleteChance: parseInt(e.target.value) / 100,
            })} value={evoParams.deleteChance * 100} />
            <label htmlFor="">Scale</label>
            <select name="" value={evoParams.scale} id="" onChange={x => setEvoParams({...evoParams, scale: x.target.value as any})}>
                {Object.keys(scales).map(x => <option key={x} value={x}>{x}</option>)}
            </select>
        </div>
    )
}

export default App