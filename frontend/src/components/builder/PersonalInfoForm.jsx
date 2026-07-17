import React from 'react';
import { useResumes } from '../../context/ResumeContext';

const PersonalInfoForm = () => {
  const { currentResume, updateCurrentResumeStateLocally } = useResumes();
  
  if (!currentResume) return null;
  
  const details = currentResume.personalDetails || {};

  const handleChange = (field, val) => {
    updateCurrentResumeStateLocally(['personalDetails', field], val);
  };

  return (
    <div className="form-section animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-heading)', fontWeight: 700, marginBottom: '8px' }}>
        Personal Details
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            type="text"
            className="form-input"
            placeholder="John Doe"
            value={details.name || ''}
            onChange={(e) => handleChange('name', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="job-title">Job Title</label>
          <input
            id="job-title"
            type="text"
            className="form-input"
            placeholder="Frontend Engineer"
            value={details.title || ''}
            onChange={(e) => handleChange('title', e.target.value)}
          />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            className="form-input"
            placeholder="john.doe@example.com"
            value={details.email || ''}
            onChange={(e) => handleChange('email', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            id="phone"
            type="tel"
            className="form-input"
            placeholder="+1 (555) 019-2834"
            value={details.phone || ''}
            onChange={(e) => handleChange('phone', e.target.value)}
          />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            id="location"
            type="text"
            className="form-input"
            placeholder="New York, NY"
            value={details.location || ''}
            onChange={(e) => handleChange('location', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="website">Website / Portfolio</label>
          <input
            id="website"
            type="url"
            className="form-input"
            placeholder="https://johndoe.dev"
            value={details.website || ''}
            onChange={(e) => handleChange('website', e.target.value)}
          />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div className="form-group">
          <label htmlFor="github">GitHub URL</label>
          <input
            id="github"
            type="url"
            className="form-input"
            placeholder="https://github.com/johndoe"
            value={details.github || ''}
            onChange={(e) => handleChange('github', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="linkedin">LinkedIn URL</label>
          <input
            id="linkedin"
            type="url"
            className="form-input"
            placeholder="https://linkedin.com/in/johndoe"
            value={details.linkedin || ''}
            onChange={(e) => handleChange('linkedin', e.target.value)}
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="summary">Professional Summary</label>
        <textarea
          id="summary"
          className="form-textarea"
          placeholder="Write a brief description of your professional background, skills, and goals..."
          value={details.summary || ''}
          onChange={(e) => handleChange('summary', e.target.value)}
        />
      </div>
    </div>
  );
};

export default PersonalInfoForm;
