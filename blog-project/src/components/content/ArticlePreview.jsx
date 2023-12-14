import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { faTag } from '@fortawesome/free-solid-svg-icons';
import { limitText, formatDate } from '../../utils/format';
import baseUrl from '../../utils/api';

export default function ArticlePreview({ articles }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    baseUrl
      .get('api/users')
      .then((response) => {
        setUsers(response.data.users);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <section className='article-list'>
        {articles.map((article) => {
          const authorUser = users.find(
            (user) => user.username === article.author
          );

          return (
            <div key={article.article_id}>
              <Link
                to={`/article/${article.article_id}`}
                className='article-link'
              >
                <div className='article'>
                  <div className='article-aside'>
                    <img
                      src={article.article_img_url}
                      alt={article.title}
                      className='article-img'
                    />
                    <div className='article-userInfo'>
                      <div className='user-info'>
                        {authorUser && (
                          <img
                            className='user-profile'
                            src={authorUser.avatar_url}
                            alt={authorUser.name}
                            width='100'
                            height='100'
                          />
                        )}
                        <p className='user-name'>{article.author}</p>
                      </div>
                      <div className='article-about'>
                        <p>{formatDate(article.created_at)}</p>
                        <div>
                          <FontAwesomeIcon icon={faTag} />
                          {article.topic}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='article-info'>
                    <h2>{limitText(article.title, 5)}...</h2>

                    <p className='bodyText'>{article.body}</p>
                    <p>
                      <FontAwesomeIcon
                        icon={faThumbsUp}
                        className='fa-regular'
                      />
                      {article.votes}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </section>
    </>
  );
}
