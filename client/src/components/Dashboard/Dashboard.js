import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {getProfile, deleteProfile} from '../../actions/profileActions';
import Experience from './Experience';
import Education from './Education';
import Spinner from '../../common/Spinner';


class Dashboard extends Component {
  componentDidMount() {
      this.props.getProfile();
  }

  deleteAccount(e) {
      this.props.deleteProfile();
  }

  render() {

    let dashboardContent;
    const { user } = this.props.auth;
    const {profile, loading} = this.props.profile;

    if (profile === null || loading) {
        dashboardContent = <Spinner />
    } else {
        if (Object.keys(profile).length > 0) {
            dashboardContent = (
                <div>
                    <h1 className="display-4">Dashboard</h1>
                    <p className="lead text-muted">
                        Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
                    </p>

                    <div className="btn-group mb-4">
                        <Link to="/edit-profile" className="btn btn-light">
                            <i className="fa fa-user mr-1 text-info"></i>
                            Edit Profile
                        </Link>
                        <Link to="/add-experience" className="btn btn-light">
                            <i className="fab fa-black-tie mr-1 text-info"></i>
                            Add Experience
                        </Link>
                        <Link to="/add-education" className="btn btn-light">
                            <i className="fa fa-graduation-cap mr-1 text-info"></i>
                            Add Education
                        </Link>
                    </div>

                    <Experience experience={profile.experience} />
                    <Education education={profile.education} />

                    <div className="deleteBtn">
                        <button className="btn btn-danger" type="button" onClick={this.deleteAccount.bind(this)}>Delete My Account</button>
                    </div>
                </div>
            )
        } else {
            dashboardContent = (
                <div className="text-center">
                    <p className="lead text-muted">Welcome {user.name}</p>
                    <p>You have not yet setup a profile, please add some info</p>
                    <Link to="/create-profile" className="btn btn-lg btn-info">
                    Create Profile
                    </Link>
                </div>
            )
        }
    }

    return (
        <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Dashboard.propTypes = {
    auth : PropTypes.object.isRequired,
    profile : PropTypes.object.isRequired,
    getProfile : PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth : state.auth,
    profile : state.profile
})

export default connect(mapStateToProps, {getProfile, deleteProfile})(Dashboard);