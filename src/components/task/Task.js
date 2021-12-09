import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import "../task/task.css"



export default function Task(props) {

    return (
        <Draggable
            draggableId={props.task.name.replace(' ', '_')}
            index={props.index}
        >
            {(provided, snapshot) => (
                <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    isdragging={snapshot.isDragging.toString()}
                >
                    <div className="task">
                        {props.task.name}
                    </div>
                </div>
            )}
        </Draggable>
    )
}
