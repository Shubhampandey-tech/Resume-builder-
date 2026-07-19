import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

const API_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth`;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is logged in on load
  useEffect(() => {
    const loadUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${API_URL}/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();

        if (data.success) {
          setUser(data.data);
        } else {
          // Token expired or invalid
          logout();
        }
      } catch (err) {
        console.error('Error loading user:', err);
        logout();
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [token]);

  // Register User
  const register = async (username, email, password) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await res.json();

      if (data.success) {
        localStorage.setItem('token', data.data.token);
        setToken(data.data.token);
        setUser({
          _id: data.data._id,
          username: data.data.username,
          email: data.data.email,
        });
        return { success: true };
      } else {
        setError(data.message || 'Registration failed');
        return { success: false, message: data.message };
      }
    } catch (err) {
      setError('Server error during registration');
      return { success: false, message: 'Server connection error' };
    } finally {
      setLoading(false);
    }
  };

  // Login User
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (data.success) {
        localStorage.setItem('token', data.data.token);
        setToken(data.data.token);
        setUser({
          _id: data.data._id,
          username: data.data.username,
          email: data.data.email,
        });
        return { success: true };
      } else {
        setError(data.message || 'Login failed');
        return { success: false, message: data.message };
      }
    } catch (err) {
      setError('Server error during login');
      return { success: false, message: 'Server connection error' };
    } finally {
      setLoading(false);
    }
  };

  // Logout User
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        error,
        register,
        login,
        logout,
        setError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
