import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteImage, editImage, getOneImg } from '../redux/image/imageAction';
import { loadUser } from '../redux/user/userAction';

const SingleImage = (props) => {
  const [modalVisiable, setModalVisiable] = useState(false);
  const [newImage, setNewImage] = useState({
    title: '',
    imageUrl: '',
    description: '',
  });
  const dispatch = useDispatch();
  const Image = useSelector((state) => state.Image);
  const { image } = Image;
  const User = useSelector((state) => state.User);
  const { isAuthenticated, user } = User;
  useEffect(() => {
    dispatch(getOneImg(props.match.params.id));
    dispatch(loadUser());
  }, []);

  const deleteImg = (id) => {
    dispatch(deleteImage(image._id));
    props.history.push('/images');
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
      }),
    );

    props.history.push('/images');
  };

  return (
    <div className='container pt-4 d-flex justify-content-around flex-md-nowrap flex-wrap'>
      <div className='card' style={{ width: '18rem' }}>
        <img
          className='card-img-top img-fluid'
          src={image.imageUrl}
          alt='Card image cap'></img>
        <div className='card-body'>
          <h3 className='card-title'>{image.title}</h3>
          <p className='card-text'>{image.description}</p>
        </div>
        <div>
          {isAuthenticated && image.user === user._id && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                padding: '10px 0',
              }}>
              <button
                onClick={() => openModal(image)}
                className='btn btn-primary'>
                Edit
              </button>
              <button onClick={deleteImg} className='btn btn-danger'>
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
      {modalVisiable && (
        <div className='container py-4'>
          <form onSubmit={handelSubmit}>
            <div className='form-group'>
              <label className='text-light'  htmlFor='exampleInputEmail1'>Image Title</label>
              <input
                type='text'
                onChange={handelChange}
                name='title'
                value={newImage.title}
                className='form-control'
                placeholder='Title'
                required
              />
            </div>
            <div className='form-group'>
              <label className='text-light'  htmlFor='exampleInputName'>ImageUrl</label>
              <input
                type='text'
                onChange={handelChange}
                name='imageUrl'
                value={newImage.imageUrl}
                className='form-control'
                placeholder='Image Url'
                required
              />
            </div>
            <div className='form-group'>
              <label className='text-light'  htmlFor='exampleInputPassword1'>Description</label>
              <input
                type='text'
                onChange={handelChange}
                name='description'
                value={newImage.description}
                className='form-control'
                placeholder='Description'
              />
            </div>
            <button type='submit' className='btn btn-primary'>
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default SingleImage;
