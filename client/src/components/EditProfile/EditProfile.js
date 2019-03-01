import React, { Component } from 'react';
import {connect} from 'react-redux';
import TextField from '../../common/TextField';
import SelectList from '../../common/SelectListGroup';
import TextArea from '../../common/TextAreaGroup';
import InputGroup from '../../common/InputGroup';
import {createProfile, getProfile} from '../../actions/profileActions';
import isEmpty from '../../validations/isEmpty';

class EditProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            displaySocialInputs: false,
            handle: '',
            company: '',
            website: '',
            location: '',
            status: '',
            skills: '',
            githubusername: '',
            bio: '',
            twitter: '',
            facebook: '',
            linkedin: '',
            youtube: '',
            instagram: '',
            errors: {}
          }


    }
 

  onSubmit(e) {
      e.preventDefault();
      let userData = {
        handle: this.state.handle,
        company: this.state.company,
        website: this.state.website,
        location: this.state.location,
        status: this.state.status,
        skills: this.state.skills,
        githubusername: this.state.githubusername,
        bio: this.state.bio,
        twitter: this.state.twitter,
        facebook: this.state.facebook,
        linkedin: this.state.linkedin,
        youtube: this.state.youtube,
        instagram: this.state.instagram
      }

      this.props.createProfile(userData, this.props.history)
  }

  onChange(e) {
      this.setState({[e.target.name] : e.target.value})
  }

  componentDidMount() {
    this.props.getProfile();
  }

  componentWillReceiveProps(nextProps) {
      if (nextProps.errors) {
          this.setState({errors : nextProps.errors})
      }

      if (nextProps.profile.profile) {

        const profile = nextProps.profile.profile;

        // Bring skills array back to CSV
        const skillsCSV = profile.skills.join(',');

        // If profile field doesnt exist, make empty string
        profile.company = !isEmpty(profile.company) ? profile.company : '';
        profile.website = !isEmpty(profile.website) ? profile.website : '';
        profile.location = !isEmpty(profile.location) ? profile.location : '';
        profile.githubusername = !isEmpty(profile.githubusername) ? profile.githubusername : '';
        profile.bio = !isEmpty(profile.bio) ? profile.bio : '';
        profile.social = !isEmpty(profile.social) ? profile.social : {};
        profile.twitter = !isEmpty(profile.social.twitter) ? profile.social.twitter : '';
        profile.facebook = !isEmpty(profile.social.facebook)
            ? profile.social.facebook
            : '';
        profile.linkedin = !isEmpty(profile.social.linkedin)
            ? profile.social.linkedin
            : '';
        profile.youtube = !isEmpty(profile.social.youtube)
            ? profile.social.youtube
            : '';
        profile.instagram = !isEmpty(profile.social.instagram)
            ? profile.social.instagram
            : '';

        // Set component fields state
        this.setState({
            handle: profile.handle,
            company: profile.company,
            website: profile.website,
            location: profile.location,
            status: profile.status,
            skills: skillsCSV,
            githubusername: profile.githubusername,
            bio: profile.bio,
            twitter: profile.twitter,
            facebook: profile.facebook,
            linkedin: profile.linkedin,
            youtube: profile.youtube,
            instagram: profile.instagram
        });

      }

  }

  render() {
    let {errors, displaySocialInputs} = this.state;
    const options = [
        { label: '* Select Professional Status', value: 0 },
        { label: 'Developer', value: 'Developer' },
        { label: 'Junior Developer', value: 'Junior Developer' },
        { label: 'Senior Developer', value: 'Senior Developer' },
        { label: 'Manager', value: 'Manager' },
        { label: 'Student or Learning', value: 'Student or Learning' },
        { label: 'Instructor or Teacher', value: 'Instructor or Teacher' },
        { label: 'Intern', value: 'Intern' },
        { label: 'Other', value: 'Other' }
    ];
    
    let socialInputs;

    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Twitter Profile URL"
            name="twitter"
            icon="fab fa-twitter"
            value={this.state.twitter}
            onChange={this.onChange.bind(this)}
            error={errors.twitter}
          />

          <InputGroup
            placeholder="Facebook Page URL"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.onChange.bind(this)}
            error={errors.facebook}
          />

          <InputGroup
            placeholder="Linkedin Profile URL"
            name="linkedin"
            icon="fab fa-linkedin"
            value={this.state.linkedin}
            onChange={this.onChange.bind(this)}
            error={errors.linkedin}
          />

          <InputGroup
            placeholder="YouTube Channel URL"
            name="youtube"
            icon="fab fa-youtube"
            value={this.state.youtube}
            onChange={this.onChange.bind(this)}
            error={errors.youtube}
          />

          <InputGroup
            placeholder="Instagram Page URL"
            name="instagram"
            icon="fab fa-instagram"
            value={this.state.instagram}
            onChange={this.onChange.bind(this)}
            error={errors.instagram}
          />
        </div>
      );
    }

    return (
      <div className="create-profile">
        <div className="container">
            <div className="row">
                <div className="col-md-8 m-auto">
                    <h1 className="display-4 text-center">
                        Edit Your Profile
                    </h1>
                    <small className="d-block pb-3">* = required field</small>
                    
                    <form noValidate onSubmit={this.onSubmit.bind(this)}>
                        <TextField
                            value={this.state.handle}
                            name="handle"
                            error={errors.handle}
                            onChange={this.onChange.bind(this)}
                            info="A unique handle for your profile URL. Your full name, company name, nickname, etc (This CAN'T be changed later)"
                            placeholder="Profile Handle name"
                        />
                        <SelectList
                            name="status"
                            onChange={this.onChange.bind(this)}
                            options={options}
                            value={this.state.status}
                            error={errors.status}
                            info="Give us an idea of where you are at in your career"
                        />
                        <TextField
                            value={this.state.company}
                            name="company"
                            error={errors.company}
                            onChange={this.onChange.bind(this)}
                            info="Could be your own company or one you work for"
                            placeholder="Company"
                        />
                        <TextField
                            value={this.state.location}
                            name="location"
                            error={errors.location}
                            onChange={this.onChange.bind(this)}
                            info="City & state suggested (eg. Boston, MA)"
                            placeholder="Currently working location"
                        />
                        <TextField
                            value={this.state.skills}
                            name="skills"
                            error={errors.skills}
                            onChange={this.onChange.bind(this)}
                            info="Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)"
                            placeholder="HTML, CSS, PHP, JavaScript"
                        />
                        <TextField
                            value={this.state.githubusername}
                            name="githubusername"
                            error={errors.githubusername}
                            onChange={this.onChange.bind(this)}
                            info="If you want your latest repos and a Github link, include your username"
                            placeholder="Github username"
                        />
                        <TextArea
                            value={this.state.bio}
                            name="bio"
                            error={errors.bio}
                            onChange={this.onChange.bind(this)}
                            info="Tell us a little about yourself"
                            placeholder="A Short bio of yourself"
                        />

                        <button 
                            type="button" 
                            className="btn btn-light"
                            onClick={() => this.setState(prevState => ({displaySocialInputs : !prevState.displaySocialInputs}))}>
                            Add Social Network Links
                        </button>
                        <span className="text-muted">Optional</span>
                        <div className="mt-3">
                            {socialInputs}
                        </div>

                        <input type="submit" className="btn btn-info btn-block mt-4" value="Save My Profile"/>

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

export default connect(mapStateToProps, {createProfile, getProfile})(EditProfile);