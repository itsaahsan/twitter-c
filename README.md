# Twitter Clone

A modern, full-featured Twitter clone built with React and Vite. This application replicates the core functionality and design of Twitter/X with a clean, responsive interface.

## ✨ Features

### 🏠 **Core Features**
- **Home Feed** - View posts from followed accounts
- **User Authentication** - Login and signup functionality
- **Post Creation** - Create tweets with text and images
- **User Profiles** - View and edit user profiles
- **Follow System** - Follow/unfollow other users

### 🧭 **Navigation & Pages**
- **Home** - Main feed with posts from followed accounts
- **Explore** - Discover trending topics and popular posts
- **Notifications** - View likes, replies, mentions, and follows
- **Messages** - Direct messaging system with other users
- **Grok** - AI chatbot for questions and information
- **Communities** - Join or create interest-based groups
- **Premium** - Access to premium features and subscription plans
- **Verified Organizations** - Browse and follow verified organizations
- **Bookmarks** - Save posts for later viewing
- **Profile** - User profile management and customization

### 🎨 **Design & UX**
- **Full-width Layout** - Utilizes entire screen like original Twitter
- **Three-column Design** - Left sidebar, main content, right sidebar
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Dark Theme** - Twitter-like dark theme with proper color schemes
- **Interactive Elements** - Hover effects, active states, and smooth transitions

### 🔧 **Technical Features**
- **Context API** - State management for auth, data, and theme
- **Local Storage** - Persistent data storage
- **Component Architecture** - Modular, reusable components
- **Routing** - Multi-page navigation with React Router
- **Real-time Updates** - Dynamic content updates

## 🚀 **Getting Started**

### Prerequisites
- Node.js (version 20.19+ or 22.12+)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/itsaahsan/twitter-c.git
   cd twitter-c
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 📁 **Project Structure**

```
twitter-c/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Header.jsx       # Top navigation bar
│   │   ├── Layout.jsx       # Main layout wrapper
│   │   ├── Sidebar.jsx      # Left navigation sidebar
│   │   ├── RightSidebar.jsx # Right content sidebar
│   │   ├── Tweet.jsx        # Individual tweet component
│   │   ├── TweetComposer.jsx# Tweet creation component
│   │   └── Notifications.jsx# Notification component
│   ├── pages/              # Application pages
│   │   ├── Home.jsx        # Main feed page
│   │   ├── Profile.jsx     # User profile page
│   │   ├── Explore.jsx     # Discovery page
│   │   ├── Messages.jsx    # Direct messages
│   │   ├── Grok.jsx        # AI chatbot page
│   │   ├── Communities.jsx # Communities page
│   │   ├── Premium.jsx     # Premium subscription page
│   │   ├── VerifiedOrgs.jsx# Verified organizations
│   │   ├── Bookmarks.jsx   # Saved posts
│   │   ├── Login.jsx       # Authentication
│   │   ├── Signup.jsx      # User registration
│   │   └── More.jsx        # Additional settings
│   ├── context/            # React Context providers
│   │   ├── AuthContext.jsx # Authentication state
│   │   ├── DataContext.jsx # Application data
│   │   └── ThemeContext.jsx# Theme management
│   ├── utils/              # Utility functions
│   │   ├── analytics.js    # User analytics
│   │   ├── sampleData.js   # Sample data generation
│   │   ├── generateUsers.js# User data generation
│   │   └── textParsing.jsx # Text processing utilities
│   ├── App.jsx             # Main application component
│   ├── App.css             # Global styles
│   └── main.jsx            # Application entry point
├── public/                 # Static assets
├── package.json            # Project dependencies
└── README.md              # Project documentation
```

## 🛠 **Technologies Used**

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Styling**: CSS3 with CSS Variables
- **State Management**: React Context API
- **Storage**: Local Storage API
- **Date Handling**: date-fns

## 📱 **Responsive Design**

The application is fully responsive with three breakpoints:

- **Desktop (>1024px)**: Full three-column layout
- **Tablet (≤1024px)**: Two-column layout (hides right sidebar)
- **Mobile (≤768px)**: Single-column stacked layout

## 🔐 **Authentication**

The app includes a complete authentication system:

- **User Registration**: Create new accounts with email/password
- **User Login**: Secure login with credential validation
- **Profile Management**: Update user information and bio
- **Session Persistence**: Maintains login state across browser sessions

## 🎯 **Key Components**

### **Sidebar Navigation**
- Home, Explore, Notifications, Messages
- Grok AI, Communities, Premium, Verified Orgs
- Profile, Bookmarks, More options
- Responsive post button

### **Tweet System**
- Create posts with text and images
- Like, reply, retweet, and bookmark functionality
- Real-time interaction updates
- Character count with visual feedback

### **User Profiles**
- Customizable profile information
- Follower/following statistics
- Tweet history and engagement metrics
- Bio editing and profile customization

## 🌟 **Features in Detail**

### **Premium Page**
- Two subscription tiers (Premium & Premium+)
- Feature comparison tables
- FAQ section
- Responsive pricing cards

### **Communities**
- Discover and join communities
- Search functionality
- Member statistics
- Create new communities

### **Grok AI Assistant**
- Interactive chat interface
- Real-time messaging
- AI response simulation
- Clean conversation UI

### **Verified Organizations**
- Browse verified companies and organizations
- Category filtering
- Organization profiles with verification badges
- Follow/visit functionality

## 🔄 **Data Management**

The app uses React Context for state management:

- **AuthContext**: User authentication and profile data
- **DataContext**: Tweets, users, and social interactions
- **ThemeContext**: Theme preferences and UI settings

All data is persisted in browser localStorage for session continuity.

## 🚧 **Future Enhancements**

- Real-time messaging with WebSockets
- Advanced search functionality
- Tweet threads and replies
- Media upload and processing
- Push notifications
- Dark/light theme toggle
- Advanced user settings
- Analytics dashboard

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## 📄 **License**

This project is open source and available under the [MIT License](LICENSE).

## 🙏 **Acknowledgments**

- Inspired by Twitter/X's design and functionality
- Built with modern React best practices
- Uses Lucide React for consistent iconography
- Responsive design following mobile-first principles

---

**Note**: This is a clone/educational project and is not affiliated with Twitter/X or any of its services.