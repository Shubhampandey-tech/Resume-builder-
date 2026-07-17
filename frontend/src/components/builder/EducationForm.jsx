import React from 'react';
import { useResumes } from '../../context/ResumeContext';
import { Plus, Trash2 } from 'lucide-react';

const EducationForm = () => {
  const { currentResume, updateCurrentResumeStateLocally } = useResumes();

  if (!currentResume) return null;

  const education = currentResume.education || [];

  const handleItemChange = (index, field, value) => {
    const updatedList = [...education];
    updatedList[index] = { ...updatedList[index], [field]: value };
    updateCurrentResumeStateLocally('education', updatedList);
  };

  const handleAddItem = () => {
    const newItem = {
      school: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    };
    updateCurrentResumeStateLocally('education', [...education, newItem]);
  };

  const handleRemoveItem = (index) => {
    const updatedList = education.filter((_, idx) => idx !== index);
    updateCurrentResumeStateLocally('education', updatedList);
  };

  return (
    <div className="form-section animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-heading)', fontWeight: 700 }}>
          Education Details
        </h3>
        <button type="button" className="btn btn-secondary" onClick={handleAddItem} style={{ padding: '8px 12px', fontSize: '0.85rem' }}>
          <Plus size={16} />
          <span>Add Education</span>
        </button>
      </div>

      {education.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '32px 16px', background: 'rgba(255,255,255,0.01)', border: '1px dashed var(--border-color)', borderRadius: 'var(--border-radius-md)' }}>
          <p style={{ color: 'var(--text-secondary)' }}>No education added yet. Click "Add Education" above to start.</p>
        </div>
      ) : (
        education.map((item, index) => (
          <div key={index} className="dynamic-list-item">
            <button
              type="button"
              className="btn btn-danger remove-item-btn"
              onClick={() => handleRemoveItem(index)}
              style={{ padding: '6px', minWidth: '32px', height: '32px' }}
              title="Remove Education"
            >
              <Trash2 size={14} />
            </button>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '12px' }}>
              <div className="form-group">
                <label>School / University</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Stanford University"
                  value={item.school || ''}
                  onChange={(e) => handleItemChange(index, 'school', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Degree</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Bachelor of Science"
                  value={item.degree || ''}
                  onChange={(e) => handleItemChange(index, 'degree', e.target.value)}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label>Field of Study</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Computer Science"
                  value={item.fieldOfStudy || ''}
                  onChange={(e) => handleItemChange(index, 'fieldOfStudy', e.target.value)}
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
                    placeholder="MM/YYYY or Year"
                    value={item.endDate || ''}
                    onChange={(e) => handleItemChange(index, 'endDate', e.target.value)}
                    disabled={item.current}
                  />
                </div>
              </div>
            </div>

            <div className="form-group" style={{ flexDirection: 'row', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <input
                id={`current-edu-${index}`}
                type="checkbox"
                checked={item.current || false}
                onChange={(e) => handleItemChange(index, 'current', e.target.checked)}
                style={{ width: '16px', height: '16px', cursor: 'pointer' }}
              />
              <label htmlFor={`current-edu-${index}`} style={{ cursor: 'pointer', userSelect: 'none' }}>
                I am currently studying here
              </label>
            </div>

            <div className="form-group">
              <label>Additional Info (GPA, Honors, Societies)</label>
              <textarea
                className="form-textarea"
                placeholder="• GPA: 3.8/4.0&#10;• Head of the Web Development Club."
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

export default EducationForm;
