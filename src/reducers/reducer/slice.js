import { createSlice } from '@reduxjs/toolkit';

const taskList = createSlice({
	name: 'tasks',
	initialState: [],
	reducers: {
		addTask: (state, action) => {
			state.push({
				title: action.payload,
				id: Date.now(),
				task: [],
			});
		},
		removeTask: (state, action) => {
			return state.filter((x) => x.id !== action.payload);
		},
		editTask: (state, action) => {
			const { id, editTitle } = action.payload;
			const taskIndex = state.findIndex((x) => x.id === id);
			if (taskIndex !== -1) {
				state[taskIndex].title = editTitle;
			}
		},
		addCard: (state, action) => {
			const task = state.find((x) => x.id === action.payload.id);
			if (task) {
				task.task.push({
					title: action.payload.title,
					id: Date.now(),
				});
			}
		},
	},
});

export const { addTask, removeTask, editTask, addCard } = taskList.actions;
export default taskList.reducer;
