import React, { useState } from 'react';

interface TodoItemProps {
    todo: {
        id: string;
        title: string;
        createdAt: number;
        done: boolean;
    };
    toggleTodo: (id: string) => void;
    editTodo: (id: string, newTitle: string) => void;
    deleteTodo: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, toggleTodo, editTodo, deleteTodo }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(todo.title);

    const handleToggle = () => {
        toggleTodo(todo.id);
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        editTodo(todo.id, newTitle);
        setIsEditing(false);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.target.value);
    };

    const handleCancel = () => {
        setNewTitle(todo.title);
        setIsEditing(false);
    };

    const handleDelete = () => {
        deleteTodo(todo.id);
    };

    return (
        <li style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>
            {isEditing ? (
            <>
                <input 
                type="text" 
                value={newTitle} 
                onChange={handleChange} 
                onBlur={handleSave}
                autoFocus 
                />
                <button onClick={handleSave}>Save</button>
                <button onClick={handleCancel}>Cancel</button>
            </>
            ) : (
            <>
                {todo.title} (Created at: {new Date(todo.createdAt).toLocaleString()})
                <button onClick={handleToggle}>Toggle</button>
                <button onClick={handleEdit}>Edit</button>
                <button onClick={handleDelete}>Delete</button>
            </>
            )}
        </li>
    );
};

export default TodoItem;
