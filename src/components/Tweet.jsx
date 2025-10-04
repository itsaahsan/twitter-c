import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { formatDistanceToNow } from 'date-fns';
import { Heart, MessageCircle, Repeat2, Share, MoreHorizontal, Bookmark, Trash2 } from 'lucide-react';
import { renderTweetText } from '../utils/textParsing';

export default function Tweet({ tweet }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { likeTweet, retweet, addReply, bookmarkTweet, isBookmarked, deleteTweet, users } = useData();
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const isLiked = tweet.likes.includes(user?.id);
  const isRetweeted = tweet.retweets.includes(user?.id);
  const isTweetBookmarked = isBookmarked(tweet.id);

  const handleLike = () => {
    likeTweet(tweet.id);
  };

  const handleRetweet = () => {
    retweet(tweet.id);
  };

  const handleBookmark = () => {
    bookmarkTweet(tweet.id);
  };

  const handleReply = async (e) => {
    e.preventDefault();
    if (!replyContent.trim()) return;

    setIsSubmittingReply(true);
    addReply(tweet.id, replyContent.trim());
    setReplyContent('');
    setShowReplyBox(false);
    setIsSubmittingReply(false);
  };

  const handleDeleteTweet = () => {
    if (window.confirm('Are you sure you want to delete this tweet?')) {
      deleteTweet(tweet.id);
    }
    setShowMenu(false);
  };

  const handleProfileClick = (e) => {
    e.stopPropagation();
    navigate(`/profile/${tweet.author.id}`);
  };

  const handleMentionClick = (username) => {
    // Find the user by username
    const mentionedUser = users.find(u => u.username.toLowerCase() === username.toLowerCase());
    if (mentionedUser) {
      navigate(`/profile/${mentionedUser.id}`);
    }
  };

  return (
    <article className="tweet">
      <div className="tweet-content">
        <div className="tweet-avatar">
          <img
            src={tweet.author.avatar}
            alt={tweet.author.displayName}
            onClick={handleProfileClick}
          />
        </div>

        <div className="tweet-body">
          <div className="tweet-header">
            <div className="author-info" onClick={handleProfileClick}>
              <span className="display-name">{tweet.author.displayName}</span>
              <span className="username">@{tweet.author.username}</span>
              <span className="separator">·</span>
              <span className="timestamp">
                {formatDistanceToNow(new Date(tweet.createdAt))} ago
              </span>
            </div>
            <div className="tweet-menu-container" ref={menuRef}>
              <button
                className="tweet-menu"
                onClick={() => setShowMenu(!showMenu)}
              >
                <MoreHorizontal size={16} />
              </button>

              {showMenu && (
                <div className="tweet-dropdown-menu">
                  {tweet.authorId === user?.id && (
                    <button
                      className="dropdown-item delete-item"
                      onClick={handleDeleteTweet}
                    >
                      <Trash2 size={16} />
                      Delete tweet
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="tweet-text">
            <p>{renderTweetText(tweet.content, handleMentionClick)}</p>
          </div>

          {tweet.image && (
            <div className="tweet-image">
              <img src={tweet.image} alt="Tweet attachment" />
            </div>
          )}

          {tweet.video && (
            <div className="tweet-video">
              <video src={tweet.video} controls style={{ width: '100%', borderRadius: '12px' }} />
            </div>
          )}

          <div className="tweet-actions">
            <button
              className="action-btn reply-btn"
              onClick={() => setShowReplyBox(!showReplyBox)}
            >
              <MessageCircle size={18} />
              <span>{tweet.replies.length}</span>
            </button>

            <button
              className={`action-btn retweet-btn ${isRetweeted ? 'active' : ''}`}
              onClick={handleRetweet}
            >
              <Repeat2 size={18} />
              <span>{tweet.retweets.length}</span>
            </button>

            <button
              className={`action-btn like-btn ${isLiked ? 'active' : ''}`}
              onClick={handleLike}
            >
              <Heart size={18} fill={isLiked ? 'currentColor' : 'none'} />
              <span>{tweet.likes.length}</span>
            </button>

            <button className="action-btn share-btn">
              <Share size={18} />
            </button>

            <button
              className={`action-btn bookmark-btn ${isTweetBookmarked ? 'active' : ''}`}
              onClick={handleBookmark}
            >
              <Bookmark size={18} fill={isTweetBookmarked ? 'currentColor' : 'none'} />
            </button>
          </div>

          {showReplyBox && (
            <div className="reply-box">
              <form onSubmit={handleReply}>
                <div className="reply-input-wrapper">
                  <img src={user?.avatar} alt={user?.displayName} />
                  <textarea
                    placeholder={`Reply to @${tweet.author.username}`}
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    rows={2}
                  />
                </div>
                <div className="reply-actions">
                  <button
                    type="button"
                    onClick={() => setShowReplyBox(false)}
                    className="cancel-btn"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!replyContent.trim() || isSubmittingReply}
                    className="reply-submit-btn"
                  >
                    {isSubmittingReply ? 'Replying...' : 'Reply'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {tweet.replies.length > 0 && (
            <div className="tweet-replies">
              <button className="show-replies-btn">
                Show {tweet.replies.length} {tweet.replies.length === 1 ? 'reply' : 'replies'}
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}