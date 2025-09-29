import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import Tweet from '../components/Tweet';
import { formatDistanceToNow } from 'date-fns';
import { getUserStats } from '../utils/analytics';
import { Check, MapPin, Link, Calendar } from 'lucide-react';

export default function Profile() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();
  const { users, tweets, getUserTweets, followUser } = useData();
  const [profileUser, setProfileUser] = useState(null);
  const [userTweets, setUserTweets] = useState([]);
  const [userStats, setUserStats] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState('');

  // Determine the actual user ID to display
  const targetUserId = userId || currentUser?.id;

  useEffect(() => {
    // If no userId in URL and we have currentUser, redirect to their profile
    if (!userId && currentUser?.id) {
      navigate(`/profile/${currentUser.id}`, { replace: true });
      return;
    }

    if (targetUserId) {
      const foundUser = users.find(u => u.id === targetUserId);
      setProfileUser(foundUser);
      if (foundUser) {
        setBio(foundUser.bio || '');
        const userTweetsData = getUserTweets(targetUserId);
        setUserTweets(userTweetsData);
        setUserStats(getUserStats(targetUserId, tweets, users));
      }
    }
  }, [targetUserId, users, tweets, getUserTweets, userId, currentUser, navigate]);

  const isOwnProfile = currentUser?.id === targetUserId;
  const isFollowing = currentUser?.following?.includes(targetUserId);

  const handleFollow = () => {
    if (targetUserId) {
      followUser(targetUserId);
    }
  };

  const handleBioUpdate = () => {
    // This would normally update via AuthContext
    setIsEditing(false);
  };

  if (!profileUser) {
    return <div className="profile-loading">Loading profile...</div>;
  }

  return (
    <div className="profile">
      <div className="profile-header">
        <h1>{profileUser.displayName}</h1>
        <p className="tweet-count">{userTweets.length} tweets</p>
      </div>

      <div className="profile-info">
        <div className="profile-avatar">
          <img src={profileUser.avatar} alt={profileUser.displayName} />
        </div>

        <div className="profile-details">
          <div className="profile-name-section">
            <h2>{profileUser.displayName}</h2>
            {profileUser.verified && (
              <div className="verification-badge">
                <Check size={20} />
              </div>
            )}
          </div>
          <p className="username">@{profileUser.username}</p>
          {profileUser.profession && (
            <p className="profession">{profileUser.profession}</p>
          )}

          <div className="profile-bio">
            {isEditing ? (
              <div className="bio-edit">
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell the world about yourself"
                  maxLength={160}
                />
                <div className="bio-actions">
                  <button onClick={handleBioUpdate} className="save-btn">Save</button>
                  <button onClick={() => setIsEditing(false)} className="cancel-btn">Cancel</button>
                </div>
              </div>
            ) : (
              <div>
                <p>{profileUser.bio || 'No bio yet.'}</p>
                {isOwnProfile && (
                  <button onClick={() => setIsEditing(true)} className="edit-bio-btn">
                    Edit bio
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="profile-metadata">
            {profileUser.location && (
              <div className="metadata-item">
                <MapPin size={16} />
                <span>{profileUser.location}</span>
              </div>
            )}
            {profileUser.website && (
              <div className="metadata-item">
                <Link size={16} />
                <a href={profileUser.website} target="_blank" rel="noopener noreferrer">
                  {profileUser.website.replace('https://', '')}
                </a>
              </div>
            )}
            <div className="metadata-item">
              <Calendar size={16} />
              <span>Joined {formatDistanceToNow(new Date(profileUser.createdAt))} ago</span>
            </div>
          </div>

          <div className="profile-stats">
            <span
              className="stat-item clickable"
              onClick={() => navigate(`/profile/${targetUserId}/following`)}
            >
              <strong>{profileUser.following?.length || 0}</strong> Following
            </span>
            <span
              className="stat-item clickable"
              onClick={() => navigate(`/profile/${targetUserId}/followers`)}
            >
              <strong>{profileUser.followers?.length || 0}</strong> Followers
            </span>
            {userStats && (
              <>
                <span className="stat-item">
                  <strong>{userStats.totalLikes}</strong> Total Likes
                </span>
                <span className="stat-item">
                  <strong>{userStats.engagementRate}</strong> Avg Engagement
                </span>
              </>
            )}
          </div>

          {!isOwnProfile && (
            <button
              onClick={handleFollow}
              className={`follow-btn ${isFollowing ? 'following' : ''}`}
            >
              {isFollowing ? 'Unfollow' : 'Follow'}
            </button>
          )}
        </div>
      </div>

      <div className="profile-tweets">
        <h3>Tweets</h3>
        {userTweets.length === 0 ? (
          <div className="no-tweets">
            <p>{isOwnProfile ? 'You haven\'t tweeted yet.' : 'No tweets yet.'}</p>
          </div>
        ) : (
          userTweets.map(tweet => (
            <Tweet key={tweet.id} tweet={tweet} />
          ))
        )}
      </div>
    </div>
  );
}