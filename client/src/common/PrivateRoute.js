import React from 'react';
import PropTypes from 'prop-types';
import {Route, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({component : Component, auth, ...rest}) => (
    <Route
        {...rest}
        render = {(props) => (
            auth.isAuthorised === true
            ? <Component {...props} />
            : <Redirect to={{
               pathname : "/login",
               state : "Login to kar chutiye"
            }} />

        )}
    />
)

PrivateRoute.propTypes = {
    auth : PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth : state.auth
})

export default connect(mapStateToProps)(PrivateRoute);

