import React from 'react';

const MinimalistTemplate = ({ data }) => {
  const { personalDetails = {}, education = [], experience = [], skills = [], projects = [], languages = [], certifications = [] } = data;
  const accentColor = data.colorHex || '#10b981';
  const font = data.fontFamily || 'Inter';

  return (
    <div style={{
      fontFamily: font,
      color: '#2d3748',
      backgroundColor: '#ffffff',
      padding: '48px',
      minHeight: '297mm',
      width: '100%',
      boxSizing: 'border-box',
      lineHeight: '1.6',
    }}>
      {/* Centered Header */}
      <header style={{ textAlign: 'center', marginBottom: '36px' }}>
        <h1 style={{
          fontSize: '2.25rem',
          fontWeight: 300,
          color: '#1a202c',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          margin: 0
        }}>
          {personalDetails.name || 'Your Name'}
        </h1>
        <p style={{
          fontSize: '1rem',
          fontWeight: 400,
          color: accentColor,
          letterSpacing: '3px',
          textTransform: 'uppercase',
          margin: '8px 0 16px'
        }}>
          {personalDetails.title || 'Professional Title'}
        </p>

        {/* Contact info list with bullet separators */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '8px',
          fontSize: '0.8rem',
          color: '#718096',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          {personalDetails.email && <span>{personalDetails.email}</span>}
          {personalDetails.phone && (
            <>
              <span style={{ color: '#cbd5e0' }}>•</span>
              <span>{personalDetails.phone}</span>
            </>
          )}
          {personalDetails.location && (
            <>
              <span style={{ color: '#cbd5e0' }}>•</span>
              <span>{personalDetails.location}</span>
            </>
          )}
          {personalDetails.website && (
            <>
              <span style={{ color: '#cbd5e0' }}>•</span>
              <span>{personalDetails.website}</span>
            </>
          )}
          {personalDetails.github && (
            <>
              <span style={{ color: '#cbd5e0' }}>•</span>
              <span>{personalDetails.github}</span>
            </>
          )}
          {personalDetails.linkedin && (
            <>
              <span style={{ color: '#cbd5e0' }}>•</span>
              <span>{personalDetails.linkedin}</span>
            </>
          )}
        </div>
      </header>

      {/* Summary */}
      {personalDetails.summary && (
        <section style={{ marginBottom: '32px', textAlign: 'center', maxWidth: '680px', marginInline: 'auto' }}>
          <p style={{ fontSize: '0.9rem', color: '#4a5568', margin: 0, fontWeight: 300 }}>
            {personalDetails.summary}
          </p>
        </section>
      )}

      {/* Divider */}
      <div style={{ width: '40px', height: '1px', backgroundColor: accentColor, margin: '0 auto 36px' }} />

      {/* Work Experience */}
      {experience.length > 0 && (
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{
            fontSize: '0.9rem',
            fontWeight: 600,
            color: '#1a202c',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            marginBottom: '20px',
          }}>
            Experience
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {experience.map((exp, index) => (
              <div key={index} style={{ display: 'grid', gridTemplateColumns: '2fr 8fr', gap: '16px' }}>
                <div style={{ fontSize: '0.8rem', color: '#718096', fontWeight: 500 }}>
                  {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                </div>
                <div>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#2d3748', margin: 0 }}>
                    {exp.role}
                  </h3>
                  <div style={{ fontSize: '0.85rem', color: '#4a5568', marginBottom: '8px' }}>
                    <span style={{ fontWeight: 500 }}>{exp.company}</span>
                    {exp.location && <span style={{ color: '#a0aec0' }}> — {exp.location}</span>}
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#4a5568', whiteSpace: 'pre-line', margin: 0, fontWeight: 300 }}>
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{
            fontSize: '0.9rem',
            fontWeight: 600,
            color: '#1a202c',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            marginBottom: '20px',
          }}>
            Selected Work
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {projects.map((proj, index) => (
              <div key={index} style={{ display: 'grid', gridTemplateColumns: '2fr 8fr', gap: '16px' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 600, color: accentColor }}>
                  Project
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#2d3748', margin: 0 }}>
                      {proj.name}
                    </h3>
                    <div style={{ display: 'flex', gap: '8px', fontSize: '0.75rem' }}>
                      {proj.github && <a href={proj.github} target="_blank" rel="noreferrer" style={{ color: '#718096', textDecoration: 'underline' }}>Code</a>}
                      {proj.live && <a href={proj.live} target="_blank" rel="noreferrer" style={{ color: '#718096', textDecoration: 'underline' }}>Live</a>}
                    </div>
                  </div>
                  {proj.technologies && (
                    <div style={{ fontSize: '0.75rem', color: '#718096', marginTop: '2px', marginBottom: '6px' }}>
                      {proj.technologies}
                    </div>
                  )}
                  <p style={{ fontSize: '0.85rem', color: '#4a5568', margin: 0, fontWeight: 300 }}>
                    {proj.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{
            fontSize: '0.9rem',
            fontWeight: 600,
            color: '#1a202c',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            marginBottom: '20px',
          }}>
            Education
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {education.map((edu, index) => (
              <div key={index} style={{ display: 'grid', gridTemplateColumns: '2fr 8fr', gap: '16px' }}>
                <div style={{ fontSize: '0.8rem', color: '#718096', fontWeight: 500 }}>
                  {edu.startDate} – {edu.current ? 'Present' : edu.endDate}
                </div>
                <div>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#2d3748', margin: 0 }}>
                    {edu.degree} {edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : ''}
                  </h3>
                  <div style={{ fontSize: '0.85rem', color: '#4a5568' }}>{edu.school}</div>
                  {edu.description && <p style={{ marginTop: '4px', fontSize: '0.8rem', color: '#718096', fontWeight: 300 }}>{edu.description}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills, Certifications & Languages Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
        {/* Left: Skills */}
        {skills.length > 0 && (
          <section>
            <h2 style={{
              fontSize: '0.9rem',
              fontWeight: 600,
              color: '#1a202c',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}>
              Core Skills
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {skills.map((skill, index) => (
                <span
                  key={index}
                  style={{
                    fontSize: '0.75rem',
                    padding: '4px 10px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '2px',
                    color: '#4a5568',
                    background: '#f8fafc',
                    fontWeight: 400
                  }}
                >
                  {skill.name} • <span style={{ color: accentColor, fontWeight: 500 }}>{skill.level}</span>
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Right: Languages / Certs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {certifications.length > 0 && (
            <section>
              <h2 style={{
                fontSize: '0.9rem',
                fontWeight: 600,
                color: '#1a202c',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginBottom: '12px',
              }}>
                Certifications
              </h2>
              {certifications.map((cert, index) => (
                <div key={index} style={{ fontSize: '0.8rem', color: '#4a5568', marginBottom: '6px' }}>
                  <span style={{ fontWeight: 500, color: '#2d3748' }}>{cert.name}</span> — {cert.issuer} ({cert.date})
                </div>
              ))}
            </section>
          )}

          {languages.length > 0 && (
            <section>
              <h2 style={{
                fontSize: '0.9rem',
                fontWeight: 600,
                color: '#1a202c',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginBottom: '12px',
              }}>
                Languages
              </h2>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {languages.map((lang, index) => (
                  <span key={index} style={{ fontSize: '0.8rem', color: '#4a5568' }}>
                    <strong style={{ fontWeight: 500, color: '#2d3748' }}>{lang.name}</strong> ({lang.proficiency})
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default MinimalistTemplate;
