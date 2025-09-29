import { BadgeCheck, Building, Search } from 'lucide-react';
import { useState } from 'react';

export default function VerifiedOrgs() {
  const [searchTerm, setSearchTerm] = useState('');

  const verifiedOrgs = [
    {
      id: 1,
      name: 'Microsoft',
      username: '@Microsoft',
      description: 'Official Microsoft account. Empowering everyone on the planet to achieve more.',
      followers: '8.2M',
      category: 'Technology',
      image: '/api/placeholder/48/48',
      verified: true
    },
    {
      id: 2,
      name: 'NASA',
      username: '@nasa',
      description: 'Explore the universe and discover our home planet.',
      followers: '45.1M',
      category: 'Government',
      image: '/api/placeholder/48/48',
      verified: true
    },
    {
      id: 3,
      name: 'Netflix',
      username: '@netflix',
      description: 'See what\'s next in entertainment. Stream movies & shows anytime.',
      followers: '21.6M',
      category: 'Entertainment',
      image: '/api/placeholder/48/48',
      verified: true
    },
    {
      id: 4,
      name: 'Google',
      username: '@Google',
      description: 'Organizing the world\'s information and making it universally accessible.',
      followers: '27.3M',
      category: 'Technology',
      image: '/api/placeholder/48/48',
      verified: true
    }
  ];

  const categories = ['All', 'Technology', 'Entertainment', 'Government', 'News', 'Sports'];

  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredOrgs = verifiedOrgs.filter(org => {
    const matchesSearch = org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         org.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || org.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="verified-orgs">
      <div className="verified-orgs-header">
        <div className="header-title">
          <BadgeCheck size={24} />
          <h1>Verified Organizations</h1>
        </div>
      </div>

      <div className="search-section">
        <div className="search-input-wrapper">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search organizations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="category-filters">
        {categories.map(category => (
          <button
            key={category}
            className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="organizations-list">
        {filteredOrgs.map(org => (
          <div key={org.id} className="organization-item">
            <div className="org-info">
              <div className="org-avatar">
                <img src={org.image} alt={org.name} />
                <div className="verified-badge">
                  <BadgeCheck size={16} />
                </div>
              </div>
              <div className="org-details">
                <div className="org-name-section">
                  <h3>{org.name}</h3>
                  <span className="username">{org.username}</span>
                  <span className="category-tag">{org.category}</span>
                </div>
                <p className="org-description">{org.description}</p>
                <span className="follower-count">{org.followers} followers</span>
              </div>
            </div>
            <div className="org-actions">
              <button className="follow-btn">Follow</button>
              <button className="visit-btn">
                <Building size={16} />
                Visit
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredOrgs.length === 0 && (
        <div className="empty-state">
          <BadgeCheck size={48} />
          <h3>No organizations found</h3>
          <p>Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
}