import {WebMidi} from 'webmidi'
import { Clock } from "./clock";
import { Note, NoteType, frames } from './note';

export class Player {
    pos: number;
    playing: boolean;
    melody: Note[];
    destroy: () => void;
    beforeLoop: () => void;
    webMidi: typeof WebMidi;
    clock: typeof Clock;
    loop?: number;
    _metronome: boolean;

    constructor(melody: Note[], clock: typeof Clock, webMidi: typeof WebMidi, beforeLoop = () => {}) {
        this.pos = 0;
        this.playing = false;
        this.melody = melody;
        this.webMidi = webMidi;
        this.clock = clock;
        this.destroy = clock.subscribe(this.processTick.bind(this))
        this.beforeLoop = beforeLoop
        this._metronome = false;
    }

    play() {
        this.playing = true
    }

    stop() {
        this.playing = false
        this.pos = 0
    }

    setMelody(melody: Note[]) {
        this.melody = melody
    }

    metronome(state: boolean) {
        this._metronome = true
    }

    processTick() {
        if (this.playing) {

            let maxTicks = Math.max(...this.melody.map(x => x.position))
            if (this.pos > maxTicks && !this.loop) {
                this.stop()
                return
            }

            // Detect start new loop
            if (this.loop && this.pos / frames === this.loop) {
                this.pos = 0
                this.beforeLoop()
                return
            }

            if (this._metronome) {
                if (this.pos === 0) {
                    this.webMidi.outputs[3].channels[1].playNote('A#5', {
                        duration: 200,
                        attack: 1
                    });
                }
                if (this.pos % (NoteType.quarter * frames) === 0) {
                    this.webMidi.outputs[3].channels[1].playNote('C3', {
                        duration: 200,
                        attack: 1
                    });
                }
            }

            this.melody.forEach(note => {
                if (note.position == this.pos) {
                    //play note

                    let output = this.webMidi.outputs[note.output];
                    let channel = output.channels[note.channel];
                    
                    channel.playNote(note.note, {duration: this.clock.noteDuration(note.length), attack: note.volume || 1});
                }
            })
            
            this.pos++
        }
    }
}