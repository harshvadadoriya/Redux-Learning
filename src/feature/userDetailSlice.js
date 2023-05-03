import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// create Action
export const createUser = createAsyncThunk(
	'createUser',
	async (data, { rejectWithValue }) => {
		const response = await fetch(
			'https://6451fb89a2860c9ed4fee398.mockapi.io/crud',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			}
		);
		try {
			const result = await response.json();
			return result;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

// read Action i.e. get Operation
export const showUser = createAsyncThunk(
	'showUser',
	async (_, { rejectWithValue }) => {
		const response = await fetch(
			'https://6451fb89a2860c9ed4fee398.mockapi.io/crud'
		);
		try {
			const result = await response.json();
			//   console.log(result);
			return result;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

// Delete Action
export const deleteUser = createAsyncThunk(
	'deleteUser',
	async (id, { rejectWithValue }) => {
		const response = await fetch(
			`https://6451fb89a2860c9ed4fee398.mockapi.io/crud/${id}`,
			{ method: 'DELETE' }
		);
		try {
			const result = await response.json();
			//   console.log(result);
			return result;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

// Update Action
export const updateUser = createAsyncThunk(
	'updateUser',
	async (data, { rejectWithValue }) => {
		console.log(data);
		const response = await fetch(
			`https://6451fb89a2860c9ed4fee398.mockapi.io/crud/${data.id}`,
			{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			}
		);
		try {
			const result = await response.json();
			return result;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

const initialUserDetailState = {
	users: [],
	loading: false,
	error: null,
	searchItem: [],
};

export const userDetail = createSlice({
	name: 'userDetail',
	initialState: initialUserDetailState,
	reducers: {
		searchUser: (state, action) => {
			state.searchItem = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(createUser.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(createUser.fulfilled, (state, action) => {
			state.loading = false;
			state.users.push(action.payload);
		});
		builder.addCase(createUser.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});
		builder.addCase(showUser.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(showUser.fulfilled, (state, action) => {
			state.loading = false;
			state.users = action.payload;
		});
		builder.addCase(showUser.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});
		builder.addCase(deleteUser.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(deleteUser.fulfilled, (state, action) => {
			state.loading = false;
			const { id } = action.payload;
			if (id) {
				state.users = state.users.filter((ele) => ele.id !== id);
			}
		});
		builder.addCase(deleteUser.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});
		builder.addCase(updateUser.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(updateUser.fulfilled, (state, action) => {
			state.loading = false;
			state.users = state.users.map((ele) =>
				ele.id === action.payload.id ? action.payload : ele
			);
		});
		builder.addCase(updateUser.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});
	},
});

export default userDetail.reducer;
export const { searchUser } = userDetail.actions;
