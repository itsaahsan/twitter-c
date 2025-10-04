import { useMemo, useState } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import TweetComposer from '../components/TweetComposer';
import Tweet from '../components/Tweet';
import StoriesTray from '../components/StoriesTray';
import StoryViewer from '../components/StoryViewer';
import StoryCreator from '../components/StoryCreator';

export default function Home() {
  const { user } = useAuth();
  const { tweets, getActiveStories } = useData();
  const [showStoryCreator, setShowStoryCreator] = useState(false);
  const [viewingStory, setViewingStory] = useState(null);

  const allTweets = useMemo(() => tweets.slice(0, 1000), [tweets]);
  const activeStories = useMemo(() => getActiveStories(), [getActiveStories]);

  const handleCreateStory = () => {
    setShowStoryCreator(true);
  };

  const handleStoryClick = (storyGroup) => {
    setViewingStory(storyGroup);
  };

  const handleCloseStoryCreator = () => {
    setShowStoryCreator(false);
  };

  const handleCloseStoryViewer = () => {
    setViewingStory(null);
  };

  return (
    <div className="home">
      <div className="home-header">
        <h1>Home</h1>
      </div>

      {/* Stories Tray */}
      <StoriesTray
        stories={activeStories}
        onStoryClick={handleStoryClick}
        onCreateStory={handleCreateStory}
        currentUser={user}
      />

      <TweetComposer />
      <div className="feed">
        {allTweets.length === 0 ? (
          <div className="empty-feed">
            <p>No tweets yet. Follow some users or compose your first tweet!</p>
          </div>
        ) : (
          allTweets.map(tweet => (
            <Tweet key={tweet.id} tweet={tweet} />
          ))
        )}
      </div>

      {/* Story Creator Modal */}
      {showStoryCreator && (
        <StoryCreator
          onClose={handleCloseStoryCreator}
          currentUser={user}
        />
      )}

      {/* Story Viewer Modal */}
      {viewingStory && (
        <StoryViewer
          storyGroup={viewingStory}
          onClose={handleCloseStoryViewer}
          currentUser={user}
        />
      )}
    </div>
  );
}