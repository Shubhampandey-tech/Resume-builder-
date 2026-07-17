import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FileText, LogOut, LayoutDashboard, User as UserIcon } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="glass-panel no-print" style={{
      margin: '12px 24px',
      borderRadius: 'var(--border-radius-md)',
      padding: '12px 24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'sticky',
      top: '12px',
      zIndex: 100,
    }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{
          background: 'var(--accent-gradient)',
          padding: '8px',
          borderRadius: 'var(--border-radius-sm)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <FileText size={20} color="white" />
        </div>
        <span style={{
          fontFamily: 'var(--font-heading)',
          fontWeight: 800,
          fontSize: '1.25rem',
          letterSpacing: '-0.5px',
          background: 'var(--accent-gradient)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          ResumeCraft
        </span>
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        {user ? (
          <>
            <Link to="/dashboard" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: 'var(--text-secondary)',
              fontWeight: 500,
              fontSize: '0.95rem'
            }} className="nav-link">
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </Link>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 12px',
              background: 'rgba(255,255,255,0.03)',
              borderRadius: 'var(--border-radius-full)',
              border: '1px solid var(--border-color)',
              fontSize: '0.85rem',
              color: 'var(--text-secondary)'
            }}>
              <UserIcon size={14} />
              <span>{user.username}</span>
            </div>

            <button onClick={handleLogout} className="btn btn-secondary" style={{
              padding: '6px 12px',
              fontSize: '0.85rem',
              borderRadius: 'var(--border-radius-sm)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <LogOut size={14} />
              <span>Logout</span>
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{
              color: 'var(--text-secondary)',
              fontWeight: 600,
              fontSize: '0.9rem'
            }}>
              Login
            </Link>
            <Link to="/signup" className="btn btn-primary" style={{
              padding: '8px 16px',
              fontSize: '0.9rem',
              borderRadius: 'var(--border-radius-sm)'
            }}>
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
