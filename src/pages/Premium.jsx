import { Crown, Check, Star } from 'lucide-react';

export default function Premium() {
  const features = [
    'Edit posts',
    'Longer posts up to 25,000 characters',
    'Bookmark folders',
    'Highlights tab',
    'Custom app icons',
    'NFT profile pictures',
    'Subscriber-only content',
    'Ad-free timeline',
    'Priority customer support',
    'Blue checkmark verification'
  ];

  const premiumPlusFeatures = [
    'Everything in Premium',
    'Reply boost',
    'Half ads in For You and Following',
    'Larger reply boost',
    'Write Articles',
    'Advanced search',
    'Analytics dashboard',
    'Exclusive spaces access'
  ];

  return (
    <div className="premium-page">
      <div className="premium-hero">
        <div className="hero-content">
          <Crown size={48} className="premium-icon" />
          <h1>Upgrade to Premium</h1>
          <p>Enjoy an enhanced experience, exclusive features, and support the platform you love.</p>
        </div>
      </div>

      <div className="premium-plans">
        <div className="plan-card">
          <div className="plan-header">
            <h3>Premium</h3>
            <div className="plan-price">
              <span className="price">$8</span>
              <span className="period">/month</span>
            </div>
          </div>

          <ul className="plan-features">
            {features.map((feature, index) => (
              <li key={index}>
                <Check size={16} />
                {feature}
              </li>
            ))}
          </ul>

          <button className="plan-btn">Subscribe to Premium</button>
        </div>

        <div className="plan-card premium-plus">
          <div className="most-popular-badge">
            <Star size={12} />
            Most Popular
          </div>
          <div className="plan-header">
            <h3>Premium+</h3>
            <div className="plan-price">
              <span className="price">$16</span>
              <span className="period">/month</span>
            </div>
          </div>

          <ul className="plan-features">
            {premiumPlusFeatures.map((feature, index) => (
              <li key={index}>
                <Check size={16} />
                {feature}
              </li>
            ))}
          </ul>

          <button className="plan-btn">Subscribe to Premium+</button>
        </div>
      </div>

      <div className="premium-faq">
        <h2>Frequently Asked Questions</h2>

        <div className="faq-item">
          <h4>Can I cancel anytime?</h4>
          <p>Yes, you can cancel your subscription at any time from your account settings.</p>
        </div>

        <div className="faq-item">
          <h4>What payment methods do you accept?</h4>
          <p>We accept all major credit cards, PayPal, and other secure payment methods.</p>
        </div>

        <div className="faq-item">
          <h4>Is there a free trial?</h4>
          <p>New subscribers get a 7-day free trial to experience Premium features.</p>
        </div>
      </div>
    </div>
  );
}