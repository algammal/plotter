import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import "../task/task.css"



export default function Task(props) {
    console.log(props)
    return (

        < Draggable
            draggableId={JSON.stringify(props.task)}
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
                        {props?.task?.name}
                        <div className='functionDimension'>
                            {props?.task?.function}
                        </div>
                    </div>
                </div>
            )
            }
        </Draggable >
    )
}
