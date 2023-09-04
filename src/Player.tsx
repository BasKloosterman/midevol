import { FC, forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Note, NoteType, frames } from "./note";
import { WebMidi } from "webmidi";
import { Clock } from "./clock";

export interface PlayerProps {
    melody: Note[]
    metronome: boolean
    bpm: number
    loopRange: number
    loop: boolean,
    beforeLoop: () => void,
    outputsChanged: () => void
}

export interface PlayerRef {
    play: () => void
    stop: () => void
    pauze: () => void
    outputs: typeof WebMidi.outputs,
}

const Player = forwardRef<PlayerRef, PlayerProps>((props, ref) => {
    const {outputsChanged} = props
    const propsref = useRef<PlayerProps>(props)
    const pos = useRef<number>(0)
    const playing = useRef<boolean>(false)
    const webMidi = useRef<typeof WebMidi>(WebMidi)
    const clock = useRef<typeof Clock>(Clock)
    const ready = useRef(false)

    useEffect(() => {
        propsref.current = props
    }, [props])

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
        const {melody, metronome, loopRange, loop, beforeLoop} = propsref.current
        if (!ready.current) {
            return
        }
        if (playing.current) {

            let maxTicks = Math.max(...melody.map(x => x.position))
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
                    webMidi.current.outputs[3].channels[1].playNote('A#5', {
                        duration: 200,
                        attack: 1
                    });
                }
                if (pos.current % (NoteType.quarter * frames) === 0) {
                    webMidi.current.outputs[3].channels[1].playNote('C3', {
                        duration: 200,
                        attack: 1
                    });
                }
            }

            melody.forEach(note => {
                if (note.position == pos.current) {
                    //play note

                    let output = webMidi.current.outputs[note.output];
                    let channel = output.channels[note.channel];
                    
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
                console.log('enabled')
                ready.current = true
                outputsChanged()
            }
        )()
        clock.current.subscribe(processTick)
    }, [])

    return null
})

export default Player