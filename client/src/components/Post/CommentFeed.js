import React from 'react';
import CommentItem from './CommentItem';

const CommentFeed = (props) => {

  const {comments, postId} = props;
  return comments.map(comment => <CommentItem comment={comment} postId={postId} key={comment._id} />)
}


export default CommentFeed;