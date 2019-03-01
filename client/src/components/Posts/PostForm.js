import React, { Component } from 'react';
import {connect} from 'react-redux';
import {addPost} from '../../actions/postActions';
import TextArea from '../../common/TextAreaGroup';


class PostForm extends Component {
  constructor(props) {
      super(props);
      this.state ={
          text : "",
          errors : {}
      }

      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
        this.setState({
            errors : nextProps.errors
        })
    }
  }

  onSubmit(e) {
      e.preventDefault();
      const {user} = this.props.auth;
      const newPost = {
          text : this.state.text,
          name : user.name,
          avatar : user.avatar
      }

      this.props.addPost(newPost);
      this.setState({
          text : ''
      })
  }

  onChange(e) {
      this.setState({
          [e.target.name] : e.target.value
      })
  }

  render() {

    const {errors} = this.state;
    
    return (
      <div className="post-form mb-3">
            <div  className="card card-info">
              <div  className="card-header bg-info text-white">
                Say Somthing...
              </div>
              <div  className="card-body">
                <form onSubmit={this.onSubmit}>
                  <div  className="form-group">
                    <TextArea
                        placeholder="Create a post"
                        error={errors.text}
                        value={this.state.text}
                        onChange={this.onChange}
                        name="text"
                        className="form-control form-control-lg"
                    />
                  </div>
                  <button type="submit"  className="btn btn-dark">Submit</button>
                </form>
              </div>
            </div>
          </div>
    )
  }
}

const mapStateToProps = state => ({
    auth : state.auth,
    post : state.post,
    errors : state.errors
})

export default connect(mapStateToProps, {addPost})(PostForm);