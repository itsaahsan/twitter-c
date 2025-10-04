import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import {
  Users,
  MessageSquare,
  TrendingUp,
  Shield,
  Ban,
  Trash2,
  Eye,
  Search,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export default function Admin() {
  const { user } = useAuth();
  const { users: allUsers, tweets, deleteTweet } = useData();
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Check if user is admin (for demo purposes, let's make the first user an admin)
  const isAdmin = user && (user.id === '1' || user.username === 'admin');

  useEffect(() => {
    if (!isAdmin) {
      return; // Don't show admin content to non-admins
    }

    // Get blocked users from localStorage
    const blocked = JSON.parse(localStorage.getItem('twitter_blocked_users') || '[]');
    setBlockedUsers(blocked);

    setUsers(allUsers);
  }, [allUsers, isAdmin]);

  if (!isAdmin) {
    return (
      <div className="admin-error">
        <div className="error-content">
          <Shield size={64} />
          <h2>Access Denied</h2>
          <p>You need admin privileges to access this page.</p>
        </div>
      </div>
    );
  }

  const handleBlockUser = (userId) => {
    const updatedBlockedUsers = [...blockedUsers, userId];
    setBlockedUsers(updatedBlockedUsers);
    localStorage.setItem('twitter_blocked_users', JSON.stringify(updatedBlockedUsers));
  };

  const handleUnblockUser = (userId) => {
    const updatedBlockedUsers = blockedUsers.filter(id => id !== userId);
    setBlockedUsers(updatedBlockedUsers);
    localStorage.setItem('twitter_blocked_users', JSON.stringify(updatedBlockedUsers));
  };

  const handleDeletePost = (tweetId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      deleteTweet(tweetId);
    }
  };

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.displayName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredTweets = tweets.filter(tweet =>
    tweet.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginateItems = (items) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  };

  const getStats = () => {
    const totalUsers = users.length;
    const totalTweets = tweets.length;
    const totalLikes = tweets.reduce((sum, tweet) => sum + tweet.likes.length, 0);
    const blockedCount = blockedUsers.length;

    return {
      totalUsers,
      totalTweets,
      totalLikes,
      blockedCount
    };
  };

  const stats = getStats();

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1><Shield size={24} /> Admin Dashboard</h1>
        <div className="admin-tabs">
          <button
            className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`tab ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            <Users size={16} /> Users
          </button>
          <button
            className={`tab ${activeTab === 'tweets' ? 'active' : ''}`}
            onClick={() => setActiveTab('tweets')}
          >
            <MessageSquare size={16} /> Tweets
          </button>
        </div>
      </div>

      <div className="admin-content">
        {activeTab === 'overview' && (
          <div className="overview-grid">
            <div className="stat-card">
              <Users size={24} />
              <div>
                <h3>{stats.totalUsers}</h3>
                <p>Total Users</p>
              </div>
            </div>
            <div className="stat-card">
              <MessageSquare size={24} />
              <div>
                <h3>{stats.totalTweets}</h3>
                <p>Total Tweets</p>
              </div>
            </div>
            <div className="stat-card">
              <TrendingUp size={24} />
              <div>
                <h3>{stats.totalLikes}</h3>
                <p>Total Likes</p>
              </div>
            </div>
            <div className="stat-card">
              <Ban size={24} />
              <div>
                <h3>{stats.blockedCount}</h3>
                <p>Blocked Users</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="admin-section">
            <div className="section-header">
              <h2>User Management</h2>
              <div className="search-bar">
                <Search size={20} />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="user-list">
              {paginateItems(filteredUsers).map(user => (
                <div key={user.id} className="user-item">
                  <div className="user-info">
                    <img src={user.avatar} alt={user.displayName} />
                    <div>
                      <h3>{user.displayName}</h3>
                      <p>@{user.username}</p>
                      <small>{user.followers?.length || 0} followers</small>
                    </div>
                  </div>
                  <div className="user-actions">
                    {blockedUsers.includes(user.id) ? (
                      <button
                        className="unblock-btn"
                        onClick={() => handleUnblockUser(user.id)}
                      >
                        Unblock
                      </button>
                    ) : (
                      <button
                        className="block-btn"
                        onClick={() => handleBlockUser(user.id)}
                      >
                        Block
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'tweets' && (
          <div className="admin-section">
            <div className="section-header">
              <h2>Content Moderation</h2>
              <div className="search-bar">
                <Search size={20} />
                <input
                  type="text"
                  placeholder="Search tweets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="tweet-list">
              {paginateItems(filteredTweets).map(tweet => (
                <div key={tweet.id} className="admin-tweet-item">
                  <div className="tweet-content-preview">
                    <div className="tweet-author">
                      <img src={tweet.author.avatar} alt={tweet.author.displayName} />
                      <div>
                        <h4>{tweet.author.displayName}</h4>
                        <small>@{tweet.author.username}</small>
                      </div>
                    </div>
                    <p className="tweet-text">{tweet.content}</p>
                    <small className="tweet-stats">
                      {tweet.likes.length} likes • {tweet.retweets.length} retweets
                    </small>
                  </div>
                  <div className="tweet-actions">
                    <button className="view-btn">
                      <Eye size={16} /> View
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDeletePost(tweet.id)}
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pagination */}
        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            <ChevronLeft size={16} />
          </button>
          <span>Page {currentPage}</span>
          <button
            disabled={(activeTab === 'users' ? filteredUsers : filteredTweets).length <= currentPage * itemsPerPage}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}