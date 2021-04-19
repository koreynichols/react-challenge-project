import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const mapStateToProps = (state) => ({
  auth: state.auth,
})

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={ props => {
      if( !auth.token ) {
        return <Redirect to="/login" />;
      } else {
        return <Component {...props} />;
      }
    }}
  />
);
export default connect(mapStateToProps)(PrivateRoute);
