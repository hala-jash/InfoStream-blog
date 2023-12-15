import React, { useState, useEffect } from 'react';
import baseUrl from '../../utils/api';
import { useParams } from 'react-router-dom';
const Comment = ({ setComments }) => {
  const [newComment, setNewComment] = useState('');
  const { articleId } = useParams();
  const [postedComment, setPostedComment] = useState(null);

  // update comment in api
  const handleCommentSubmit = (event) => {
    event.preventDefault();

    const commentData = {
      username: 'cooljmessy',
      body: newComment,
    };

    baseUrl
      .post(`/api/articles/${articleId}/comments`, commentData)
      .then((response) => {
        console.log(response.data.comment);
        const newCommentData = response.data.comment;
        setPostedComment(newCommentData);
        setNewComment('');
        setComments((currComment) => {
          return [newCommentData, ...currComment];
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className='comments'>
      <form onSubmit={handleCommentSubmit}>
        <textarea
          value={newComment}
          onChange={(event) => setNewComment(event.target.value)}
          placeholder='Add a comment...'
          required
        />
        <button className='button' type='submit'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Comment;
