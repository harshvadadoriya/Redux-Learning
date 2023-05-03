import { useState } from 'react';

function UserList() {
	const users = [
		{ id: 1, name: 'Alice', age: 25, email: 'alice@example.com' },
		{ id: 2, name: 'Bob', age: 30, email: 'bob@example.com' },
		{ id: 3, name: 'Charlie', age: 35, email: 'charlie@example.com' },
	];

	// const [hoveredUserId, setHoveredUserId] = useState(null);
	const [hoveredUser, setHoveredUser] = useState(null);

	const handleUserHover = (userId, isHovering) => {
		if (isHovering) {
			// setHoveredUserId(userId);
			setHoveredUser(users.find((user) => user.id === userId));
		} else {
			// setHoveredUserId(null);
			setHoveredUser(null);
		}
	};

	return (
		<div>
			<ul>
				{users.map((user) => (
					<li
						key={user.id}
						onMouseEnter={() => handleUserHover(user.id, true)}
						onMouseLeave={() => handleUserHover(user.id, false)}
					>
						{user.name}
					</li>
				))}
			</ul>
			{hoveredUser && (
				<div className="card">
					<h2>{hoveredUser.name}</h2>
					<p>Age: {hoveredUser.age}</p>
					<p>Email: {hoveredUser.email}</p>
				</div>
			)}
		</div>
	);
}
export default UserList;
