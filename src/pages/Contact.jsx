import { useState, useEffect } from 'react';
import { useClient } from '../context/ClientContext';
import './Contact.css';

function Contact() {
  const { client } = useClient();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // Get contact info from client config
  const contactInfo = client?.contact || {
    phone: '(+63) 912-345-6789',
    email: 'info@business.com',
    address: 'Business Address',
    googleReviewLink: '#',
    mapLink: '#',
    formsubmitEmail: 'business@email.com',
    storeHours: [
      { day: 'Monday', hours: '10 AM–10 PM', isClosed: false },
      { day: 'Tuesday', hours: '10 AM–10 PM', isClosed: false },
      { day: 'Wednesday', hours: '10 AM–10 PM', isClosed: false },
      { day: 'Thursday', hours: '10 AM–10 PM', isClosed: false },
      { day: 'Friday', hours: '10 AM–10 PM', isClosed: false },
      { day: 'Saturday', hours: '10 AM–10 PM', isClosed: false },
      { day: 'Sunday', hours: 'Closed', isClosed: true }
    ]
  };

  useEffect(() => {
    const checkOpenStatus = () => {
      const now = new Date();
      const day = now.getDay();
      const hours = now.getHours();
      
      if (day === 0) {
        setIsOpen(false);
        return;
      }
      
      if (hours >= 10 || hours < 0) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    checkOpenStatus();
    const interval = setInterval(checkOpenStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);

    try {
      const response = await fetch(`https://formsubmit.co/${contactInfo.formsubmitEmail}`, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" }
      });

      if (response.ok) {
        setStatus(`Thank you, ${formData.name}! Your message has been sent.`);
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus("Oops! There was a problem sending your message.");
      }
    } catch {
      setStatus("Oops! There was a problem sending your message.");
    }
  };

  const storeHours = contactInfo.storeHours;

  return (
    <div className="contact fade-in">
      <section className="contact-hero">
        <div className="contact-hero-content">
          <h1 className="contact-title">Contact Us</h1>
          <p className="contact-subtitle">We'd love to hear from you</p>
        </div>
      </section>

      <section className="contact-content">
        <div className="contact-container">
          <div className="contact-info">
            {/* Phone */}
            <div className="contact-info-item">
              <div className="info-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </div>
              <div className="info-text">
                <h3>Phone</h3>
                <p>{contactInfo.phone}</p>
              </div>
            </div>
            
            {/* Email */}
            <div className="contact-info-item">
              <div className="info-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <div className="info-text">
                <h3>Email</h3>
                <p>{contactInfo.email}</p>
              </div>
            </div>
            
            {/* Address */}
            <div className="contact-info-item">
              <div className="info-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <div className="info-text">
                <h3>Address</h3>
                <p>{contactInfo.address}</p>
              </div>
            </div>
            
            {/* Store Hours */}
            <div className="contact-info-item store-hours-item">
              <div className="info-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <div className="info-text">
                <h3>Store Hours</h3>
                <div className="store-hours-status">
                  <span className={`status-badge ${isOpen ? 'open' : 'closed'}`}>
                    {isOpen ? 'Open Now' : 'Closed'}
                  </span>
                </div>
                <div className="store-hours-list">
                  {storeHours.map((schedule, index) => (
                    <div key={index} className={`hours-row ${schedule.isClosed ? 'closed-day' : ''}`}>
                      <span className="day">{schedule.day}</span>
                      <span className="hours">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Location Image */}
          <div className="location-image-wrapper">
            <h3>Find Us</h3>
            <a 
              href={contactInfo.mapLink}
              target="_blank" 
              rel="noopener noreferrer"
              className="location-image-container"
            >
              <img 
                src="/location.png" 
                alt="Our Location" 
                className="location-image"
              />
            </a>
            <p className="location-directions">
              {contactInfo.address}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
