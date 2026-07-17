import React from 'react';

const Footer = () => {
  return (
    <footer className="no-print" style={{
      padding: '24px',
      textAlign: 'center',
      fontSize: '0.85rem',
      color: 'var(--text-muted)',
      borderTop: '1px solid var(--border-color)',
      marginTop: 'auto',
      background: 'rgba(9, 13, 22, 0.5)'
    }}>
      <p>© {new Date().getFullYear()} ResumeCraft. Build premium, ATS-ready resumes in real-time.</p>
    </footer>
  );
};

export default Footer;
