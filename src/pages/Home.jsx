import { useMemo } from 'react';
import { useData } from '../context/DataContext';
import TweetComposer from '../components/TweetComposer';
import Tweet from '../components/Tweet';

export default function Home() {
  const { tweets, getFeedTweets } = useData();
  const feedTweets = useMemo(() => getFeedTweets(), [tweets, getFeedTweets]);

  return (
    <div className="home">
      <div className="home-header">
        <h1>Home</h1>
      </div>
      <TweetComposer />
      <div className="feed">
        {feedTweets.length === 0 ? (
          <div className="empty-feed">
            <p>No tweets yet. Follow some users or compose your first tweet!</p>
          </div>
        ) : (
          feedTweets.map(tweet => (
            <Tweet key={tweet.id} tweet={tweet} />
          ))
        )}
      </div>
    </div>
  );
}