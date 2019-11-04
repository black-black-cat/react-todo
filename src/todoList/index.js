import React, { Component } from 'react'
import List from './List'
import store from '../store'
import {
  getAddItemAction,
  getRemoveItemAction,
  getCheckboxChangeAction
} from '../store/actionCreators'
import { connect } from 'react-redux'

class Todo extends Component {
  constructor (props) {
    super(props)
    this.textInput = React.createRef()
    // this.state = store.getState()
    // store.subscribe(this.handleStoreChange)
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    this.props.list.length > prevProps.list.length
      && (this.textInput.current.value = '')
  }

  handleButtonClick = (fn) => {
    this.addItem(fn)
  }
  handleKeyEnter = (fn, e) => {
    if (e.key === 'Enter') {
      this.addItem(fn)
    }
  }
  addItem (dispatchFn) {
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
    // this.props.addItem(item)
    dispatchFn && dispatchFn(item)
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
          onKeyDown={(ev) => {this.handleKeyEnter(this.props.addItem, ev)}}
        />
        <button onClick={(ev) => {this.handleButtonClick(this.props.addItem)}}>submit</button>

        <List
          handleChange={this.props.checkboxChange}
          handleRemoveItem={this.props.removeItem}
          items={this.props.list}
        />
      </div>
    )
  }
}

// export default Todo

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    list: state.todoApp.list
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addItem: (item) => {
      let action = getAddItemAction(item)
      dispatch(action)
    },
    removeItem: (index) => {
      let action = getRemoveItemAction(index)
      store.dispatch(action)
    },
    checkboxChange: (index, event) => {
      let value = event.currentTarget.checked
      let action = getCheckboxChangeAction(index, value)
      store.dispatch(action)
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Todo)
