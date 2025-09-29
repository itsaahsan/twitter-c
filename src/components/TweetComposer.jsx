import { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { Image, Smile, X } from 'lucide-react';

export default function TweetComposer() {
  const { user } = useAuth();
  const { addTweet } = useData();
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const maxLength = 280;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() || content.length > maxLength) return;

    setIsSubmitting(true);
    try {
      await addTweet(content.trim(), selectedImage);
      setContent('');
      setSelectedImage(null);
      setImagePreview(null);
    } catch (error) {
      console.error('Error posting tweet:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);

      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    fileInputRef.current.value = '';
  };

  const remainingChars = maxLength - content.length;
  const isOverLimit = remainingChars < 0;
  const isNearLimit = remainingChars <= 20;

  return (
    <div className="tweet-composer">
      <div className="composer-header">
        <img src={user?.avatar} alt={user?.displayName} className="composer-avatar" />
        <div className="composer-content">
          <form onSubmit={handleSubmit}>
            <textarea
              className="tweet-input"
              placeholder="What's happening?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={3}
              disabled={isSubmitting}
            />

            {imagePreview && (
              <div className="image-preview">
                <img src={imagePreview} alt="Selected" />
                <button
                  type="button"
                  className="remove-image-btn"
                  onClick={removeImage}
                >
                  <X size={16} />
                </button>
              </div>
            )}

            <div className="composer-footer">
              <div className="composer-actions">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageSelect}
                  accept="image/*"
                  style={{ display: 'none' }}
                />
                <button
                  type="button"
                  className="action-btn"
                  title="Add image"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Image size={20} />
                </button>
                <button type="button" className="action-btn" title="Add emoji">
                  <Smile size={20} />
                </button>
              </div>

              <div className="composer-submit">
                <div className={`char-counter ${isNearLimit ? 'warning' : ''} ${isOverLimit ? 'error' : ''}`}>
                  {remainingChars}
                </div>
                <button
                  type="submit"
                  className="tweet-btn"
                  disabled={!content.trim() || isOverLimit || isSubmitting}
                >
                  {isSubmitting ? 'Tweeting...' : 'Tweet'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}