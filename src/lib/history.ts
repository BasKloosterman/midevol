import { PlayerConfigState } from "../store/reducers/playerConfig";
import { EvoParams } from "./evo";
import { Note } from "./note";

export interface HistoryNode {
    id: string;
    iteration: number;
    evoParams?: EvoParams;
    melody: Note[];
    playerConfig: PlayerConfigState
    parent?: HistoryNode;
    children: HistoryNode[];
}