import React, { useState } from 'react';
import { Button, IconButton, TextField, Box, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';

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
        <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
            {isEditing ? (
                <Box display="flex" alignItems="center">
                <TextField
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={newTitle}
                    onChange={handleChange}
                    onBlur={handleSave}
                    autoFocus
                />
                <Button onClick={handleSave}>Save</Button>
                <Button onClick={handleCancel}>Cancel</Button>
                </Box>
            ) : (
                <>
                <Typography
                    variant="body1"
                    style={{ textDecoration: todo.done ? 'line-through' : 'none' }}
                >
                    {todo.title}
                </Typography>
                <Box>
                    <IconButton onClick={handleToggle} color="primary">
                        <DoneOutlinedIcon />
                    </IconButton>
                    <IconButton onClick={handleEdit} color="secondary">
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={handleDelete}>
                        <DeleteIcon />
                    </IconButton>
                </Box>
                </>
            )}
        </Box>
    );
};

export default TodoItem;
