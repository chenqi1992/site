import * as types from './mutation-types'

export const setselectAttr= function ({commit}, {arr}) {
    commit(types.SELECT_ATTR, arr)
}

