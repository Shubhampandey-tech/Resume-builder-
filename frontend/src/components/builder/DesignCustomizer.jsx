import React from 'react';
import { useResumes } from '../../context/ResumeContext';
import { Check } from 'lucide-react';

const DesignCustomizer = () => {
  const { currentResume, updateCurrentResumeStateLocally } = useResumes();

  if (!currentResume) return null;

  const currentTemplate = currentResume.templateId || 'modern';
  const currentFont = currentResume.fontFamily || 'Inter';
  const currentColor = currentResume.colorHex || '#6366f1';

  // Beautiful curated color palettes
  const colorOptions = [
    { name: 'Indigo Glow', hex: '#6366f1' },
    { name: 'Amethyst', hex: '#a855f7' },
    { name: 'Emerald', hex: '#10b981' },
    { name: 'Classic Corporate', hex: '#1e3a8a' },
    { name: 'Crimson', hex: '#e11d48' },
    { name: 'Amber Gold', hex: '#d97706' },
    { name: 'Charcoal Black', hex: '#1e293b' },
  ];

  const templates = [
    { id: 'modern', name: 'Modern Sleek', desc: 'Split-columns with high contrast headers' },
    { id: 'minimalist', name: 'Creative Minimalist', desc: 'Lightweight centered clean style' },
    { id: 'corporate', name: 'Professional Corporate', desc: 'Sidebar details with work histories' },
  ];

  const fonts = [
    { name: 'Inter', value: 'Inter, sans-serif' },
    { name: 'Plus Jakarta Sans', value: "'Plus Jakarta Sans', sans-serif" },
    { name: 'Georgia (Serif)', value: 'Georgia, serif' },
    { name: 'System Default', value: 'system-ui, -apple-system, sans-serif' },
  ];

  return (
    <div className="form-section animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-heading)', fontWeight: 700, marginBottom: '4px' }}>
          Design Customization
        </h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
          Choose a layout, fonts, and accent colors to customize your resume.
        </p>
      </div>

      {/* Template Selector */}
      <div className="form-group">
        <label style={{ marginBottom: '8px' }}>Choose Template Layout</label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {templates.map((tpl) => (
            <div
              key={tpl.id}
              onClick={() => updateCurrentResumeStateLocally('templateId', tpl.id)}
              className="glass-panel"
              style={{
                padding: '16px',
                cursor: 'pointer',
                border: currentTemplate === tpl.id ? '2px solid var(--accent-primary)' : '1px solid var(--border-color)',
                backgroundColor: currentTemplate === tpl.id ? 'rgba(99, 102, 241, 0.05)' : 'rgba(255,255,255,0.01)',
                borderRadius: 'var(--border-radius-md)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                transition: 'all var(--transition-fast)'
              }}
            >
              <div>
                <h4 style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.95rem' }}>{tpl.name}</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '2px' }}>{tpl.desc}</p>
              </div>
              {currentTemplate === tpl.id && (
                <div style={{
                  background: 'var(--accent-gradient)',
                  padding: '4px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Check size={12} color="white" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Font Family Selector */}
      <div className="form-group">
        <label htmlFor="font-selector">Typography Font</label>
        <select
          id="font-selector"
          className="form-select"
          value={currentFont}
          onChange={(e) => updateCurrentResumeStateLocally('fontFamily', e.target.value)}
          style={{ background: 'var(--bg-primary)', padding: '12px' }}
        >
          {fonts.map((f) => (
            <option key={f.name} value={f.value}>
              {f.name}
            </option>
          ))}
        </select>
      </div>

      {/* Theme Accent Color */}
      <div className="form-group">
        <label>Theme Accent Color</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '8px' }}>
          {colorOptions.map((opt) => (
            <button
              key={opt.name}
              type="button"
              onClick={() => updateCurrentResumeStateLocally('colorHex', opt.hex)}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: opt.hex,
                border: currentColor === opt.hex ? '3px solid white' : '1px solid rgba(255,255,255,0.2)',
                outline: currentColor === opt.hex ? `3px solid ${opt.hex}` : 'none',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
                position: 'relative'
              }}
              title={opt.name}
            >
              {currentColor === opt.hex && (
                <span style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '10px'
                }}>
                  ✓
                </span>
              )}
            </button>
          ))}
          
          {/* Custom Color Picker */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: 'auto' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Custom:</span>
            <input
              type="color"
              value={currentColor}
              onChange={(e) => updateCurrentResumeStateLocally('colorHex', e.target.value)}
              style={{
                width: '32px',
                height: '32px',
                padding: 0,
                border: '1px solid var(--border-color)',
                borderRadius: '4px',
                cursor: 'pointer',
                background: 'none'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignCustomizer;
