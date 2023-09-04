import { Note } from "./note";

export const scales = {
    'natural major': [0,2,4,5,7,9,11],
    'ionian': [0,2,4,5,7,9,11],
    'major': [0,2,4,5,7,9,11],
    'chromatic': [0,1,2,3,4,5,6,7,8,9,10,11],
    'spanish 8 tone': [0,1,3,4,5,6,8,10],
    'flamenco': [0,1,3,4,5,7,8,10],
    'symmetrical': [0,1,3,4,6,7,9,10],
    'inverted diminished': [0,1,3,4,6,7,9,10],
    'diminished': [0,2,3,5,6,8,9,11],
    'whole tone': [0,2,4,6,8,10],
    'augmented': [0,3,4,7,8,11],
    '3 semitone': [0,3,6,9],
    '4 semitone': [0,4,8],
    'locrian ultra': [0,1,3,4,6,8,9],
    'locrian super': [0,1,3,4,6,8,10],
    'indian': [0,1,3,4,7,8,10],
    'locrian': [0,1,3,5,6,8,10],
    'phrygian': [0,1,3,5,7,8,10],
    'neapolitan minor': [0,1,3,5,7,8,11],
    'javanese': [0,1,3,5,7,9,10],
    'neapolitan major': [0,1,3,5,7,9,11],
    'todi': [0,1,3,6,7,8,11],
    'persian': [0,1,4,5,6,8,11],
    'oriental': [0,1,4,5,6,9,10],
    'phrygian major': [0,1,4,5,7,8,10],
    'spanish': [0,1,4,5,7,8,10],
    'jewish': [0,1,4,5,7,8,10],
    'double harmonic': [0,1,4,5,7,8,11],
    'gypsy': [0,1,4,5,7,8,11],
    'byzantine': [0,1,4,5,7,8,11],
    'chahargah': [0,1,4,5,7,8,11],
    'marva': [0,1,4,6,7,9,11],
    'enigmatic': [0,1,4,6,8,10,11],
    'locrian natural': [0,2,3,5,6,8,10],
    'natural minor': [0,2,3,5,7,8,10],
    'minor': [0,2,3,5,7,8,10],
    'melodic minor': [0,2,3,5,7,9,11],
    'aeolian': [0,2,3,5,7,8,10],
    'algerian 2': [0,2,3,5,7,8,10],
    'hungarian minor': [0,2,3,6,7,8,11],
    'algerian': [0,2,3,6,7,8,11],
    'algerian 1': [0,2,3,6,7,8,11],
    'harmonic minor': [0,2,3,5,7,8,11],
    'mohammedan': [0,2,3,5,7,8,11],
    'dorian': [0,2,3,5,7,9,10],
    'hungarian gypsy': [0,2,3,6,7,8,11],
    'romanian': [0,2,3,6,7,9,10],
    'locrian major': [0,2,4,5,6,8,10],
    'arabian': [0,1,4,5,7,8,11],
    'hindu': [0,2,4,5,7,8,10],
    'ethiopian': [0,2,4,5,7,8,11],
    'mixolydian': [0,2,4,5,7,9,10],
    'mixolydian augmented': [0,2,4,5,8,9,10],
    'harmonic major': [0,2,4,5,8,9,11],
    'lydian minor': [0,2,4,6,7,8,10],
    'lydian dominant': [0,2,4,6,7,9,10],
    'overtone': [0,2,4,6,7,9,10],
    'lydian': [0,2,4,6,7,9,11],
    'lydian augmented': [0,2,4,6,8,9,10],
    'leading whole tone': [0,2,4,6,8,10,11],
    'blues': [0,3,5,6,7,10],
    'hungarian major': [0,3,4,6,7,9,10],
    'pb': [0,1,3,6,8],
    'balinese': [0,1,3,7,8],
    'pe': [0,1,3,7,8],
    'pelog': [0,1,3,7,10],
    'iwato': [0,1,5,6,10],
    'japanese': [0,1,5,7,8],
    'kumoi': [0,1,5,7,8],
    'hirajoshi': [0,2,3,7,8],
    'pa': [0,2,3,7,8],
    'pd': [0,2,3,7,9],
    'pentatonic major': [0,2,4,7,9],
    'chinese': [0,2,4,7,9],
    'chinese 1': [0,2,4,7,9],
    'mongolian': [0,2,4,7,9],
    'pfcg': [0,2,4,7,9],
    'egyptian': [0,2,3,6,7,8,11],
    'pentatonic minor': [0,3,5,7,10],
    'chinese 2': [0,4,6,7,11],
    'altered': [0,1,3,4,6,8,10],
    'bebop dominant': [0,2,4,5,7,9,10,11],
    'bebop dominant flatnine': [0,1,4,5,7,9,10,11],
    'bebop major': [0,2,4,5,7,8,9,11],
    'bebop minor': [0,2,3,5,7,8,9,10],
    'bebop tonic minor': [0,2,3,5,7,8,9,11]};


    export const numToNote = (n: number) => {
        const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
        return `${notes[n % 12]}${Math.floor(n / 12) - 1}`
    }

    export const scaleQuantize = (note: number, scale: number[], key: number) => {
        let found = false
        let target = note % 12
        // console.log('org', key, scale.map(n => [n, numToNote(n)]))
        scale = scale.map(n => (n + key) % 12)
        // console.log('org mod', key, scale.map(n => [n, numToNote(n)]))
        scale = scale.sort((a,b) => a-b)
        scale.push(scale[scale.length-1]+12)
        // console.log('org mod sort', key, scale.map(n => [n, numToNote(n)]))
        let idx = scale.indexOf(target)

        if (idx != -1) {
            return note
        }

        idx = 0

        while (!found) {
            const cur = scale[idx]
        
            if (idx > scale.length) {
                console.log(`${note}, ${numToNote(note)} => ${cur}, ${numToNote(cur)} => ${note}, ${numToNote(note)}`)
                return note
            }
            if (cur > target) {
                const last = scale[idx-1]
                const diffA = Math.abs(last-target)
                const diffB = Math.abs(cur-target)
                if (diffA === diffB) {
                    const ret = note + (Math.random() > 0.5 ? diffA * -1 : diffB)
                    console.log(`${note}, ${numToNote(note)} => ${ret}, ${numToNote(ret)}`)
                    return ret
                }

            
                const ret = note + (diffA < diffB ? diffA * -1 : diffB)
                console.log(`${note}, ${numToNote(note)} => ${ret}, ${numToNote(ret)}`)
                return ret
            }

            if (cur == target) {
                console.log('same', cur, target, note)
                return note
            }
            idx++
        }
    }

