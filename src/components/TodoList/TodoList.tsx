import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../services/store';
import { toggleTodo, editTodo, deleteTodo, Todo } from '../../services/todosSlice';
import TodoItem from '../TodoItem/TodoItem';
import { Button, List, ListItem, Container, Typography, Box } from '@mui/material';


type FilterType = 'all' | 'completed' | 'active';

const TodoList: React.FC = () => {
    const todos = useSelector((state: RootState) => state.todos);
    const dispatch = useDispatch();
    const [filter, setFilter] = useState<FilterType>('all');

    const handleToggleTodo = (id: string) => {
        dispatch(toggleTodo(id));
    };

    const handleEditTodo = (id: string, newTitle: string) => {
        dispatch(editTodo({ id, newTitle }));
    };

    const handleDeleteTodo = (id: string) => {
        dispatch(deleteTodo(id));
    };

    const filteredTodos = todos.filter(todo => {
        if (filter === 'completed') return todo.done;
        if (filter === 'active') return !todo.done;
        return true; // 'all'
    });

    const handleSetFilter = (newFilter: FilterType) => {
        setFilter(newFilter);
    };

    return (
        <Container>
        <Box mb={2}>
            <Button variant="contained" onClick={() => handleSetFilter('all')} sx={{ marginRight: 2 }}>
                All
            </Button>
            <Button variant="contained" onClick={() => handleSetFilter('completed')} sx={{ marginRight: 2 }}>
                Completed
            </Button>
            <Button variant="contained" onClick={() => handleSetFilter('active')}>
                Active
            </Button>
        </Box>
        {filteredTodos.length === 0 ? (
            <Typography variant="h6" align="center" color="textSecondary">
                Nothing to do
            </Typography>
            ) : (
            <List>
                {filteredTodos.map((todo: Todo) => (
                <ListItem key={todo.id}>
                    <TodoItem
                    todo={todo}
                    toggleTodo={handleToggleTodo}
                    editTodo={handleEditTodo}
                    deleteTodo={handleDeleteTodo}
                    />
                </ListItem>
                ))}
            </List>
            )}
        </Container>
    );
};

export default TodoList;