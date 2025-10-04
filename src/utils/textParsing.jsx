// Utility functions for parsing hashtags and mentions in tweets

export function parseHashtags(text) {
  const hashtagRegex = /#[a-zA-Z0-9_]+/g;
  return text.match(hashtagRegex) || [];
}

export function parseMentions(text) {
  const mentionRegex = /@[a-zA-Z0-9_]+/g;
  return text.match(mentionRegex) || [];
}

export function renderTweetText(text, onMentionClick = null) {
  // Split text into parts and identify hashtags and mentions
  const parts = text.split(/(\s+)/);

  return parts.map((part, index) => {
    if (part.startsWith('#')) {
      return (
        <span key={index} className="hashtag">
          {part}
        </span>
      );
    } else if (part.startsWith('@')) {
      const username = part.substring(1); // Remove @ symbol
      return (
        <span
          key={index}
          className="mention"
          onClick={() => onMentionClick && onMentionClick(username)}
          style={{ cursor: 'pointer' }}
        >
          {part}
        </span>
      );
    } else if (part.startsWith('http://') || part.startsWith('https://')) {
      return (
        <a key={index} href={part} target="_blank" rel="noopener noreferrer" className="tweet-link">
          {part}
        </a>
      );
    }
    return part;
  });
}

export function extractHashtags(text) {
  const hashtags = parseHashtags(text);
  return hashtags.map(tag => tag.substring(1)); // Remove # symbol
}

export function extractMentions(text) {
  const mentions = parseMentions(text);
  return mentions.map(mention => mention.substring(1)); // Remove @ symbol
}

export function getTrendingHashtags(tweets, limit = 5) {
  const hashtagCounts = {};

  tweets.forEach(tweet => {
    const hashtags = extractHashtags(tweet.content);
    hashtags.forEach(hashtag => {
      hashtagCounts[hashtag] = (hashtagCounts[hashtag] || 0) + 1;
    });
  });

  return Object.entries(hashtagCounts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, limit)
    .map(([hashtag, count]) => ({ hashtag, count }));
}