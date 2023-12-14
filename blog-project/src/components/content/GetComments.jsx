import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import baseUrl from '../../utils/api';
import { formatDate } from '../../utils/format';
import Comment from './Comment';

const GetComments = () => {
  const { articleId } = useParams();
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [visibleComments, setVisibleComments] = useState(3);

  useEffect(() => {
    const fetchComments = () => {
      baseUrl
        .get(`/api/articles/${articleId}/comments`)
        .then((response) => {
          setComments(response.data.comments.reverse());
        })
        .catch((error) => {
          console.log(error);
        });
    };

    fetchComments();
  }, [articleId]);

  const deleteComment = (commentId) => {
    baseUrl.delete(`/api/comments/${commentId}`).then((response) => {
      console.log('deleted');
      setComments((currComments) => {
        return currComments.filter((comment) => {
         return comment.comment_id !== commentId
       })
      })
    });
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const showMore = () => {
    setVisibleComments((prevCount) => prevCount + 10);
  };

  return (
    <div className='commentContainer'>
      <h2>Comments</h2>
      <Comment setComments={setComments} />
      <button onClick={toggleComments} className='button button-comments'>
        {showComments ? 'Hide Comments' : 'Show Comments'}
      </button>
      {showComments && (
        <div>
          <ul>
            {comments.slice(0, visibleComments).map((comment) => (
              <li key={comment.comment_id} className='commentCard card'>
                {comment.author === 'cooljmessy' && (
                  <button
                    className='button'
                    onClick={() => {
                      deleteComment(comment.comment_id);
                    }}
                  >
                    Delete
                  </button>
                )}

                <p>{comment.author}</p>
                <p>{comment.votes}</p>
                <p>{comment.body}</p>
                <p>{formatDate(comment.created_at)}</p>
              </li>
            ))}
          </ul>
          {comments.length > visibleComments && (
            <button className='button' onClick={showMore}>
              Show More
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default GetComments;
