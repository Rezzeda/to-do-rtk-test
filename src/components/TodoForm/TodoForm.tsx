import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../../services/todosSlice';

const TodoForm: React.FC = () => {
    const [title, setTitle] = useState('');
    const dispatch = useDispatch();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (title.trim() === '') return;
        dispatch(addTodo(title));
        setTitle('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={title} onChange={handleChange} />
            <button type="submit">Add Todo</button>
        </form>
    );
};

export default TodoForm;