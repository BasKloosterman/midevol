import { FC, useEffect, useState } from 'react';
import Slider from './Slider';
import { EvoParams } from '../lib/evo';
import { WebMidi } from 'webmidi';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { PlayerConfigState, updateSettings } from '../store/reducers/playerConfig';
import { qAll, qSmall, updateEvoParams } from '../store/reducers/evoParams';
import Emitter, { events } from '../lib/eventemitter';
import { numToNote, scales } from '../lib/note';
import Instrument from './Instrument';

const Instruments: FC = () => {
    const instruments = useSelector((s :RootState) => s.instruments)

    return (
        <div>
            {Object.keys(instruments).sort().map(i => <Instrument key={i} instrument={instruments[parseInt(i)]}/>)}
        </div>
    );
};

export default Instruments;
