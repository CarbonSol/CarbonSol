import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faLeaf, 
  faExchangeAlt, 
  faShieldAlt, 
  faGlobeAmericas,
  faUsers,
  faChartLine,
  faHandshake,
  faLightbulb
} from '@fortawesome/free-solid-svg-icons';
import '../styles/About.css';

const About = () => {
  return (
    <div className="about-container">
      <section className="about-hero">
        <div className="hero-content">
          <h1>About CarbonSol</h1>
          <p>Revolutionizing carbon credit trading with blockchain technology</p>
        </div>
      </section>
      
      <section className="about-mission">
        <div className="section-container">
          <h2>Our Mission</h2>
          <div className="mission-content">
            <div className="mission-image">
              <img src="/images/mission.jpg" alt="CarbonSol Mission" />
            </div>
            <div className="mission-text">
              <p>
                At CarbonSol, we're on a mission to accelerate the transition to a low-carbon economy by making carbon credit trading more accessible, transparent, and efficient through blockchain technology.
              </p>
              <p>
                We believe that by combining the power of Solana's fast, low-cost blockchain with the growing carbon credit market, we can help individuals and organizations worldwide to offset their carbon footprint and contribute to climate action.
              </p>
              <p>
                Our platform bridges the gap between traditional carbon markets and decentralized finance, creating new opportunities for climate impact while ensuring environmental integrity.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="about-values">
        <div className="section-container">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">
                <FontAwesomeIcon icon={faLeaf} />
              </div>
              <h3>Environmental Integrity</h3>
              <p>We ensure all carbon credits on our platform represent real, verified emissions reductions that meet international standards.</p>
            </div>
            
            <div className="value-card">
              <div className="value-icon">
                <FontAwesomeIcon icon={faShieldAlt} />
              </div>
              <h3>Transparency</h3>
              <p>We leverage blockchain technology to provide complete transparency in carbon credit issuance, ownership, and retirement.</p>
            </div>
            
            <div className="value-card">
              <div className="value-icon">
                <FontAwesomeIcon icon={faExchangeAlt} />
              </div>
              <h3>Accessibility</h3>
              <p>We make carbon markets accessible to everyone, from individuals to large corporations, with low barriers to entry.</p>
            </div>
            
            <div className="value-card">
              <div className="value-icon">
                <FontAwesomeIcon icon={faGlobeAmericas} />
              </div>
              <h3>Global Impact</h3>
              <p>We support carbon projects worldwide that deliver both climate benefits and sustainable development outcomes.</p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="about-how-it-works">
        <div className="section-container">
          <h2>How CarbonSol Works</h2>
          <div className="steps-container">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Carbon Project Verification</h3>
                <p>Carbon reduction projects are verified by recognized standards like Verra or Gold Standard to ensure they deliver real climate benefits.</p>
              </div>
            </div>
            
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Tokenization</h3>
                <p>Verified carbon credits are tokenized on the Solana blockchain as Verified Carbon Units (VCUs), with each token representing 1 tonne of CO2 equivalent reduced or removed.</p>
              </div>
            </div>
            
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Trading</h3>
                <p>Users can buy, sell, or trade VCUs on our decentralized exchange, with transparent pricing and low transaction fees.</p>
              </div>
            </div>
            
            <div className="step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>Retirement</h3>
                <p>When users want to offset their carbon footprint, they can permanently retire VCUs, removing them from circulation and claiming the environmental benefit.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="about-team">
        <div className="section-container">
          <h2>Our Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-image">
                <img src="/images/team/member1.jpg" alt="Team Member" />
              </div>
              <h3>Jane Smith</h3>
              <p className="member-title">CEO & Co-Founder</p>
              <p className="member-bio">Former climate policy advisor with 10+ years experience in carbon markets and sustainable finance.</p>
            </div>
            
            <div className="team-member">
              <div className="member-image">
                <img src="/images/team/member2.jpg" alt="Team Member" />
              </div>
              <h3>Michael Chen</h3>
              <p className="member-title">CTO & Co-Founder</p>
              <p className="member-bio">Blockchain developer and architect with expertise in DeFi protocols and smart contract security.</p>
            </div>
            
            <div className="team-member">
              <div className="member-image">
                <img src="/images/team/member3.jpg" alt="Team Member" />
              </div>
              <h3>Elena Rodriguez</h3>
              <p className="member-title">Head of Carbon Projects</p>
              <p className="member-bio">Environmental scientist specializing in carbon project development and verification standards.</p>
            </div>
            
            <div className="team-member">
              <div className="member-image">
                <img src="/images/team/member4.jpg" alt="Team Member" />
              </div>
              <h3>David Okonkwo</h3>
              <p className="member-title">Head of Partnerships</p>
              <p className="member-bio">Business development expert with extensive experience in climate tech and renewable energy sectors.</p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="about-benefits">
        <div className="section-container">
          <h2>Benefits of Using CarbonSol</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <FontAwesomeIcon icon={faChartLine} className="benefit-icon" />
              <h3>Market Efficiency</h3>
              <p>Our blockchain-based platform reduces intermediaries, lowers costs, and increases market liquidity.</p>
            </div>
            
            <div className="benefit-card">
              <FontAwesomeIcon icon={faShieldAlt} className="benefit-icon" />
              <h3>Trust & Verification</h3>
              <p>Immutable blockchain records ensure the integrity and traceability of all carbon credits.</p>
            </div>
            
            <div className="benefit-card">
              <FontAwesomeIcon icon={faUsers} className="benefit-icon" />
              <h3>Inclusive Participation</h3>
              <p>Low minimum investment thresholds allow individuals and small businesses to participate in carbon markets.</p>
            </div>
            
            <div className="benefit-card">
              <FontAwesomeIcon icon={faHandshake} className="benefit-icon" />
              <h3>Direct Impact</h3>
              <p>Support carbon projects directly and see the real-world impact of your climate action.</p>
            </div>
            
            <div className="benefit-card">
              <FontAwesomeIcon icon={faGlobeAmericas} className="benefit-icon" />
              <h3>Global Reach</h3>
              <p>Access carbon credits from projects around the world, regardless of your location.</p>
            </div>
            
            <div className="benefit-card">
              <FontAwesomeIcon icon={faLightbulb} className="benefit-icon" />
              <h3>Innovation</h3>
              <p>Our platform continuously evolves with new features and integrations to enhance the carbon market experience.</p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="about-partners">
        <div className="section-container">
          <h2>Our Partners</h2>
          <div className="partners-logos">
            <div className="partner-logo">
              <img src="/images/partners/partner1.png" alt="Partner Logo" />
            </div>
            <div className="partner-logo">
              <img src="/images/partners/partner2.png" alt="Partner Logo" />
            </div>
            <div className="partner-logo">
              <img src="/images/partners/partner3.png" alt="Partner Logo" />
            </div>
            <div className="partner-logo">
              <img src="/images/partners/partner4.png" alt="Partner Logo" />
            </div>
            <div className="partner-logo">
              <img src="/images/partners/partner5.png" alt="Partner Logo" />
            </div>
          </div>
        </div>
      </section>
      
      <section className="about-cta">
        <div className="section-container">
          <h2>Join the Climate Action Revolution</h2>
          <p>Be part of the solution to climate change with CarbonSol's innovative carbon credit trading platform.</p>
          <div className="cta-buttons">
            <a href="/register" className="primary-button">Create Account</a>
            <a href="/contact" className="secondary-button">Contact Us</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;