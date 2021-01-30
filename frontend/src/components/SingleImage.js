import { json } from "body-parser";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  addComment,
  deleteImage,
  editImage,
  getOneImg,
  likeImage,
} from "../redux/image/imageAction";
import { loadUser } from "../redux/user/userAction";

const SingleImage = (props) => {
  const [modalVisiable, setModalVisiable] = useState(false);
  const [commmentModal, setcommmentModal] = useState(false);
  const { image, loading, error } = useSelector((state) => state.Image);
  const { isAuthenticated, user } = useSelector((state) => state.User);

  const [newImage, setNewImage] = useState({
    title: image.title || "",
    imageUrl: image.imageUrl || "",
    description: image.description || "",
  });
  const [text, settext] = useState("");
  const dispatch = useDispatch();
  console.log(image, user);

  const history = useHistory();
  useEffect(() => {
    dispatch(getOneImg(props.computedMatch.params.id));
    dispatch(loadUser());
  }, []);

  const deleteImg = (id) => {
    dispatch(deleteImage(image._id));
    history.push("/images");
  };

  const openModal = () => {
    setModalVisiable(!modalVisiable);
  };

  const handelChange = (e) => {
    setNewImage({ ...newImage, [e.target.name]: e.target.value });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    const { title, imageUrl, description } = newImage;
    console.log(newImage);
    dispatch(
      editImage({
        _id: image._id,
        title,
        imageUrl,
        description,
      })
    );

    history.push("/images");
  };

  if (loading) {
    return <div style={{ color: "#fff" }}>loading...</div>;
  }

  if (error) {
    return <div style={{ color: "#fff" }}>an error occurred..</div>;
  }

  return (
    <>
      <div className="container pt-4 d-flex justify-content-around flex-md-nowrap flex-wrap">
        <div className="card" style={{ width: "18rem" }}>
          <img
            className="card-img-top img-fluid"
            src={image.imageUrl}
            alt="Card image cap"
          ></img>
          <div className="card-body">
            <h3 className="card-title">{image.title}</h3>
            <p className="card-text">{image.description}</p>
          </div>
          <div>
            {isAuthenticated && (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-around",
                  alignItems: "center",
                  padding: "10px 0",
                }}
              >
                <button
                  onClick={() => dispatch(likeImage(image._id))}
                  className="btn btn-primary"
                >
                  Like <span>{image.likes?.length || 0}</span>
                </button>
                <button
                  onClick={() => setcommmentModal(!commmentModal)}
                  className="btn btn-primary"
                >
                  Comments <span>{image.comments?.length || 0}</span>
                </button>
                {image && user ? (
                  image.user === user._id ? (
                    <>
                      <button
                        onClick={() => openModal(image)}
                        className="btn btn-primary"
                      >
                        Edit
                      </button>
                      <button onClick={deleteImg} className="btn btn-danger">
                        Delete
                      </button>
                    </>
                  ) : null
                ) : null}
              </div>
            )}
          </div>
        </div>
        {modalVisiable && (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <div className="container py-4">
                <h4 style={{ color: "#fff" }}>Edit your post</h4>
                <form onSubmit={handelSubmit}>
                  <div className="form-group">
                    <label className="text-light" htmlFor="exampleInputEmail1">
                      Image Title
                    </label>
                    <input
                      type="text"
                      onChange={handelChange}
                      name="title"
                      value={newImage.title}
                      className="form-control"
                      placeholder="Title"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="text-light" htmlFor="exampleInputName">
                      ImageUrl
                    </label>
                    <input
                      type="text"
                      onChange={handelChange}
                      name="imageUrl"
                      value={newImage.imageUrl}
                      className="form-control"
                      placeholder="Image Url"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label
                      className="text-light"
                      htmlFor="exampleInputPassword1"
                    >
                      Description
                    </label>
                    <input
                      type="text"
                      onChange={handelChange}
                      name="description"
                      value={newImage.description}
                      className="form-control"
                      placeholder="Description"
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Update
                  </button>
                </form>
              </div>
            </div>
          </>
        )}
      </div>
      {commmentModal && (
        <>
          <div className="container py-4">
            <form
              onSubmit={() => {
                if (text.trim === "") {
                  return;
                }
                dispatch(addComment(text, image._id));
              }}
            >
              <div className="form-group">
                <label className="text-light" htmlFor="exampleInputEmail1">
                  Comment this post
                </label>
                <input
                  type="text"
                  onChange={(e) => settext(e.target.value)}
                  name="title"
                  value={text}
                  className="form-control"
                  placeholder="Title"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Comment
              </button>
            </form>
          </div>
          {image.comments &&
            image.comments.map((com) => (
              <div
                key={com._id}
                className="container pt-4 d-flex justify-content-around flex-md-nowrap flex-wrap"
              >
                <div className="card"></div>
                <div className="card-body">
                  <h3 className="card-title" style={{ color: "#fff" }}>
                    {com.text}
                  </h3>
                  <p className="card-text" style={{ color: "#fff" }}>
                    by {com.postedBy.name}
                  </p>
                </div>
              </div>
            ))}
        </>
      )}
    </>
  );
};

export default SingleImage;
