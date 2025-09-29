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

  useEffect(() => {
    // Initialize sample data if none exists
    initializeSampleData();

    const savedTweets = JSON.parse(localStorage.getItem('twitter_tweets') || '[]');
    const savedUsers = JSON.parse(localStorage.getItem('twitter_users') || '[]');
    setTweets(savedTweets);
    setUsers(savedUsers);
  }, []);

  const addTweet = async (content, image = null) => {
    if (!user) return;

    if (image) {
      // Convert image file to base64 for localStorage
      const imageUrl = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(image);
      });
      createTweetWithImage(content, imageUrl);
    } else {
      createTweetWithImage(content, null);
    }
  };

  const createTweetWithImage = (content, imageUrl) => {
    const newTweet = {
      id: Date.now().toString(),
      content,
      image: imageUrl,
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

  const value = {
    tweets,
    users,
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
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}