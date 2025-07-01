import React from 'react'
import "./Footer.css"
import instagramIcon from './ic-instagram.png'
import whatsappIcon from './ic-whatsapp.png'


function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <h2>Contact</h2>
        <div className="footer-grid">
          <div className="footer-box">
            <p>Phone</p>
            <p>+49 999 999 99 99</p>
          </div>
          <div className="footer-box">
            <p>Socials</p>
            <div className="footer-socials">
              <a href="#" aria-label="Instagram">
                <img src={instagramIcon} alt="Instagram" width={28} height={28} />
              </a>
              <a href="#" aria-label="WhatsApp">
                <img src={whatsappIcon} alt="WhatsApp" width={28} height={28} />
              </a>
            </div>
          </div>
          <div className="footer-box">
            <p>Address</p>
            <p>Linkstraße 2, 8 OG, 10785, Berlin, Deutschland</p>
          </div>
          <div className="footer-box">
            <p>Working Hours</p>
            <p>24 hours a day</p>
          </div>
        </div>
        <div className="footer-map">
          <iframe
            src="https://www.google.com/maps?q=Linkstraße+2,+Berlin,+Germany&output=embed"
            allowFullScreen
            loading="lazy"
            title="Google Map"
          ></iframe>
        </div>
      </div>
    </footer>
  )
}

export default Footer