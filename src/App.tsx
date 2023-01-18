import React, { useState, useReducer, useCallback } from 'react';
import './App.css';
import InputField from './components/InputField';
import TodoList from './components/TodoList';
import { Todo } from './model';
import { Actions, TodoReducer } from './reducer';
import { AppStore } from './store';


const App: React.FC = () => {
	const handleDispatch = useCallback((action: Actions) => {
		console.log(action);
	}, []);

	const [todo, setTodo] = useState<string>("");
	const [todos, setTodos] = useState<Todo[]>([]);

	const [state, dispatch] = useReducer(TodoReducer, []);

	const handleAdd = (e: React.FormEvent) => {
		e.preventDefault();

		if (state) {
			dispatch({ type: 'add', payload: todo });
			//setTodos(state);
			//setTodos([...todos, { id: Date.now(), todo: todo, isDone: false }])
			setTodo("");
		}
	};

	return (
		<AppStore defaultState={[]} onDispatch={handleDispatch}>
			<div className="App">
				<span className='heading'>Taskify</span>

				<InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
				<TodoList state={state} />
				{/* {state.map(t => <li>{t.todo}</li>)} */}
			</div>
		</AppStore>
	);
}

export default App;
