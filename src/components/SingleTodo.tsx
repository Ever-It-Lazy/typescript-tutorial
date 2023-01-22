import React, { useEffect, useRef, useState } from 'react';
import { Todo } from '../model';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';
import { Draggable } from 'react-beautiful-dnd';
import type { Identifier, XYCoord } from 'dnd-core';
import { useDrag, useDrop } from 'react-dnd';

type Props = {
	index: number;
	todo: Todo;
	id: number;
	key: number;
	todos: Todo[];
	setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
	moveCard: (dragIndex: number, hoverIndex: number) => void;
}

interface DragItem {
	index: number
	id: string
	type: string
}

const SingleTodo = ({ index, id, todo, todos, setTodos, moveCard }: Props) => {
	const [edit, setEdit] = useState<boolean>(false);
	const [editTodo, setEditTodo] = useState<string>(todo.todo);

	const handleDone = (id: number) => {
		setTodos(todos.map((todo) =>
			todo.id === id
				? { ...todo, isDone: !todo.isDone }
				: todo
			)
		);
	};

	const handleDelete = (id: number) => {
		setTodos(todos.filter((todo) => todo.id !== id));
	};

	const handleEdit = (e: React.FormEvent, id: number) => {
		e.preventDefault();

		setTodos(todos.map((todo) => (
			todo.id === id ? { ...todo, todo: editTodo } : todo
		)));
		setEdit(false);
	};

	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		inputRef.current?.focus();
	}, [edit]);



	const ref = useRef<HTMLDivElement>(null)
	const [{ handlerId }, drop] = useDrop<
			DragItem,
			void,
			{ handlerId: Identifier | null }
	>({
		accept: 'SingleTodo',
		collect(monitor) {
			return {
			handlerId: monitor.getHandlerId(),
			}
		},
		hover(item: DragItem, monitor) {
			if (!ref.current) {
				return
			}
			const dragIndex = item.index
			const hoverIndex = index

			// Don't replace items with themselves
			if (dragIndex === hoverIndex) {
				return
			}

			// Determine rectangle on screen
			const hoverBoundingRect = ref.current?.getBoundingClientRect()

			// Get vertical middle
			const hoverMiddleY =
			(hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

			// Determine mouse position
			const clientOffset = monitor.getClientOffset()

			// Get pixels to the top
			const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

			// Only perform the move when the mouse has crossed half of the items height
			// When dragging downwards, only move when the cursor is below 50%
			// When dragging upwards, only move when the cursor is above 50%

			// Dragging downwards
			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
				return
			}

			// Dragging upwards
			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
				return
			}

			// Time to actually perform the action
			moveCard(dragIndex, hoverIndex)

			// Note: we're mutating the monitor item here!
			// Generally it's better to avoid mutations,
			// but it's good here for the sake of performance
			// to avoid expensive index searches.
			item.index = hoverIndex
		},
	})

	const [{ isDragging }, drag] = useDrag({
		type: 'SingleTodo',
		item: () => {
			return { id, index }
		},
		collect: (monitor: any) => ({
			isDragging: monitor.isDragging(),
		}),
	})

	drag(drop(ref))


	return (
		<div ref={ref} data-handler-id={handlerId}>
			<form
				className={`todos__single ${isDragging ? "drag" : ""}`}
				onSubmit={(e) => handleEdit(e, todo.id)}
			>
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
		</div>
	)
}

export default SingleTodo;