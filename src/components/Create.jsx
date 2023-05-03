import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createUser } from "../feature/userDetailSlice";

const Create = () => {
  const [users, setUsers] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function getUserData(e) {
    setUsers({ ...users, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(users);
    dispatch(createUser(users));
    navigate("/read");
  };

  return (
    <>
      <h2 className="text-center mt-5">Fill below Form</h2>
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
            onChange={getUserData}
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
            onChange={getUserData}
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
            onChange={getUserData}
          />
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="gender"
            value="male"
            id="male"
            onChange={getUserData}
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
            onChange={getUserData}
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

export default Create;
