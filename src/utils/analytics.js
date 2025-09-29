// Analytics utility functions for Twitter clone

export function getUserStats(userId, tweets, users) {
  const user = users.find(u => u.id === userId);
  if (!user) return null;

  const userTweets = tweets.filter(tweet => tweet.authorId === userId);
  const totalLikes = userTweets.reduce((sum, tweet) => sum + tweet.likes.length, 0);
  const totalRetweets = userTweets.reduce((sum, tweet) => sum + tweet.retweets.length, 0);
  const totalReplies = userTweets.reduce((sum, tweet) => sum + tweet.replies.length, 0);

  return {
    tweetsCount: userTweets.length,
    totalLikes,
    totalRetweets,
    totalReplies,
    followersCount: user.followers?.length || 0,
    followingCount: user.following?.length || 0,
    engagementRate: userTweets.length > 0 ?
      ((totalLikes + totalRetweets + totalReplies) / userTweets.length).toFixed(2) : 0,
    avgLikesPerTweet: userTweets.length > 0 ?
      (totalLikes / userTweets.length).toFixed(1) : 0,
  };
}

export function getPopularTweets(tweets, limit = 10) {
  return tweets
    .map(tweet => ({
      ...tweet,
      engagement: tweet.likes.length + tweet.retweets.length + tweet.replies.length
    }))
    .sort((a, b) => b.engagement - a.engagement)
    .slice(0, limit);
}

export function getActiveUsers(tweets, users, limit = 10) {
  const userActivity = {};

  // Count tweets per user
  tweets.forEach(tweet => {
    userActivity[tweet.authorId] = (userActivity[tweet.authorId] || 0) + 1;
  });

  // Count interactions (likes, retweets, replies)
  tweets.forEach(tweet => {
    tweet.likes.forEach(userId => {
      userActivity[userId] = (userActivity[userId] || 0) + 0.5;
    });
    tweet.retweets.forEach(userId => {
      userActivity[userId] = (userActivity[userId] || 0) + 0.7;
    });
    tweet.replies.forEach(reply => {
      userActivity[reply.authorId] = (userActivity[reply.authorId] || 0) + 0.8;
    });
  });

  return Object.entries(userActivity)
    .sort(([,a], [,b]) => b - a)
    .slice(0, limit)
    .map(([userId, activity]) => {
      const user = users.find(u => u.id === userId);
      return {
        user,
        activity: Math.round(activity * 10) / 10
      };
    })
    .filter(item => item.user);
}

export function getTweetAnalytics(tweets) {
  if (tweets.length === 0) return null;

  const now = new Date();
  const last24h = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const recent24h = tweets.filter(tweet => new Date(tweet.createdAt) > last24h);
  const recentWeek = tweets.filter(tweet => new Date(tweet.createdAt) > lastWeek);

  const totalEngagement = tweets.reduce((sum, tweet) =>
    sum + tweet.likes.length + tweet.retweets.length + tweet.replies.length, 0);

  return {
    totalTweets: tweets.length,
    tweets24h: recent24h.length,
    tweetsThisWeek: recentWeek.length,
    totalEngagement,
    avgEngagementPerTweet: tweets.length > 0 ?
      (totalEngagement / tweets.length).toFixed(2) : 0,
    mostLikedTweet: tweets.reduce((max, tweet) =>
      tweet.likes.length > (max?.likes.length || 0) ? tweet : max, null),
    mostRetweetedTweet: tweets.reduce((max, tweet) =>
      tweet.retweets.length > (max?.retweets.length || 0) ? tweet : max, null),
  };
}

export function getGrowthMetrics(users) {
  const now = new Date();
  const last30Days = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const last7Days = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const newUsers30Days = users.filter(user =>
    new Date(user.createdAt) > last30Days).length;
  const newUsers7Days = users.filter(user =>
    new Date(user.createdAt) > last7Days).length;

  return {
    totalUsers: users.length,
    newUsers30Days,
    newUsers7Days,
    avgFollowersPerUser: users.length > 0 ?
      (users.reduce((sum, user) => sum + (user.followers?.length || 0), 0) / users.length).toFixed(1) : 0
  };
}