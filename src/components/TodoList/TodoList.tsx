import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../services/store';
import { toggleTodo, editTodo, deleteTodo } from '../../services/todosSlice';
import TodoItem from '../TodoItem/TodoItem';

type FilterType = 'all' | 'completed' | 'incomplete';

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
        if (filter === 'incomplete') return !todo.done;
        return true; // 'all'
    });

    const handleSetFilter = (newFilter: FilterType) => {
        setFilter(newFilter);
    };

    return (
        <div>
        <div>
            <button onClick={() => handleSetFilter('all')} style={{ marginRight: '10px' }}>
            All
            </button>
            <button onClick={() => handleSetFilter('completed')} style={{ marginRight: '10px' }}>
            Completed
            </button>
            <button onClick={() => handleSetFilter('incomplete')} style={{ marginRight: '10px' }}>
            Incomplete
            </button>
        </div>
        <ul>
            {filteredTodos.map(todo => (
            <TodoItem
                key={todo.id}
                todo={todo}
                toggleTodo={handleToggleTodo}
                editTodo={handleEditTodo}
                deleteTodo={handleDeleteTodo}
            />
            ))}
        </ul>
        </div>
    );
};

export default TodoList;