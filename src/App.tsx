import React, { useState } from 'react';
import './App.css';
import InputField from './components/InputField';
import TodoList from './components/TodoList';
import { Todo } from './model';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend'

const App: React.FC = () => {
	const [todo, setTodo] = useState<string>("");
	const [todos, setTodos] = useState<Todo[]>([]);
	const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

	const handleAdd = (e: React.FormEvent) => {
		e.preventDefault();

		if (todos) {
			setTodos([...todos, { id: Date.now(), todo: todo, isDone: false }]);
			setTodo("");
		}
	};



	return (
		<DndProvider backend={HTML5Backend}>
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
		</DndProvider>
	);
}

export default App;
