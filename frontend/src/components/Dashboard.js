import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { deleteImage } from "../redux/image/imageAction";
import { loadUser, logout } from "../redux/user/userAction";
import CreateImage from "./CreateImage";

function Dashboard() {
  const dispatch = useDispatch();
  const { images, user } = useSelector((state) => state.User);

  const history = useHistory();

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  return (
    <div>
      <div style={{ color: "#fff" }}>Dashboard</div>
      <h2 style={{ color: "#fff" }}>Hi {user ? user.name : null}</h2>
      <button
        className="btn btn-danger"
        onClick={() => {
          dispatch(logout());
          history.push("/");
        }}
      >
        Logout
      </button>
      <CreateImage />
      <h4 style={{ color: "#fff" }}>Your Images</h4>
      {images ? (
        <div className="container-fluid">
          <div className="row">
            {images.map((image, idx) => (
              <div key={image._id} className="col-sm-6 col-md-4 py-3">
                <Link to={`/images/${image._id}/${user.name}`}>
                  <img
                    style={{
                      width: "100%",
                    }}
                    src={image.imageUrl}
                    alt="image"
                    className="img-thumbnail img-fluid"
                  />
                </Link>
                <h2 style={{ color: "#fff" }}>{image.title}</h2>
                <button
                  onClick={() => dispatch(deleteImage(image._id))}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Dashboard;
