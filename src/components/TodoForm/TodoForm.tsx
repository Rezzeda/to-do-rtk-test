import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../../services/todosSlice';
import { TextField, Button, Box } from '@mui/material';

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
        <Box 
            component="form" 
            onSubmit={handleSubmit}
            display="flex"
            alignItems="center"
            mb={2}
        >
            <TextField
                label="What To Do?"
                variant="outlined"
                size="small"
                value={title}
                onChange={handleChange}
                sx={{ marginRight: 2,
                    width: '500px',
                }}
            />
            <Button type="submit" variant="contained">
                Add Todo
            </Button>
        </Box>
    );
};

export default TodoForm;