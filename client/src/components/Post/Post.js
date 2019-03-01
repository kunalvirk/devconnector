import React, { Component } from 'react'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getPost} from '../../actions/postActions';
import CommentForm from './CommentForm';
import Spinner from '../../common/Spinner';
import PostItem from '../Posts/PostItem';
import CommentFeed from './CommentFeed';

class Post extends Component {

    componentDidMount() {
        this.props.getPost(this.props.match.params.post_id)
    }

  render() {
    const {post, loading} = this.props.post;
    let postContent;

    if (post === null || loading || Object.keys(post).length === 0) {
        postContent = <Spinner />
    } else {
        postContent = (
            <div>
                <PostItem post={post} showActions={false}/>
                <CommentForm postId={post._id} />
                <CommentFeed postId={post._id} comments={post.comments} />
            </div>
        )
    }

    return (
      <div>
          <div className="row">
            <Link to="/feeds" className="btn btn-light">
                Go Back
            </Link>
          </div>
          
          {postContent}
          
      </div>
    )
  }
}

const mapStateToProps = state => ({
    post : state.post
})

export default connect(mapStateToProps, {getPost})(Post);
