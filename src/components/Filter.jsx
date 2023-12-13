// TopicList.js
import React, { useState, useEffect } from 'react';
import baseUrl from '../utils/api';
import { Link } from 'react-router-dom';

export default function TopicList({ handleTopicClick, fetchAllArticles }) {
  const [topics, setTopics] = useState([]);
  const [selectTopic, setSelectTopic] = useState('');

  useEffect(() => {
    baseUrl.get('/api/topics').then((response) => {
      setTopics(response.data.topics);
    });
  }, []);

  const handleTopicChange = (event) => {
    setSelectTopic(event.target.value);
    handleTopicClick(event.target.value);
  };

  return (
    <div className='categories'>
      <select value={selectTopic} onChange={handleTopicChange}>
        <option value=''>Select a topic</option>
        {topics.map((topic) => (
          <option key={topic.slug} value={topic.slug}>
            {topic.slug}
          </option>
        ))}
      </select>

      <Link
        to='/articles'
        className='article'
        onClick={() => fetchAllArticles()}
      >
        Articles
      </Link>
    </div>
  );
}