type Range = [number, number]
type Ramp = number[]

export interface EvoParams {
    duplicationChange: number;
    toneChange: number;
    toneChangeSteepness: number;
    toneChangeValuesAbsolute: number[];
    toneMin: number;
    toneMax: number;
    positionChange: number;
    positionChangeSteepness: number;
    positionChangeValuesAbsolute: number[];
    durationChange: number;
    durationChangeSteepness: number;
    durationChangeValuesAbsolute: number[];
    durationMin: number;
    durationMax: number;
    deleteChance: number;
    stretchChange: number;
    stretchChangeSteepness: number;
    stretchChangeValues: number[];
    scale: keyof typeof scales;
    volumeChange: number;
    key: number;
}

function passDiceRoll(percentage: number): boolean {
    return Math.random() < percentage
}

function randMinMax(params : Range) {
    const min = params[0]
    const max = params[1]
    const diff = max - min
    return Math.round(
        (Math.random() * diff) + min
    )
}

function randInvert(n: number) : number {
   return  Math.random() < 0.5 ? n : n * -1
}

function execRamp(values: number[], ramp: Ramp) : number {
    const diceRoll = Math.random()
    let acc = 0
    for (let idx = 0; idx < ramp.length; idx++) {
        const element = ramp[idx];
        acc += element
        if (diceRoll < acc) {
            return values[idx]
        }
    }

    return 0
}

export const range = (n: number, min = 1) => {
    let ret = []

    for (let idx = 1; idx < min+n; idx++) {
        ret.push(idx)
    }

    return ret
}

const calcRamp = (values: number[], steepness: number) => {
    const x = values.map((_, idx) => Math.pow(idx + 1, steepness)).reverse()
    const c = 1 / x.reduce((a,c) => a + c)

    return x.map(y => y * c)
}

const execWithRamp = (values: number[], steepness: number) => {
    return execRamp(values, calcRamp(values, steepness))
}

function clamp(n : number, [min, max]: Range) {
    return Math.max(Math.min(n, max), min)
} 

export function evoNote(note: Note, evoParams: EvoParams) : Note[] {
    const ret = []

    const n : Note = {...note}

    if (passDiceRoll(evoParams.toneChange)) {
        n.note += randInvert(execWithRamp(evoParams.toneChangeValuesAbsolute, evoParams.toneChangeSteepness))
        n.note = scaleQuantize(
            clamp(n.note, [evoParams.toneMin, evoParams.toneMax]), scales[evoParams.scale],
            evoParams.key
        )!
    }

    if (passDiceRoll(evoParams.durationChange)) {
        n.length += randInvert(execWithRamp(evoParams.durationChangeValuesAbsolute, evoParams.durationChangeSteepness))
        n.length = clamp(n.length, [evoParams.durationMin, evoParams.durationMax])
    }

    if (passDiceRoll(evoParams.positionChange)) {
        n.position += randInvert(execWithRamp(evoParams.positionChangeValuesAbsolute, evoParams.positionChangeSteepness))
    }

    if (passDiceRoll(evoParams.stretchChange)) {
        n.position += randInvert(execWithRamp(evoParams.stretchChangeValues, evoParams.stretchChangeSteepness))
    }

    if (passDiceRoll(evoParams.volumeChange)) {
        n.volume = (n.volume || 1) + randInvert(Math.random() * 0.3)
        n.volume = clamp(n.volume, [0.1, 1])
    }

    if (n.position >= 0 && Math.random() < (1-evoParams.deleteChance)) {
        ret.push(n)
    }

    if (passDiceRoll(evoParams.duplicationChange)) {
        ret.push({...note})
    }

    return ret
}