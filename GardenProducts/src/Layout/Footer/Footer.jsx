import  {React, useContext } from 'react';
import instagramIconWhite  from '../../media/ic-instagram-white.png';
import whatsappIconWhite from '../../media/ic-whatsapp-white.png';
import instagramIcon from '../../media/ic-instagram.png';
import whatsappIcon from '../../media/ic-whatsapp.png';
import { ThemeContext } from '../../context/theme/ThemeContext.js';
import './Footer.scss';

function Footer() {
  const { theme } = useContext(ThemeContext);

  const isDark = theme === 'dark';

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
              <a
                href="https://www.instagram.com/startainstitute/"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={isDark ? instagramIconWhite : instagramIcon}
                  alt="Instagram"
                  width={28}
                  height={28}
                />
              </a>
              <a
                href="tel:+491717788664"
                aria-label="WhatsApp"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={isDark ? whatsappIconWhite : whatsappIcon}
                  alt="WhatsApp"
                  width={28}
                  height={28}
                />
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
  );
}

export default Footer;