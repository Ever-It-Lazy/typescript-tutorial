import React from 'react';
import './styles.css';
import { Todo } from "../model";
import SingleTodo from './SingleTodo';
import { TodoReducer } from '../reducer';

interface Props {
	state: Todo[];
}

const TodoList: React.FC<Props> = ({ state }) => {
	//console.log(TodoReducer.getState())

	return (
		<div className='todos'>
			{state.map(todo => (
				<SingleTodo todo={todo} key={todo.id}
					 />
			))}
		</div>
	)
}

export default TodoList