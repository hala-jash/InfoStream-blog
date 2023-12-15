export function formatDate(dates) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const date = new Date(dates);
    return date.toLocaleDateString(undefined, options);
  }

export function limitText(title, limit) {
    const titleWords = title.split(' ');
    let limitedText = '';
    if (title.length <= limit) {
      limitedText = title.slice(0, limit);
    } else {
      limitedText = titleWords.slice(0, limit).join(' ');
    }
    return limitedText;
  }