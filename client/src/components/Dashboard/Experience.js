import React, { Component } from 'react';
import {connect} from 'react-redux';
import Moment from 'react-moment';
import {deleteExperience} from '../../actions/profileActions';

class Experience extends Component {

  deleteExperience(id) {
    this.props.deleteExperience(id)
  }

  render() {
    const tableData = this.props.experience.map(exp => (
        <tr key={exp._id}>
            <td>{exp.company}</td>
            <td>{exp.title}</td>
            <td>
              <Moment format="YYYY/MM/DD">{exp.from}</Moment>
               {' - '} 
               {exp.to == null ? 'NOW' : <Moment format="YYYY/MM/DD">{exp.to}</Moment> }
            </td>
            <td>
              <button type="button" className="btn btn-danger" onClick={this.deleteExperience.bind(this, exp._id)}>DELETE</button>
            </td>
        </tr>
    ))
    return (
      <div>
        <h4 className="mb-4">Experience Credentials</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Title</th>
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
  deleteExperience
})(Experience);