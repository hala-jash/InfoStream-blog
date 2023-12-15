import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { faTag } from '@fortawesome/free-solid-svg-icons';
import baseUrl from '../utils/api';
import { formatDate } from '../utils/format';

const SingleArticle = () => {
  const { articleId } = useParams();
  console.log(articleId);
  const [article, setArticle] = useState([]);
  useEffect(() => {
    baseUrl
      .get(`/api/articles/${articleId}`)
      .then((response) => {
        console.log(response.data.article);
        setArticle(response.data.article);
        console.log(article);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [articleId]);

  return (
    <div className='f-card'>
      <main className='f-main'>
        {article && (
          <div className='f-Article'>
            <img src={article.article_img_url} alt={article.title} />
            <div className='f-article-info'>
              <h3>{article.title} ...</h3>
              <button>
                {' '}
                <FontAwesomeIcon icon={faTag} />
                {article.topic}
              </button>
              <p>{article.author}</p>
              <p>{formatDate(article.created_at)}</p>
              <p className='f-bodyText'>{article.body}</p>
              <p>
                <FontAwesomeIcon icon={faThumbsUp} className='f-fa-regular' />{' '}
                {article.votes}
              </p>
              <p>
                {' '}
                <FontAwesomeIcon icon={faComment} className='f-fa-regular' />
                {article.comment_count}
              </p>
            </div>
          </div>
        )}
      </main>
      <aside></aside>
    </div>
  );
};

export default SingleArticle;
