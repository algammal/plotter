import React from "react";
import "../coulmns/coulmns.css"
import { Droppable } from 'react-beautiful-dnd';
import Task from '../task/Task'


function Column(props) {
    return (
        <div className="coulmnComponent">
            <Droppable className="droppable" droppableId={props.column.id} type="TASK">
                {(provided, snapshot) => (
                    <div className="droppable-child" ref={provided.innerRef}
                        {...provided.droppableProps}
                        isdraggingover={snapshot.isDraggingOver.toString()}>
                        {
                            props.tasks.map((task, index) => (
                                <Task key={task.name.replace(' ', '_')} task={task} index={index} />
                            ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    )


}
export default (Column);