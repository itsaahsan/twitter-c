import { useState } from 'react';
import { Users, Plus, Search } from 'lucide-react';

export default function Communities() {
  const [searchTerm, setSearchTerm] = useState('');

  const communities = [
    {
      id: 1,
      name: 'Tech Enthusiasts',
      description: 'Discussing the latest in technology and innovation',
      members: 15420,
      image: '/api/placeholder/48/48'
    },
    {
      id: 2,
      name: 'Web Developers',
      description: 'Frontend and backend development discussions',
      members: 8932,
      image: '/api/placeholder/48/48'
    },
    {
      id: 3,
      name: 'Startup Founders',
      description: 'Entrepreneurship and startup journey',
      members: 12567,
      image: '/api/placeholder/48/48'
    },
    {
      id: 4,
      name: 'Design Community',
      description: 'UI/UX design and creative inspiration',
      members: 6743,
      image: '/api/placeholder/48/48'
    }
  ];

  const filteredCommunities = communities.filter(community =>
    community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    community.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="communities">
      <div className="communities-header">
        <div className="header-title">
          <Users size={24} />
          <h1>Communities</h1>
        </div>
        <button className="create-community-btn">
          <Plus size={18} />
          Create
        </button>
      </div>

      <div className="communities-search">
        <div className="search-input-wrapper">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search communities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="communities-content">
        <div className="communities-tabs">
          <button className="tab active">Discover</button>
          <button className="tab">Your Communities</button>
        </div>

        <div className="communities-list">
          {filteredCommunities.map(community => (
            <div key={community.id} className="community-item">
              <div className="community-info">
                <img src={community.image} alt={community.name} />
                <div className="community-details">
                  <h3>{community.name}</h3>
                  <p className="community-description">{community.description}</p>
                  <span className="member-count">{community.members.toLocaleString()} members</span>
                </div>
              </div>
              <button className="join-btn">Join</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}