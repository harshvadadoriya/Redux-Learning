import { useSelector } from "react-redux";

// eslint-disable-next-line react/prop-types
const CustomModal = ({ id }) => {
  const allUsers = useSelector((state) => state.app.users);
  const singleUser = allUsers.filter((ele) => ele.id === id);
  //   console.log(singleUser);

  return (
    <div
      className="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">
              User Details
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <p>Name: {singleUser[0].name}</p>
            <p>Email: {singleUser[0].email}</p>
            <p>Age: {singleUser[0].age}</p>
            <p>Gender: {singleUser[0].gender}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
