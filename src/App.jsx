import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Explore from './pages/Explore';
import NotificationsPage from './pages/NotificationsPage';
import Messages from './pages/Messages';
import More from './pages/More';
import Bookmarks from './pages/Bookmarks';
import Admin from './pages/Admin';
import FollowersFollowing from './pages/FollowersFollowing';
import Grok from './pages/Grok';
import Communities from './pages/Communities';
import Premium from './pages/Premium';
import VerifiedOrgs from './pages/VerifiedOrgs';
import { useAuth } from './context/AuthContext';
import './App.css';


function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

function PublicRoute({ children }) {
  const { user } = useAuth();
  return !user ? children : <Navigate to="/" />;
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <DataProvider>
          <Router>
        <div className="app">
          <Routes>
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <PublicRoute>
                  <Signup />
                </PublicRoute>
              }
            />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Home />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/:userId"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Profile />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Profile />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/explore"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Explore />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <ProtectedRoute>
                  <Layout>
                    <NotificationsPage />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/messages"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Messages />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/more"
              element={
                <ProtectedRoute>
                  <Layout>
                    <More />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Admin />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/bookmarks"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Bookmarks />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/:userId/followers"
              element={
                <ProtectedRoute>
                  <Layout>
                    <FollowersFollowing />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/:userId/following"
              element={
                <ProtectedRoute>
                  <Layout>
                    <FollowersFollowing />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/grok"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Grok />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/communities"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Communities />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/premium"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Premium />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/verified-orgs"
              element={
                <ProtectedRoute>
                  <Layout>
                    <VerifiedOrgs />
                  </Layout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
          </Router>
        </DataProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App
