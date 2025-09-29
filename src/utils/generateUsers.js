// Generate 200+ realistic users for Twitter clone

const firstNames = [
  'Alex', 'Sam', 'Jordan', 'Taylor', 'Morgan', 'Casey', 'Riley', 'Avery', 'Quinn', 'Sage',
  'Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'William', 'Sophia', 'Mason', 'Isabella', 'James',
  'Charlotte', 'Benjamin', 'Amelia', 'Lucas', 'Mia', 'Henry', 'Harper', 'Alexander', 'Evelyn', 'Sebastian',
  'Abigail', 'Jackson', 'Emily', 'Michael', 'Elizabeth', 'Ethan', 'Sofia', 'Owen', 'Avery', 'Daniel',
  'Ella', 'Matthew', 'Madison', 'Aiden', 'Scarlett', 'Samuel', 'Victoria', 'Joseph', 'Aria', 'John',
  'Grace', 'David', 'Chloe', 'Wyatt', 'Camila', 'Carter', 'Penelope', 'Luke', 'Layla', 'Grayson',
  'Riley', 'Jack', 'Zoey', 'Isaac', 'Nora', 'Jayden', 'Lily', 'Levi', 'Eleanor', 'Theodore',
  'Hannah', 'Caleb', 'Lillian', 'Ryan', 'Addison', 'Asher', 'Aubrey', 'Nathan', 'Ellie', 'Thomas',
  'Stella', 'Leo', 'Natalie', 'Isaiah', 'Zoe', 'Charles', 'Leah', 'Josiah', 'Hazel', 'Christopher',
  'Violet', 'Andrew', 'Aurora', 'Joshua', 'Savannah', 'Gabriel', 'Audrey', 'Adrian', 'Brooklyn', 'Jacob',
  'Bella', 'Logan', 'Claire', 'Anthony', 'Skylar', 'Eli', 'Lucy', 'Wayne', 'Paisley', 'Jaxon',
  'Everly', 'Aaron', 'Anna', 'Oliver', 'Caroline', 'Kai', 'Nova', 'Landon', 'Genesis', 'Miles',
  'Emilia', 'Colton', 'Kennedy', 'Jeremiah', 'Samantha', 'Nicholas', 'Maya', 'Connor', 'Willow', 'Hunter',
  'Kinsley', 'Ian', 'Naomi', 'Robert', 'Aaliyah', 'Hudson', 'Elena', 'Cooper', 'Sarah', 'Brayden',
  'Ariana', 'Roman', 'Allison', 'Easton', 'Gabriella', 'Jordan', 'Alice', 'Dominic', 'Madelyn', 'Austin',
  'Cora', 'Ryder', 'Ruby', 'Parker', 'Eva', 'Adam', 'Serenity', 'Blake', 'Autumn', 'Ian',
  'Adeline', 'Jason', 'Hailey', 'Nolan', 'Gianna', 'Jace', 'Valentina', 'Lincoln', 'Isla', 'Mason',
  'Eliana', 'Brody', 'Quinn', 'Luis', 'Nevaeh', 'Tristan', 'Ivy', 'Damian', 'Sadie', 'Carlos',
  'Piper', 'Jesse', 'Lydia', 'Tanner', 'Alexa', 'Kenneth', 'Clara', 'Kaleb', 'Vivian', 'Braxton'
];

const lastNames = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
  'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin',
  'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson',
  'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores',
  'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell', 'Carter', 'Roberts',
  'Gomez', 'Phillips', 'Evans', 'Turner', 'Diaz', 'Parker', 'Cruz', 'Edwards', 'Collins', 'Reyes',
  'Stewart', 'Morris', 'Morales', 'Murphy', 'Cook', 'Rogers', 'Gutierrez', 'Ortiz', 'Morgan', 'Cooper',
  'Peterson', 'Bailey', 'Reed', 'Kelly', 'Howard', 'Ramos', 'Kim', 'Cox', 'Ward', 'Richardson',
  'Watson', 'Brooks', 'Chavez', 'Wood', 'James', 'Bennett', 'Gray', 'Mendoza', 'Ruiz', 'Hughes',
  'Price', 'Alvarez', 'Castillo', 'Sanders', 'Patel', 'Myers', 'Long', 'Ross', 'Foster', 'Jimenez'
];

const professions = [
  'Software Engineer', 'Designer', 'Teacher', 'Doctor', 'Lawyer', 'Artist', 'Writer', 'Musician',
  'Chef', 'Photographer', 'Journalist', 'Entrepreneur', 'Marketing Manager', 'Data Scientist',
  'Product Manager', 'Content Creator', 'Consultant', 'Researcher', 'Engineer', 'Nurse',
  'Architect', 'Psychologist', 'Financial Analyst', 'Sales Manager', 'HR Specialist', 'Graphic Designer',
  'Social Media Manager', 'Developer', 'UX Designer', 'Project Manager', 'Accountant', 'Real Estate Agent',
  'Travel Blogger', 'Fitness Trainer', 'Life Coach', 'Therapist', 'Translator', 'Video Editor',
  'Fashion Designer', 'Interior Designer', 'Event Planner', 'Digital Marketer', 'SEO Specialist',
  'Web Developer', 'Mobile Developer', 'Game Developer', 'AI Researcher', 'Cybersecurity Expert',
  'DevOps Engineer', 'Cloud Architect', 'Business Analyst', 'Operations Manager', 'CEO', 'CTO',
  'Startup Founder', 'Investor', 'Podcaster', 'YouTuber', 'Influencer', 'Blogger', 'Streamer'
];

