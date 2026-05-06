import React, { useEffect, useRef, useState } from "react";
import "./Footer.css";
import { FaFacebookF, FaInstagram, FaTwitter, FaPinterestP } from "react-icons/fa";

function Footer() {
  const footerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }
  }, []);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer
      ref={footerRef}
      className={`footer ${isVisible ? "footer-visible" : ""}`}
    >
      <div className="footer-container">
        <div className="footer-column">
          <h3>Roomify</h3>
          <p>Your premium destination for modern, high-quality furniture.</p>
        </div>

        <div className="footer-column">
          <h4>Categories</h4>
          <ul>
            <li onClick={() => scrollToSection("sofas")}>Sofas</li>
            <li onClick={() => scrollToSection("beds")}>Beds</li>
            <li onClick={() => scrollToSection("tables")}>Tables</li>
            <li onClick={() => scrollToSection("chairs")}>Chairs</li>
            <li onClick={() => scrollToSection("storage")}>Storage</li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Quick Links</h4>
          <ul>
            <li onClick={() => scrollToSection("home")}>Home</li>
            <li onClick={() => scrollToSection("shop")}>Shop</li>
            <li onClick={() => scrollToSection("about")}>About</li>
            <li onClick={() => scrollToSection("contact")}>Contact</li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Contact Us</h4>
          <p>Email: support@Roomify.com</p>
          <p>Phone: +1 234 567 890</p>
          <div className="footer-social">
            <FaFacebookF />
            <FaInstagram />
            <FaTwitter />
            <FaPinterestP />
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Roomify. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
