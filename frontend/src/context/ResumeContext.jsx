import React, { createContext, useState, useContext } from 'react';
import { useAuth } from './AuthContext';

const ResumeContext = createContext();

const API_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/resumes`;

export const ResumeProvider = ({ children }) => {
  const { token } = useAuth();
  const [resumes, setResumes] = useState([]);
  const [currentResume, setCurrentResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // Helper for requests config
  const getHeaders = () => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  });

  // Fetch all resumes
  const fetchResumes = async () => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_URL, {
        headers: getHeaders(),
      });
      const data = await res.json();
      if (data.success) {
        setResumes(data.data);
      } else {
        setError(data.message || 'Failed to fetch resumes');
      }
    } catch (err) {
      setError('Connection error fetching resumes');
    } finally {
      setLoading(false);
    }
  };

  // Get single resume details
  const getResumeById = async (id) => {
    if (!token) return null;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        headers: getHeaders(),
      });
      const data = await res.json();
      if (data.success) {
        setCurrentResume(data.data);
        return data.data;
      } else {
        setError(data.message || 'Failed to load resume');
        return null;
      }
    } catch (err) {
      setError('Connection error loading resume');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Create new resume
  const createResume = async (title, templateId = 'modern', colorHex = '#6366f1') => {
    if (!token) return null;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ title, templateId, colorHex }),
      });
      const data = await res.json();
      if (data.success) {
        setResumes((prev) => [data.data, ...prev]);
        return data.data;
      } else {
        setError(data.message || 'Failed to create resume');
        return null;
      }
    } catch (err) {
      setError('Connection error creating resume');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Update resume details
  const updateResume = async (id, updatedData) => {
    if (!token) return false;
    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(updatedData),
      });
      const data = await res.json();
      if (data.success) {
        setResumes((prev) =>
          prev.map((r) => (r._id === id ? data.data : r))
        );
        return true;
      } else {
        setError(data.message || 'Failed to save resume');
        return false;
      }
    } catch (err) {
      setError('Connection error saving resume');
      return false;
    } finally {
      setSaving(false);
    }
  };

  // Delete resume
  const deleteResume = async (id) => {
    if (!token) return false;
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: getHeaders(),
      });
      const data = await res.json();
      if (data.success) {
        setResumes((prev) => prev.filter((r) => r._id !== id));
        if (currentResume && currentResume._id === id) {
          setCurrentResume(null);
        }
        return true;
      } else {
        setError(data.message || 'Failed to delete resume');
        return false;
      }
    } catch (err) {
      setError('Connection error deleting resume');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Local helper to update active resume state (for instant typing updates in preview)
  const updateCurrentResumeStateLocally = (fieldPath, value) => {
    setCurrentResume((prev) => {
      if (!prev) return null;
      
      const newResume = { ...prev };
      
      // If fieldPath is array (nested path like ['personalDetails', 'name'])
      if (Array.isArray(fieldPath)) {
        let current = newResume;
        for (let i = 0; i < fieldPath.length - 1; i++) {
          current[fieldPath[i]] = { ...current[fieldPath[i]] };
          current = current[fieldPath[i]];
        }
        current[fieldPath[fieldPath.length - 1]] = value;
      } else {
        newResume[fieldPath] = value;
      }
      
      return newResume;
    });
  };

  return (
    <ResumeContext.Provider
      value={{
        resumes,
        currentResume,
        loading,
        saving,
        error,
        fetchResumes,
        getResumeById,
        createResume,
        updateResume,
        deleteResume,
        updateCurrentResumeStateLocally,
        setCurrentResume,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResumes = () => useContext(ResumeContext);
