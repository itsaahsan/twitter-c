import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const hasLoggedOut = localStorage.getItem('twitter_logged_out');
    const savedUser = localStorage.getItem('twitter_user');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      localStorage.removeItem('twitter_logged_out');
    } else if (!hasLoggedOut) {
      const demoUser = {
        id: "1",
        username: "johndoe",
        displayName: "John Doe",
        email: "john@example.com",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=johndoe"
      };
      localStorage.setItem('twitter_user', JSON.stringify(demoUser));
      setUser(demoUser);
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('twitter_users') || '[]');
    const foundUser = users.find(u => u.email === email && u.password === password);

    if (foundUser) {
      const userWithoutPassword = { ...foundUser };
      delete userWithoutPassword.password;
      setUser(userWithoutPassword);
      localStorage.setItem('twitter_user', JSON.stringify(userWithoutPassword));
      localStorage.removeItem('twitter_logged_out');
      return { success: true };
    }

    return { success: false, error: 'Invalid credentials' };
  };

  const signup = (userData) => {
    const users = JSON.parse(localStorage.getItem('twitter_users') || '[]');

    if (users.find(u => u.email === userData.email)) {
      return { success: false, error: 'Email already exists' };
    }

    const newUser = {
      id: Date.now().toString(),
      ...userData,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.username}`,
      createdAt: new Date().toISOString(),
      following: [],
      followers: [],
      bio: '',
    };

    users.push(newUser);
    localStorage.setItem('twitter_users', JSON.stringify(users));

    const userWithoutPassword = { ...newUser };
    delete userWithoutPassword.password;
    setUser(userWithoutPassword);
    localStorage.setItem('twitter_user', JSON.stringify(userWithoutPassword));
    localStorage.removeItem('twitter_logged_out');

    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('twitter_user');
    localStorage.setItem('twitter_logged_out', 'true');
  };

  const updateProfile = (updates) => {
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('twitter_user', JSON.stringify(updatedUser));

    const users = JSON.parse(localStorage.getItem('twitter_users') || '[]');
    const userIndex = users.findIndex(u => u.id === user.id);
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...updates };
      localStorage.setItem('twitter_users', JSON.stringify(users));
    }
  };

  const refreshUser = () => {
    const savedUser = localStorage.getItem('twitter_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  };

  const value = {
    user,
    login,
    signup,
    logout,
    updateProfile,
    refreshUser,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}