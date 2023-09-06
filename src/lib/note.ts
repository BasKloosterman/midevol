export const frames = 3 * 4 * 5;

export enum NoteType {
    whole = 4,
    half = 2,
    quarter = 1,
    eight = 1 / 2,
    sixteenth = 1 / 4,
    thirtysecond = 1 / 8
}

export interface Note {
    position: number;
    note: number;
    length: NoteType;
    output: number;
    channel: number;
    volume?: number;
}

export const calcPos = function (
    beatsPerMeasure: number,
    measure: number,
    count: number,
    noteType: NoteType,
    noteTypePos: number = 1,
    beat: number = 1
) {
    const measureTotal = frames * beatsPerMeasure * beat * (measure - 1);
    const countTotal = frames * beat * (count - 1);
    const noteTypeTotal = noteType * (noteTypePos - 1) * frames;

    return measureTotal + countTotal + noteTypeTotal;
};

export const scales = {
    'natural major': [0, 2, 4, 5, 7, 9, 11],
    ionian: [0, 2, 4, 5, 7, 9, 11],
    major: [0, 2, 4, 5, 7, 9, 11],
    chromatic: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    'spanish 8 tone': [0, 1, 3, 4, 5, 6, 8, 10],
    flamenco: [0, 1, 3, 4, 5, 7, 8, 10],
    symmetrical: [0, 1, 3, 4, 6, 7, 9, 10],
    'inverted diminished': [0, 1, 3, 4, 6, 7, 9, 10],
    diminished: [0, 2, 3, 5, 6, 8, 9, 11],
    'whole tone': [0, 2, 4, 6, 8, 10],
    augmented: [0, 3, 4, 7, 8, 11],
    '3 semitone': [0, 3, 6, 9],
    '4 semitone': [0, 4, 8],
    'locrian ultra': [0, 1, 3, 4, 6, 8, 9],
    'locrian super': [0, 1, 3, 4, 6, 8, 10],
    indian: [0, 1, 3, 4, 7, 8, 10],
    locrian: [0, 1, 3, 5, 6, 8, 10],
    phrygian: [0, 1, 3, 5, 7, 8, 10],
    'neapolitan minor': [0, 1, 3, 5, 7, 8, 11],
    javanese: [0, 1, 3, 5, 7, 9, 10],
    'neapolitan major': [0, 1, 3, 5, 7, 9, 11],
    todi: [0, 1, 3, 6, 7, 8, 11],
    persian: [0, 1, 4, 5, 6, 8, 11],
    oriental: [0, 1, 4, 5, 6, 9, 10],
    'phrygian major': [0, 1, 4, 5, 7, 8, 10],
    spanish: [0, 1, 4, 5, 7, 8, 10],
    jewish: [0, 1, 4, 5, 7, 8, 10],
    'double harmonic': [0, 1, 4, 5, 7, 8, 11],
    gypsy: [0, 1, 4, 5, 7, 8, 11],
    byzantine: [0, 1, 4, 5, 7, 8, 11],
    chahargah: [0, 1, 4, 5, 7, 8, 11],
    marva: [0, 1, 4, 6, 7, 9, 11],
    enigmatic: [0, 1, 4, 6, 8, 10, 11],
    'locrian natural': [0, 2, 3, 5, 6, 8, 10],
    'natural minor': [0, 2, 3, 5, 7, 8, 10],
    minor: [0, 2, 3, 5, 7, 8, 10],
    'melodic minor': [0, 2, 3, 5, 7, 9, 11],
    aeolian: [0, 2, 3, 5, 7, 8, 10],
    'algerian 2': [0, 2, 3, 5, 7, 8, 10],
    'hungarian minor': [0, 2, 3, 6, 7, 8, 11],
    algerian: [0, 2, 3, 6, 7, 8, 11],
    'algerian 1': [0, 2, 3, 6, 7, 8, 11],
    'harmonic minor': [0, 2, 3, 5, 7, 8, 11],
    mohammedan: [0, 2, 3, 5, 7, 8, 11],
    dorian: [0, 2, 3, 5, 7, 9, 10],
    'hungarian gypsy': [0, 2, 3, 6, 7, 8, 11],
    romanian: [0, 2, 3, 6, 7, 9, 10],
    'locrian major': [0, 2, 4, 5, 6, 8, 10],
    arabian: [0, 1, 4, 5, 7, 8, 11],
    hindu: [0, 2, 4, 5, 7, 8, 10],
    ethiopian: [0, 2, 4, 5, 7, 8, 11],
    mixolydian: [0, 2, 4, 5, 7, 9, 10],
    'mixolydian augmented': [0, 2, 4, 5, 8, 9, 10],
    'harmonic major': [0, 2, 4, 5, 8, 9, 11],
    'lydian minor': [0, 2, 4, 6, 7, 8, 10],
    'lydian dominant': [0, 2, 4, 6, 7, 9, 10],
    overtone: [0, 2, 4, 6, 7, 9, 10],
    lydian: [0, 2, 4, 6, 7, 9, 11],
    'lydian augmented': [0, 2, 4, 6, 8, 9, 10],
    'leading whole tone': [0, 2, 4, 6, 8, 10, 11],
    blues: [0, 3, 5, 6, 7, 10],
    'hungarian major': [0, 3, 4, 6, 7, 9, 10],
    pb: [0, 1, 3, 6, 8],
    balinese: [0, 1, 3, 7, 8],
    pe: [0, 1, 3, 7, 8],
    pelog: [0, 1, 3, 7, 10],
    iwato: [0, 1, 5, 6, 10],
    japanese: [0, 1, 5, 7, 8],
    kumoi: [0, 1, 5, 7, 8],
    hirajoshi: [0, 2, 3, 7, 8],
    pa: [0, 2, 3, 7, 8],
    pd: [0, 2, 3, 7, 9],
    'pentatonic major': [0, 2, 4, 7, 9],
    chinese: [0, 2, 4, 7, 9],
    'chinese 1': [0, 2, 4, 7, 9],
    mongolian: [0, 2, 4, 7, 9],
    pfcg: [0, 2, 4, 7, 9],
    egyptian: [0, 2, 3, 6, 7, 8, 11],
    'pentatonic minor': [0, 3, 5, 7, 10],
    'chinese 2': [0, 4, 6, 7, 11],
    altered: [0, 1, 3, 4, 6, 8, 10],
    'bebop dominant': [0, 2, 4, 5, 7, 9, 10, 11],
    'bebop dominant flatnine': [0, 1, 4, 5, 7, 9, 10, 11],
    'bebop major': [0, 2, 4, 5, 7, 8, 9, 11],
    'bebop minor': [0, 2, 3, 5, 7, 8, 9, 10],
    'bebop tonic minor': [0, 2, 3, 5, 7, 8, 9, 11]
};

export const numToNote = (n: number) => {
    const notes = [
        'C',
        'C#',
        'D',
        'D#',
        'E',
        'F',
        'F#',
        'G',
        'G#',
        'A',
        'A#',
        'B'
    ];
    return `${notes[n % 12]}${Math.floor(n / 12) - 1}`;
};
