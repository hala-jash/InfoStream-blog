import React, { useState, useEffect } from 'react';
import baseUrl from '../utils/api';
import { formatDate, limitText } from '../utils/format';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';

export default function Home() {
  const [recentArticles, setRecentArticles] = useState([]);
  const [topArticles, setTopArticles] = useState([]);
  useEffect(() => {
    baseUrl
      .get('/api/articles')
      .then((response) => {
        const articles = response.data.articles;
        console.log(articles);
        const sortedArticles = articles.sort((a, b) => {
          return new Date(b.created_at) - new Date(a.created_at);
        });
        const topFiveRecentArticles = sortedArticles.slice(0, 5);

        setRecentArticles(topFiveRecentArticles);

        const sortedTopArticles = articles.sort(
          (a, b) => b.comment_count - a.comment_count
        );
        const topThreeArticles = sortedTopArticles.slice(0, 3);
        setTopArticles(topThreeArticles);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className='HomeContainer'>
      <main className='mainContent'>
        <h2>Recent Articles</h2>
        <section className='article-list'>
          {recentArticles.map((article) => (
            <div key={article.article_id}>
              <div className='article'>
                <div className='article-image'>
                  <img
                    src={article.article_img_url}
                    alt={article.title}
                    className='image'
                  />
                </div>
                <div className='article-info'>
                  <h3>{limitText(article.title, 5)} ...</h3>
                  <button>{article.topic}</button>
                  <p>{article.author}</p>
                  <p>{formatDate(article.created_at)}</p>
                  <p className='bodyText'>{article.body}</p>
                  <p>
                    <FontAwesomeIcon icon={faThumbsUp} className='fa-regular' />
                    {article.votes}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </section>
      </main>
      <aside className='asideContent'>
        <h2>Top Articles</h2>
        <section className='article-list-top'>
          {topArticles.map((article) => (
            <div key={article.article_id}>
              <div className='article-top'>
                <img src={article.article_img_url} alt={article.title} />
                <div className='article-info'>
                  <h3>{limitText(article.title, 5)} ...</h3>
                  <button>{article.topic}</button>
                  <p>{formatDate(article.created_at)}</p>
                </div>
              </div>
            </div>
          ))}
        </section>
      </aside>
    </div>
  );
}
