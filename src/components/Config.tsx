import { FC, useEffect, useState } from 'react';
import Slider from './Slider';
import { EvoParams } from '../lib/evo';
import { WebMidi } from 'webmidi';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { PlayerConfigState, updateSettings } from '../store/reducers/playerConfig';
import { qAll, qSmall, updateEvoParams } from '../store/reducers/evoParams';
import Emitter, { events } from '../lib/eventemitter';
import { numToNote, scales } from '../lib/note';

const Config: FC = () => {
    const playerConfig = useSelector((s :RootState) => s.playerConfig)
    const [outputs, setOutputs] = useState(WebMidi.outputs)
    const dispatch = useDispatch()

    function setPlayerConfig<K extends keyof PlayerConfigState> (key: K, value: PlayerConfigState[K]) {
        dispatch(updateSettings({key, value}))
    }

    useEffect(()=>{
        return Emitter.subscribe(events.eventChannelsChanged, () => {
            setOutputs([...WebMidi.outputs])
        })
    }, [])

    return (
        <div>
            <div style={{ display: 'flex',margin: '15px 0' }}>
                <div className="c-settings-item">
                    <label style={{ display: 'block' }}>
                        metronome{' '}
                        <input
                            type="checkbox"
                            checked={playerConfig.metronome}
                            onChange={(e) =>
                                setPlayerConfig('metronome', e.target.checked)
                            }
                        />
                    </label>
                </div>
                <div className="c-settings-item">
                    <label style={{ display: 'block' }}>
                        instantantQuantizeScale{' '}
                        <input
                            type="checkbox"
                            checked={playerConfig.instantantQuantizeScale}
                            onChange={(e) =>
                                setPlayerConfig('instantantQuantizeScale', e.target.checked)
                            }
                        />
                    </label>
                </div>
               
                <div className="c-settings-item">
                    <label htmlFor="">Metronome output</label>
                    <select
                        name=""
                        value={playerConfig.drumsOutput}
                        id=""
                        onChange={(x) =>
                            setPlayerConfig('drumsOutput', parseInt(x.target.value))
                        }
                    >
                        {outputs.map((x, idx) => (
                            <option key={idx} value={idx}>
                                {x.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <Slider
                label="BPM"
                value={playerConfig.bpm}
                setValue={(n) => setPlayerConfig('bpm', n)}
                display={(v) => `${v}bpm`}
                min={30}
                max={240}
            />
        </div>
    );
};

export default Config;
