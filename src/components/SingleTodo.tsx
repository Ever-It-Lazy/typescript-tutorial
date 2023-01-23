import React, { useEffect, useRef, useState, useReducer } from 'react';
import { Todo } from '../model';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';
import './styles.css';
import { TodoReducer } from '../reducer';
//import { tokenToString } from 'typescript';
//import TodoList from './TodoList';

type Props = {
	todo: Todo;
	key: number;
	//state: Todo[];
}

const SingleTodo = ({ todo }: Props) => {
	const [edit, setEdit] = useState<boolean>(false);
	const [editTodo, setEditTodo] = useState<string>(todo.todo);

	const [state, dispatch] = useReducer(TodoReducer, []);

	const handleDone = (id: number) => {
		dispatch({ type: 'done', payload: id });
		console.log(state)
		//setTodos(state);
		// setTodos(todos.map((todo) =>
		// 	todo.id === id
		// 		? { ...todo, isDone: !todo.isDone }
		// 		: todo
		// 	)
		// );
	};

	const handleDelete = (id: number) => {
		dispatch({ type: 'remove', payload: id });
		//setTodos(state);
	};

	const handleEdit = (e: React.FormEvent, id: number) => {
		e.preventDefault();

		// setTodos(todos.map((todo) => (
		// 	todo.id === id ? { ...todo, todo: editTodo } : todo
		// )));
		setEdit(false);
	};

	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		inputRef.current?.focus();
	}, [edit]);

	return (
		<form className='todos__single' onSubmit={(e) => handleEdit(e, todo.id)}>
			{
				edit ? (
					<input
						ref={inputRef}
						value={editTodo}
						onChange={(e) => setEditTodo(e.target.value)}
						className="todos__single--text"
					/>
				) : (
					todo.isDone ? (
						<s className="todos__single--text">{todo.todo}</s>
					) : (
						<span className="todos__single--text">{todo.todo}</span>
					)
				)
			}

			<div>
				<span className="icon" onClick={() => {
					if (!edit && !todo.isDone) {
						setEdit(!edit);
					}
				}}>
					<AiFillEdit />
				</span>
				<span className="icon" onClick={() => handleDelete(todo.id)}>
					<AiFillDelete />
				</span>
				<span className="icon" onClick={() => handleDone(todo.id)}>
					<MdDone/>
				</span>
			</div>
		</form>
	)
}

export default SingleTodo