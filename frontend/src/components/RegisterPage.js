import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/user/userAction';

const RegisterPage = (props) => {
  const [user, setUser] = useState({
    email: '',
    name: '',
    password: '',
  });

  const dispatch = useDispatch();
  const User = useSelector((state) => state.User);

  const { loading, isAuthenticated, error } = User;

  useEffect(() => {
    if (isAuthenticated) props.history.push('/images');
  }, [isAuthenticated]);

  const handelChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();

    console.log(user);
    // const { name, email, password } = user;
    dispatch(register(user));

    // props.history.push('/images');
    setUser({
      email: '',
      name: '',
      password: '',
    });
  };

  return (
    <div className='container py-4'>
      {error ? (
        <div className='text-center'>
          <h2 className='text-light'>{error}</h2>
          <h4 className='text-light'> refresh the page</h4>
        </div>
      ) : (
        <form onSubmit={handelSubmit}>
          <div className='form-group'>
            <label className='text-light' htmlFor='exampleInputEmail1'>
              Email address
            </label>
            <input
              type='email'
              onChange={handelChange}
              name='email'
              value={user.email}
              className='form-control'
              placeholder='Enter email'
              required
            />
          </div>
          <div className='form-group'>
            <label className='text-light' htmlFor='exampleInputName'>
              Name
            </label>
            <input
              type='text'
              onChange={handelChange}
              name='name'
              value={user.name}
              className='form-control'
              placeholder='Enter name'
              required
            />
          </div>
          <div className='form-group'>
            <label className='text-light' htmlFor='exampleInputPassword1'>
              Password
            </label>
            <input
              type='password'
              onChange={handelChange}
              name='password'
              value={user.password}
              className='form-control'
              placeholder='Password'
              required
            />
          </div>
          <button type='submit' className='btn btn-primary'>
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default RegisterPage;
