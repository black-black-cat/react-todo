import React, { Component } from 'react'
import List from './List'
import store from '../store'
import {
  getAddItemAction,
  getRemoveItemAction,
  getCheckboxChangeAction
} from '../store/actionCreators'

class Todo extends Component {
  constructor(props) {
    super(props)
    this.textInput = React.createRef();
    // this.state = {
    //     list: [
    //         {
    //             title: 'coding',
    //             done: false
    //         }
    //     ]
    // }
    this.state = store.getState()
    store.subscribe(this.handleStoreChange)
  }
  handleButtonClick = () => {
    this.addItem()
  }
  handleKeyEnter = (e) => {
    if (e.key === 'Enter') {
      this.addItem()
    }
  }
  addItem () {
    let title = this.textInput.current.value
    if (title) {
      title = title.trim()
    }
    if (!title) {
      this.textInput.current.value = ''
      return
    }
    let item = {
      title,
      done: false,
    }

    // no redux
    // let list = [...this.state.list, item]
    // this.setState({
    //     list
    // }, () => {
    //     this.textInput.current.value = ''
    // })

    // redux
    // let action = {
    //   type: 'ADD_ITEM',
    //   value: item,
    // }
    let action = getAddItemAction(item)
    store.dispatch(action)
    this.textInput.current.value = ''
  }
  checkboxChange = (index, event) => {
    let value = event.currentTarget.checked

    // let items = this.state.list.slice()
    // items[i].done = value
    // this.setState({
    //     list: items
    // })

    // let action = {
    //   type: 'CHECKBOX_CHANGE',
    //   value,
    //   index,
    // }

    let action = getCheckboxChangeAction(index, value)
    store.dispatch(action)
  }
  handleRemoveItem = (index, event) => {
    // let filtered = this.state.list.filter((v, i) => i !== index)
    // this.setState({
    //     list: filtered
    // })
    // let action = {
    //   type: 'REMOVE_ITEM',
    //   index,
    // }

    let action = getRemoveItemAction(index)
    store.dispatch(action)
  }
  handleStoreChange = () => {
    let newState = store.getState()
    this.setState(newState)
  }
  render () {
    return (
      <div>
        <div className="title">Todo</div>
        <input
          type="text"
          ref={this.textInput}
          onKeyDown={this.handleKeyEnter}
        />
        <button onClick={this.handleButtonClick}>submit</button>

        <List
          handleChange={this.checkboxChange}
          handleRemoveItem={this.handleRemoveItem}
          items={this.state.list}
        />
      </div>
    )
  }
}

export default Todo
