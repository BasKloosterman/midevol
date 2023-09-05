import React, { useCallback, useEffect, useRef, useState } from 'react'
import {Output, WebMidi} from 'webmidi'
import { Clock } from './clock'
import { Note, NoteType, calcPos, frames } from './note'
import { EvoParams, evoNote, range, scaleQuantize, scales, numToNote } from './evo';
import Player, { PlayerRef } from './Player';
import { parseInt } from 'lodash';
import Slider from './Slider';
const App = () => {
    const playerRef = useRef<PlayerRef>(null)
    const [outputs, setOutputs] = useState<Output[]>([])
    const [loopRange, setLoopRange] = useState<number>(8)
    const [loop, setLoop] = useState<boolean>(true)
    const [instantantQuantizeScale, setInstantantQuantizeScale] = useState<boolean>(true)
    const [metronome, setMetronome] = useState<boolean>(true)
    const [drumsOutput, setDrumsOutput] = useState(1)
    const [melodyOutput, setMelodyOutput] = useState(0) 

    const [melody, setMelody] = useState<Note[]>([
        {output: melodyOutput, volume: 1,channel: 1, note: 60, length: NoteType.sixteenth, position: calcPos(4, 1, 1, NoteType.quarter, 1)},
        {output: melodyOutput, volume: 1,channel: 1, note: 60, length: NoteType.sixteenth, position: calcPos(4, 1, 2, NoteType.quarter, 1)},
        {output: melodyOutput, volume: 1,channel: 1, note: 60, length: NoteType.sixteenth, position: calcPos(4, 1, 3, NoteType.quarter, 1)},
        {output: melodyOutput, volume: 1,channel: 1, note: 60, length: NoteType.sixteenth, position: calcPos(4, 1, 4, NoteType.quarter, 1)},
        {output: melodyOutput, volume: 1,channel: 1, note: 60, length: NoteType.sixteenth, position: calcPos(4, 2, 1, NoteType.quarter, 1)},
        {output: melodyOutput, volume: 1,channel: 1, note: 60, length: NoteType.sixteenth, position: calcPos(4, 2, 2, NoteType.quarter, 1)},
        {output: melodyOutput, volume: 1,channel: 1, note: 60, length: NoteType.sixteenth, position: calcPos(4, 2, 3, NoteType.quarter, 1)},
        {output: melodyOutput, volume: 1,channel: 1, note: 60, length: NoteType.sixteenth, position: calcPos(4, 2, 4, NoteType.quarter, 1)},
    ])

    useEffect(() => {
        setMelody(m => m.map(n => ({...n, output: melodyOutput})))
    }, [melodyOutput])

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
        volumeChange: 0.3,
        key: 0, // c
    })

    const evo = () => {
        let newMelody = melody.reduce((acc, curNote, idx) => {
            return [...acc, ...evoNote(curNote, melody.length < 2 || (idx > 0 && acc.length < 2), evoParams)]
        }, [] as Note[])

        newMelody = instantantQuantizeScale ? newMelody.map(x => ({
            ...x,
            note: scaleQuantize(x.note, scales[evoParams.scale], evoParams.key)!
        })) : newMelody

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
                metronomeOutput={drumsOutput}
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

            <div style={{display: 'flex'}}>
                <div className='c-settings-item'>
                    <label style={{display: 'block'}}>
                        metronome <input type="checkbox" checked={metronome} onChange={(e) => setMetronome(e.target.checked)}/>
                    </label>
                </div>
                <div className='c-settings-item'>
                    <label style={{display: 'block'}}>
                        instantantQuantizeScale <input type="checkbox" checked={instantantQuantizeScale} onChange={(e) => setInstantantQuantizeScale(e.target.checked)}/>
                    </label>
                </div>
                <div className='c-settings-item'>
                    <label htmlFor="">Key</label>
                    <select name="" value={evoParams.key} id="" onChange={x => setEvoParams({...evoParams, key: parseInt(x.target.value)})}>
                        <option value={0}>C</option>
                        <option value={1}>C#</option>
                        <option value={2}>D</option>
                        <option value={3}>D#</option>
                        <option value={4}>E</option>
                        <option value={5}>F</option>
                        <option value={6}>F#</option>
                        <option value={7}>G</option>
                        <option value={8}>G#</option>
                        <option value={9}>A</option>
                        <option value={10}>A#</option>
                        <option value={11}>B</option>
                    </select>
                    <select name="" value={evoParams.scale} id="" onChange={x => setEvoParams({...evoParams, scale: x.target.value as any})}>
                        {Object.keys(scales).map(x => <option key={x} value={x}>{x}</option>)}
                    </select>
                </div>
                <div className='c-settings-item'>
                    <label htmlFor="">Melody Output</label>
                    <select name="" value={melodyOutput} id="" onChange={x => setMelodyOutput(parseInt(x.target.value))}>
                        {outputs.map((x, idx) => <option key={idx} value={idx}>{x.name}</option>)}
                    </select>
                </div>
                <div className='c-settings-item'>
                    <label htmlFor="">Metronome output</label>
                    <select name="" value={drumsOutput} id="" onChange={x => setDrumsOutput(parseInt(x.target.value))}>
                        {outputs.map((x, idx) => <option key={idx} value={idx}>{x.name}</option>)}
                    </select>
                </div>
            </div>

            <Slider
                label='Duplication change percentage'
                value={Math.round(evoParams.duplicationChange * 100)}
                setValue={n => setEvoParams({
                    ...evoParams,
                    duplicationChange: n/100
                })}
                display={v => `${v}%`}
            />
            <Slider
                label='Tone change percentage'
                value={Math.round(evoParams.toneChange * 100)}
                setValue={n => setEvoParams({
                    ...evoParams,
                    toneChange: n/100
                })}
                display={v => `${v}%`}
            />
            <Slider
                label='Tone min'
                value={evoParams.toneMin}
                setValue={n => setEvoParams({
                    ...evoParams,
                    toneMin: n
                })}
                min={0}
                max={127}
                display={v => `${numToNote(v)}`}
            />
            <Slider
                label='Tone max'
                value={evoParams.toneMax}
                setValue={n => setEvoParams({
                    ...evoParams,
                    toneMax: n
                })}
                min={0}
                max={127}
                display={v => `${numToNote(v)}`}
            />
            <Slider
                label='Position change percentage'
                value={Math.round(evoParams.positionChange * 100)}
                setValue={n => setEvoParams({
                    ...evoParams,
                    positionChange: n/100
                })}
                display={v => `${v}%`}
            />
            <Slider
                label='positionChangeSteepness'
                value={evoParams.positionChangeSteepness}
                setValue={n => setEvoParams({
                    ...evoParams,
                    positionChangeSteepness: n
                })}
                min={0}
                max={10}
                display={v => `n ^ ${v}`}
            />
            <Slider
                label='Stretch change percentage'
                value={Math.round(evoParams.stretchChange * 100)}
                setValue={n => setEvoParams({
                    ...evoParams,
                    stretchChange: n/100
                })}
                display={v => `${v}%`}
            />
            <Slider
                label='Stretch change steepness'
                value={evoParams.stretchChangeSteepness}
                setValue={n => setEvoParams({
                    ...evoParams,
                    stretchChangeSteepness: n
                })}
                min={0}
                max={10}
                display={v => `n ^ ${v}`}
            />
            <Slider
                label='Duration change percentage'
                value={Math.round(evoParams.durationChange * 100)}
                setValue={n => setEvoParams({
                    ...evoParams,
                    durationChange: n/100
                })}
                display={v => `${v}%`}
            />
            <Slider
                label='durationChangeSteepness'
                value={evoParams.durationChangeSteepness}
                setValue={n => setEvoParams({
                    ...evoParams,
                    durationChangeSteepness: n
                })}
                min={0}
                max={10}
                display={v => `n ^ ${v}`}
            />
            <Slider
                label='Volume change percentage'
                value={Math.round(evoParams.volumeChange * 100)}
                setValue={n => setEvoParams({
                    ...evoParams,
                    volumeChange: n/100
                })}
                display={v => `${v}%`}
            />

            <Slider
                label='Delete change'
                value={evoParams.deleteChance * 100}
                setValue={(n) => setEvoParams({
                    ...evoParams,
                    deleteChance: n / 100,
                })}
                display={v => `${v}%`}
            />
        </div>
    )
}

export default App