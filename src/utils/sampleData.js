import { generateLargeUserBase } from './generateUsers.js';

// Sample data for demo purposes
export const sampleUsers = [
  {
    id: "1",
    username: "johndoe",
    displayName: "John Doe",
    email: "john@example.com",
    password: "password123",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=johndoe",
    bio: "Software Engineer passionate about React and Web Development. Love to build amazing user experiences! 🚀",
    createdAt: "2024-01-15T10:00:00.000Z",
    following: ["2", "3"],
    followers: ["2", "4", "5"]
  },
  {
    id: "2",
    username: "janesmith",
    displayName: "Jane Smith",
    email: "jane@example.com",
    password: "password123",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=janesmith",
    bio: "UX Designer | Coffee enthusiast ☕ | Creating beautiful digital experiences",
    createdAt: "2024-01-10T08:30:00.000Z",
    following: ["1", "3", "4"],
    followers: ["1", "3"]
  },
  {
    id: "3",
    username: "techguru",
    displayName: "Tech Guru",
    email: "tech@example.com",
    password: "password123",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=techguru",
    bio: "Tech enthusiast sharing the latest in AI, ML, and Web3 🤖 | Building the future",
    createdAt: "2024-01-05T14:20:00.000Z",
    following: ["1", "2", "4", "5"],
    followers: ["1", "2", "4"]
  },
  {
    id: "4",
    username: "designpro",
    displayName: "Design Pro",
    email: "design@example.com",
    password: "password123",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=designpro",
    bio: "Creative Director | Brand strategist | Making brands come alive through design ✨",
    createdAt: "2024-01-20T09:15:00.000Z",
    following: ["2", "3"],
    followers: ["1", "3", "5"]
  },
  {
    id: "5",
    username: "devlife",
    displayName: "Dev Life",
    email: "dev@example.com",
    password: "password123",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=devlife",
    bio: "Full-stack developer | Open source contributor | Sharing coding tips and tricks 💻",
    createdAt: "2024-01-25T11:45:00.000Z",
    following: ["1", "3", "4"],
    followers: ["3", "4"]
  }
];

export const sampleTweets = [
  {
    id: "1",
    content: "Just shipped a new feature using React hooks! The component architecture is so much cleaner now. #ReactJS #WebDev",
    authorId: "1",
    author: {
      id: "1",
      username: "johndoe",
      displayName: "John Doe",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=johndoe"
    },
    createdAt: "2024-09-29T06:30:00.000Z",
    likes: ["2", "3", "4"],
    retweets: ["2"],
    replies: []
  },
  {
    id: "2",
    content: "Beautiful sunrise this morning! Sometimes you need to step away from the screen and appreciate nature 🌅 #MorningVibes",
    authorId: "2",
    author: {
      id: "2",
      username: "janesmith",
      displayName: "Jane Smith",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=janesmith"
    },
    createdAt: "2024-09-29T05:15:00.000Z",
    likes: ["1", "3", "5"],
    retweets: [],
    replies: []
  },
  {
    id: "3",
    content: "AI is revolutionizing how we build software. GPT-4 just helped me debug a complex algorithm in minutes! 🤖 The future is here.",
    authorId: "3",
    author: {
      id: "3",
      username: "techguru",
      displayName: "Tech Guru",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=techguru"
    },
    createdAt: "2024-09-29T04:45:00.000Z",
    likes: ["1", "2", "4", "5"],
    retweets: ["1", "4"],
    replies: []
  },
  {
    id: "4",
    content: "Pro tip for designers: Always start with user research. Understanding your users' pain points leads to better design solutions! 📊✨",
    authorId: "4",
    author: {
      id: "4",
      username: "designpro",
      displayName: "Design Pro",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=designpro"
    },
    createdAt: "2024-09-29T03:20:00.000Z",
    likes: ["2", "3"],
    retweets: ["2"],
    replies: []
  },
  {
    id: "5",
    content: "Working on a new open source library for state management. Would love to get some feedback from the community! 🚀 #OpenSource #JavaScript",
    authorId: "5",
    author: {
      id: "5",
      username: "devlife",
      displayName: "Dev Life",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=devlife"
    },
    createdAt: "2024-09-29T02:10:00.000Z",
    likes: ["1", "3", "4"],
    retweets: ["3"],
    replies: []
  },
  {
    id: "6",
    content: "Coffee break thoughts: The best code is code that doesn't need comments because it's self-explanatory ☕ #CleanCode #Programming",
    authorId: "1",
    author: {
      id: "1",
      username: "johndoe",
      displayName: "John Doe",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=johndoe"
    },
    createdAt: "2024-09-29T01:30:00.000Z",
    likes: ["2", "5"],
    retweets: [],
    replies: []
  },
  {
    id: "7",
    content: "Design inspiration: Minimalism isn't about having less. It's about making room for what matters most. Less is more! 🎨",
    authorId: "2",
    author: {
      id: "2",
      username: "janesmith",
      displayName: "Jane Smith",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=janesmith"
    },
    createdAt: "2024-09-28T23:45:00.000Z",
    likes: ["1", "4"],
    retweets: ["4"],
    replies: []
  },
  {
    id: "8",
    content: "Blockchain technology is not just about cryptocurrency. Smart contracts are changing how we think about digital agreements! ⛓️💡",
    authorId: "3",
    author: {
      id: "3",
      username: "techguru",
      displayName: "Tech Guru",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=techguru"
    },
    createdAt: "2024-09-28T22:15:00.000Z",
    likes: ["1", "5"],
    retweets: [],
    replies: []
  },
  {
    id: "9",
    content: "Just finished reading about accessible design principles. Making products inclusive should be the default, not an afterthought! ♿️🌍",
    authorId: "4",
    author: {
      id: "4",
      username: "designpro",
      displayName: "Design Pro",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=designpro"
    },
    createdAt: "2024-09-28T20:30:00.000Z",
    likes: ["2", "3", "5"],
    retweets: ["2", "3"],
    replies: []
  },
  {
    id: "10",
    content: "Debugging is like being a detective. You follow clues, test theories, and eventually solve the mystery! 🕵️‍♂️ #DebuggingLife",
    authorId: "5",
    author: {
      id: "5",
      username: "devlife",
      displayName: "Dev Life",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=devlife"
    },
    createdAt: "2024-09-28T19:00:00.000Z",
    likes: ["1", "3"],
    retweets: ["1"],
    replies: []
  }
];

export function initializeSampleData() {
  // Only initialize if no data exists
  const existingUsers = localStorage.getItem('twitter_users');
  const existingTweets = localStorage.getItem('twitter_tweets');

  if (!existingUsers || JSON.parse(existingUsers).length < 50) {
    // Combine original sample users with generated large user base
    const largeUserBase = generateLargeUserBase();
    const allUsers = [...sampleUsers, ...largeUserBase];
    localStorage.setItem('twitter_users', JSON.stringify(allUsers));
  }

  if (!existingTweets || JSON.parse(existingTweets).length === 0) {
    localStorage.setItem('twitter_tweets', JSON.stringify(sampleTweets));
  }
}