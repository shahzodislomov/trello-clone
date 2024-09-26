import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCard } from '../reducers/reducer/slice';

const CardItemPlus = ({ list }) => {
	const dispatch = useDispatch();
	const [cardText, setCardText] = useState('');

	const handleAddCard = () => {
		if (cardText.trim()) {
			dispatch(addCard({ id: list.id, title: cardText }));
			setCardText('');
		}
	};

	return (
		<div className='list'>
			{list.task.map((card) => (
				<div key={card.id}>
					<p>{card.title}</p>
				</div>
			))}
			<div className='add-card'>
				<input
					type='text'
					value={cardText}
					onChange={(e) => setCardText(e.target.value)}
					placeholder='+ Add a card'
				/>
				<button
					onClick={handleAddCard}
					className='bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded'
				>
					Add Card
				</button>
			</div>
		</div>
	);
};

export default CardItemPlus;
