import React, { useCallback } from 'react';
import { Todo } from "../model";
import SingleTodo from './SingleTodo';
import { StrictModeDroppable as Droppable } from '../StrictModeDroppable';
import update from 'immutability-helper'

interface Props {
	todos: Todo[];
	setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
	completedTodos: Todo[];
	setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({
	todos,
	setTodos,
	completedTodos,
	setCompletedTodos
}) => {

	const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
		setTodos((prevCards: Todo[]) =>
			update(prevCards, {
				$splice: [
					[dragIndex, 1],
					[hoverIndex, 0, prevCards[dragIndex] as Todo],
				],
			}),
		)
	}, [])

	// const onDragEnd = (result: DropResult) => {
	// 	const { source, destination } = result;

	// 	if (!destination) return;

	// 	if (
	// 		destination.droppableId === source.droppableId
	// 		&& destination.index === source.index
	// 	) return;

	// 	let add,
	// 		active = todos,
	// 		complete = completedTodos;

	// 	if (source.droppableId === "TodosList") {
	// 		add = active[source.index];
	// 		active.splice(source.index, 1);
	// 	} else {
	// 		add = complete[source.index];
	// 		complete.splice(source.index, 1);
	// 	}

	// 	if (destination.droppableId === "TodosList") {
	// 		active.splice(destination.index, 0, add);
	// 	} else {
	// 		complete.splice(destination.index, 0, add);
	// 	}

	// 	setTodos(active);
	// 	setCompletedTodos(complete);
	// };

	const renderTodo = useCallback(
		(todo: Todo, index: number) => {
			return (
				<SingleTodo
					index={index}
					todo={todo}
					id={todo.id}
					key={todo.id}
					todos={todos}
					setTodos={setTodos}
					moveCard={moveCard}
				/>
			)
		},
		[],
	)

	const isDraggingOver = "";

	return (
		<div className="container">
			<div
				className={`TodosList todos ${isDraggingOver ? "dragactive" : ""}`}
			>
				<span className="todos__heading">
					Active Tasks
				</span>
				{todos?.map((todo, index) => renderTodo(todo, index))}
			</div>
			<div
				className={`TodoRemove todos remove ${isDraggingOver ? "dragcomplete" : ""}`}
			>
				<span className="todos__heading">
					Completed Tasks
				</span>
				{completedTodos?.map((todo, index) => (
					<SingleTodo
						index={index}
						todo={todo}
						id={todo.id}
						key={todo.id}
						todos={completedTodos}
						setTodos={setCompletedTodos}
						moveCard={moveCard}
					/>
				))}
			</div>
		</div>
	)
}

export default TodoList;