const interests = [
  'Technology', 'Design', 'Art', 'Music', 'Photography', 'Travel', 'Food', 'Fitness', 'Gaming',
  'Books', 'Movies', 'Sports', 'Fashion', 'Nature', 'Science', 'Education', 'Business', 'Finance',
  'Health', 'Wellness', 'Politics', 'Environment', 'Social Impact', 'Innovation', 'Startups',
  'AI/ML', 'Blockchain', 'Cryptocurrency', 'Web3', 'NFTs', 'Virtual Reality', 'Augmented Reality',
  'Space Exploration', 'Climate Change', 'Sustainability', 'Renewable Energy', 'Electric Vehicles',
  'Cooking', 'Baking', 'Gardening', 'DIY', 'Home Improvement', 'Pets', 'Animals', 'Volunteering',
  'Meditation', 'Yoga', 'Running', 'Cycling', 'Hiking', 'Rock Climbing', 'Surfing', 'Skiing'
];

const cities = [
  'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego',
  'Dallas', 'San Jose', 'Austin', 'Jacksonville', 'Fort Worth', 'Columbus', 'Charlotte', 'San Francisco',
  'Indianapolis', 'Seattle', 'Denver', 'Boston', 'Nashville', 'Baltimore', 'Portland', 'Oklahoma City',
  'Las Vegas', 'Louisville', 'Milwaukee', 'Albuquerque', 'Tucson', 'Fresno', 'Sacramento', 'Mesa',
  'Kansas City', 'Atlanta', 'Long Beach', 'Colorado Springs', 'Raleigh', 'Miami', 'Virginia Beach',
  'Omaha', 'Oakland', 'Minneapolis', 'Tulsa', 'Arlington', 'Tampa', 'New Orleans', 'Wichita',
  'Cleveland', 'Bakersfield', 'Aurora', 'Anaheim', 'Honolulu', 'Santa Ana', 'Riverside', 'Corpus Christi',
  'Lexington', 'Stockton', 'Henderson', 'Saint Paul', 'St. Louis', 'Cincinnati', 'Pittsburgh'
];

const generateRandomBio = (profession, interests, city) => {
  const bioTemplates = [
    `${profession} based in ${city}. Passionate about ${interests[0]} and ${interests[1]}. Always learning something new! 🚀`,
    `${interests[0]} enthusiast | ${profession} | ${city} native | Love connecting with like-minded people ✨`,
    `Making the world better through ${interests[0]}. ${profession} by day, ${interests[1]} lover by night. 📍${city}`,
    `${profession} 👨‍💻 | ${interests[0]} & ${interests[1]} advocate | Living in ${city} | Let's build something amazing together!`,
    `🌟 ${profession} | ${interests[0]} nerd | ${city} resident | Sharing insights about ${interests[1]} and life`,
    `${city}-based ${profession}. Obsessed with ${interests[0]}. Weekend warrior for ${interests[1]}. Coffee addict ☕`,
    `Professional ${profession} with a passion for ${interests[0]}. ${city} is home. ${interests[1]} fills my soul 💫`,
    `${interests[0]} + ${interests[1]} = my world. ${profession} making waves in ${city}. Always up for good conversations!`,
    `${profession} | ${interests[0]} expert | ${city} explorer | Building the future, one day at a time 🌍`,
    `Life-long learner | ${profession} | ${interests[0]} & ${interests[1]} enthusiast | Proud ${city} resident 🏙️`
  ];

  return bioTemplates[Math.floor(Math.random() * bioTemplates.length)];
};

export function generateLargeUserBase() {
  const users = [];
  const usedUsernames = new Set();

  for (let i = 0; i < 250; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const profession = professions[Math.floor(Math.random() * professions.length)];
    const city = cities[Math.floor(Math.random() * cities.length)];

    // Generate 2-3 random interests
    const userInterests = [];
    for (let j = 0; j < 2 + Math.floor(Math.random() * 2); j++) {
      const interest = interests[Math.floor(Math.random() * interests.length)];
      if (!userInterests.includes(interest)) {
        userInterests.push(interest);
      }
    }

    // Generate unique username
    let username = `${firstName.toLowerCase()}${lastName.toLowerCase()}`;
    if (usedUsernames.has(username)) {
      username += Math.floor(Math.random() * 1000);
    }
    usedUsernames.add(username);

    // Generate random follower/following counts
    const followerCount = Math.floor(Math.random() * 10000);
    const followingCount = Math.floor(Math.random() * 2000);

    const user = {
      id: (1000 + i).toString(),
      username,
      displayName: `${firstName} ${lastName}`,
      email: `${username}@example.com`,
      password: 'password123',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
      bio: generateRandomBio(profession, userInterests, city),
      location: city,
      profession,
      interests: userInterests,
      verified: Math.random() < 0.1, // 10% verified users
      createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
      following: [],
      followers: [],
      tweetsCount: Math.floor(Math.random() * 500),
      website: Math.random() < 0.3 ? `https://${username}.dev` : null
    };

    users.push(user);
  }

  // Generate realistic follow relationships
  users.forEach(user => {
    const followingCount = Math.floor(Math.random() * 150) + 10; // 10-160 following
    const potentialFollows = users.filter(u => u.id !== user.id);

    for (let i = 0; i < Math.min(followingCount, potentialFollows.length); i++) {
      const randomUser = potentialFollows[Math.floor(Math.random() * potentialFollows.length)];
      if (!user.following.includes(randomUser.id)) {
        user.following.push(randomUser.id);
        randomUser.followers.push(user.id);
      }
    }
  });

  return users;
}