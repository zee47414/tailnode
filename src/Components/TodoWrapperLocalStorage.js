import React, { useState, useEffect } from 'react';
import { TodoForm } from './TodoForm';
import { v4 as uuidv4 } from 'uuid';
import { Todo } from './Todo';
import { EditTodoForm } from './EditTodoForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons';
uuidv4();

export const TodoWrapperLocalStorage = () => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
        setTodos(savedTodos);
    }, []);

    const completeTask = (id) => {
        const newTodos = todos.map((todo) => (todo.id === id ? { ...todo, completed: true } : todo));
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
    };
    const addTodo = (todo) => {
        const newTodos = [...todos, { id: uuidv4(), task: todo, completed: false, isEditing: false }];
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
    };

    const toggleComplete = (id) => {
        const newTodos = todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo));
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
    };

    const deleteTodo = (id) => {
        const newTodos = todos.filter((todo) => todo.id !== id);
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
    };

    const editTodo = (id) => {
        setTodos(todos.map((todo) => (todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo)));
    };

    const editTask = (task, id) => {
        const newTodos = todos.map((todo) => (todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo));
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
    };

    const completedTodos = todos.filter((todo) => todo.completed);
    const incompleteTodos = todos.filter((todo) => !todo.completed);

    return (
        <div className="TodoWrapper">
            <h1>Get Things Done!</h1>
            <TodoForm addTodo={addTodo} />
            <div className="columns">
                <div className="column">
                    <h2>Incomplete Tasks</h2>
                    {incompleteTodos.map((todo, index) => (
                        <div key={index} className="task-container">
                            {todo.isEditing ? (
                                <EditTodoForm editTodo={editTask} task={todo} />
                            ) : (
                                <div className="task">
                                    <Todo task={todo} toggleComplete={toggleComplete} deleteTodo={deleteTodo} editTodo={editTodo} completeTask={completeTask} />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <div className="column">
                    <h2>Completed Tasks</h2>
                    {completedTodos.map((todo, index) => (
                        <div key={index} className="task-container">
                            <Todo task={todo} toggleComplete={toggleComplete} deleteTodo={deleteTodo} editTodo={editTodo} completeTask={completeTask} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
