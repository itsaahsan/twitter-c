import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import Tweet from '../components/Tweet';
import { Bookmark, Search } from 'lucide-react';

export default function Bookmarks() {
  const { user } = useAuth();
  const { tweets } = useData();
  const [bookmarkedTweets, setBookmarkedTweets] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const savedBookmarks = JSON.parse(localStorage.getItem('twitter_bookmarks') || '[]');
    const userBookmarks = savedBookmarks.filter(bookmark => bookmark.userId === user?.id);

    const bookmarkedTweetIds = userBookmarks.map(b => b.tweetId);
    const bookmarkedTweetData = tweets.filter(tweet => bookmarkedTweetIds.includes(tweet.id));

    setBookmarkedTweets(bookmarkedTweetData);
  }, [user, tweets]);

  const filteredBookmarks = bookmarkedTweets.filter(tweet =>
    tweet.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tweet.author.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tweet.author.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bookmarks">
      <div className="bookmarks-header">
        <div className="header-title">
          <Bookmark size={24} />
          <h1>Bookmarks</h1>
        </div>
        <p className="header-subtitle">@{user?.username}</p>
      </div>

      <div className="bookmarks-search">
        <div className="search-input-wrapper">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search your bookmarks"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="bookmarks-content">
        {filteredBookmarks.length === 0 ? (
          <div className="empty-bookmarks">
            <Bookmark size={64} />
            <h2>Save Tweets for later</h2>
            <p>
              Don't let the good ones fly away! Bookmark Tweets to easily find them again in the future.
            </p>
          </div>
        ) : (
          <div className="bookmarks-list">
            {filteredBookmarks.map(tweet => (
              <Tweet key={tweet.id} tweet={tweet} showBookmarkButton={true} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}