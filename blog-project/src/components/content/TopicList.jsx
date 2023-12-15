
import React, { useState, useEffect } from 'react';
import baseUrl from '../../utils/api';
import { Link } from 'react-router-dom';

export default function TopicList({ handleTopicClick, fetchAllArticles }) {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    baseUrl.get('/api/topics').then((response) => {
      console.log(response.data.topics);
      setTopics(response.data.topics);
    });
  }, []);

  return (
    <div className='articles-navbar'>
      <div className='topic'>
        {topics.map((topic) => (
          <div
            key={topic.slug}
            onClick={() => handleTopicClick(topic.slug)}
          >
            {topic.slug}
          </div>
        ))}
      </div>
      <div>
        <Link
          to='/articles'
          className='allArticles'
          onClick={() => fetchAllArticles()}
        >
          Articles
        </Link>
      </div>
    </div>
  );
}
