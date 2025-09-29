import { useState } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { Star, TrendingUp, UserPlus, X } from 'lucide-react';

export default function RightSidebar() {
  const { users, trendingTopics } = useData();
  const { user } = useAuth();
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  // Get trending topics for current location (Bangladesh as example)
  const bangladeshTrends = trendingTopics?.slice(0, 5) || [
    { name: '#Bangladesh', tweets: '125K' },
    { name: '#Dhaka', tweets: '89K' },
    { name: '#Cricket', tweets: '156K' },
    { name: '#TechNews', tweets: '67K' },
    { name: '#Education', tweets: '78K' }
  ];

  // Get users to follow (exclude current user and already following)
  const suggestedUsers = users?.filter(u =>
    u.id !== user?.id &&
    !user?.following?.includes(u.id)
  ).slice(0, 3) || [];

  return (
    <div className="right-sidebar">
      {/* Premium Subscription Section */}
      <div className="premium-section">
        <div className="premium-header">
          <Star size={24} />
          <h3>Subscribe to Premium</h3>
        </div>
        <p className="premium-description">
          Subscribe to unlock new features and if eligible, receive a share of revenue.
        </p>
        <button
          className="premium-btn"
          onClick={() => setShowPremiumModal(true)}
        >
          Subscribe
        </button>
      </div>

      {/* What's happening Section */}
      <div className="trending-section">
        <div className="section-header">
          <TrendingUp size={20} />
          <h3>What's happening</h3>
        </div>
        <div className="trending-location">
          <span className="location-label">Trending in Bangladesh</span>
        </div>
        <div className="trending-list">
          {bangladeshTrends.map((trend, index) => (
            <div key={index} className="trending-item">
              <div className="trend-content">
                <span className="trend-category">Trending in Bangladesh</span>
                <h4 className="trend-name">{trend.name}</h4>
                <span className="trend-tweets">{trend.tweets} posts</span>
              </div>
              <button className="trend-menu">
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
        <button className="show-more-btn">Show more</button>
      </div>

      {/* Who to follow Section */}
      <div className="suggestions-section">
        <div className="section-header">
          <UserPlus size={20} />
          <h3>Who to follow</h3>
        </div>
        <div className="suggestions-list">
          {suggestedUsers.map(suggestedUser => (
            <div key={suggestedUser.id} className="suggestion-item">
              <div className="suggestion-avatar">
                <img src={suggestedUser.avatar} alt={suggestedUser.name} />
              </div>
              <div className="suggestion-info">
                <h4 className="suggestion-name">{suggestedUser.name}</h4>
                <p className="suggestion-username">@{suggestedUser.username}</p>
                {suggestedUser.verified && <span className="verified-badge">✓</span>}
              </div>
              <button className="follow-suggestion-btn">Follow</button>
            </div>
          ))}
        </div>
        <button className="show-more-btn">Show more</button>
      </div>

      {/* Premium Modal */}
      {showPremiumModal && (
        <div className="modal-overlay" onClick={() => setShowPremiumModal(false)}>
          <div className="premium-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Choose your Premium plan</h2>
              <button
                className="close-modal-btn"
                onClick={() => setShowPremiumModal(false)}
              >
                <X size={24} />
              </button>
            </div>
            <div className="premium-plans">
              <div className="plan-card">
                <div className="plan-header">
                  <h3>Premium</h3>
                  <span className="plan-price">$8.00/month</span>
                </div>
                <ul className="plan-features">
                  <li>Blue checkmark</li>
                  <li>Edit posts</li>
                  <li>Longer posts</li>
                  <li>Priority support</li>
                  <li>Fewer ads</li>
                </ul>
                <button className="plan-btn">Subscribe</button>
              </div>
              <div className="plan-card premium-plus">
                <div className="plan-header">
                  <h3>Premium+</h3>
                  <span className="plan-price">$16.00/month</span>
                </div>
                <ul className="plan-features">
                  <li>Everything in Premium</li>
                  <li>No ads</li>
                  <li>Grok Early Access</li>
                  <li>Creator subscriptions</li>
                  <li>Revenue sharing</li>
                </ul>
                <button className="plan-btn">Subscribe</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}