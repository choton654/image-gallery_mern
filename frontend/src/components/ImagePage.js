import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getImages } from '../redux/image/imageAction';
import { loadUser } from '../redux/user/userAction';

const ImagePage = (props) => {
  const Image = useSelector((state) => state.Image);
  const { images } = Image;
  const User = useSelector((state) => state.User);
  const { isAuthenticated, user } = User;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getImages());
    dispatch(loadUser());
  }, []);

  return (
    <div className='container-fluid'>
      <div className='row'>
        {images.map((image) => (
          <div key={image._id} className='col-sm-6 col-md-4 py-3'>
            <Link to={`/images/${image._id}`}>
              <img
                style={{
                  width: '100%',
                }}
                src={image.imageUrl}
                alt='image'
                className='img-thumbnail img-fluid'></img>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImagePage;
