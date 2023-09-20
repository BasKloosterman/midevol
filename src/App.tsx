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
    const evoParams = useSelector((s: RootState) => s.evoParams);

    const dispatch = useDispatch();

    const melody = useSelector(getMelody);

    useEffect(() => {
        dispatch(
            updateMelody(
                [melody.map((n) => ({ ...n, output: playerConfig.melodyOutput })), false]
            )
        );
    }, [playerConfig.melodyOutput]);

    const evo = () => {
        let newMelody = melody.reduce((acc, curNote, idx) => {
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
            ? newMelody.map((x) => ({
                  ...x,
                  note: scaleQuantize(
                      x.note,
                      evoParams.effectiveScale,
                      evoParams.key
                  )!
              }))
            : newMelody;

        newMelody = newMelody.sort((a, b) => a.position - b.position);
        let latestNote = newMelody[newMelody.length - 1].position;
    
        const noteDensity = newMelody.length / (latestNote / 60)
        if (noteDensity > evoParams.stretchChange) {
            const opschuiven = execWithRamp(
                evoParams.stretchChangeValues,
                evoParams.stretchChangeSteepness
            )
            newMelody = newMelody.map(n  => ({...n, position: 
                quantizePosition(
                    Math.round(n.position + ((n.position / latestNote) * opschuiven)),
                    evoParams.positionChangeValuesAbsolute
                )
            }))
        }

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
                        playerRef.current?.stop();
                        playerRef.current?.play();
                    }}
                >
                    Play!
                </button>
                <button
                    onClick={() => {
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
                <Link  style={{marginRight: 10}} to="/history">History</Link>
            </div>
            <div style={{ margin: '15px 0' }}>
                {melody
                    .map((x) => `${numToNote(x.note)}, ${x.position}`)
                    .join(' | ')}
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    );
};

export default App;

