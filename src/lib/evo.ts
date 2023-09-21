import { Note, numToNote, scales } from './note';

export const genEffectiveScale = ({scale: scaleKey, effectiveScalePercentage}: EvoParams) => {
    let effectiveScale = [];
      
    let scale = [...scales[scaleKey]];
    const noteCount = Math.max(1, Math.round(scale.length * effectiveScalePercentage))
    
    let idx = 0;
  
    while (effectiveScale.length < noteCount) {
      
  
      if (passDiceRoll(0.01)) {
        effectiveScale.push(scale[idx])
        scale = scale.filter((_, i) => i != idx)
      }
      idx++
      if (scale.length <= idx) {
        idx = 0
      }
    }
  
    effectiveScale = effectiveScale.sort()
    console.log('effectiveScale', effectiveScale)
    return effectiveScale
  }

export const scaleQuantize = (note: number, scale: number[], key: number) => {
    let found = false;
    let target = note % 12;
    // console.log('org', key, scale.map(n => [n, numToNote(n)]))
    scale = scale.map((n) => (n + key) % 12);
    // console.log('org mod', key, scale.map(n => [n, numToNote(n)]))
    scale = scale.sort((a, b) => a - b);
    scale.push(scale[scale.length - 1] + 12);
    // console.log('org mod sort', key, scale.map(n => [n, numToNote(n)]))
    let idx = scale.indexOf(target);

    if (idx != -1) {
        return note;
    }

    idx = 0;

    while (!found) {
        const cur = scale[idx];

        if (idx > scale.length) {
            // console.log(
            //     `${note}, ${numToNote(note)} => ${cur}, ${numToNote(
            //         cur
            //     )} => ${note}, ${numToNote(note)}`
            // );
            return note;
        }
        if (cur > target) {
            const last = scale[idx - 1];
            const diffA = Math.abs(last - target);
            const diffB = Math.abs(cur - target);
            if (diffA === diffB) {
                const ret = note + (Math.random() > 0.5 ? diffA * -1 : diffB);
                // console.log(
                //     `${note}, ${numToNote(note)} => ${ret}, ${numToNote(ret)}`
                // );
                return ret;
            }

            const ret = note + (diffA < diffB ? diffA * -1 : diffB);
            // console.log(
            //     `${note}, ${numToNote(note)} => ${ret}, ${numToNote(ret)}`
            // );
            return ret;
        }

        if (cur == target) {
            console.log('same', cur, target, note);
            return note;
        }
        idx++;
    }
};

type Range = [number, number];
type Ramp = number[];

export const quantizePosition = (position: number, notes: number[]) : number => {
    const minDiff = notes.reduce((min, cur) => {
        // 75; [80, 65]
        const diffA = (position % cur) * -1 // -75, -10
        const diffB = cur - (position % cur) // 5, 55

        const diff = Math.abs(diffA) < Math.abs(diffB) ? diffA : diffB

        if (Math.abs(diff) < Math.abs(min)) {
            return diff
        }

        return min
    }, 9999)

    return position + minDiff
}

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
    effectiveScale: number[];
    effectiveScalePercentage: number;
    effectiveScaleChange: number;
    volumeChange: number;
    key: number;
}

export function passDiceRoll(percentage: number): boolean {
    return Math.random() < percentage;
}

function randMinMax(params: Range) {
    const min = params[0];
    const max = params[1];
    const diff = max - min;
    return Math.round(Math.random() * diff + min);
}

function randInvert(n: number): number {
    return Math.random() < 0.5 ? n : n * -1;
}

export function execRamp(values: number[], ramp: Ramp): number {
    const diceRoll = Math.random();
    let acc = 0;
    for (let idx = 0; idx < ramp.length; idx++) {
        const element = ramp[idx];
        acc += element;
        if (diceRoll < acc) {
            return values[idx];
        }
    }

    return 0;
}

export const range = (n: number, min = 1) => {
    let ret = [];

    for (let idx = 1; idx < min + n; idx++) {
        ret.push(idx);
    }

    return ret;
};

const calcRamp = (values: number[], steepness: number) => {
    const x = values.map((_, idx) => Math.pow(idx + 1, steepness)).reverse();
    const c = 1 / x.reduce((a, c) => a + c);

    return x.map((y) => y * c);
};

export const execWithRamp = (values: number[], steepness: number) => {
    return execRamp(values, calcRamp(values, steepness));
};

function clamp(n: number, [min, max]: Range) {
    return Math.max(Math.min(n, max), min);
}

export function evoNote(
    note: Note,
    isLast: boolean,
    evoParams: EvoParams
): Note[] {
    const ret = [];

    const n: Note = { ...note };

    if (passDiceRoll(evoParams.toneChange)) {
        n.note += randInvert(
            execWithRamp(
                evoParams.toneChangeValuesAbsolute,
                evoParams.toneChangeSteepness
            )
        );
        n.note = scaleQuantize(
            clamp(n.note, [evoParams.toneMin, evoParams.toneMax]),
            evoParams.effectiveScale,
            evoParams.key
        )!;
    }

    if (passDiceRoll(evoParams.durationChange)) {
        n.length += randInvert(
            execWithRamp(
                evoParams.durationChangeValuesAbsolute,
                evoParams.durationChangeSteepness
            )
        );
        n.length = clamp(n.length, [
            evoParams.durationMin,
            evoParams.durationMax
        ]);
    }

    if (passDiceRoll(evoParams.positionChange)) {
        n.position += randInvert(
            execWithRamp(
                evoParams.positionChangeValuesAbsolute,
                evoParams.positionChangeSteepness
            )
        );
    }

    if (passDiceRoll(evoParams.volumeChange)) {
        n.volume = (n.volume || 1) + randInvert(Math.random() * 0.3);
        n.volume = clamp(n.volume, [0.1, 1]);
    }

    if (
        n.position >= 0 &&
        (Math.random() < 1 - evoParams.deleteChance || isLast)
    ) {
        ret.push(n);
    }

    if (passDiceRoll(evoParams.duplicationChange)) {
        ret.push({ ...note });
    }

    return ret;
}
