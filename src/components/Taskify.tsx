import { useAppState, useAppDispatch } from '../store';
import InputField from './InputField';
import TodoList from './TodoList';
import { Todo } from '../model';
import { useState } from 'react';

const Taskify: React.FC = () => {
	const [todo, setTodo] = useState<string>("");
	//const [todos, setTodos] = useState<Todo[]>([]);

	//const [state, dispatch] = useReducer(TodoReducer, []);

	const { payload } = useAppState();
	console.log(payload)
	const dispatch = useAppDispatch();


	const handleAdd = (e: React.FormEvent) => {
		e.preventDefault();

		if (payload) {
			dispatch({ type: 'add', payload: todo });
			//setTodos(state);
			//setTodos([...todos, { id: Date.now(), todo: todo, isDone: false }])
			setTodo("");
		}
	};

	return (
		<div className="App">
			<span className='heading'>Taskify</span>

			<InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
			{/* <TodoList state={todos} /> */}
			{/* {todos.map(t => <li>{t.todo}</li>)} */}
		</div>
	);
}

export default Taskify;