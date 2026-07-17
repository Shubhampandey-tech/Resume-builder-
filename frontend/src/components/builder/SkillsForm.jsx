import React from 'react';
import { useResumes } from '../../context/ResumeContext';
import { Plus, Trash2 } from 'lucide-react';

const SkillsForm = () => {
  const { currentResume, updateCurrentResumeStateLocally } = useResumes();

  if (!currentResume) return null;

  const skills = currentResume.skills || [];

  const handleItemChange = (index, field, value) => {
    const updatedList = [...skills];
    updatedList[index] = { ...updatedList[index], [field]: value };
    updateCurrentResumeStateLocally('skills', updatedList);
  };

  const handleAddItem = () => {
    const newItem = { name: '', level: 'Intermediate' };
    updateCurrentResumeStateLocally('skills', [...skills, newItem]);
  };

  const handleRemoveItem = (index) => {
    const updatedList = skills.filter((_, idx) => idx !== index);
    updateCurrentResumeStateLocally('skills', updatedList);
  };

  return (
    <div className="form-section animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-heading)', fontWeight: 700 }}>
          Skills
        </h3>
        <button type="button" className="btn btn-secondary" onClick={handleAddItem} style={{ padding: '8px 12px', fontSize: '0.85rem' }}>
          <Plus size={16} />
          <span>Add Skill</span>
        </button>
      </div>

      {skills.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '32px 16px', background: 'rgba(255,255,255,0.01)', border: '1px dashed var(--border-color)', borderRadius: 'var(--border-radius-md)' }}>
          <p style={{ color: 'var(--text-secondary)' }}>No skills added yet. Click "Add Skill" above to start.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {skills.map((item, index) => (
            <div key={index} style={{
              display: 'grid',
              gridTemplateColumns: '6fr 4fr auto',
              gap: '12px',
              alignItems: 'center',
              padding: '12px 16px',
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--border-radius-md)',
            }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. JavaScript, React, Node.js"
                  value={item.name || ''}
                  onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                  style={{ padding: '10px 14px' }}
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <select
                  className="form-select"
                  value={item.level || 'Intermediate'}
                  onChange={(e) => handleItemChange(index, 'level', e.target.value)}
                  style={{ padding: '10px 14px', background: 'var(--bg-primary)' }}
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Expert">Expert</option>
                </select>
              </div>

              <button
                type="button"
                className="btn btn-danger"
                onClick={() => handleRemoveItem(index)}
                style={{ padding: '10px', minWidth: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                title="Remove Skill"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SkillsForm;
