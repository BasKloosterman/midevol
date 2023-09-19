import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Note, NoteType, frames } from "../lib/note";
import { WebMidi } from "webmidi";
import { Clock } from "../lib/clock";
import Emitter, { events } from "../lib/eventemitter";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { PlayerConfigState } from "../store/reducers/playerConfig";
import { getMelody } from "../store/reducers/melody";

export interface PlayerProps {
    beforeLoop: () => void;
}

export interface PlayerRef {
    play: () => void
    stop: () => void
    pauze: () => void
    outputs: typeof WebMidi.outputs,
}

const Player = forwardRef<PlayerRef, PlayerProps>((props, ref) => {
    const playerConfig = useSelector((s: RootState) => s.playerConfig)
    const melody = useSelector(getMelody)
    const propsref = useRef<PlayerProps>(props)
    const melodyref = useRef<Note[]>(melody)
    const playerConfigRef = useRef<PlayerConfigState>(playerConfig)
    
    const pos = useRef<number>(0)
    const playing = useRef<boolean>(false)
    const webMidi = useRef<typeof WebMidi>(WebMidi)
    const clock = useRef<typeof Clock>(Clock)
    const ready = useRef(false)

    useEffect(() => {
        clock.current.setBPM(playerConfig.bpm)
    },[playerConfig.bpm])

    useEffect(() => {
        playerConfigRef.current = playerConfig
    }, [playerConfig])

    useEffect(() => {
        propsref.current = props
    }, [props])

    useEffect(() => {
        melodyref.current = melody
    }, [melody])

    useImperativeHandle(ref, () => ({
        play: () => {
            playing.current = true
        },
        stop: () => {
            pos.current = 0
            playing.current = false
        },
        pauze: () => {
            playing.current = false
        },
        outputs: webMidi.current.outputs
    }), [ready.current]);

    const processTick = () => {
        const {beforeLoop} = propsref.current
        const {metronome, loopRange, loop, drumsOutput} = playerConfigRef.current
        const melody = melodyref.current
        if (!ready.current) {
            return
        }
        if (playing.current) {
            const m = []
            let maxTicks = 0
            for (let idx = 0; idx < melody.length; idx++) {
                const element = melody[idx];
                if (element.position < pos.current) {
                    continue
                }

                if (element.position > maxTicks) {
                    maxTicks = element.position
                }

                m.push(element)
                
            }
            
            if (pos.current > maxTicks && !loop) {
                stop()
                return
            }

            // Detect start new loop
            if (loop && pos.current / frames === loopRange) {
                pos.current = 0
                beforeLoop()
                return
            }


            if (metronome) {
                if (pos.current === 0) {
                    webMidi.current.outputs[drumsOutput].channels[1].playNote('A#5', {
                        duration: 200,
                        attack: 1
                    });
                }
                if (pos.current % (NoteType.quarter * frames) === 0) {
                    webMidi.current.outputs[drumsOutput].channels[1].playNote('C3', {
                        duration: 200,
                        attack: 1
                    });
                }
            }

            m.forEach(note => {
                if (note.position == pos.current) {
                    //play note

                    let output = webMidi.current.outputs[note.output];
                    let channel = output.channels[note.channel];

                    // console.log('output', output)
                    
                    channel.playNote(note.note, {duration: clock.current.noteDuration(note.length), attack: note.volume || 1});
                }
            })


            
            
            pos.current++
        }
    }

    useEffect(() => {
        (
            async () => {
                await WebMidi.enable()
                ready.current = true
                Emitter.trigger(events.eventChannelsChanged)
                
            }
        )()
        
        return clock.current.subscribe(processTick)
    }, [])

    return null
})

export default Player