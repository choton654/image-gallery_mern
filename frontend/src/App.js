import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import CreateImage from './components/CreateImage';
import EditImage from './components/EditImage';
import HomePage from './components/HomePage';
import ImagePage from './components/ImagePage';
import LoginPage from './components/LoginPage';
import Navbar from './components/Navbar';
import RegisterPage from './components/RegisterPage';
import SingleImage from './components/SingleImage';

function App() {
  return (
    <>
      <Navbar />
      <div className='container'>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/login' component={LoginPage} />
          <Route exact path='/signup' component={RegisterPage} />
          <Route exact path='/createimage' component={CreateImage} />
          <Route exact path='/images' component={ImagePage} />
          <Route exact path='/images/:id' component={SingleImage} />
          <Route exact path='/images/edit/:id' component={EditImage} />
          <Route path='*' component={() => <h1>404 NOT FOUND</h1>} />
        </Switch>
      </div>
    </>
  );
}

export default App;
