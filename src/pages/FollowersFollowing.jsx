import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { ArrowLeft, Check } from 'lucide-react';

export default function FollowersFollowing() {
  const { userId, type } = useParams(); // type will be 'followers' or 'following'
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();
  const { users, followUser } = useData();
  const [profileUser, setProfileUser] = useState(null);
  const [displayUsers, setDisplayUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const foundUser = users.find(u => u.id === userId);
    setProfileUser(foundUser);

    if (foundUser) {
      const userIds = type === 'followers' ? foundUser.followers : foundUser.following;
      const relatedUsers = users.filter(u => userIds?.includes(u.id));
      setDisplayUsers(relatedUsers);
    }
  }, [userId, type, users]);

  const filteredUsers = displayUsers.filter(user =>
    user.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (user.bio && user.bio.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleFollowToggle = (targetUserId) => {
    followUser(targetUserId);
  };

  const isFollowing = (targetUserId) => {
    return currentUser?.following?.includes(targetUserId);
  };

  const isOwnProfile = currentUser?.id === userId;

  return (
    <div className="followers-following">
      <div className="followers-following-header">
        <div className="header-nav">
          <button onClick={() => navigate(-1)} className="back-btn">
            <ArrowLeft size={20} />
          </button>
          <div className="header-info">
            <h1>{profileUser?.displayName}</h1>
            <p>@{profileUser?.username}</p>
          </div>
        </div>
      </div>

      <div className="follow-tabs">
        <button
          className={`tab ${type === 'following' ? 'active' : ''}`}
          onClick={() => navigate(`/profile/${userId}/following`)}
        >
          {profileUser?.following?.length || 0} Following
        </button>
        <button
          className={`tab ${type === 'followers' ? 'active' : ''}`}
          onClick={() => navigate(`/profile/${userId}/followers`)}
        >
          {profileUser?.followers?.length || 0} Followers
        </button>
      </div>

      <div className="search-section">
        <input
          type="text"
          placeholder={`Search ${type}...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="users-list">
        {filteredUsers.length === 0 ? (
          <div className="empty-state">
            <p>
              {searchQuery
                ? `No ${type} found matching "${searchQuery}"`
                : `No ${type} yet`}
            </p>
          </div>
        ) : (
          filteredUsers.map(user => (
            <div key={user.id} className="user-item">
              <div
                className="user-avatar"
                onClick={() => navigate(`/profile/${user.id}`)}
              >
                <img src={user.avatar} alt={user.displayName} />
              </div>

              <div className="user-details">
                <div className="user-name-section">
                  <div className="name-and-badge">
                    <h3 onClick={() => navigate(`/profile/${user.id}`)}>
                      {user.displayName}
                    </h3>
                    {user.verified && (
                      <div className="verification-badge">
                        <Check size={16} />
                      </div>
                    )}
                  </div>
                  <p className="username">@{user.username}</p>
                  {user.profession && (
                    <p className="profession">{user.profession}</p>
                  )}
                </div>

                {user.bio && <p className="user-bio">{user.bio}</p>}

                <div className="user-stats">
                  <span>{user.followers?.length || 0} followers</span>
                  <span>{user.following?.length || 0} following</span>
                  {user.tweetsCount && <span>{user.tweetsCount} tweets</span>}
                </div>
              </div>

              <div className="follow-action">
                {user.id !== currentUser?.id && (
                  <button
                    onClick={() => handleFollowToggle(user.id)}
                    className={`follow-btn ${isFollowing(user.id) ? 'following' : 'follow'}`}
                  >
                    {isFollowing(user.id) ? 'Following' : 'Follow'}
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}