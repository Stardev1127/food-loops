import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUser } from './actions';
import './App.scss';
import Loader from './components/commons/Loader';

const App = (props) => {
  const [fetching, setFetching] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(
        fetchUser(() => {
          setFetching(false);
        })
      );
    } else setFetching(false);
  }, [dispatch]);

  if (fetching) return <Loader />;

  return <div>{props.children}</div>;
};

export default App;
