import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function StoryViewer({ storyGroup, onClose, currentUser }) {
  const { addStoryView } = useData();
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentStory = storyGroup.stories[currentStoryIndex];
  const storyDuration = 5000; // 5 seconds per story
  const progressIncrement = 100 / (storyDuration / 100); // Update progress every 100ms

  useEffect(() => {
    // Add view count
    if (currentStory) {
      addStoryView(currentStory.id);
    }
  }, [currentStory, addStoryView]);

  useEffect(() => {
    let interval;

    if (!isPaused && currentStoryIndex < storyGroup.stories.length) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            // Move to next story or close if last
            if (currentStoryIndex < storyGroup.stories.length - 1) {
              setCurrentStoryIndex(prev => prev + 1);
              return 0;
            } else {
              onClose();
              return 100;
            }
          }
          return prev + progressIncrement;
        });
      }, 100);
    }

    return () => clearInterval(interval);
  }, [currentStoryIndex, isPaused, progress, storyGroup.stories.length, onClose, progressIncrement]);

  const handlePrevStory = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
      setProgress(0);
    }
  };

  const handleNextStory = () => {
    if (currentStoryIndex < storyGroup.stories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
      setProgress(0);
    } else {
      onClose();
    }
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  const progressBars = storyGroup.stories.map((_, index) => (
    <div key={index} className="story-progress-bar">
      <div
        className={`story-progress-fill ${index < currentStoryIndex ? 'completed' : index === currentStoryIndex ? 'active' : ''}`}
        style={{ width: index === currentStoryIndex ? `${progress}%` : index < currentStoryIndex ? '100%' : '0%' }}
      />
    </div>
  ));

  return (
    <div className="story-viewer-overlay" onClick={onClose}>
      <div className="story-viewer" onClick={(e) => e.stopPropagation()}>
        <div className="story-header">
          {progressBars}
        </div>

        <div className="story-content" onClick={handlePause}>
          <div className="story-author">
            <img src={currentStory.author.avatar} alt={currentStory.author.displayName} />
            <span>{currentStory.author.displayName}</span>
            <small>{new Date(currentStory.createdAt).toLocaleTimeString()}</small>
          </div>

          {currentStory.media && (
            <>
              {currentStory.type === 'video' && !currentStory.media.includes('blob:') ? (
                <video
                  src={currentStory.media}
                  controls={false}
                  autoPlay
                  muted
                  loop
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <img
                  src={currentStory.media}
                  alt="Story"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              )}
            </>
          )}

          {currentStory.content && (
            <div className="story-text">{currentStory.content}</div>
          )}

          <div className="story-stats">
            <small>{currentStory.views.length} views</small>
          </div>

          <button className="story-nav story-nav-prev" onClick={handlePrevStory}>
            <ChevronLeft size={24} />
          </button>

          <button className="story-nav story-nav-next" onClick={handleNextStory}>
            <ChevronRight size={24} />
          </button>
        </div>

        <button className="story-close" onClick={onClose}>
          <X size={24} />
        </button>
      </div>
    </div>
  );
}