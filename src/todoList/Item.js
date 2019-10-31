import React from 'react'
import './Item.css'
import classNames from 'classnames'

function Item (props) {
    // let ilCn = 'input-label'
    // if (props.done) {
    //     ilCn += ' checked'
    // }
    let ilCn = classNames({
        'input-label': true,
        'checked': props.done
    })
    return (
        <React.Fragment>
            <li>
                <label className={ilCn}>
                    <input
                        className="input"
                        onChange={(e) => props.handleChange(props.index, e)}
                        type="checkbox"
                    />
                </label>
                <span className={props.done ? 'done': ''}>{props.title}</span>
                <button onClick={(e) => props.handleRemoveItem(props.index)}>x</button>
            </li>
        </React.Fragment>
    )
}

export default Item
