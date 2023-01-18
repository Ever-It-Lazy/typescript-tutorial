import React from 'react';

export function createStore(reducer) {
	const StateContext = React.createContext();
	const DispatchContext = React.createContext();

	function Store({
		defaultState = {},
		onDispatch,
		children
	}) {
		const [state, baseDispatch] = React.useReducer(
			reducer,
			defaultState
		);
		const dispatch = React.useCallback((action) => {
			baseDispatch(action);
			if (onDispatch) {
				onDispatch(action);
			}
		}, [onDispatch]);
		return (
			<StateContext.Provider value={state}>
				<DispatchContext.Provider value={dispatch}>
					{children}
				</DispatchContext.Provider>
			</StateContext.Provider>
		);
	}
	function useStoreState() {
		const context = React.useContext(StateContext);
		if (!context) {
			throw new Error(
				"useStoreState must be used within a Provider"
			);
		}
		return context;
	}
	function useStoreDispatch() {
		const context = React.useContext(DispatchContext);
		if (!context) {
			throw new Error(
				"useStoreDispatch must be used within a Provider"
			);
		}
		return context;
	}
	return [Store, useStoreState, useStoreDispatch];
}
