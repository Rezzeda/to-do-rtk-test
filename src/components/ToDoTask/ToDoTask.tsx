import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { toggleDoneTask, updateTask, deleteTask } from '../../services/toDoSlice';
import styles from './ToDoTask.module.css'; // Подставьте свой путь к стилям

interface ToDoTaskProps {
    title: string;
    id: string;
    done: boolean;
}

const ToDoTask: React.FC<ToDoTaskProps> = ({ title, id, done }) => {
    const [checked, setChecked] = useState(done);
    const [isEdit, setIsEdit] = useState(false);
    const [titleValue, setTitleValue] = useState(title);
    const editTitleInputRef = useRef<HTMLInputElement>(null);
    const dispatch = useDispatch();

    useEffect(() => {
        setTitleValue(title);
    }, [title]);

    useEffect(() => {
        if (isEdit) {
            editTitleInputRef?.current?.focus();
        }
    }, [isEdit])

    useEffect(() => {
        setChecked(done);
    }, [done]);

    const handleDoneToggle = () => {
        dispatch(toggleDoneTask(id));
    };

    const handleEdit = (newTitle: string) => {
        dispatch(updateTask({ id, title: newTitle }));
        setIsEdit(false);
    };

    const handleRemove = () => {
        if (window.confirm('Are you sure you want to remove?')) {
            dispatch(deleteTask(id));
        }
    };

    return (
        <div className={styles.ToDoTask}>
            <label className={styles.ToDoTask__label}>
                <input
                    className={styles.ToDoTask__checkbox}
                    type="checkbox"
                    disabled={isEdit}
                    checked={checked}
                    onChange={handleDoneToggle}
                />
                { isEdit ? (
                    <input
                        className={styles.ToDoTask__input_edit}
                        type="text"
                        ref={editTitleInputRef}
                        value={titleValue}
                        onChange={(evt) => setTitleValue(evt.target.value)}
                        onKeyDown={(evt) => {
                            if (evt.key === 'Enter') {
                                handleEdit(titleValue);
                            }
                        }}
                    />
                    ) : (
                        <h3 className={`${styles.ToDoTask__title} ${done ? styles.ToDoTask__title_done : ''}`}>
                        {title}
                    </h3>
                )}
            </label>
            { isEdit ? (
                <button
                    aria-label='Save'
                    className={styles.ToDoTask__button_save}
                    onClick={() => handleEdit(titleValue)}
                />
            ) : (
                <button
                    aria-label='Edit'
                    className={styles.ToDoTask__button_edit}
                    onClick={() => setIsEdit(true)}
                />
            )}
            <button
                aria-label='Remove'
                className={styles.ToDoTask__button_remove}
                onClick={handleRemove}
            />
        </div>
    );
}

export default ToDoTask;
