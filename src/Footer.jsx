import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <span>© 1404 ترمینو - تمام حقوق محفوظ است</span>
        <div className="footer-links">
          <a href="#about">درباره ما</a>
          <span>•</span>
          <a href="#contact">تماس با ما</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
