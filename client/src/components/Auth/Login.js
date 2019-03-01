import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {loginAction} from '../../actions/authActions';
import {connect} from 'react-redux';
import TextField from '../../common/TextField';

class Login extends Component {

    state = {
        email : '',
        password : '',
        errors : {}
    }

    onChange = (e) => {
        this.setState({[e.target.name] : e.target.value})
    }

    onSubmit = (e) => {
        e.preventDefault()
        let formData = {
            email : this.state.email,
            password : this.state.password
        }
        this.props.loginAction(formData);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({errors : nextProps.errors})
        }

        if (nextProps.auth.isAuthorised) {
            this.props.history.push('/dashboard')
        }
    }

    componentDidMount() {
        if (this.props.auth.isAuthorised) {
            this.props.history.push('/dashboard')
        }
    }

    render() {
        let { errors } = this.state;
        return (
            <div className="login">
                <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                    <h1 className="display-4 text-center">Log In</h1>
                    <p className="lead text-center">Sign in to your DevConnector account</p>
                    <form onSubmit={this.onSubmit.bind(this)} noValidate>
                        <TextField
                            type="email"
                            value={this.state.email}
                            onChange={this.onChange.bind(this)}
                            placeholder="Email Address" 
                            name="email"
                            error={errors.email}
                        />
                        <TextField
                            type="password"
                            value={this.state.password} 
                            onChange={this.onChange.bind(this)} 
                            placeholder="Password" 
                            name="password"
                            error={errors.password}
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

Login.propTypes = {
    loginAction : PropTypes.func.isRequired,
    auth : PropTypes.object.isRequired
}

const mapStateToProps = state => (
    {
        auth : state.auth,
        errors : state.errors
    }
)

export default connect(mapStateToProps, { loginAction })(Login);