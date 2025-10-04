import { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { Image, Smile, X, Video } from 'lucide-react';
import EmojiPicker from 'emoji-picker-react';

export default function TweetComposer() {
  const { user } = useAuth();
  const { addTweet } = useData();
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const fileInputRef = useRef(null);
  const videoInputRef = useRef(null);

  const maxLength = 280;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() || content.length > maxLength) return;

    setIsSubmitting(true);
    try {
      const media = selectedImage || selectedVideo;
      await addTweet(content.trim(), media);
      setContent('');
      setSelectedImage(null);
      setSelectedVideo(null);
      setImagePreview(null);
      setVideoPreview(null);
    } catch (error) {
      console.error('Error posting tweet:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Remove any existing video
      if (selectedVideo) {
        removeVideo();
      }
      setSelectedImage(file);
      setSelectedVideo(null);

      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
        setVideoPreview(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Remove any existing image
      if (selectedImage) {
        removeImage();
      }
      setSelectedVideo(file);
      setSelectedImage(null);

      setVideoPreview(URL.createObjectURL(file));
      setImagePreview(null);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    fileInputRef.current.value = '';
  };

  const removeVideo = () => {
    setSelectedVideo(null);
    setVideoPreview(null);
    videoInputRef.current.value = '';
  };

  const handleEmojiClick = (emojiData) => {
    setContent(prevContent => prevContent + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
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

            {videoPreview && (
              <div className="video-preview">
                <video
                  src={videoPreview}
                  controls
                  style={{ width: '100%', maxHeight: '300px', borderRadius: '12px' }}
                />
                <button
                  type="button"
                  className="remove-image-btn"
                  onClick={removeVideo}
                >
                  <X size={16} />
                </button>
              </div>
            )}

            {showEmojiPicker && (
              <div className="emoji-picker-container">
                <EmojiPicker
                  onEmojiClick={handleEmojiClick}
                  theme="auto"
                  width={300}
                  height={350}
                />
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
                <input
                  type="file"
                  ref={videoInputRef}
                  onChange={handleVideoSelect}
                  accept="video/*"
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
                <button
                  type="button"
                  className="action-btn"
                  title="Add video"
                  onClick={() => videoInputRef.current?.click()}
                >
                  <Video size={20} />
                </button>
                <button type="button" className="action-btn" title="Add emoji" onClick={toggleEmojiPicker}>
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