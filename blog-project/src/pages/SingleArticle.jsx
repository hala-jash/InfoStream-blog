import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { formatDate, limitText } from '../utils/format';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faComment,
  faThumbsUp,
  faThumbsDown,
} from '@fortawesome/free-regular-svg-icons';
import { faTag } from '@fortawesome/free-solid-svg-icons';
import baseUrl from '../utils/api';
import GetComments from '../components/content/GetComments';

const SingleArticle = () => {
  const { articleId } = useParams();
  const [article, setArticle] = useState([]);
  const [voted, setVoted] = useState(false);
  const [sameAuthor, setArticlesBySameAuthor] = useState([]);
  const [users, setUsers] = useState([]);
  const [authorUser, setAuthorUser] = useState(null);
  useEffect(() => {
    baseUrl
      .get(`/api/articles/${articleId}`)
      .then((response) => {
        setArticle({ ...response.data.article });
        setVoted(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [articleId]);

  const handleVote = (type) => {
    let updatedVotes = article.votes;
    let newVoted = voted;

    if (type === 'up' && !voted) {
      updatedVotes++;
      newVoted = true;
    } else if (type === 'down' && !voted) {
      updatedVotes--;
      newVoted = true;
    } else if ((type === 'up' && voted) || (type === 'down' && voted)) {
      updatedVotes = type === 'up' ? updatedVotes + 1 : updatedVotes - 1;
      newVoted = !voted;
    }

    setArticle({ ...article, votes: updatedVotes });
    setVoted(newVoted);
    baseUrl
      .patch(`/api/articles/${articleId}`, { inc_votes: 1 })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    if (article && users.length > 0) {
      const user = users.find((user) => user.username === article.author);
      setAuthorUser(user);
    }
  }, [article, users]);
  useEffect(() => {
    baseUrl
      .get(`/api/articles/${articleId}`)
      .then((response) => {
        const currentArticle = response.data.article;
        setArticle({ ...currentArticle });
        baseUrl
          .get('/api/articles')
          .then((response) => {
            const articles = response.data.articles;

            const sameAuthor = articles.filter(
              (author) => author.author === currentArticle.author
            );

            setArticlesBySameAuthor(sameAuthor);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [articleId]);

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
    <div className='f-card'>
      <main className='f-main'>
        {article && (
          <div className='f-article'>
            <h1>{article.title}</h1>
            <img
              src={article.article_img_url}
              alt={article.title}
              className='f-img'
            />
            <div className='f-article-info'>
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
                  <p className='date'>{formatDate(article.created_at)}</p>
                  <button className='topic-bt'>
                    <FontAwesomeIcon icon={faTag} />
                    {article.topic}
                  </button>
                </div>
                <div className='button-article'>
                  <FontAwesomeIcon
                    icon={faThumbsUp}
                    className='f-fa-regular'
                    onClick={() => handleVote('up')}
                  />
                  <div className='button'>{article.votes}</div>
                  <button onClick={() => handleVote('up')}></button>
                  <FontAwesomeIcon
                    icon={faThumbsDown}
                    className='f-fa-regular'
                    onClick={() => handleVote('down')}
                  />
                </div>
              </div>

              <p className='f-bodyText'>{article.body}</p>

              <p>
                <FontAwesomeIcon icon={faComment} className='f-fa-regular' />
                Comments:
                {article.comment_count}
              </p>
            </div>
          </div>
        )}
        <GetComments />
      </main>
      <aside>
        <h2>Similar Reads</h2>
        <div className='article-list-top '>
          {sameAuthor.map((article) => (
            <div key={article.article_id}>
              <div className='article-top'>
                <img src={article.article_img_url} alt={article.title} />
                <div className='article-info'>
                  <h3>{limitText(article.title, 5)} ...</h3>
                  <div>

                    <button className='topic-bt'>{article.topic}</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
};

export default SingleArticle;
