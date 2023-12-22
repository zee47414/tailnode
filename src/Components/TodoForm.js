import React, { useState } from 'react'

export const TodoForm = ({ addTodo, setTodos }) => {
    const [value, setValue] = useState('');

    const handleSubmit = (e) => {
        // prevent default action
        e.preventDefault();
        if (value) {
            // add todo
            addTodo(value);
            // clear form after submission
            setValue('');
        }
    };
    const resetTodos = () => {
        const initialTodos = [];
        setTodos(initialTodos);
        localStorage.setItem('todos', JSON.stringify(initialTodos));
    };
    return (
        <div className='todoFormContainer'>
            <div className="reset-button-container">
                <button onClick={resetTodos} className="reset-button">
                    Reset 
                </button>
            </div>
            <form onSubmit={handleSubmit} className="TodoForm">
                <input type="text" value={value} onChange={(e) => setValue(e.target.value)} className="todo-input" placeholder='What is the task today?' />
                <button type="submit" className='todo-btn'>Add Task</button>
            </form>
            
        </div>
    )
}