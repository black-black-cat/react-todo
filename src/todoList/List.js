import React from 'react'
import Item from './Item'

function List (props) {
    return (
        <ul>
            {
                props.items.map((v, i) => {
                    return (
                        <Item
                            done={v.done}
                            handleChange={props.handleChange}
                            handleRemoveItem={props.handleRemoveItem}
                            index={i}
                            key={i}
                            title={v.title}
                        />
                    )
                })
            }
        </ul>
    )
}

export default List