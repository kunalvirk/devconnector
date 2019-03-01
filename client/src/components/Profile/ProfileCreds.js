import React, { Component } from 'react';
import Moment from 'react-moment';

class ProfileCreds extends Component {    
  render() {
    const {education, experience} = this.props;
    return (
      <div className="row">
        <div className="col-md-6">
            <h3 className="text-center text-inf">Experience</h3>
            <ul className="list-group">
                {experience.map(exp => (
                    <li className="list-group-item">
                        <h4>{exp.company}</h4>
                        <p><Moment format="YYYY/MM/DD">{exp.from}</Moment> {' - '} {exp.to == null ? 'NOW' : <Moment format="YYYY/MM/DD">{exp.to}</Moment> }</p>
                        <p><strong>Position : </strong> {exp.title}</p>
                        <p><strong>Location : </strong> {exp.location}</p>
                        <p><strong>Description : </strong> {exp.description}</p>
                    </li>
                ))}
            </ul>
        </div>
        <div className="col-md-6">
            <h3 className="text-center text-inf">Education</h3>
            <ul className="list-group">
                {education.map(edu => (
                    <li className="list-group-item">
                        <h4>{edu.school}</h4>
                        <p><Moment format="YYYY/MM/DD">{edu.from}</Moment> {' - '} {edu.to == null ? 'NOW' : <Moment format="YYYY/MM/DD">{edu.to}</Moment> }</p>
                        <p><strong>Degree : </strong> {edu.degree}</p>
                        <p><strong>Field of Study : </strong> {edu.fieldofstudy}</p>
                        <p><strong>Description : </strong> {edu.description}</p>
                    </li>
                ))}
            </ul>
        </div>
      </div>
    )
 }
}

export default ProfileCreds;
