import React, { useState, useReducer } from 'react';
import './App.css';
import InputField from './components/InputField';
import TodoList from './components/TodoList';
import { Todo } from './model';
import { TodoReducer } from './reducer';


const App: React.FC = () => {
	const [todo, setTodo] = useState<string>("");
	const [todos, setTodos] = useState<Todo[]>([]);

	const [state, dispatch] = useReducer(TodoReducer, todos);

	const handleAdd = (e: React.FormEvent) => {
		e.preventDefault();

		if (todos) {
			dispatch({ type: 'add', payload: todo });
			setTodos(state);
			//setTodos([...todos, { id: Date.now(), todo: todo, isDone: false }])
			setTodo("");
		}
	};

	return (

		<div className="App">
			<span className='heading'>Taskify</span>

			<InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
			<TodoList todos={todos} setTodos={setTodos} />
			{state.map(t => <li>{t.todo}</li>)}
		</div>
	);
}

export default App;
