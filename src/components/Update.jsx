import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { updateUser } from '../feature/userDetailSlice';
import { useNavigate } from 'react-router-dom';

const Update = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { id } = useParams();
	const [updateData, setUpdateData] = useState();
	const { users, loading } = useSelector((state) => state.app);
	useEffect(() => {
		if (id) {
			const singleUser = users.filter((ele) => ele.id === id);
			setUpdateData(singleUser[0]);
		}
	}, []);

	const newData = (e) => {
		setUpdateData({ ...updateData, [e.target.name]: e.target.value });
	};
	//   console.log(updateData);

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(updateUser(updateData));
		navigate('/read');
	};
	return (
		<>
			<h2 className="text-center mt-5">Edit Data</h2>
			<form className="container mt-5" onSubmit={handleSubmit}>
				<div className="mb-3">
					<label htmlFor="exampleInputName" className="form-label">
						Name
					</label>
					<input
						type="text"
						className="form-control"
						id="exampleInputName"
						name="name"
						value={updateData && updateData.name}
						onChange={newData}
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="exampleInputEmail" className="form-label">
						Email
					</label>
					<input
						type="email"
						className="form-control"
						id="exampleInputEmail"
						aria-describedby="emailHelp"
						name="email"
						value={updateData && updateData.email}
						onChange={newData}
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="exampleInputAge" className="form-label">
						Age
					</label>
					<input
						type="text"
						className="form-control"
						id="exampleInputAge"
						name="age"
						value={updateData && updateData.age}
						onChange={newData}
					/>
				</div>
				<div className="form-check">
					<input
						className="form-check-input"
						type="radio"
						name="gender"
						value="male"
						id="male"
						checked={updateData && updateData.gender === 'male'}
						onChange={newData}
					/>
					<label className="form-check-label" htmlFor="male">
						Male
					</label>
				</div>
				<div className="form-check">
					<input
						className="form-check-input"
						type="radio"
						name="gender"
						value="female"
						id="female"
						checked={updateData && updateData.gender === 'female'}
						onChange={newData}
					/>
					<label className="form-check-label" htmlFor="female">
						Female
					</label>
				</div>
				<button type="submit" className="btn btn-primary">
					Submit
				</button>
			</form>
		</>
	);
};

export default Update;
