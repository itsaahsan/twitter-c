import { generateLargeUserBase } from './generateUsers.js';

// Sample data for demo purposes
const generateTweets = () => {
  const tweetTemplates = {
    tech: [
      "Just deployed a new feature using React hooks! The code is so much cleaner now. Feeling productive today! 🚀 #ReactJS #WebDev",
      "AI is revolutionizing software development. GPT-4 just helped me debug a complex algorithm in minutes! 🤖 #AI #Programming",
      "Working on a new open source library for state management. Would love community feedback! Who wants to contribute? #OpenSource #JavaScript",
      "The future is here! Just finished building my first blockchain smart contract. Web3 is amazing! ⛓️💡 #Blockchain #Crypto",
      "Debugging is like being a detective. You follow code clues, test theories, and eventually solve the mystery! 🕵️‍♂️ #DebuggingLife",
      "Coffee break thoughts: Clean code is code that doesn't need extra comments because it's self-explanatory ☕ #CleanCode #Programming",
      "Just learned about microservices architecture. Game changer for scalable applications! 📈 #Microservices #Architecture",
      "TypeScript has improved my productivity by 200%. Type safety is a game changer! 💪 #TypeScript #DevLife",
      "Kubernetes deployment finally working after 5 hours of troubleshooting. DevOps is rewarding but tough! 🐳 #DevOps #Docker",
      "Building AI chatbots with Python and TensorFlow. The possibilities are endless! 🤖🔬 #MachineLearning #Python"
    ],
    work: [
      "Monday motivation: Start your week with clear goals and a positive mindset. You've got this! 💪 #MondayMotivation",
      "Late night coding session paying off. The app looks amazing at 3 AM! 🌙💻 #NightOwl #CoderLife",
      "Remote work tip: Create a dedicated workspace. It helps your brain know it's 'work time' 🎯 #RemoteWork #Productivity",
      "Iteration over perfection. Ship early, ship often, improve constantly 🚀 #Startups #GrowthMindset",
      "Meeting marathons today. 6 back-to-back calls. Surviving on coffee and willpower ☕😅 #BusyDay #WorkLife",
      "Celebrating a successful product launch today! Team effort pays off ✨ #TeamWork #Success",
      "Freelancers, set your boundaries. 'No' is a complete sentence when it comes to work-life balance ⚖️ #FreelanceLife",
      "Working on that side project during weekends. Passion projects keep life interesting! 🎨 #WeekendWarrior #SideHustle",
      "Job hunting tip: Update your portfolio. It's your ticket to dream job opportunities! 🎫 #CareerAdvice",
      "End of quarter reflections: What went well? What can improve? Constant growth mindset 📈 #PersonalDevelopment"
    ],
    lifestyle: [
      "Beautiful sunrise this morning! Sometimes you need to step away from screens and appreciate nature 🌅 #MorningVibes",
      "Morning walk in the park with my favorite audiobook. Perfect way to start the day! 🌳📚 #Nature #SelfCare",
      "Cooking experiment tonight: Homemade pasta from scratch. Cooking is my therapy! 🍝 #Cooking #Foodie",
      "Weekend project: Repotting plants and organizing my workspace. Small changes bring big joy 🌱 #HomeDecor #Organization",
      "Evening meditation session helping me stay grounded. Mindfulness is key to mental wellness 🧘‍♀️ #Meditation #Wellness",
      "Trying that new yoga class. Stretching feels amazing after a long week! 🧘‍♂️ #Yoga #Fitness",
      "Baking chocolate chip cookies from Grandma's recipe. Smells like childhood memories! 🍪🥰 #Baking #Nostalgia",
      "Reading a fascinating book about human psychology. Knowledge is the best investment 📖🧠 #Reading #Psychology",
      "Gardening therapy: Watching seeds turn into flowers is so rewarding! 🌻🌿 #Gardening #NatureLover",
      "Coffee shop visits are my creative fuel. Chai latte and notebook = perfect combo ☕📓 #CoffeeLover #Creativity"
    ],
    random: [
      "Random thought: What if we treated time like money? Would we spend our days differently? 💭⏰ #DeepThoughts",
      "Perfect playlist for productivity: instrumental jazz and lo-fi beats. 🎵🎼 #MusicLover #Focus",
      "Weather matches my mood today: Sunny with occasional clouds. Hope your day is bright! ☀️⛅ #Weather #Mood",
      "Spontaneous road trip memories flooding back. Adventure is the spice of life! 🚗🗺️ #Travel #Adventure",
      "Pet tax accepted! My dog demanded belly rubs as soon as I sat down 🐶❤️ #PetsOfTwitter #DogMom",
      "Life lesson: Be patient with yourself. Growth takes time, not perfection ⚡💡 #LifeLessons #PersonalGrowth",
      "Counting my blessings today. Grateful for good health, amazing friends, and opportunities 💝🙏 #Gratitude",
      "That moment when you find money in your coat pocket from last winter! 😱💵 #UnexpectedJoys",
      "Question of the day: What's your go-to comfort food when you need cheering up? 🍕🍦 #FoodThoughts",
      "Stargazing tonight. The universe is so vast it's both terrifying and amazing ✨🌌 #Stargazing #Wonder"
    ]
  };

  const categories = ['tech', 'work', 'lifestyle', 'random'];
  const tweets = [];

  for (let i = 0; i < 1000; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const templates = tweetTemplates[category];
    const content = templates[Math.floor(Math.random() * templates.length)];

    // Create a tweet with random timing within the last few days
    const randomDays = Math.floor(Math.random() * 7); // Within last week
    const hoursAgo = Math.floor(Math.random() * 24);
    const createdAt = new Date(Date.now() - (randomDays * 24 * 60 * 60 * 1000) - (hoursAgo * 60 * 60 * 1000)).
toISOString();

    // Generate random engagement numbers
    const likesCount = Math.floor(Math.random() * 500);
    const retweetsCount = Math.floor(Math.random() * 200);
    const repliesCount = Math.floor(Math.random() * 50);

    // Randomly select some user IDs for likes/retweets (from sample users 1-5 + generated users)
    const possibleUserIds = ['1', '2', '3', '4', '5', '1000', '1001', '1002', '1003', '1004', '1005', '1006', '1007', '1008', '1009']
;
    const likes = [];
    const retweets = [];

    for (let j = 0; j < likesCount; j++) {
      if (possibleUserIds.length > 0) {
        const randomUserId = possibleUserIds[Math.floor(Math.random() * possibleUserIds.length)];
        if (!likes.includes(randomUserId)) {
          likes.push(randomUserId);
        }
      }
    }

    for (let j = 0; j < retweetsCount; j++) {
      if (possibleUserIds.length > 0) {
        const randomUserId = possibleUserIds[Math.floor(Math.random() * possibleUserIds.length)];
        if (!retweets.includes(randomUserId)) {
          retweets.push(randomUserId);
        }
      }
    }

    // Random author selection from the base users
    const baseAuthors = [
      { id: "1", username: "johndoe", displayName: "John Doe", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=johndoe" },
      { id: "2", username: "janesmith", displayName: "Jane Smith", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=janesmith" },
      { id: "3", username: "techguru", displayName: "Tech Guru", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=techguru" },
      { id: "4", username: "designpro", displayName: "Design Pro", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=designpro" },
      { id: "5", username: "devlife", displayName: "Dev Life", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=devlife" }
    ];

    // Add generated users to possible authors
    const generatedUserIds = Array.from({length: 250}, (_, i) => i + 1000).map(String);
    let authorId = baseAuthors[Math.floor(Math.random() * baseAuthors.length)].id;
    let authorUsername = baseAuthors[Math.floor(Math.random() * baseAuthors.length)].username;
    let authorDisplayName = baseAuthors[Math.floor(Math.random() * baseAuthors.length)].displayName;
    let authorAvatar = baseAuthors[Math.floor(Math.random() * baseAuthors.length)].avatar;

    if (Math.random() < 0.6) { // 60% chance to be from generated users
      const randomGeneratedId = generatedUserIds[Math.floor(Math.random() * generatedUserIds.length)];
      authorId = randomGeneratedId;
      authorUsername = `user${randomGeneratedId.substring(1)}`; // fallback username
      authorDisplayName = `User ${randomGeneratedId}`;
      authorAvatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=user${randomGeneratedId}`;
    }

    const tweet = {
      id: (2000 + i).toString(),
      content: content,
      authorId: authorId,
      author: {
        id: authorId,
        username: authorUsername,
        displayName: authorDisplayName,
        avatar: authorAvatar
      },
      createdAt: createdAt,
      likes: likes,
      retweets: retweets,
      replies: []
    };

    tweets.push(tweet);
  }

  return tweets.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sort by newest first
};

const generatedTweets = generateTweets();

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
  ...generatedTweets
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

  if (!existingTweets || JSON.parse(existingTweets).length < 1000) {
    // Generate large tweet base if we don't have enough tweets
    localStorage.setItem('twitter_tweets', JSON.stringify([...sampleTweets.slice(0, 1), ...generatedTweets]));
  }
}