import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { faTag } from '@fortawesome/free-solid-svg-icons';
import { limitText, formatDate } from '../../utils/format';
export default function ArticlePreview({ articles }) {
  console.log(articles);

  return (
    <>
      <section className='article-list'>
        {articles.map((article) => (
          <div key={article.article_id}>
            <Link
              to={`/article/${article.article_id}`}
              className='article-link'
            >
              <div className='article'>
                <img src={article.article_img_url} alt={article.title} />
                <div className='article-info'>
                  <h3>{limitText(article.title, 5)} ...</h3>
                  <button>
                    {' '}
                    <FontAwesomeIcon icon={faTag} />
                    {article.topic}
                  </button>
                  <p>{article.author}</p>
                  <p>{formatDate(article.created_at)}</p>
                  <p className='bodyText'>{article.body}</p>
                  <p>
                    <FontAwesomeIcon icon={faThumbsUp} className='fa-regular' />
                    {article.votes}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </section>
    </>
  );
}
