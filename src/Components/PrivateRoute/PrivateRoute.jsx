import React from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';

const PrivateRoute = ({ component: Component, authenticated, ...rest }) => {
  return (
    <Routes>
      <Route
        {...rest}
        element={(props) =>
          authenticated ? <Component {...props} /> : <Navigate to="/login" />
        }
      />
    </Routes>
  );
};

export default PrivateRoute;
