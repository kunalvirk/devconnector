import React, { Component } from 'react';
import {connect} from 'react-redux';
import {logOutAction} from '../../actions/authActions';
import {clearProfile} from '../../actions/profileActions';
import {Link} from 'react-router-dom';

class Navbar extends Component {

    logOut = () => {
        this.props.clearProfile();
        this.props.logOutAction();
    }

    render() {

        const {isAuthorised, user} = this.props.auth;

        const authNav = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/feeds">Post Feeds</Link>
                </li>
                <li className="nav-item">
                    <button onClick={this.logOut.bind(this)} className="nav-link" style={{background:'none', border:'none'}}>
                        <img src={user.avatar} alt={user.name} className="rounded-circle" style={{ width: '25px', marginRight: '5px' }} />
                        Log Out
                    </button>
                </li>
            </ul>
        )

        const guestNav = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/register">Sign Up</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                </li>
            </ul>
        )

        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
                <div className="container">
                <Link className="navbar-brand" to="/">DevConnector</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="mobile-nav">
                    <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/profiles"> Developers
                        </Link>
                    </li>
                    </ul>

                    {/* Conditional Navs */}
                    {isAuthorised ? authNav : guestNav}
                </div>
                </div>
            </nav>
        );
    }
}

const mapStateToProps = state => ({
    auth : state.auth
})

export default connect(mapStateToProps, {logOutAction, clearProfile})(Navbar);