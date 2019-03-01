import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { registerAction } from '../../actions/authActions';
import TextField from '../../common/TextField';

class Register extends Component {

    state = {
        name : '',
        email : '',
        password : '',
        password2 : '',
        errors : {}
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({errors : nextProps.errors})
        }
    }

    componentDidMount() {
        if (this.props.auth.isAuthorised) {
            this.props.history.push('/dashboard')
        }
    }

    onChange = (e) => {
        this.setState({[e.target.name] : e.target.value})
    }

    onSubmit = (e) => {
        e.preventDefault()
        let formData = {
            name : this.state.name,
            email : this.state.email,
            password : this.state.password,
            password2 : this.state.password2
        }
        
        this.props.registerAction(formData, this.props.history)
    }

    render() {
        let { errors } = this.state;
        let { user } = this.props.auth;
        return (
            <div className="register">
                {user ? user.name : null}
                <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                    <h1 className="display-4 text-center">Sign Up</h1>
                    <p className="lead text-center">Create your DevConnector account</p>
                    <form noValidate onSubmit={this.onSubmit.bind(this)}>
                        <TextField
                            type="text"
                            onChange={this.onChange}
                            placeholder="Your name"
                            name="name"
                            value={this.state.name}
                            error={errors.name}
                            info=""
                        />

                        <TextField
                            type="text"
                            onChange={this.onChange}
                            placeholder="Your Email Id"
                            name="email"
                            value={this.state.email}
                            error={errors.email}
                            info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
                        />

                        <TextField
                            type="text"
                            onChange={this.onChange}
                            placeholder="Password"
                            name="password"
                            value={this.state.password}
                            error={errors.password}
                            info="Password should be between 6 and 20 characters"
                        />

                        <TextField
                            type="text"
                            onChange={this.onChange}
                            placeholder="Confirm Password"
                            name="password2"
                            value={this.state.password2}
                            error={errors.password2}
                            info=""
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


Register.propTypes = {
    registerAction : PropTypes.func.isRequired,
    auth : PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth : state.auth,
    errors : state.errors
})

export default connect(mapStateToProps, {registerAction})(withRouter(Register));