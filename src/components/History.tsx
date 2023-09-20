import { Children, FC, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addHistoryNode as addHistoryNode_, getCurrentLeaf, getHistoryTree} from "../store/reducers/history"
import { RootState } from "../store"
import { getCurrentIteration, getMelody, resetMelody as resetMelody_ } from "../store/reducers/melody"
import { Note } from "../lib/note"
import { HistoryNode } from "../lib/history"
import { resetEvoParams } from "../store/reducers/evoParams"
import { resetSettings } from "../store/reducers/playerConfig"



const History : FC = () => {
    const dispatch = useDispatch()
    const tree = useSelector(getHistoryTree)
    const currentLeaf = useSelector(getCurrentLeaf)
    const currentIteration = useSelector(getCurrentIteration)

    const evoParams = useSelector((s: RootState) => s.evoParams[1])
    const {current: melody, iteration}  = useSelector((s: RootState) => s.melody)
    const playerConfig = useSelector((s: RootState) => s.playerConfig)
    const [scale, setscale] = useState(5)

  
    const resetMelody = (tree: HistoryNode) => {
        dispatch(resetMelody_({melody: tree.melody, iteration: tree.iteration}))
        dispatch(resetEvoParams({instrument: 1, params: tree.evoParams!}))
        dispatch(resetSettings(tree.playerConfig))
    }

    const addHistoryNode = (e: KeyboardEvent) => {
        dispatch(addHistoryNode_({
            id: '',
            evoParams,
            melody,
            playerConfig,
            iteration,
            children: [],
        }))
    }

    useEffect(() => {
        window.addEventListener('keydown', addHistoryNode)

        return () => {
            window.removeEventListener('keydown', addHistoryNode)
        }
    }, [melody, iteration, playerConfig, evoParams])

    const flatten = (tree: HistoryNode) : HistoryNode[] => {
        if (!tree.children) {
            return [tree]
        }

        const result = tree.children.reduce(
            (acc, cur) => {
                return [...acc, ...flatten(cur)]
            },
            [] as HistoryNode[]
        )
        return [tree, ...result]
    }

    const flatTree = flatten(tree).slice(1)
    console.log(iteration, iteration * scale, iteration * scale + 10)
    return (
        <div className="svg-layer">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                width="800px"
                height="600px"
            >
                <circle cx="50%" cy="10px" r="2px" stroke="red" fill="red" style={{cursor: 'pointer'}} onClick={() => resetMelody(tree)}/>
                <line x1="50%" y1="10px" x2="50%" y2={`${iteration * scale + 10}px`} stroke="black"/>
                {
                    
                }
                {flatTree.map(
                    x => <circle style={{cursor: 'pointer'}}  key={x.id} cx="50%" cy={`${x.iteration * scale + 10}px`} r="2px" stroke="red" fill="red" onClick={() => resetMelody(x)}/>
                )}
                <circle cx="50%" cy={`${iteration * scale + 10}px`} r="2px" stroke="red" fill="red"/>
            </svg>
        </div>
    )
}
export default History