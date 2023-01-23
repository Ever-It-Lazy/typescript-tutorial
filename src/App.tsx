import React, { useCallback } from 'react';
import './App.css';
import { Actions } from './reducer';
import { AppStore } from './store';
import Taskify from './components/Taskify';

const App: React.FC = () => {
	const handleDispatch = useCallback((action: Actions) => {
		console.log(action);
	}, []);

	return (
		<AppStore defaultState={[]} onDispatch={handleDispatch}>
			<Taskify />
		</AppStore>
	);
}

export default App;
