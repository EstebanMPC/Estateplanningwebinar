import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [timeLeft, setTimeLeft] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(isMobileDevice);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile && videoRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setVideoLoaded(true);
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      
      observer.observe(videoRef.current);
      
      return () => observer.disconnect();
    }
  }, [isMobile]);

  useEffect(() => {
    const targetDate = new Date('2025-10-01T19:00:00-05:00').getTime();
    
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleVideoError = () => {
    setVideoError(true);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for registering! You will receive a confirmation email shortly.');
    setShowModal(false);
    setFormData({ name: '', email: '', phone: '' });
  };

  return (
    <div className="App">
      <header className="header">
        <div className="container">
          <div className="law-firm-name">PrimeTrust Legal</div>
        </div>
      </header>

      <section className="hero-section">
        <div className={`video-background ${!isMobile && !videoLoaded && !videoError ? 'loading' : ''}`} ref={videoRef}>
          {!isMobile && (
            <>
              {videoLoaded && !videoError && (
                <video 
                  autoPlay 
                  muted 
                  loop 
                  playsInline
                  className="background-video"
                  onError={handleVideoError}
                >
                  <source src="/files/teachingclass.mp4" type="video/mp4" />
                </video>
              )}
              {(videoError || !videoLoaded) && (
                <img 
                  src="/files/teachingclass.png" 
                  alt="Estate Planning Workshop" 
                  className="background-image"
                />
              )}
            </>
          )}
          {isMobile && (
            <img 
              src="/files/teachingclass.png" 
              alt="Estate Planning Workshop" 
              className="background-image"
            />
          )}
          
          <div className="video-overlay"></div>
        </div>
        
        <div className="hero-content">
          <div className="container">
            <h1 className="headline">
              <div className="headline-main">Secure Your Legacy</div>
              <div className="headline-sub">Join Our <span className="underline-free">Free</span> Estate Planning Webinar</div>
            </h1>
            
            <p className="subheadline">
              Learn How to Create Wills, Trusts, and More with Expert Guidance – Virtual Event on <span className="highlight-date">October 1st, 2025</span>
            </p>

            <div className="countdown-timer">
              <div className="timer-item">
                <span className="timer-number">{timeLeft.days || 0}</span>
                <span className="timer-label">Days</span>
              </div>
              <div className="timer-item">
                <span className="timer-number">{timeLeft.hours || 0}</span>
                <span className="timer-label">Hours</span>
              </div>
              <div className="timer-item">
                <span className="timer-number">{timeLeft.minutes || 0}</span>
                <span className="timer-label">Minutes</span>
              </div>
              <div className="timer-item">
                <span className="timer-number">{timeLeft.seconds || 0}</span>
                <span className="timer-label">Seconds</span>
              </div>
            </div>

            <button 
              className="cta-button"
              onClick={() => setShowModal(true)}
            >
              Reserve Your Spot Now
            </button>

            <div className="trust-indicators">
              <p>✓ Free Event • ✓ Expert Legal Guidance • ✓ No Obligation</p>
            </div>
          </div>
        </div>
      </section>

      <section className="speaker-section">
        <div className="container">
          <h2>Meet Your Expert Speaker</h2>
          <div className="speaker-card">
            <div className="speaker-image">
              <img 
                src="/files/ElizabethHarper.jpg" 
                alt="Elizabeth Harper, Esq." 
                className="speaker-photo"
              />
            </div>
            <div className="speaker-info">
              <h3 className="speaker-name">Elizabeth Harper, Esq.</h3>
              <p className="speaker-bio">
                Elizabeth Harper is a seasoned attorney with over 15 years of experience specializing in estate planning and family law at PrimeTrust Legal. Her compassionate approach and dedication to securing her clients' futures have earned her a reputation as a trusted advocate in her community.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="benefits-section">
        <div className="container">
          <h2>What You'll Learn</h2>
          <ul className="benefits-list">
            <li className="benefit-item">
              <strong>Wills & Trusts</strong> - Understand the difference between wills and trusts and when to use each
            </li>
            <li className="benefit-item">
              <strong>Asset Protection</strong> - Learn strategies to protect your assets and minimize estate taxes
            </li>
            <li className="benefit-item">
              <strong>Healthcare Directives</strong> - Create advance directives and power of attorney documents
            </li>
            <li className="benefit-item">
              <strong>Family Planning</strong> - Ensure your family's future with proper estate planning strategies
            </li>
            <li className="benefit-item">
              <strong>Estate Tax Planning</strong> - Discover strategies to minimize estate taxes and maximize wealth transfer
            </li>
            <li className="benefit-item">
              <strong>Business Succession</strong> - Plan for the future of your business and ensure smooth transitions
            </li>
          </ul>
        </div>
      </section>

      <section className="reviews-section">
        <div className="container">
          <h2>What Our Clients Say</h2>
          <div className="reviews-grid">
            <div className="review-card">
              <div className="review-content">
                <p className="review-text">
                  "At my age, I wanted peace of mind knowing my assets would be handled exactly as I wished, and Elizabeth Harper at PrimeTrust Legal made that happen. Her clear explanations and warm approach during the estate planning workshop helped me set up a trust without any stress, ensuring my grandchildren are taken care of."
                </p>
              </div>
              <div className="review-author">
                <img 
                  src="/files/grandmother.jpg" 
                  alt="Margaret Thompson" 
                  className="review-photo"
                />
                <div className="author-info">
                  <h4 className="author-name">Margaret Thompson, 78</h4>
                </div>
              </div>
            </div>

            <div className="review-card">
              <div className="review-content">
                <p className="review-text">
                  "As a new dad to my 5-year-old son, I hadn't thought much about estate planning until I attended Elizabeth Harper's webinar at PrimeTrust Legal. She broke down the importance of a will and guardianship in a way that was easy to understand, and now I feel confident my son's future is secure if anything happens to me."
                </p>
              </div>
              <div className="review-author">
                <img 
                  src="/files/dadkidson.jpg" 
                  alt="Ryan Carter" 
                  className="review-photo"
                />
                <div className="author-info">
                  <h4 className="author-name">Ryan Carter, 34</h4>
                </div>
              </div>
            </div>

            <div className="review-card">
              <div className="review-content">
                <p className="review-text">
                  "With my son heading to college soon, I needed to get my estate plan in order, and Elizabeth Harper's workshop at PrimeTrust Legal was a game-changer. Her practical advice and personalized approach gave me the tools to protect my son's future and my assets, all while making a complex topic feel manageable."
                </p>
              </div>
              <div className="review-author">
                <img 
                  src="/files/motherson.jpg" 
                  alt="Laura Bennett" 
                  className="review-photo"
                />
                <div className="author-info">
                  <h4 className="author-name">Laura Bennett, 46</h4>
                </div>
              </div>
            </div>
          </div>
          
          <div className="reviews-cta">
            <button 
              className="cta-button"
              onClick={() => setShowModal(true)}
            >
              Reserve Your Spot Now
            </button>
          </div>
        </div>
      </section>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>
            <h2>Reserve Your Free Spot</h2>
            <p>Join our estate planning webinar and secure your family's future</p>
            
            <form onSubmit={handleSubmit} className="signup-form">
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
              
              <button type="submit" className="submit-button">
                Reserve My Free Spot
              </button>
            </form>
          </div>
        </div>
      )}

      <footer className="footer">
        <div className="container">
          <div className="footer-content">PrimeTrust Legal</div>
        </div>
      </footer>
    </div>
  );
}

export default App;
