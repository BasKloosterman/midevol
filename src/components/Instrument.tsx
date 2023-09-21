import { FC, useEffect, useState } from 'react';
import Slider from './Slider';
import { EvoParams } from '../lib/evo';
import { WebMidi } from 'webmidi';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { updateInstrumentParams } from '../store/reducers/instruments';
import { qAll, qSmall, updateEvoParams } from '../store/reducers/evoParams';
import Emitter, { events } from '../lib/eventemitter';
import { numToNote, scales } from '../lib/note';
import { Instrument } from '../store/reducers/instruments';
import { changeInstrumentChannel, changeInstrumentOutput } from '../store/reducers/actions';
import { range } from 'lodash';

interface InstrumentProps {
    instrument: Instrument
}

const Instrument: FC<InstrumentProps> = ({instrument}) => {
    // const instruments = useSelector((s :RootState) => s.instruments)
    // console.log(Object.values(instruments).map(x => ({c: x.channel, o: x.output})))
    const evoParams = useSelector((s :RootState) => s.evoParams[instrument.id])
    const [outputs, setOutputs] = useState(WebMidi.outputs)
    const dispatch = useDispatch()

    function setInstrument<K extends keyof Instrument> (key: K, value: Instrument[K]) {
        dispatch(updateInstrumentParams({instrument: instrument.id, key, value}))
    }

    function setEvoParams<K extends keyof EvoParams> (key: K, value: EvoParams[K]) {
        dispatch(updateEvoParams({instrument: instrument.id, key, value}))
    }

    useEffect(()=>{
        return Emitter.subscribe(events.eventChannelsChanged, () => {
            setOutputs([...WebMidi.outputs])
        })
    }, [])

    return (
        <div>
            <p>
                <label htmlFor="">Instrument name</label>
                <input type="text" value={instrument.name}  onChange={(x) =>
                    setInstrument('name', x.target.value)
                }/>
            </p>
            <div style={{ display: 'flex',margin: '15px 0' }}>
                <div className="c-settings-item">
                    <label style={{ display: 'block' }}>
                        quantizeTime{' '}
                        <input
                            type="checkbox"
                            checked={evoParams.positionChangeValuesAbsolute != qAll}
                            onChange={(e) =>
                                setEvoParams('positionChangeValuesAbsolute', e.target.checked ? qSmall : qAll)
                            }
                        />
                    </label>
                </div>
                <div className="c-settings-item">
                    <label htmlFor="">Key</label>
                    <select
                        name=""
                        value={evoParams.key}
                        id=""
                        onChange={(x) => setEvoParams('key', parseInt(x.target.value))}
                    >
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
                    <select
                        name=""
                        value={evoParams.scale}
                        id=""
                        onChange={(x) => setEvoParams('scale', x.target.value as any)}
                    >
                        {Object.keys(scales).map((x) => (
                            <option key={x} value={x}>
                                {x}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="c-settings-item">
                    <label htmlFor="">MIDI Output</label>
                    <select
                        name=""
                        value={instrument.output}
                        id=""
                        onChange={(x) =>
                            dispatch(
                                changeInstrumentOutput({
                                    instrument: instrument.id,
                                    output:parseInt(x.target.value)
                                })
                            )
                        }
                    >
                        {outputs.map((x, idx) => (
                            <option key={idx} value={idx}>
                                {x.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="c-settings-item">
                    <label htmlFor="">MIDI Channel</label>
                    <select
                        name=""
                        value={instrument.channel}
                        id=""
                        onChange={(x) =>
                            dispatch(
                                changeInstrumentChannel({
                                    instrument: instrument.id,
                                    channel:parseInt(x.target.value)
                                })
                            )
                        }
                    >
                        {range(1,9).map(n => ({name: 'Channel ' + n})).map((x, idx) => (
                            <option key={idx} value={idx + 1}>
                                {x.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <Slider
                label="Effective scale percentage"
                value={Math.round(evoParams.effectiveScalePercentage * 100)}
                setValue={(n) => setEvoParams('effectiveScalePercentage', n / 100)}
                min={0}
                max={100}
                display={(v) => `${v}%`}
            />
            <Slider
                label="Duplication change percentage"
                value={Math.round(evoParams.duplicationChange * 100)}
                setValue={(n) => setEvoParams('duplicationChange',n /100)}
                display={(v) => `${v}%`}
            />
            <Slider
                label="Tone change percentage"
                value={Math.round(evoParams.toneChange * 100)}
                setValue={(n) => setEvoParams('toneChange', n / 100)}
                display={(v) => `${v}%`}
            />
            <Slider
                label="Tone min"
                value={evoParams.toneMin}
                setValue={(n) => setEvoParams('toneMin', n)}
                min={0}
                max={127}
                display={(v) => `${numToNote(v)}`}
            />
            <Slider
                label="Tone max"
                value={evoParams.toneMax}
                setValue={(n) => setEvoParams('toneMax', n)}
                min={0}
                max={127}
                display={(v) => `${numToNote(v)}`}
            />
            <Slider
                label="Position change percentage"
                value={Math.round(evoParams.positionChange * 100)}
                setValue={(n) => setEvoParams('positionChange', n / 100)}
                display={(v) => `${v}%`}
            />
            <Slider
                label="positionChangeSteepness"
                value={evoParams.positionChangeSteepness}
                setValue={(n) => setEvoParams('positionChangeSteepness', n)}
                min={0}
                max={10}
                display={(v) => `n ^ ${v}`}
            />
            <Slider
                label="Stretch at density"
                value={evoParams.stretchChange}
                setValue={(n) => setEvoParams('stretchChange', n)}
                display={(v) => `${v}`}
                min={0.5}
                max={30}
                
            />
            <Slider
                label="Stretch change steepness"
                value={evoParams.stretchChangeSteepness}
                setValue={(n) => setEvoParams('stretchChangeSteepness', n)}
                min={0}
                max={10}
                display={(v) => `n ^ ${v}`}
            />
            <Slider
                label="Duration change percentage"
                value={Math.round(evoParams.durationChange * 100)}
                setValue={(n) => setEvoParams('durationChange', n / 100)}
                display={(v) => `${v}%`}
            />
            <Slider
                label="durationChangeSteepness"
                value={evoParams.durationChangeSteepness}
                setValue={(n) => setEvoParams('durationChangeSteepness', n)}
                min={0}
                max={10}
                display={(v) => `n ^ ${v}`}
            />
            <Slider
                label="Volume change percentage"
                value={Math.round(evoParams.volumeChange * 100)}
                setValue={(n) => setEvoParams('volumeChange', n / 100)}
                display={(v) => `${v}%`}
            />

            <Slider
                label="Delete change"
                value={Math.round(evoParams.deleteChance * 100)}
                setValue={(n) => setEvoParams('deleteChance', n / 100)}
                display={(v) => `${v}%`}
            />
        </div>
    );
};

export default Instrument;
