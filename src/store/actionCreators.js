import {
  ADD_ITEM,
  REMOVE_ITEM,
  CHECKBOX_CHANGE
} from './actionTypes'

export const getAddItemAction = value => {
  return {
    type: ADD_ITEM,
    value,
  }
}

export const getRemoveItemAction = index => {
  return {
    type: REMOVE_ITEM,
    index,
  }
}

export const getCheckboxChangeAction = (index, checked) => {
  return {
    type: CHECKBOX_CHANGE,
    index,
    checked,
  }
}
