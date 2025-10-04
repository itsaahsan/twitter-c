import { Plus } from 'lucide-react';

export default function StoriesTray({ stories, onStoryClick, onCreateStory, currentUser }) {
  const userStory = stories.find(s => s.authorId === currentUser?.id);

  return (
    <div className="stories-tray">
      {/* User's own story circle */}
      <div className="story-circle create-story" onClick={onCreateStory}>
        <div className="story-avatar">
          <img src={currentUser?.avatar} alt={currentUser?.displayName} />
        </div>
        <div className="create-story-overlay">
          <Plus size={16} color="white" />
        </div>
        <div className="story-label">Your story</div>
      </div>

      {/* Other users' stories */}
      {stories
        .filter(s => s.authorId !== currentUser?.id)
        .map(storyGroup => (
          <div
            key={storyGroup.authorId}
            className="story-circle"
            onClick={() => onStoryClick(storyGroup)}
          >
            <div className={`story-avatar ${storyGroup.stories.some(s => s.views.some(v => v.userId === currentUser?.id)) ? 'viewed' : 'unviewed'}`}>
              <img src={storyGroup.author.avatar} alt={storyGroup.author.displayName} />
            </div>
            <div className="story-label">{storyGroup.author.displayName}</div>
          </div>
        ))}
    </div>
  );
}