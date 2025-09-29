import { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Heart, MessageCircle, Repeat2, UserPlus } from 'lucide-react';

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const savedNotifications = JSON.parse(localStorage.getItem('twitter_notifications') || '[]');
    setNotifications(savedNotifications.slice(0, 20)); // Show only latest 20
  }, []);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'like':
        return <Heart size={20} className="notification-icon like" />;
      case 'reply':
        return <MessageCircle size={20} className="notification-icon reply" />;
      case 'retweet':
        return <Repeat2 size={20} className="notification-icon retweet" />;
      case 'follow':
        return <UserPlus size={20} className="notification-icon follow" />;
      default:
        return null;
    }
  };

  const getNotificationText = (notification) => {
    switch (notification.type) {
      case 'like':
        return `${notification.from.displayName} liked your tweet`;
      case 'reply':
        return `${notification.from.displayName} replied to your tweet`;
      case 'retweet':
        return `${notification.from.displayName} retweeted your tweet`;
      case 'follow':
        return `${notification.from.displayName} started following you`;
      default:
        return 'New notification';
    }
  };

  return (
    <div className="notifications">
      <div className="notifications-header">
        <h1>Notifications</h1>
      </div>

      <div className="notifications-list">
        {notifications.length === 0 ? (
          <div className="no-notifications">
            <p>No notifications yet. Start interacting with tweets!</p>
          </div>
        ) : (
          notifications.map(notification => (
            <div key={notification.id} className={`notification ${notification.read ? 'read' : 'unread'}`}>
              <div className="notification-icon-wrapper">
                {getNotificationIcon(notification.type)}
              </div>

              <div className="notification-content">
                <div className="notification-avatars">
                  <img src={notification.from.avatar} alt={notification.from.displayName} />
                </div>

                <div className="notification-text">
                  <p>{getNotificationText(notification)}</p>
                  {notification.tweetContent && (
                    <div className="notification-tweet-preview">
                      <p>"{notification.tweetContent}"</p>
                    </div>
                  )}
                  <span className="notification-time">
                    {formatDistanceToNow(new Date(notification.createdAt))} ago
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}