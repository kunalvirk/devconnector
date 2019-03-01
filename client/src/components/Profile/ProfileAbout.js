import React, { Component } from 'react'
import isEmpty from '../../validations/isEmpty';

class ProfileAbout extends Component {
  render() {
    const {profile} = this.props;
    const firstName = profile.user.name.split(' ')[0];
    const skills = profile.skills;
    return (
        <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            <h3 className="text-center text-info">{firstName}'s Bio</h3>
            <p className="lead">{isEmpty(profile.bio) ? `No bio for ${firstName}` : profile.bio}</p>
            <hr />
            <h3 className="text-center text-info">Skill Set</h3>
            <div className="row">
              <div className="d-flex flex-wrap justify-content-center align-items-center">
                {
                    skills.map((skill, index) => (
                        <div className="p-3" key={index}>
                            <i className="fa fa-check"></i>
                            {skill}
                        </div>
                    ))
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ProfileAbout;
