import React from 'react';

export default function ArticlePreview({ articles }) {
  console.log(articles);
  function formatDate(dates) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const date = new Date(dates);
    return date.toLocaleDateString(undefined, options);
  }

  function limitText(title, limit) {
    const titleWords = title.split(' ');
    let limitedText = '';
    if (title.length <= limit) {
      limitedText = title.slice(0, limit);
    } else {
      limitedText = titleWords.slice(0, limit).join(' ');
    }
    return limitedText;
  }
  return (
    <>
      <section className='article-list'>
        {articles.map((article) => (
          <div key={article.article_id}>
            <div className='article'>
              <img src={article.article_img_url} alt={article.title} />
              <div className='article-info'>
                <h3>{limitText(article.title, 5)} ...</h3>
                <button>{article.topic}</button>
                <p>{article.author}</p>
                <p>{formatDate(article.created_at)}</p>
                <p className='bodyText'>{article.body}</p>
                <span></span>
                <button>ReadMore</button>
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
