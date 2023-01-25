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
		{ id: 2, todo: `<a href="https://github.com/Ever-It-Lazy/typescript-tutorial">Its GitHub repository</a> is far more important than this functional demonstration of compiled code.`, isDone: false },
		{ id: 5, todo: `This UX is quite poor. The most immediate aspects that jump out at me... <ul><li>There are 2 ways to "complete" tasks: <ul><li>dragging them the "Completed Tasks" column and/or</li><li><s>striking them through</s> with their check icon</li></ul></li> <li>Entering multiple tasks is a pain, as the &lt;input&gt; loses focus each time you submit</li><li>You can edit and save an empty item</li></ul> (I'm calling them out before you do, to keep you from fixating on them.)`, isDone: false },
		{ id: 3, todo: `This is primarily <a href="https://www.youtube.com/watch?v=knqz3_rPcKk&t=250s">a RoadsideCoder tutorial</a>. <br><br>(Demonstrating coding proficiency != architecting life-changing apps from the scratch.)`, isDone: false },
		{ id: 4, todo: `<a href="https://www.youtube.com/watch?v=uEVHJf30bWI">A supplementary tutorial</a> introduced drag & drop functionality via the package <a href="https://www.npmjs.com/package/react-beautiful-dnd">react-beautiful-dnd</a>.`, isDone: false },
		{ id: 6, todo: `Regrettably, react-beautiful-dnd <doesn href="https://medium.com/@wbern/getting-react-18s-strict-mode-to-work-with-react-beautiful-dnd-47bc909348e4">doesn't support React 18's "Strict mode"</a>. The end result <a href="https://github.com/Ever-It-Lazy/typescript-tutorial/commit/5f5c06f7b6e4ecac1d4018267d74586c2ffb88d8">exhibited glitchy behavior</a> until I went beyond the tutorial and <a href="https://github.com/Ever-It-Lazy/typescript-tutorial/commit/3dc4f0af57208574be076d669e10295b0daf7b91">implemented a workaround</a>.<br><br>(Professional me recommends replacing libraries when/if they stop receiving regular updates.)`, isDone: false },
		{ id: 7, todo: `I also introduced <a href="https://www.npmjs.com/package/html-react-parser">html-react-parser</a> on my own, because markup wasn't supported in the tutorial, but it's an intuitive way to cite my intentions, right?`, isDone: false },
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
