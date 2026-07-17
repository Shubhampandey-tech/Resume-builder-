import React from 'react';
import { useResumes } from '../../context/ResumeContext';
import { Plus, Trash2 } from 'lucide-react';

const ProjectsForm = () => {
  const { currentResume, updateCurrentResumeStateLocally } = useResumes();

  if (!currentResume) return null;

  const projects = currentResume.projects || [];

  const handleItemChange = (index, field, value) => {
    const updatedList = [...projects];
    updatedList[index] = { ...updatedList[index], [field]: value };
    updateCurrentResumeStateLocally('projects', updatedList);
  };

  const handleAddItem = () => {
    const newItem = {
      name: '',
      description: '',
      github: '',
      live: '',
      technologies: '',
    };
    updateCurrentResumeStateLocally('projects', [...projects, newItem]);
  };

  const handleRemoveItem = (index) => {
    const updatedList = projects.filter((_, idx) => idx !== index);
    updateCurrentResumeStateLocally('projects', updatedList);
  };

  return (
    <div className="form-section animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-heading)', fontWeight: 700 }}>
          Projects
        </h3>
        <button type="button" className="btn btn-secondary" onClick={handleAddItem} style={{ padding: '8px 12px', fontSize: '0.85rem' }}>
          <Plus size={16} />
          <span>Add Project</span>
        </button>
      </div>

      {projects.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '32px 16px', background: 'rgba(255,255,255,0.01)', border: '1px dashed var(--border-color)', borderRadius: 'var(--border-radius-md)' }}>
          <p style={{ color: 'var(--text-secondary)' }}>No projects added yet. Click "Add Project" above to start.</p>
        </div>
      ) : (
        projects.map((item, index) => (
          <div key={index} className="dynamic-list-item">
            <button
              type="button"
              className="btn btn-danger remove-item-btn"
              onClick={() => handleRemoveItem(index)}
              style={{ padding: '6px', minWidth: '32px', height: '32px' }}
              title="Remove Project"
            >
              <Trash2 size={14} />
            </button>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '12px' }}>
              <div className="form-group">
                <label>Project Name</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="E-Commerce API"
                  value={item.name || ''}
                  onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Technologies Used</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="React, Node.js, Express, MongoDB"
                  value={item.technologies || ''}
                  onChange={(e) => handleItemChange(index, 'technologies', e.target.value)}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label>GitHub Repository URL</label>
                <input
                  type="url"
                  className="form-input"
                  placeholder="https://github.com/..."
                  value={item.github || ''}
                  onChange={(e) => handleItemChange(index, 'github', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Live URL (Demo / Deployment)</label>
                <input
                  type="url"
                  className="form-input"
                  placeholder="https://myproject.com"
                  value={item.live || ''}
                  onChange={(e) => handleItemChange(index, 'live', e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Project Description</label>
              <textarea
                className="form-textarea"
                placeholder="• Designed and built a scalable storefront API.&#10;• Implemented secure JWT authentication and Stripe checkout payments."
                value={item.description || ''}
                onChange={(e) => handleItemChange(index, 'description', e.target.value)}
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ProjectsForm;
