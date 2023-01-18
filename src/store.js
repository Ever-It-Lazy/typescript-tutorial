import { createStore } from './util';
import { TodoReducer } from "./reducer";

const [
	AppStore,
	useAppState,
	useAppDispatch
] = createStore(TodoReducer);

export { AppStore, useAppState, useAppDispatch };