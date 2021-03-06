import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getProfileByHandle} from '../../actions/profileActions';
import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import ProfileCreds from './ProfileCreds';
import ProfileGithub from './ProfileGithub';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../../common/Spinner';


class Profile extends Component {
  componentDidMount() {
      if (this.props.match.params.handle) {
          this.props.getProfileByHandle(this.props.match.params.handle);
      }
  }

  componentWillReceiveProps(nextProps) {
      if (nextProps.profile.profile === null && this.props.profile.loading) {
        this.props.history.push('/not-found');
      }
  }

  render() {
    let profileContent;
    const {profile, loading} = this.props.profile;

    if (profile === null || loading) {
        profileContent = <Spinner />
    } else {
        profileContent = (
            <div className="col-md-12">
                <div className="row">
                    <div className="col-6">
                        <Link to='/profiles' className="btn btn-light mb-3 float-left">Back To Profiles</Link>
                    </div>
                    <div className="col-6" />
                </div>
                <ProfileHeader profile={profile} />
                <ProfileAbout profile={profile} />
                <ProfileCreds education={profile.education} experience={profile.experience}/>
                {profile.githubusername ? <ProfileGithub username={profile.githubusername} /> : null}
            </div>
        )
    }

    return (
        <div className="profile">
          <div className="container">
            <div className="row">
                {profileContent}
            </div>
          </div>
       </div>
    )
  }
}

Profile.propTypes = {
    profile : PropTypes.object.isRequired,
    getProfileByHandle : PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    profile : state.profile
})

export default connect(mapStateToProps, {getProfileByHandle})(Profile);