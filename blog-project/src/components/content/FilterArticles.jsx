import React, { useState, useEffect } from 'react';
import baseUrl from '../../utils/api';
import TopicList from './TopicList';
import ArticlePreview from './ArticlePreview';

const FilterArticles = () => {
  const [selectTopic, setSelectTopic] = useState('');
  const [articles, setArticles] = useState([]);
  const [showAllArticles, setShowAllArticles] = useState(false);
  const [sortBy, setSortBy] = useState('');
  const [order, setOrder] = useState('');


  useEffect(() => {
    fetchAllArticles()
  }, []);

  useEffect(() => { 
    if ((selectTopic  || showAllArticles) || (sortBy && order)) {
      fetchArticles(selectTopic, sortBy, order);
    }
  }, [selectTopic, showAllArticles, sortBy, order]);

  const fetchArticles = (topic, sortByOption, orderOption) => {
    let endpoint = '/api/articles';
    let query = '';
  
    if (topic) {
      query += `?topic=${topic}`;
    }
  
    if (sortByOption && orderOption) {
      query += `${query ? '&' : '?'}sort_by=${sortByOption}&order=${orderOption}`;
    }
  
    baseUrl
      .get(endpoint + query)
      .then((response) => {
        setArticles(response.data.articles);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  

  const handleTopicClick = (topic) => {
    setSelectTopic(topic);
    setShowAllArticles(false);
    setSortBy('');
    setOrder('');
  };

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
    setShowAllArticles(false);
  };

  const handleOrderChange = (event) => {
    setOrder(event.target.value);
    setShowAllArticles(false);
  };

  const fetchAllArticles = () => {
    baseUrl
      .get('/api/articles')
      .then((response) => {
        setArticles(response.data.articles);
        setSelectTopic('');
        setShowAllArticles(true);
        setSortBy('');
        setOrder('');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <TopicList
        handleTopicClick={handleTopicClick}
        fetchAllArticles={fetchAllArticles}
      />
      <div className='drop-down'>
      <select value={sortBy} onChange={handleSortByChange}>
        <option value=''>Sort by</option>
        <option value='title'>Title</option>
        <option value='author'>Author</option>
        <option value='created_at'>Created At</option>
        <option value='votes'>Votes</option>
        <option value='topic'>Topic</option>
        </select>
        <select value={order} onChange={handleOrderChange}>
        <option value=''>Order</option>
        <option value='ASC'>Ascending</option>
        <option value='DESC'>Descending</option>
      </select>
</div>




      <h2 className='h2'>{showAllArticles ? 'All Articles' : selectTopic}</h2>
      <ArticlePreview selectTopic={selectTopic} articles={articles} />
    </div>
  );
};

export default FilterArticles;
