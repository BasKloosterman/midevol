import { FC, useEffect, useRef } from 'react';
import { Note, NoteType, frames, numToNote, scales } from './lib/note';
import { evoNote, execWithRamp, passDiceRoll, quantizePosition, scaleQuantize } from './lib/evo';
import Player, { PlayerRef } from './components/Player';
import { Link, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import { updateSettings } from './store/reducers/playerConfig';
import { getMelody, updateMelody } from './store/reducers/melody';

const App: FC = () => {
    const playerConfig = useSelector((s: RootState) => s.playerConfig);
    const playerRef = useRef<PlayerRef>(null);
    const allEvoParams = useSelector((s: RootState) => s.evoParams);

    const dispatch = useDispatch();

    const melody = useSelector(getMelody);
    
    const evo = () => {
        let newMelody = melody.reduce((acc, curNote, idx) => {
            const evoParams = allEvoParams[curNote.instrument]
            return [
                ...acc,
                ...evoNote(
                    curNote,
                    melody.length < 2 || (idx > 0 && acc.length < 2),
                    evoParams
                )
            ];
        }, [] as Note[]);

        newMelody = playerConfig.instantantQuantizeScale
            ? newMelody.map((x) => {
                const evoParams = allEvoParams[x.instrument]
                return {
                    ...x,
                    note: scaleQuantize(
                        x.note,
                        evoParams.effectiveScale,
                        evoParams.key
                    )!
                }
            })
            : newMelody;

        newMelody = newMelody.sort((a, b) => a.position - b.position);
        let latestNote = newMelody[newMelody.length - 1].position;
    
        const noteDensity = newMelody.length / (latestNote / 60)
        Object.keys(allEvoParams).forEach((id) => {
            const evoParams = allEvoParams[parseInt(id)]

            if (noteDensity > evoParams.stretchChange) {
                const opschuiven = execWithRamp(
                    evoParams.stretchChangeValues,
                    evoParams.stretchChangeSteepness
                )
                newMelody = newMelody.map(n  => {
                    if (n.instrument == parseInt(id)) {
                        return {...n, position: 
                            quantizePosition(
                                Math.round(n.position + ((n.position / latestNote) * opschuiven)),
                                evoParams.positionChangeValuesAbsolute
                            )
                        }
                    }

                    return n
                })
            }
        })

        latestNote = newMelody[newMelody.length - 1].position;
        let loopRange_ = Math.ceil(latestNote / (NoteType.quarter * frames));
        if (latestNote % (NoteType.quarter * frames) === 0) {
            loopRange_ += 1;
        }

        dispatch(updateSettings({ key: 'loopRange', value: loopRange_ }));
        dispatch(updateMelody([newMelody, true]));
    };

    return (
        <div>
            <div>
                <Player ref={playerRef} beforeLoop={evo} />
                <button
                    onClick={() => {
                        dispatch(updateSettings({ key: 'loop', value: false }));
                        playerRef.current?.stop();
                        playerRef.current?.play();
                    }}
                >
                    Play!
                </button>
                <button
                    onClick={() => {
                        dispatch(updateSettings({ key: 'loop', value: true }));
                        playerRef.current?.stop();
                        playerRef.current?.play();
                    }}
                >
                    Loop!
                </button>
                <button style={{marginRight: 10}} 
                    onClick={() => {
                        playerRef.current?.stop();
                    }}
                >
                    Stop!
                </button>
                <Link  style={{marginRight: 10}} to="/">Config</Link>
                <Link  style={{marginRight: 10}} to="/instruments">Instruments</Link>
                <Link  style={{marginRight: 10}} to="/history">History</Link>
            </div>
            <div style={{ margin: '15px 0' }}>
                {melody
                    .map((x) => `${numToNote(x.note)}, ${x.position} ${x.output}`)
                    .join(' | ')}
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    );
};

export default App;

