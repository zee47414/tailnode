import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faSquareCheck } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

export const Todo = ({ task, deleteTodo, editTodo, toggleComplete, completeTask }) => {

    return (
        <div className="Todo">
            <p className={`${task.completed ? "completed" : "incompleted"}`} onClick={() => toggleComplete(task.id)}>{task.task}</p>
            <div>
                {!task.completed ? <FontAwesomeIcon className="edit-icon" icon={faPenToSquare} onClick={() => editTodo(task.id)} /> : ""}
                <FontAwesomeIcon className="delete-icon" icon={faTrash} onClick={() => deleteTodo(task.id)} />
                {!task.completed ? <FontAwesomeIcon className="edit-icon" icon={faSquareCheck} onClick={() => completeTask(task.id)} /> : ""}
            </div>
        </div>
    )
}