import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Settings,
  Bookmark,
  List,
  Calendar,
  Shield,
  HelpCircle,
  BarChart3,
  Bell,
  Users,
  Download,
  ChevronRight
} from 'lucide-react';

export default function More() {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Check if user is admin (for demo purposes, let's make the first user an admin)
  const isAdmin = user && (user.id === '1' || user.username === 'admin');

  const menuItems = [
    {
      icon: Bookmark,
      label: 'Bookmarks',
      path: '/bookmarks',
      description: 'Save tweets for later'
    },
    {
      icon: List,
      label: 'Lists',
      path: '/lists',
      description: 'Curated groups of accounts'
    },
    {
      icon: Users,
      label: 'Communities',
      path: '/communities',
      description: 'Join conversations about your interests'
    },
    {
      icon: Calendar,
      label: 'Scheduled Tweets',
      path: '/scheduled',
      description: 'Manage your scheduled tweets'
    },
    {
      icon: BarChart3,
      label: 'Analytics',
      path: '/analytics',
      description: 'View your account insights'
    },
    {
      icon: Bell,
      label: 'Notification Settings',
      path: '/settings/notifications',
      description: 'Manage your notification preferences'
    },
    {
      icon: Shield,
      label: 'Privacy and Safety',
      path: '/settings/privacy',
      description: 'Control who can interact with you'
    },
    {
      icon: Settings,
      label: 'Settings and Support',
      path: '/settings',
      description: 'Account settings and help'
    },
    {
      icon: Download,
      label: 'Data Export',
      path: '/settings/export',
      description: 'Download your Twitter data'
    },
    {
      icon: HelpCircle,
      label: 'Help Center',
      path: '/help',
      description: 'Get help using Twitter Clone'
    }
  ];

  return (
    <div className="more-page">
      <div className="more-header">
        <h1>More</h1>
      </div>

      <div className="more-content">
        <div className="user-section">
          <div className="user-info">
            <img src={user?.avatar} alt={user?.displayName} />
            <div>
              <h3>{user?.displayName}</h3>
              <p>@{user?.username}</p>
            </div>
          </div>
        </div>


        {isAdmin && (
          <div className="admin-section">
            <div className="admin-link" onClick={() => navigate('/admin')}>
              <Shield size={24} />
              <div>
                <span>Admin Dashboard</span>
                <p>Manage users and content</p>
              </div>
              <ChevronRight size={20} />
            </div>
          </div>
        )}

        <div className="menu-sections">
          <div className="menu-section">
            <h3>Content & Discovery</h3>
            {menuItems.slice(0, 4).map((item, index) => (
              <div
                key={index}
                className="menu-item"
                onClick={() => navigate(item.path)}
              >
                <div className="menu-item-left">
                  <item.icon size={24} />
                  <div>
                    <span className="menu-label">{item.label}</span>
                    <p className="menu-description">{item.description}</p>
                  </div>
                </div>
                <ChevronRight size={20} />
              </div>
            ))}
          </div>

          <div className="menu-section">
            <h3>Insights & Management</h3>
            {menuItems.slice(4, 7).map((item, index) => (
              <div
                key={index}
                className="menu-item"
                onClick={() => navigate(item.path)}
              >
                <div className="menu-item-left">
                  <item.icon size={24} />
                  <div>
                    <span className="menu-label">{item.label}</span>
                    <p className="menu-description">{item.description}</p>
                  </div>
                </div>
                <ChevronRight size={20} />
              </div>
            ))}
          </div>

          <div className="menu-section">
            <h3>Settings & Support</h3>
            {menuItems.slice(7).map((item, index) => (
              <div
                key={index}
                className="menu-item"
                onClick={() => navigate(item.path)}
              >
                <div className="menu-item-left">
                  <item.icon size={24} />
                  <div>
                    <span className="menu-label">{item.label}</span>
                    <p className="menu-description">{item.description}</p>
                  </div>
                </div>
                <ChevronRight size={20} />
              </div>
            ))}
          </div>
        </div>

        <div className="app-info">
          <div className="version-info">
            <p>Twitter Clone v1.0.0</p>
            <p>Built with React & Vite</p>
          </div>
        </div>
      </div>
    </div>
  );
}