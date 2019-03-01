import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class ProfileGithub extends Component {
  constructor(props) {
      super(props);
      this.state = {
          clientId : 'e4cbcd7e20aeb1fcc8f9',
          clientSecret : 'd3d9a0c03c741dac70e95a67bda5a2283d8fb4d8',
          count : 5,
          sort : 'created: asc',
          repos : []
      }
  }

  componentDidMount() {
      const {username} = this.props;
      const {clientId, clientSecret, count, sort} = this.state;

      axios.get(`https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`)
           .then(res => (this.setState({repos : res.data})))
           .catch(err => console.log(err))
  }

  render() {
    
    const {repos} = this.state;
    const repoItems = repos.map(repo => (
      <div key={repo.id} className="card card-body mb-2">
        <div className="row">
          <div className="col-md-6">
            <h4>
              <Link to={repo.html_url} className="text-info" target="_blank">
                {repo.name}
              </Link>
            </h4>
            <p>{repo.description}</p>
          </div>
          <div className="col-md-6">
            <span className="badge badge-info mr-1">
              Stars: {repo.stargazers_count}
            </span>
            <span className="badge badge-secondary mr-1">
              Watchers: {repo.watchers_count}
            </span>
            <span className="badge badge-success">
              Forks: {repo.forks_count}
            </span>
          </div>
        </div>
      </div>
    ))

    return (
      <div ref="myRef" className="mt-4">
        <h3 className="mb-4">Latest Github Repos</h3>
        {repoItems}
      </div>
    )
  }
}

export default ProfileGithub;
