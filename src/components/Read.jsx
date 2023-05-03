import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteUser, showUser } from '../feature/userDetailSlice';
import CustomModal from './CustomModal';

const Read = () => {
	const dispatch = useDispatch();

	const { users, loading, searchItem } = useSelector((state) => state.app);
	const [id, setId] = useState();
	const [radioData, setRadioData] = useState('');
	const [showPopup, setShowPopup] = useState(false);
	useEffect(() => {
		dispatch(showUser());
	}, []);

	if (loading) {
		return <h2 className="text-center mt-5">Loading...</h2>;
	}

	return (
		<div>
			{showPopup && (
				<CustomModal
					id={id}
					showPopup={showPopup}
					setShowPopup={setShowPopup}
				/>
			)}
			<h2 className="text-center mt-5">User Data</h2>
			<div className="text-center">
				<input
					className="form-check-input mx-2"
					type="radio"
					name="gender"
					checked={radioData === ''}
					onChange={() => setRadioData('')}
					id="all"
				/>
				<label className="form-check-label" htmlFor="all">
					All
				</label>
				<input
					className="form-check-input mx-2"
					type="radio"
					name="gender"
					checked={radioData === 'male'}
					onChange={(e) => setRadioData(e.target.value)}
					id="male"
					value="male"
				/>
				<label className="form-check-label" htmlFor="male">
					Male
				</label>
				<input
					className="form-check-input mx-2"
					type="radio"
					name="gender"
					checked={radioData === 'female'}
					onChange={(e) => setRadioData(e.target.value)}
					id="female"
					value="female"
				/>
				<label className="form-check-label" htmlFor="female">
					Female
				</label>
			</div>
			{users &&
				users
					.filter((ele) => {
						if (searchItem.length === 0) {
							return ele;
						} else {
							return ele.name.toLowerCase().includes(searchItem.toLowerCase());
						}
					})
					.filter((ele) => {
						if (radioData === 'male') {
							return ele.gender === radioData;
						} else if (radioData === 'female') {
							return ele.gender === radioData;
						} else {
							return ele;
						}
					})
					.map((ele) => (
						<div className="card w-50 mt-3 mx-auto" key={ele.id}>
							<div className="card-body">
								<h5 className="card-title">Name: {ele.name}</h5>
								<h6 className="card-subtitle mb-2 text-muted">
									Email: {ele.email}
								</h6>
								<p className="card-text">Age: {ele.age}</p>
								<p className="card-text">Gender: {ele.gender}</p>
								<button
									type="button"
									className="btn btn-primary me-3"
									data-bs-toggle="modal"
									data-bs-target="#staticBackdrop"
									onClick={() => [setId(ele.id), setShowPopup(true)]}
								>
									View
								</button>
								<Link to={`/edit/${ele.id}`} className="btn btn-warning me-3">
									Edit
								</Link>
								<Link
									className="btn btn-danger"
									onClick={() => dispatch(deleteUser(ele.id))}
								>
									Delete
								</Link>
							</div>
						</div>
					))}
		</div>
	);
};

export default Read;
