import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {deletePost, addLike, removeLike} from '../../actions/postActions';

class PostItem extends Component {

    addLike(id) {
        this.props.addLike(id); 
    }
    
    removeLike(id) {
        this.props.removeLike(id); 
    }

    deletePost(id) {
        this.props.deletePost(id);
    }

    render() {
    const {post, auth, showActions} = this.props;
    return (
        <div className="card card-body mb-3">
            <div className="row">
            <div className="col-md-2">
                <a href="profile.html">
                <img className="rounded-circle d-none d-md-block" src={post.avatar}
                    alt="" />
                </a>
                <br />
                <p className="text-center">{post.name}</p>
            </div>
            <div className="col-md-10">
                <p className="lead">{post.text}</p>
                {showActions ? <span>
                    <button type="button" className="btn btn-light mr-1" onClick={this.addLike.bind(this, post._id)}>
                    <i className="text-info fas fa-thumbs-up"></i>
                    <span className="badge badge-light">{post.likes.length}</span>
                </button>
                <button type="button" className="btn btn-light mr-1" onClick={this.removeLike.bind(this, post._id)}>
                    <i className="text-secondary fas fa-thumbs-down"></i>
                </button>
                <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                Comments
                </Link>
                {auth.user.id === post.user ? (
                    <button className="btn btn-danger mr-1" type="button" onClick={this.deletePost.bind(this, post._id)}>
                        <i className="fas fa-times"></i>
                    </button>
                ) : ''}
                </span> : null}
            </div>
            </div>
        </div>
    )
  }
}

PostItem.defaultProps = {
    showActions : true
}

const mapStateToProps = state => ({
    auth : state.auth
})

export default connect(mapStateToProps, {deletePost, addLike, removeLike})(PostItem);