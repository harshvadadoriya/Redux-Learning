import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { fetchTodos } from './redux/slice/todo';

function App() {
	const dispatch = useDispatch();
	const state = useSelector((state) => state);
	console.log(state);
	if (state.todo.isLoading) {
		return <h2>Loading...</h2>;
	}
	return (
		<>
			<button onClick={() => dispatch(fetchTodos())}>Fetch Todos</button>
			{state.todo.data &&
				state.todo.data.map((obj) => <li key={obj.id}>{obj.title}</li>)}
		</>
	);
}

export default App;
