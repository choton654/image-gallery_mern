import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addImage } from '../redux/image/imageAction';

const CreateImage = (props) => {
  const [image, setImage] = useState({
    title: '',
    imageUrl: '',
    description: '',
  });

  const dispatch = useDispatch();

  const handelChange = (e) => {
    setImage({ ...image, [e.target.name]: e.target.value });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();

    console.log(image);
    // const { name, title, password } = user;
    dispatch(addImage(image));
    props.history.push('/images');

    setImage({
      title: '',
      imageUrl: '',
      description: '',
    });
  };

  return (
    <div className='container py-4'>
      <form onSubmit={handelSubmit}>
        <div className='form-group'>
          <label htmlFor='exampleInputEmail1'>Image Title</label>
          <input
            type='text'
            onChange={handelChange}
            name='title'
            value={image.title}
            className='form-control'
            placeholder='Title'
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='exampleInputName'>ImageUrl</label>
          <input
            type='text'
            onChange={handelChange}
            name='imageUrl'
            value={image.imageUrl}
            className='form-control'
            placeholder='Image Url'
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='exampleInputPassword1'>Description</label>
          <input
            type='text'
            onChange={handelChange}
            name='description'
            value={image.description}
            className='form-control'
            placeholder='Description'
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateImage;
