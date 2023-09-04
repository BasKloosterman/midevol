export const frames = 3*4*5

export enum NoteType {
    whole = 4,
    half = 2,
    quarter = 1,
    eight = 1/2,
    sixteenth = 1/4,
    thirtysecond = 1/8,
}

export  interface Note {
    position: number,
    note: number,
    length: NoteType,
    output: number,
    channel: number,
    volume?: number
}

export const calcPos = function (beatsPerMeasure: number, measure: number, count: number, noteType: NoteType, noteTypePos: number = 1, beat: number = 1) {
    const measureTotal = (frames * beatsPerMeasure * beat * (measure - 1))
    const countTotal = (frames * beat * (count -1))
    const noteTypeTotal = noteType * (noteTypePos - 1) * frames

    return measureTotal + countTotal + noteTypeTotal
} 