import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const sliceName = "todos";

export interface Todo {
    id: string;
    title: string;
    createdAt: number;
    done: boolean;
}

const loadTodosFromLocalStorage = (): Todo[] => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
        return JSON.parse(savedTodos);
    }
    return [
        { id: uuidv4(), title: 'Learn TypeScript', createdAt: Date.now(), done: false },
        { id: uuidv4(), title: 'Build a ToDo App', createdAt: Date.now(), done: false },
        { id: uuidv4(), title: 'Explore Redux Toolkit', createdAt: Date.now(), done: false },
    ];
};

const saveTodosToLocalStorage = (todos: Todo[]) => {
    localStorage.setItem('todos', JSON.stringify(todos));
};

const initialState: Todo[] = loadTodosFromLocalStorage();

export const todosSlice = createSlice({
    name: sliceName,
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<string>) => {
            const newTodo = {
            id: uuidv4(),
            title: action.payload,
            createdAt: Date.now(),
            done: false,
            };
            state.push(newTodo);
            saveTodosToLocalStorage(state);
        },
        toggleTodo: (state, action: PayloadAction<string>) => {
            const todo = state.find(todo => todo.id === action.payload);
            if (todo) {
            todo.done = !todo.done;
            }
            saveTodosToLocalStorage(state);
        },
        editTodo: (state, action: PayloadAction<{ id: string; newTitle: string }>) => {
            const todo = state.find(todo => todo.id === action.payload.id);
            if (todo) {
            todo.title = action.payload.newTitle;
            }
            saveTodosToLocalStorage(state);
        },
        deleteTodo: (state, action: PayloadAction<string>) => {
            const updatedState = state.filter(todo => todo.id !== action.payload);
            saveTodosToLocalStorage(updatedState);
            return updatedState;
        },
    },
});

export const { addTodo, toggleTodo, editTodo, deleteTodo } = todosSlice.actions;
export default todosSlice.reducer;
