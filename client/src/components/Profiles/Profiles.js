import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getAllProfiles} from '../../actions/profileActions';
import ProfileItems from './ProfileItems';
import Spinner from '../../common/Spinner';

class Profiles extends Component {
  
    componentDidMount() {
        this.props.getAllProfiles();
    }

    render() {
        const {profiles, loading} = this.props.profile;
        let profileView;

        if (profiles === null || loading) {    
           profileView = <Spinner />;
        } else {
            if (profiles.length > 0) {
                profileView = profiles.map(profile => {
                    return <ProfileItems key={profile._id} profile={profile} />
                })
            } else {
                profileView = <h4>No profiles found!!!!</h4>;
            }
        }

        return (
            <div className="profiles">
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <h1 className="display-4 text-center">Developer Profiles</h1>
                    <p className="lead text-center">Browse and connect with developers</p>
                    {profileView}
                  </div>
                </div>
              </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    profile : state.profile
})

export default connect(mapStateToProps, {getAllProfiles})(Profiles);