import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import TextField from '../../common/TextField';
import TextAreaGroup from '../../common/TextAreaGroup';
import {connect} from 'react-redux';
import {addExperience} from '../../actions/profileActions';


class AddExperience extends Component {

  constructor(props)     {
      super(props);
      this.state = {
        company : '',
        title : '',
        location : '',
        from : '',
        to : '',
        current : false,
        description : '',
        errors : {},
        disabled : false
      }
      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.onCheck = this.onCheck.bind(this);
  }

  onSubmit(e) {
      e.preventDefault();
      let formData =  {
          company : this.state.company,
          title : this.state.title,
          location : this.state.location,
          from : this.state.from,
          to : this.state.to,
          current : this.state.current,
          description : this.state.description
      }
      this.props.addExperience(formData, this.props.history)
  }

  onCheck(e) {
    this.setState({
        current : !this.state.current,
        disabled : !this.state.disabled
    })
  }

  onChange(e) {
      this.setState({
          [e.target.name] : e.target.value
      })
  }

  componentWillReceiveProps(nextProps) {
      if (nextProps.errors) {
          this.setState({
              errors : nextProps.errors
          })
      }
  }

  render() {
    const {errors} = this.state;
    return (
        <div className="section add-experience">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Your Experience</h1>
              <p className="lead text-center">Add any developer/programming positions that you have had in the past</p>
              <small className="d-block pb-3">* = required field</small>
              <form onSubmit={this.onSubmit}>
                
                <TextField
                    name="title"
                    type="text"
                    onChange={this.onChange}
                    value={this.state.title}
                    error={errors.title}
                    placeholder="Job Title"
                />

                <TextField
                    name="company"
                    type="text"
                    onChange={this.onChange}
                    value={this.state.company}
                    error={errors.company}
                    placeholder="Name Company/Organisation"
                />

                <TextField
                    name="location"
                    type="text"
                    onChange={this.onChange}
                    value={this.state.location}
                    error={errors.location}
                    placeholder="Location"
                />

                <TextField
                    name="from"
                    type="date"
                    onChange={this.onChange}
                    value={this.state.from}
                    error={errors.from}
                    placeholder="From Date"
                />

                <TextField
                    name="to"
                    type="date"
                    onChange={this.onChange}
                    value={this.state.to}
                    error={errors.to}
                    placeholder="To Date"
                    disabled={this.state.disabled ? 'disabled' : ''}
                />

                <div className="form-check mb-2">
                    <input type="checkbox" className="form-check-input" name="current" value={this.state.current} id="current" onClick={this.onCheck} />
                    <label htmlFor="current" className="form-check-label">Current</label>
                </div>

                <TextAreaGroup
                    name="description"
                    onChange={this.onChange}
                    placeholder="Description"
                    error={errors.description}
                    value={this.state.description}
                    info="Some of your responsabilities, etc"
                />

                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
    profile : state.profile,
    errors : state.errors
})

export default connect(mapStateToProps, {addExperience})(AddExperience);