import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { Search, Bell, Mail, LogOut } from 'lucide-react';

export default function Header() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { searchTweets, searchUsers } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [unreadMessageCount, setUnreadMessageCount] = useState(0);
  const [unreadNotificationCount, setUnreadNotificationCount] = useState(0);

  useEffect(() => {
    // Calculate unread messages
    const savedMessages = JSON.parse(localStorage.getItem('twitter_messages') || '[]');
    const unreadMessages = savedMessages.filter(msg =>
      !msg.read && msg.senderId !== user?.id
    );
    setUnreadMessageCount(unreadMessages.length);

    // Calculate unread notifications
    const savedNotifications = JSON.parse(localStorage.getItem('twitter_notifications') || '[]');
    const unreadNotifications = savedNotifications.filter(notif =>
      !notif.read && notif.toUserId === user?.id
    );
    setUnreadNotificationCount(unreadNotifications.length);
  }, [user]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header-content">

        <div className="header-center">
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
          </form>
        </div>

        <div className="header-right">
          <button
            className="icon-btn notification-btn"
            title="Notifications"
            onClick={() => navigate('/notifications')}
          >
            <Bell size={20} />
            {unreadNotificationCount > 0 && (
              <span className="badge">{unreadNotificationCount}</span>
            )}
          </button>

          <button
            className="icon-btn message-btn"
            title="Messages"
            onClick={() => navigate('/messages')}
          >
            <Mail size={20} />
            {unreadMessageCount > 0 && (
              <span className="badge">{unreadMessageCount}</span>
            )}
          </button>

          <div className="user-menu">
            <button
              className="user-profile-btn"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <img src={user?.avatar} alt={user?.displayName} />
              <span>{user?.displayName}</span>
            </button>

            {showDropdown && (
              <div className="dropdown-menu">
                <button
                  onClick={() => {
                    navigate(`/profile/${user.id}`);
                    setShowDropdown(false);
                  }}
                >
                  Profile
                </button>
                <button onClick={handleLogout}>
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}