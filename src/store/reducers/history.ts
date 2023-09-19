import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { HistoryNode } from '../../lib/history';
import { initialState as evoParams } from './evoParams';
import { initialState as melodyState } from './melody';
import { initialState as playerConfig} from './playerConfig';
import { RootState } from '..';
import { forEach } from 'lodash';
const initialId = crypto.randomUUID()

const initialState: {
    tree: HistoryNode;
    currentLeaf: string;
} = {
    currentLeaf: initialId,
    tree: {
        id: initialId,
        iteration: melodyState.iteration,
        evoParams,
        melody: melodyState.current,
        playerConfig,
        children: []
    }
}

const searchTree = (tree: HistoryNode, id: string) : HistoryNode | undefined => {
    if (tree.id === id) {
        return tree
    }

    for (let idx = 0; idx < tree.children.length; idx++) {
        const child = tree.children[idx];

        const foundNode = searchTree(child, id)

        if (foundNode) {
            return foundNode
        }
    }

    return undefined
}

export const evoParamsSlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    addHistoryNode: (state, action: PayloadAction<HistoryNode>) => {

        const {tree, currentLeaf} = state
        const node = action.payload
        node.id = crypto.randomUUID()

        const parent = searchTree(tree, currentLeaf)
        parent?.children.push(node)

        state.tree = tree
        state.currentLeaf = node.id
        
        return
    },
    setCurrentLeaf: (state, action: PayloadAction<HistoryNode>) => {
        return {tree: state.tree, currentLeaf: action.payload.id}
    },
  }
})

// Action creators are generated for each case reducer function
export const { addHistoryNode, setCurrentLeaf } = evoParamsSlice.actions

export const getHistoryTree = ({history}: RootState) => {
    return history.tree
}

export const getCurrentLeaf = ({history}: RootState) => {
    return searchTree(history.tree, history.currentLeaf)
}

export default evoParamsSlice.reducer

