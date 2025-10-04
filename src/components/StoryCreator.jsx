import { useState } from 'react';
import { X, Image, Video, Type } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function StoryCreator({ onClose, currentUser }) {
  const { createStory } = useData();
  const [media, setMedia] = useState(null);
  const [mediaType, setMediaType] = useState(null);
  const [content, setContent] = useState('');
  const [mediaPreview, setMediaPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMedia(file);
      setMediaType('image');

      const reader = new FileReader();
      reader.onload = (e) => {
        setMediaPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMedia(file);
      setMediaType('video');
      setMediaPreview(URL.createObjectURL(file));
    }
  };

  const handleTextOnly = () => {
    if (content.trim()) {
      // Create a text-only story with a gradient background
      const canvas = document.createElement('canvas');
      canvas.width = 400;
      canvas.height = 600;
      const ctx = canvas.getContext('2d');

      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, 400, 600);
      gradient.addColorStop(0, '#1da1f2');
      gradient.addColorStop(1, '#f91880');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 400, 600);

      // Add text
      ctx.fillStyle = 'white';
      ctx.font = 'bold 32px Arial';
      ctx.textAlign = 'center';

      const words = content.split(' ');
      const maxWidth = 350;
      let line = '';
      let y = 150;
      const lineHeight = 40;

      for (let i = 0; i < words.length; i++) {
        const testLine = line + words[i] + ' ';
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;

        if (testWidth > maxWidth && i > 0) {
          ctx.fillText(line, 200, y);
          line = words[i] + ' ';
          y += lineHeight;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, 200, y);

      const textOnlyMedia = canvas.toDataURL('image/png');
      return { media: textOnlyMedia, type: 'image' };
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let storyMedia = null;
      let storyType = 'image';

      if (media && mediaType) {
        // Convert file to base64 for localStorage
        if (mediaType === 'image') {
          storyMedia = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.readAsDataURL(media);
          });
        } else {
          storyMedia = mediaPreview; // Video preview URL
        }
        storyType = mediaType;
      } else if (content.trim()) {
        // Create text-only story
        const textStory = handleTextOnly();
        if (textStory) {
          storyMedia = textStory.media;
          storyType = textStory.type;
        }
      }

      if (storyMedia) {
        createStory(storyMedia, storyType);
        onClose();
      }
    } catch (error) {
      console.error('Error creating story:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const canSubmit = (media && mediaType) || content.trim();

  return (
    <div className="story-creator-overlay">
      <div className="story-creator" onClick={(e) => e.stopPropagation()}>
        <div className="story-creator-header">
          <h3>Create Story</h3>
          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="story-creator-content">
          <div className="story-creator-media">
            {mediaPreview ? (
              <div className="media-preview">
                {mediaType === 'video' ? (
                  <video src={mediaPreview} style={{ width: '100%', maxHeight: '400px', borderRadius: '12px' }} />
                ) : (
                  <img src={mediaPreview} alt="Story preview" style={{ width: '100%', maxHeight: '400px', borderRadius: '12px' }} />
                )}
                <div className="story-text-overlay">
                  <textarea
                    placeholder="Add a caption..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    maxLength={100}
                  />
                </div>
              </div>
            ) : (
              <div className="media-upload-area">
                <div className="upload-options">
                  <label className="upload-option">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageSelect}
                      style={{ display: 'none' }}
                    />
                    <div className="upload-button">
                      <Image size={24} />
                      <span>Photo</span>
                    </div>
                  </label>

                  <label className="upload-option">
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleVideoSelect}
                      style={{ display: 'none' }}
                    />
                    <div className="upload-button">
                      <Video size={24} />
                      <span>Video</span>
                    </div>
                  </label>

                  <button className="upload-option" onClick={() => setMediaPreview('text-only')}>
                    <div className="upload-button">
                      <Type size={24} />
                      <span>Text</span>
                    </div>
                  </button>
                </div>

                {mediaPreview === 'text-only' && (
                  <div className="text-story-editor">
                    <div className="text-story-preview">
                      <div className="text-background">
                        <textarea
                          placeholder="Write something..."
                          value={content}
                          onChange={(e) => setContent(e.target.value)}
                          maxLength={100}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'white',
                            fontSize: '24px',
                            fontWeight: 'bold',
                            textAlign: 'center',
                            resize: 'none',
                            outline: 'none',
                            width: '100%',
                            height: '100%',
                            padding: '20px'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="story-creator-actions">
            <button
              type="submit"
              disabled={!canSubmit || isSubmitting}
              className="story-submit-btn"
            >
              {isSubmitting ? 'Creating...' : 'Share Story'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}