import { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import Tweet from '../components/Tweet';
import { Search, TrendingUp } from 'lucide-react';
import { getTrendingHashtags } from '../utils/textParsing';

export default function Explore() {
  const { searchTweets, searchUsers, tweets, followUser } = useData();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState({ tweets: [], users: [] });
  const [activeTab, setActiveTab] = useState('tweets');

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const tweetResults = searchTweets(searchQuery);
    const userResults = searchUsers(searchQuery);

    setSearchResults({
      tweets: tweetResults,
      users: userResults
    });
  };

  const trendingTopics = useMemo(() => {
    return getTrendingHashtags(tweets, 8);
  }, [tweets]);

  const recentTweets = tweets.slice(0, 10);

  return (
    <div className="explore">
      <div className="explore-header">
        <h1>Explore</h1>
      </div>

      <div className="search-section">
        <form onSubmit={handleSearch} className="search-form">
          <div className="search-input-wrapper">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search Twitter Clone"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button type="submit">Search</button>
        </form>

        {searchQuery && (
          <div className="search-tabs">
            <button
              className={activeTab === 'tweets' ? 'active' : ''}
              onClick={() => setActiveTab('tweets')}
            >
              Tweets ({searchResults.tweets.length})
            </button>
            <button
              className={activeTab === 'users' ? 'active' : ''}
              onClick={() => setActiveTab('users')}
            >
              People ({searchResults.users.length})
            </button>
          </div>
        )}
      </div>

      {searchQuery ? (
        <div className="search-results">
          {activeTab === 'tweets' ? (
            <div className="tweets-results">
              {searchResults.tweets.length === 0 ? (
                <p>No tweets found for "{searchQuery}"</p>
              ) : (
                searchResults.tweets.map(tweet => (
                  <Tweet key={tweet.id} tweet={tweet} />
                ))
              )}
            </div>
          ) : (
            <div className="users-results">
              {searchResults.users.length === 0 ? (
                <p>No people found for "{searchQuery}"</p>
              ) : (
                searchResults.users.map(searchUser => (
                  <div key={searchUser.id} className="user-result">
                    <div className="user-info">
                      <img src={searchUser.avatar} alt={searchUser.displayName} />
                      <div>
                        <h3>{searchUser.displayName}</h3>
                        <p>@{searchUser.username}</p>
                        <p className="user-bio">{searchUser.bio}</p>
                      </div>
                    </div>
                    {searchUser.id !== user.id && (
                      <button
                        onClick={() => followUser(searchUser.id)}
                        className={`follow-btn ${user.following?.includes(searchUser.id) ? 'following' : ''}`}
                      >
                        {user.following?.includes(searchUser.id) ? 'Unfollow' : 'Follow'}
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="explore-content">
          <div className="trending-section">
            <div className="section-header">
              <TrendingUp size={20} />
              <h2>Trending</h2>
            </div>
            <div className="trending-topics">
              {trendingTopics.length > 0 ? (
                trendingTopics.map((topic, index) => (
                  <div key={index} className="trending-topic">
                    <span className="topic-name">#{topic.hashtag}</span>
                    <span className="topic-tweets">{topic.count} tweets</span>
                  </div>
                ))
              ) : (
                <div className="no-trending">
                  <p>No trending topics yet. Start tweeting with hashtags!</p>
                </div>
              )}
            </div>
          </div>

          <div className="recent-tweets-section">
            <h2>Recent Tweets</h2>
            <div className="recent-tweets">
              {recentTweets.map(tweet => (
                <Tweet key={tweet.id} tweet={tweet} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}