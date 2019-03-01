import React, { Component } from 'react';
import {connect} from 'react-redux';
import Moment from 'react-moment';
import {deleteEducation} from '../../actions/profileActions';

class Education extends Component {

  deleteEducation(id) {
    this.props.deleteEducation(id)
  }

  render() {
    const tableData = this.props.education.map(edu => (
        <tr key={edu._id}>
            <td>{edu.school}</td>
            <td>{edu.degree}</td>
            <td>{edu.fieldofstudy}</td>
            <td>
              <Moment format="YYYY/MM/DD">{edu.from}</Moment>
               {' - '} 
               {edu.to == null ? 'NOW' : <Moment format="YYYY/MM/DD">{edu.to}</Moment> }
            </td>
            <td>
              <button type="button" className="btn btn-danger" onClick={this.deleteEducation.bind(this, edu._id)}>DELETE</button>
            </td>
        </tr>
    ))
    return (
      <div>
        <h4 className="mb-4">Experience Credentials</h4>
        <table className="table">
          <thead>
            <tr>
              <th>School</th>
              <th>Degree</th>
              <th>Field of Study</th>
              <th>Years</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {tableData}
          </tbody>
        </table>
      </div>
    )
  }
}

export default connect(null, {
  deleteEducation
})(Education);