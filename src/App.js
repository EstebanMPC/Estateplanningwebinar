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

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(isMobileDevice);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Lazy load video for desktop only
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

  // Countdown timer calculation
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
    // Here you would typically send the data to your backend
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
              Secure Your Legacy: Join Our Free Estate Planning Webinar
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

      {/* Speaker Section */}
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
    </div>
  );
}

export default App;
