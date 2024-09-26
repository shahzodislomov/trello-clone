import React, { useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, removeTask, editTask } from '../reducers/reducer/slice';
import CardItemPlus from './CardItemPlus';
const Tasks = () => {
	const [newTaskTitle, setNewTaskTitle] = useState('');
	const [editing, setEditing] = useState('');
	const [isEditing, setIsEditing] = useState(null);
	const [error, setError] = useState('');

	const tasks = useSelector((state) => state.task);
	const dispatch = useDispatch();

	const handleEdit = (index) => {
		if (!editing) {
			setError('Siz bosh malumot kirita olmaysiz !!!');
			setTimeout(() => setError(''), 2000);
			return;
		}
		dispatch(editTask({ id: tasks[index].id, editTitle: editing }));
		setEditing('');
		setIsEditing(null);
	};

	const handleAddTask = (e) => {
		e.preventDefault();
		if (!newTaskTitle.trim()) {
			setError('Siz bosh malumot kirita olmaysiz !!!');
			setTimeout(() => setError(null), 2000);
			return;
		}
		dispatch(addTask(newTaskTitle));
		setNewTaskTitle('');
	};

	const remove = (index) => {
		dispatch(removeTask(tasks[index].id));
	};

	return (
		<div className='p-5 flex space-x-10 items-start overflow-scroll'>
			{tasks.map((task, index) => (
				<div className='w-[200px] bg-white rounded-xl p-3' key={task.id}>
					{isEditing === index ? (
						<div>
							<input
								type='text'
								value={editing}
								onChange={(e) => setEditing(e.target.value)}
							/>
							<button
								className='bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-3 rounded'
								onClick={() => handleEdit(index)}
							>
								Save
							</button>
						</div>
					) : (
						<div className='relative'>
							<p className='text-center bg-slate-300 p-2 rounded mb-2'>
								{task.title}
							</p>
							<div className='flex justify-between'>
								<button
									className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded'
									onClick={() => {
										setIsEditing(index);
										setEditing(task.title);
									}}
								>
									<FaEdit />
								</button>
								<button
									className='bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded'
									onClick={() => remove(index)}
								>
									<FaTrashAlt />
								</button>
							</div>
							<CardItemPlus list={task} /> {/* Pass task as list */}
						</div>
					)}
				</div>
			))}
			<form
				className='bg-white inline-block py-2 px-3 rounded-xl'
				onSubmit={handleAddTask}
			>
				<div className='flex flex-col bg-slate-300 rounded-xl w-52'>
					<input
						type='text'
						className='font-bold text-base placeholder:text-gray91 px-4 h-[46px] rounded-[10px] border-2 border-graydf pr-14 outline-none'
						placeholder='+ add task'
						onChange={(e) => setNewTaskTitle(e.target.value)}
						value={newTaskTitle}
					/>
					<button className='px-3 py-1 border-2 border-green-300 text-green-500 rounded-xl hover:bg-green-500 hover:text-white transition duration-300'>
						Add Task
					</button>
				</div>
			</form>
			{error && (
				<p className='absolute bg-yellow-400 top-0 left-[50%] translate-x-[-50%] animate-pulse rounded py-2 px-3 text-red-700'>
					{error}
				</p>
			)}
		</div>
	);
};

export default Tasks;
