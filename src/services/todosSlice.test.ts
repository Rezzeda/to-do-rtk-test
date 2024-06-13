import './__mocks__/localStorageMock';
import todosReducer, {
    addTodo,
    toggleTodo,
    editTodo,
    deleteTodo,
    Todo,
} from './todosSlice';

jest.mock('uuid', () => ({
    v4: jest.fn(() => 'test-uuid'),
}));

// Mocking Date.now
beforeAll(() => {
    jest.spyOn(Date, 'now').mockImplementation(() => 1718253893452); // Fixed timestamp
});

describe('todosSlice reducers', () => {
    const initialState: Todo[] = [
        { id: '1', title: 'Задача 1', createdAt: 1, done: false },
        { id: '2', title: 'Задача 2', createdAt: 2, done: false },
        { id: '3', title: 'Задача 3', createdAt: 3, done: false },
    ];

    it('должен добавить новую задачу в начало списка', () => {
        const newTodoTitle = 'Новая задача';
        const action = addTodo(newTodoTitle);
        const state = todosReducer(initialState, action);

        expect(state[0]).toEqual({
            id: 'test-uuid',
            title: newTodoTitle,
            createdAt: expect.any(Number),
            done: false,
            });
        expect(state.length).toBe(initialState.length + 1);
    });

    it('должен изменить статус задачи на "выполнено"', () => {
        const action = toggleTodo('2');
        const state = todosReducer(initialState, action);

        expect(state.find(todo => todo.id === '2')?.done).toBe(true);
    });

    it('должен изменить статус задачи на "невыполнено"', () => {
        const toggledState = todosReducer(initialState, toggleTodo('2'));
        const action = toggleTodo('2');
        const state = todosReducer(toggledState, action);

        expect(state.find(todo => todo.id === '2')?.done).toBe(false);
    });

    it('должен редактировать текст задачи', () => {
        const action = editTodo({ id: '2', newTitle: 'Обновленная задача' });
        const state = todosReducer(initialState, action);

        expect(state.find(todo => todo.id === '2')?.title).toBe('Обновленная задача');
    });

    it('должен удалить задачу', () => {
        const action = deleteTodo('2');
        const state = todosReducer(initialState, action);

        expect(state.find(todo => todo.id === '2')).toBeUndefined();
        expect(state.length).toBe(initialState.length - 1);
    });
});