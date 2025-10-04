import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { initializeSampleData } from '../utils/sampleData';

const DataContext = createContext();

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}

export function DataProvider({ children }) {
  const { user, refreshUser } = useAuth();
  const [tweets, setTweets] = useState([]);
  const [users, setUsers] = useState([]);
  const [stories, setStories] = useState([]);

  useEffect(() => {
    // Initialize sample data if none exists
    initializeSampleData();

    const savedTweets = JSON.parse(localStorage.getItem('twitter_tweets') || '[]');
    const savedUsers = JSON.parse(localStorage.getItem('twitter_users') || '[]');
    const savedStories = JSON.parse(localStorage.getItem('twitter_stories') || '[]');
    setTweets(savedTweets);
    setUsers(savedUsers);
    setStories(savedStories);
  }, []);

  const addTweet = async (content, media = null) => {
    if (!user) return;

    if (media) {
      // Convert media file to base64 for localStorage
      const mediaUrl = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(media);
      });
      createTweetWithMedia(content, mediaUrl, media.type.startsWith('video/') ? 'video' : 'image');
    } else {
      createTweetWithMedia(content, null, null);
    }
  };

  const createTweetWithMedia = (content, mediaUrl, mediaType) => {
    const newTweet = {
      id: Date.now().toString(),
      content,
      image: mediaType === 'image' ? mediaUrl : null,
      video: mediaType === 'video' ? mediaUrl : null,
      authorId: user.id,
      author: {
        id: user.id,
        username: user.username,
        displayName: user.displayName,
        avatar: user.avatar,
      },
      createdAt: new Date().toISOString(),
      likes: [],
      retweets: [],
      replies: [],
    };

    const updatedTweets = [newTweet, ...tweets];
    setTweets(updatedTweets);
    localStorage.setItem('twitter_tweets', JSON.stringify(updatedTweets));
  };

  const createNotification = (type, fromUser, toUserId, tweetContent = null) => {
    if (fromUser.id === toUserId) return; // Don't notify yourself

    const notification = {
      id: Date.now().toString() + Math.random(),
      type,
      from: {
        id: fromUser.id,
        username: fromUser.username,
        displayName: fromUser.displayName,
        avatar: fromUser.avatar,
      },
      toUserId,
      tweetContent,
      createdAt: new Date().toISOString(),
      read: false,
    };

    const existingNotifications = JSON.parse(localStorage.getItem('twitter_notifications') || '[]');
    const updatedNotifications = [notification, ...existingNotifications];
    localStorage.setItem('twitter_notifications', JSON.stringify(updatedNotifications));
  };

  const likeTweet = (tweetId) => {
    if (!user) return;

    const tweet = tweets.find(t => t.id === tweetId);
    if (!tweet) return;

    const isLiked = tweet.likes.includes(user.id);

    const updatedTweets = tweets.map(tweet => {
      if (tweet.id === tweetId) {
        return {
          ...tweet,
          likes: isLiked
            ? tweet.likes.filter(id => id !== user.id)
            : [...tweet.likes, user.id]
        };
      }
      return tweet;
    });

    setTweets(updatedTweets);
    localStorage.setItem('twitter_tweets', JSON.stringify(updatedTweets));

    // Create notification for like (only when liking, not unliking)
    if (!isLiked) {
      createNotification('like', user, tweet.authorId, tweet.content.substring(0, 50));
    }
  };

  const retweet = (tweetId) => {
    if (!user) return;

    const tweet = tweets.find(t => t.id === tweetId);
    if (!tweet) return;

    const isRetweeted = tweet.retweets.includes(user.id);

    const updatedTweets = tweets.map(tweet => {
      if (tweet.id === tweetId) {
        return {
          ...tweet,
          retweets: isRetweeted
            ? tweet.retweets.filter(id => id !== user.id)
            : [...tweet.retweets, user.id]
        };
      }
      return tweet;
    });

    setTweets(updatedTweets);
    localStorage.setItem('twitter_tweets', JSON.stringify(updatedTweets));

    // Create notification for retweet (only when retweeting, not un-retweeting)
    if (!isRetweeted) {
      createNotification('retweet', user, tweet.authorId, tweet.content.substring(0, 50));
    }
  };

  const addReply = (tweetId, content) => {
    if (!user) return;

    const tweet = tweets.find(t => t.id === tweetId);
    if (!tweet) return;

    const reply = {
      id: Date.now().toString(),
      content,
      authorId: user.id,
      author: {
        id: user.id,
        username: user.username,
        displayName: user.displayName,
        avatar: user.avatar,
      },
      createdAt: new Date().toISOString(),
    };

    const updatedTweets = tweets.map(tweet => {
      if (tweet.id === tweetId) {
        return {
          ...tweet,
          replies: [...tweet.replies, reply]
        };
      }
      return tweet;
    });

    setTweets(updatedTweets);
    localStorage.setItem('twitter_tweets', JSON.stringify(updatedTweets));

    // Create notification for reply
    createNotification('reply', user, tweet.authorId, tweet.content.substring(0, 50));
  };

  const createStory = (media, type = 'image') => {
    if (!user) return;

    const story = {
      id: Date.now().toString(),
      authorId: user.id,
      author: {
        id: user.id,
        username: user.username,
        displayName: user.displayName,
        avatar: user.avatar,
      },
      media: media,
      type: type, // 'image' or 'video'
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
      views: [],
    };

    const updatedStories = [...stories, story];
    setStories(updatedStories);
    localStorage.setItem('twitter_stories', JSON.stringify(updatedStories));
  };

  const addStoryView = (storyId) => {
    if (!user) return;

    const updatedStories = stories.map(story => {
      if (story.id === storyId && !story.views.find(v => v.userId === user.id)) {
        return {
          ...story,
          views: [...story.views, {
            userId: user.id,
            username: user.username,
            avatar: user.avatar,
            viewedAt: new Date().toISOString(),
          }],
        };
      }
      return story;
    });

    setStories(updatedStories);
    localStorage.setItem('twitter_stories', JSON.stringify(updatedStories));
  };

  const getUserStories = (userId) => {
    return stories.filter(story => story.authorId === userId && new Date(story.expiresAt) > new Date());
  };

  const getActiveStories = () => {
    const validStories = stories.filter(story => new Date(story.expiresAt) > new Date());
    const uniqueAuthors = [...new Set(validStories.map(s => s.authorId))];

    return uniqueAuthors.map(authorId => {
      const userStories = validStories.filter(s => s.authorId === authorId);
      return {
        authorId: authorId,
        author: userStories[0].author,
        stories: userStories,
        totalViews: userStories.reduce((sum, story) => sum + story.views.length, 0),
      };
    });
  };

  const followUser = (targetUserId) => {
    if (!user) return;

    const isCurrentlyFollowing = user.following?.includes(targetUserId);

    const updatedUsers = users.map(u => {
      if (u.id === user.id) {
        return {
          ...u,
          following: isCurrentlyFollowing
            ? u.following.filter(id => id !== targetUserId)
            : [...(u.following || []), targetUserId]
        };
      }
      if (u.id === targetUserId) {
        return {
          ...u,
          followers: isCurrentlyFollowing
            ? (u.followers || []).filter(id => id !== user.id)
            : [...(u.followers || []), user.id]
        };
      }
      return u;
    });

    setUsers(updatedUsers);
    localStorage.setItem('twitter_users', JSON.stringify(updatedUsers));

    // Create notification for follow (only when following, not unfollowing)
    if (!isCurrentlyFollowing) {
      createNotification('follow', user, targetUserId);
    }

    // Update current user's following list in localStorage
    const currentUserUpdate = updatedUsers.find(u => u.id === user.id);
    if (currentUserUpdate) {
      const userWithoutPassword = { ...currentUserUpdate };
      delete userWithoutPassword.password;
      localStorage.setItem('twitter_user', JSON.stringify(userWithoutPassword));

      // Refresh the auth context with updated user data
      if (refreshUser) {
        refreshUser();
      }
    }
  };

  const searchTweets = (query) => {
    return tweets.filter(tweet =>
      tweet.content.toLowerCase().includes(query.toLowerCase()) ||
      tweet.author.username.toLowerCase().includes(query.toLowerCase()) ||
      tweet.author.displayName.toLowerCase().includes(query.toLowerCase())
    );
  };

  const searchUsers = (query) => {
    return users.filter(user =>
      user.username.toLowerCase().includes(query.toLowerCase()) ||
      user.displayName.toLowerCase().includes(query.toLowerCase())
    );
  };

  const getUserTweets = (userId) => {
    return tweets.filter(tweet => tweet.authorId === userId);
  };

  const getFeedTweets = () => {
    if (!user) return [];

    // Get tweets from followed users and own tweets
    const followingIds = user.following || [];
    return tweets.filter(tweet =>
      followingIds.includes(tweet.authorId) || tweet.authorId === user.id
    );
  };

  const bookmarkTweet = (tweetId) => {
    if (!user) return;

    const savedBookmarks = JSON.parse(localStorage.getItem('twitter_bookmarks') || '[]');
    const existingBookmark = savedBookmarks.find(b =>
      b.userId === user.id && b.tweetId === tweetId
    );

    if (existingBookmark) {
      // Remove bookmark
      const updatedBookmarks = savedBookmarks.filter(b =>
        !(b.userId === user.id && b.tweetId === tweetId)
      );
      localStorage.setItem('twitter_bookmarks', JSON.stringify(updatedBookmarks));
    } else {
      // Add bookmark
      const newBookmark = {
        userId: user.id,
        tweetId: tweetId,
        createdAt: new Date().toISOString()
      };
      savedBookmarks.push(newBookmark);
      localStorage.setItem('twitter_bookmarks', JSON.stringify(savedBookmarks));
    }
  };

  const isBookmarked = (tweetId) => {
    if (!user) return false;
    const savedBookmarks = JSON.parse(localStorage.getItem('twitter_bookmarks') || '[]');
    return savedBookmarks.some(b => b.userId === user.id && b.tweetId === tweetId);
  };

  const deleteTweet = (tweetId) => {
    if (!user) return;

    const tweet = tweets.find(t => t.id === tweetId);
    if (!tweet) return;

    // Only allow deletion by the tweet author
    if (tweet.authorId !== user.id) return;

    const updatedTweets = tweets.filter(t => t.id !== tweetId);
    setTweets(updatedTweets);
    localStorage.setItem('twitter_tweets', JSON.stringify(updatedTweets));
  };

  const value = {
    tweets,
    users,
    stories,
    addTweet,
    likeTweet,
    retweet,
    addReply,
    followUser,
    searchTweets,
    searchUsers,
    getUserTweets,
    getFeedTweets,
    bookmarkTweet,
    isBookmarked,
    deleteTweet,
    createStory,
    addStoryView,
    getUserStories,
    getActiveStories,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}