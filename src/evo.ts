import { Note } from "./note";

export const scales = {
    'natural major': [0,2,4,5,7,9,11,12],
    'ionian': [0,2,4,5,7,9,11,12],
    'major': [0,2,4,5,7,9,11,12],
    'chromatic': [0,1,2,3,4,5,6,7,8,9,10,11,12],
    'spanish 8 tone': [0,1,3,4,5,6,8,10,12],
    'flamenco': [0,1,3,4,5,7,8,10,12],
    'symmetrical': [0,1,3,4,6,7,9,10,12],
    'inverted diminished': [0,1,3,4,6,7,9,10,12],
    'diminished': [0,2,3,5,6,8,9,11,12],
    'whole tone': [0,2,4,6,8,10,12],
    'augmented': [0,3,4,7,8,11,12],
    '3 semitone': [0,3,6,9,12],
    '4 semitone': [0,4,8,12],
    'locrian ultra': [0,1,3,4,6,8,9,12],
    'locrian super': [0,1,3,4,6,8,10,12],
    'indian': [0,1,3,4,7,8,10,12],
    'locrian': [0,1,3,5,6,8,10,12],
    'phrygian': [0,1,3,5,7,8,10,12],
    'neapolitan minor': [0,1,3,5,7,8,11,12],
    'javanese': [0,1,3,5,7,9,10,12],
    'neapolitan major': [0,1,3,5,7,9,11,12],
    'todi': [0,1,3,6,7,8,11,12],
    'persian': [0,1,4,5,6,8,11,12],
    'oriental': [0,1,4,5,6,9,10,12],
    'phrygian major': [0,1,4,5,7,8,10,12],
    'spanish': [0,1,4,5,7,8,10,12],
    'jewish': [0,1,4,5,7,8,10,12],
    'double harmonic': [0,1,4,5,7,8,11,12],
    'gypsy': [0,1,4,5,7,8,11,12],
    'byzantine': [0,1,4,5,7,8,11,12],
    'chahargah': [0,1,4,5,7,8,11,12],
    'marva': [0,1,4,6,7,9,11,12],
    'enigmatic': [0,1,4,6,8,10,11,12],
    'locrian natural': [0,2,3,5,6,8,10,12],
    'natural minor': [0,2,3,5,7,8,10,12],
    'minor': [0,2,3,5,7,8,10,12],
    'melodic minor': [0,2,3,5,7,9,11,12],
    'aeolian': [0,2,3,5,7,8,10,12],
    'algerian 2': [0,2,3,5,7,8,10,12],
    'hungarian minor': [0,2,3,6,7,8,11,12],
    'algerian': [0,2,3,6,7,8,11,12],
    'algerian 1': [0,2,3,6,7,8,11,12],
    'harmonic minor': [0,2,3,5,7,8,11,12],
    'mohammedan': [0,2,3,5,7,8,11,12],
    'dorian': [0,2,3,5,7,9,10,12],
    'hungarian gypsy': [0,2,3,6,7,8,11,12],
    'romanian': [0,2,3,6,7,9,10,12],
    'locrian major': [0,2,4,5,6,8,10,12],
    'arabian': [0,1,4,5,7,8,11,12],
    'hindu': [0,2,4,5,7,8,10,12],
    'ethiopian': [0,2,4,5,7,8,11,12],
    'mixolydian': [0,2,4,5,7,9,10,12],
    'mixolydian augmented': [0,2,4,5,8,9,10,12],
    'harmonic major': [0,2,4,5,8,9,11,12],
    'lydian minor': [0,2,4,6,7,8,10,12],
    'lydian dominant': [0,2,4,6,7,9,10,12],
    'overtone': [0,2,4,6,7,9,10,12],
    'lydian': [0,2,4,6,7,9,11,12],
    'lydian augmented': [0,2,4,6,8,9,10,12],
    'leading whole tone': [0,2,4,6,8,10,11,12],
    'blues': [0,3,5,6,7,10,12],
    'hungarian major': [0,3,4,6,7,9,10,12],
    'pb': [0,1,3,6,8,12],
    'balinese': [0,1,3,7,8,12],
    'pe': [0,1,3,7,8,12],
    'pelog': [0,1,3,7,10,12],
    'iwato': [0,1,5,6,10,12],
    'japanese': [0,1,5,7,8,12],
    'kumoi': [0,1,5,7,8,12],
    'hirajoshi': [0,2,3,7,8,12],
    'pa': [0,2,3,7,8,12],
    'pd': [0,2,3,7,9,12],
    'pentatonic major': [0,2,4,7,9,12],
    'chinese': [0,2,4,7,9,12],
    'chinese 1': [0,2,4,7,9,12],
    'mongolian': [0,2,4,7,9,12],
    'pfcg': [0,2,4,7,9,12],
    'egyptian': [0,2,3,6,7,8,11,12],
    'pentatonic minor': [0,3,5,7,10,12],
    'chinese 2': [0,4,6,7,11,12],
    'altered': [0,1,3,4,6,8,10,12],
    'bebop dominant': [0,2,4,5,7,9,10,11,12],
    'bebop dominant flatnine': [0,1,4,5,7,9,10,11,12],
    'bebop major': [0,2,4,5,7,8,9,11,12],
    'bebop minor': [0,2,3,5,7,8,9,10,12],
    'bebop tonic minor': [0,2,3,5,7,8,9,11,12]};

    const scaleQuantize = (note: number, scale: number[]) => {
        let found = false
        let target = note % 12
        let idx = scale.indexOf(target)

        if (idx != -1) {
            return note
        }

        idx = 0

        while (!found) {
            const cur = scale[idx]
        
            if (cur === undefined) {
                return note
            }
            if (cur > target) {
                const last = scale[idx-1]
                const diffA = Math.abs(last-target)
                const diffB = Math.abs(cur-target)
                if (diffA === diffB) {
                
                    return note + (Math.random() > 0.5 ? diffA * -1 : diffB)
                }

            
                return note + (diffA < diffB ? diffA * -1 : diffB)
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
        console.log(acc)
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
            clamp(n.note, [evoParams.toneMin, evoParams.toneMax]), scales[evoParams.scale]
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

    if (n.position >= 0 && Math.random() < (1-evoParams.deleteChance)) {
        ret.push(n)
    }

    if (passDiceRoll(evoParams.duplicationChange)) {
        ret.push({...note})
    }

    return ret
}