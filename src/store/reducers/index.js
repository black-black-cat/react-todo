import produce from "immer"

const initialState = {
  list: []
}

function todoApp (state = initialState, action) {
  let newState
  switch (action.type) {
    case 'ADD_ITEM':
      newState = produce(state, (draft) => {
        draft.list.push(action.value)
      })
      return newState
    case 'CHECKBOX_CHANGE':
      return produce(state, (draft) => {
        draft.list[action.index].done = action.checked
      })
    case 'REMOVE_ITEM':
      return produce(state, (draft) => {
        draft.list.splice(action.index, 1)
      })
    default:

  }
  return state
}

export default todoApp
