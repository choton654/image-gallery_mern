import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getImages, likeImage } from "../redux/image/imageAction";
import { loadUser } from "../redux/user/userAction";

const ImagePage = (props) => {
  const { images, error, loading } = useSelector((state) => state.Image);
  const { isAuthenticated, user } = useSelector((state) => state.User);

  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(getImages());
    dispatch(loadUser());
  }, []);

  if (loading) {
    return <div style={{ color: "#fff" }}>loading...</div>;
  }

  return (
    <div className="container-fluid">
      <div className="row">
        {error && <div>{error}</div>}
        {images &&
          images.map((image) => (
            <div key={image._id} className="col-sm-6 col-md-4 py-3">
              <div>
                <Link to={`/images/${image._id}`}>
                  <img
                    style={{
                      width: "100%",
                    }}
                    src={image.imageUrl}
                    alt="image"
                    className="img-thumbnail img-fluid"
                  ></img>
                </Link>
                <button
                  onClick={() => {
                    if (!isAuthenticated) {
                      history.push("/login");
                    }
                    dispatch(likeImage(image._id));
                  }}
                  className="btn btn-primary"
                >
                  Like <span>{image.likes?.length || 0}</span>
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ImagePage;
