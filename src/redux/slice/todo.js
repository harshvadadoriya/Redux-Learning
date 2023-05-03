import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Action
export const fetchTodos = createAsyncThunk('fetchTodos', async () => {
	const response = await fetch('https://jsonplaceholder.typicode.com/todos');
	return response.json();
});

const todoSlice = createSlice({
	name: 'todo',
	initialState: {
		isLoading: false,
		data: null,
		isError: false,
	},
	extraReducers: (builder) => {
		builder.addCase(fetchTodos.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(fetchTodos.fulfilled, (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
		});
		builder.addCase(fetchTodos.rejected, (state, action) => {
			// state.isLoading = false;
			console.log('Error:', action.payload);
			state.isError = true;
		});
	},
});

export default todoSlice.reducer;

// createAsyncThunk used to make API call, this creates an action i.e. fetchTodos and we can dispatch that action from our component
// we used extraReducers to put todos in state, and we have added 3 state in extraReducers which are pending, fulfilled, rejected
