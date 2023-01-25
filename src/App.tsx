import React, { useState } from 'react';
import './App.css';
import InputField from './components/InputField';
import TodoList from './components/TodoList';
import { Todo } from './model';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

const App: React.FC = () => {
	const [todo, setTodo] = useState<string>("");
	const [todos, setTodos] = useState<Todo[]>([
		{ id: 1, todo: 'This application demonstrates my baseline ability to work with Typescript.', isDone: false },
		{ id: 2, todo: `It's derived from <a href="https://www.youtube.com/watch?v=knqz3_rPcKk&t=250s">this tutorial here</a>.`, isDone: false },
		{ id: 3, todo: `(In <a href="https://www.youtube.com/watch?v=uEVHJf30bWI">a subsequent tutorial</a> it introduces the drag & drop UI package <a href="https://www.npmjs.com/package/react-beautiful-dnd">react-beautiful-dnd</a>.`, isDone: false },
		{ id: 4, todo: 'As a functional application, the UI makes no kinds of sense. There are two ways to "complete" tasks: dragging them or checking them. Entering multiple tasks is a pain, as the <input> loses focus every time you submit something. You are not prevented from saving a blank item.', isDone: false },
		{ id: 5, todo: 'This is a test', isDone: false },
		{ id: 6, todo: 'This is a test', isDone: false },
		{ id: 7, todo: 'This is a test', isDone: false },
	]);
	const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

	const handleAdd = (e: React.FormEvent) => {
		e.preventDefault();

		if (todo) {
			setTodos([...todos, { id: Date.now(), todo: todo, isDone: false }]);
			setTodo("");
		}
	};

	const onDragEnd = (result: DropResult) => {
		const { source, destination } = result;

		if (!destination) return;

		if (
			destination.droppableId === source.droppableId
			&& destination.index === source.index
		) return;

		let add,
			active = todos,
			complete = completedTodos;

		if (source.droppableId === "TodosList") {
			add = active[source.index];
			active.splice(source.index, 1);
		} else {
			add = complete[source.index];
			complete.splice(source.index, 1);
		}

		if (destination.droppableId === "TodosList") {
			active.splice(destination.index, 0, add);
		} else {
			complete.splice(destination.index, 0, add);
		}

		setTodos(active);
		setCompletedTodos(complete);
	};

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<div className="App">
				<span className="heading">Taskify</span>

				<InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
				<TodoList
					todos={todos}
					setTodos={setTodos}
					completedTodos={completedTodos}
					setCompletedTodos={setCompletedTodos}
				/>
				{/* {todos.map(t => <li>{t.todo}</li>)} */}
			</div>
		</DragDropContext>
	);
}

export default App;
