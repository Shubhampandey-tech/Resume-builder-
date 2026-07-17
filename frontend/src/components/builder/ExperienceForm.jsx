import React from 'react';
import { useResumes } from '../../context/ResumeContext';
import { Plus, Trash2 } from 'lucide-react';

const ExperienceForm = () => {
  const { currentResume, updateCurrentResumeStateLocally } = useResumes();

  if (!currentResume) return null;

  const experience = currentResume.experience || [];

  const handleItemChange = (index, field, value) => {
    const updatedList = [...experience];
    updatedList[index] = { ...updatedList[index], [field]: value };
    updateCurrentResumeStateLocally('experience', updatedList);
  };

  const handleAddItem = () => {
    const newItem = {
      company: '',
      role: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    };
    updateCurrentResumeStateLocally('experience', [...experience, newItem]);
  };

  const handleRemoveItem = (index) => {
    const updatedList = experience.filter((_, idx) => idx !== index);
    updateCurrentResumeStateLocally('experience', updatedList);
  };

  return (
    <div className="form-section animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-heading)', fontWeight: 700 }}>
          Work Experience
        </h3>
        <button type="button" className="btn btn-secondary" onClick={handleAddItem} style={{ padding: '8px 12px', fontSize: '0.85rem' }}>
          <Plus size={16} />
          <span>Add Position</span>
        </button>
      </div>

      {experience.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '32px 16px', background: 'rgba(255,255,255,0.01)', border: '1px dashed var(--border-color)', borderRadius: 'var(--border-radius-md)' }}>
          <p style={{ color: 'var(--text-secondary)' }}>No work history added yet. Click "Add Position" above to start.</p>
        </div>
      ) : (
        experience.map((item, index) => (
          <div key={index} className="dynamic-list-item">
            <button
              type="button"
              className="btn btn-danger remove-item-btn"
              onClick={() => handleRemoveItem(index)}
              style={{ padding: '6px', minWidth: '32px', height: '32px' }}
              title="Remove Position"
            >
              <Trash2 size={14} />
            </button>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '12px' }}>
              <div className="form-group">
                <label>Job Title / Role</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Senior Software Engineer"
                  value={item.role || ''}
                  onChange={(e) => handleItemChange(index, 'role', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Company Name</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Google"
                  value={item.company || ''}
                  onChange={(e) => handleItemChange(index, 'company', e.target.value)}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Mountain View, CA"
                  value={item.location || ''}
                  onChange={(e) => handleItemChange(index, 'location', e.target.value)}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <div className="form-group">
                  <label>Start Date</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="MM/YYYY or Year"
                    value={item.startDate || ''}
                    onChange={(e) => handleItemChange(index, 'startDate', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>End Date</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="MM/YYYY"
                    value={item.endDate || ''}
                    onChange={(e) => handleItemChange(index, 'endDate', e.target.value)}
                    disabled={item.current}
                  />
                </div>
              </div>
            </div>

            <div className="form-group" style={{ flexDirection: 'row', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <input
                id={`current-job-${index}`}
                type="checkbox"
                checked={item.current || false}
                onChange={(e) => handleItemChange(index, 'current', e.target.checked)}
                style={{ width: '16px', height: '16px', cursor: 'pointer' }}
              />
              <label htmlFor={`current-job-${index}`} style={{ cursor: 'pointer', userSelect: 'none' }}>
                I currently work here
              </label>
            </div>

            <div className="form-group">
              <label>Description & Achievements</label>
              <textarea
                className="form-textarea"
                placeholder="• Engineered a scalable MERN-stack application serving 10k users.&#10;• Collaborated in an agile team of 5 developers to ship 12+ features."
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

export default ExperienceForm;
