import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Home,
  Search,
  Bell,
  Mail,
  User,
  MoreHorizontal,
  Bookmark,
  Users,
  Crown,
  BadgeCheck,
  MessageCircle,
  Hash
} from 'lucide-react';

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const getMenuItems = () => {
    return [
      { icon: Home, label: 'Home', path: '/' },
      { icon: Search, label: 'Explore', path: '/explore' },
      { icon: Bell, label: 'Notifications', path: '/notifications' },
      { icon: Mail, label: 'Messages', path: '/messages' },
      { icon: MessageCircle, label: 'Grok', path: '/grok' },
      { icon: Users, label: 'Communities', path: '/communities' },
      { icon: Crown, label: 'Premium', path: '/premium' },
      { icon: BadgeCheck, label: 'Verified Orgs', path: '/verified-orgs' },
      { icon: User, label: 'Profile', path: user?.id ? `/profile/${user.id}` : '/profile' },
      { icon: Bookmark, label: 'Bookmarks', path: '/bookmarks' },
      { icon: MoreHorizontal, label: 'More', path: '/more' },
    ];
  };

  const menuItems = getMenuItems();

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="sidebar">
      <div className="sidebar-content">
        <ul className="nav-menu">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isProfileItem = item.label === 'Profile';
            const isDisabled = isProfileItem && !user?.id;

            return (
              <li key={item.path}>
                <button
                  className={`nav-item ${isActive(item.path) ? 'active' : ''} ${isDisabled ? 'disabled' : ''}`}
                  onClick={() => {
                    if (!isDisabled) {
                      navigate(item.path);
                    }
                  }}
                  disabled={isDisabled}
                >
                  <Icon size={24} />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>

        <button className="tweet-btn" onClick={() => {
          // This could open a modal or navigate to compose
          document.querySelector('.tweet-input')?.focus();
        }}>
          <span className="tweet-btn-text">Post</span>
          <span className="tweet-btn-icon">+</span>
        </button>
      </div>
    </nav>
  );
}