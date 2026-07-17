import React from 'react';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './BrandIcons';

const ModernTemplate = ({ data }) => {
  const { personalDetails = {}, education = [], experience = [], skills = [], projects = [], languages = [], certifications = [] } = data;
  const accentColor = data.colorHex || '#6366f1';
  const font = data.fontFamily || 'Inter';

  return (
    <div style={{
      fontFamily: font,
      color: '#334155',
      backgroundColor: '#ffffff',
      padding: '40px',
      minHeight: '297mm', // A4 aspect ratio height
      width: '100%',
      boxSizing: 'border-box',
    }}>
      {/* Header */}
      <header style={{ borderBottom: `3px solid ${accentColor}`, paddingBottom: '20px', marginBottom: '24px' }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 800,
          color: '#0f172a',
          margin: 0,
          lineHeight: 1.1,
          fontFamily: 'var(--font-heading)'
        }}>
          {personalDetails.name || 'Your Name'}
        </h1>
        <p style={{
          fontSize: '1.25rem',
          fontWeight: 500,
          color: accentColor,
          marginTop: '4px',
          marginBottom: '16px'
        }}>
          {personalDetails.title || 'Professional Title'}
        </p>

        {/* Contact info grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '8px',
          fontSize: '0.85rem',
          color: '#64748b'
        }}>
          {personalDetails.email && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Mail size={14} color={accentColor} />
              <span>{personalDetails.email}</span>
            </div>
          )}
          {personalDetails.phone && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Phone size={14} color={accentColor} />
              <span>{personalDetails.phone}</span>
            </div>
          )}
          {personalDetails.location && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <MapPin size={14} color={accentColor} />
              <span>{personalDetails.location}</span>
            </div>
          )}
          {personalDetails.website && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Globe size={14} color={accentColor} />
              <span>{personalDetails.website}</span>
            </div>
          )}
          {personalDetails.github && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <GithubIcon size={14} color={accentColor} />
              <span>{personalDetails.github}</span>
            </div>
          )}
          {personalDetails.linkedin && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <LinkedinIcon size={14} color={accentColor} />
              <span>{personalDetails.linkedin}</span>
            </div>
          )}
        </div>
      </header>

      {/* Summary */}
      {personalDetails.summary && (
        <section style={{ marginBottom: '24px' }}>
          <p style={{ fontSize: '0.95rem', lineHeight: '1.6', margin: 0, fontStyle: 'italic', color: '#475569' }}>
            {personalDetails.summary}
          </p>
        </section>
      )}

      {/* Two Column Layout for body */}
      <div style={{ display: 'grid', gridTemplateColumns: '7fr 3fr', gap: '32px' }}>
        
        {/* Left Column: Experience, Projects */}
        <div>
          {/* Work Experience */}
          {experience.length > 0 && (
            <section style={{ marginBottom: '28px' }}>
              <h2 style={{
                fontSize: '1.2rem',
                fontWeight: 700,
                color: '#0f172a',
                borderBottom: '1px solid #e2e8f0',
                paddingBottom: '6px',
                marginBottom: '16px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Professional Experience
              </h2>
              {experience.map((exp, index) => (
                <div key={index} style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1e293b', margin: 0 }}>
                      {exp.role}
                    </h3>
                    <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 500 }}>
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', color: accentColor, fontWeight: 600, fontSize: '0.875rem', marginBottom: '6px' }}>
                    <span>{exp.company}</span>
                    <span style={{ color: '#94a3b8', fontWeight: 400, fontSize: '0.8rem' }}>{exp.location}</span>
                  </div>
                  <p style={{ fontSize: '0.875rem', lineHeight: '1.5', whiteSpace: 'pre-line', margin: 0 }}>
                    {exp.description}
                  </p>
                </div>
              ))}
            </section>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <section style={{ marginBottom: '28px' }}>
              <h2 style={{
                fontSize: '1.2rem',
                fontWeight: 700,
                color: '#0f172a',
                borderBottom: '1px solid #e2e8f0',
                paddingBottom: '6px',
                marginBottom: '16px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Projects
              </h2>
              {projects.map((proj, index) => (
                <div key={index} style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1e293b', margin: 0 }}>
                      {proj.name}
                    </h3>
                    <div style={{ display: 'flex', gap: '8px', fontSize: '0.8rem' }}>
                      {proj.github && <a href={proj.github} target="_blank" rel="noreferrer" style={{ color: accentColor, textDecoration: 'underline' }}>GitHub</a>}
                      {proj.live && <a href={proj.live} target="_blank" rel="noreferrer" style={{ color: accentColor, textDecoration: 'underline' }}>Live Link</a>}
                    </div>
                  </div>
                  {proj.technologies && (
                    <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b', marginTop: '2px', marginBottom: '6px' }}>
                      Technologies: {proj.technologies}
                    </div>
                  )}
                  <p style={{ fontSize: '0.875rem', lineHeight: '1.5', margin: 0 }}>
                    {proj.description}
                  </p>
                </div>
              ))}
            </section>
          )}
        </div>

        {/* Right Column: Skills, Education, Languages, Certifications */}
        <div>
          {/* Skills */}
          {skills.length > 0 && (
            <section style={{ marginBottom: '24px' }}>
              <h2 style={{
                fontSize: '1.1rem',
                fontWeight: 700,
                color: '#0f172a',
                borderBottom: '1px solid #e2e8f0',
                paddingBottom: '6px',
                marginBottom: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Skills
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {skills.map((skill, index) => (
                  <div key={index}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '2px' }}>
                      <span style={{ fontWeight: 600, color: '#334155' }}>{skill.name}</span>
                      <span style={{ color: '#64748b', fontSize: '0.75rem' }}>{skill.level}</span>
                    </div>
                    {/* Visual skill progress indicator */}
                    <div style={{ height: '5px', backgroundColor: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{
                        height: '100%',
                        backgroundColor: accentColor,
                        width: skill.level === 'Expert' ? '100%' : skill.level === 'Intermediate' ? '65%' : '35%',
                        borderRadius: '4px'
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <section style={{ marginBottom: '24px' }}>
              <h2 style={{
                fontSize: '1.1rem',
                fontWeight: 700,
                color: '#0f172a',
                borderBottom: '1px solid #e2e8f0',
                paddingBottom: '6px',
                marginBottom: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Education
              </h2>
              {education.map((edu, index) => (
                <div key={index} style={{ marginBottom: '12px', fontSize: '0.85rem' }}>
                  <h4 style={{ fontWeight: 700, color: '#1e293b', margin: 0 }}>
                    {edu.degree} {edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : ''}
                  </h4>
                  <div style={{ color: accentColor, fontWeight: 600, margin: '2px 0' }}>{edu.school}</div>
                  <div style={{ color: '#64748b' }}>
                    {edu.startDate} – {edu.current ? 'Present' : edu.endDate}
                  </div>
                  {edu.description && <p style={{ marginTop: '4px', fontSize: '0.8rem', color: '#475569' }}>{edu.description}</p>}
                </div>
              ))}
            </section>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <section style={{ marginBottom: '24px' }}>
              <h2 style={{
                fontSize: '1.1rem',
                fontWeight: 700,
                color: '#0f172a',
                borderBottom: '1px solid #e2e8f0',
                paddingBottom: '6px',
                marginBottom: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Certifications
              </h2>
              {certifications.map((cert, index) => (
                <div key={index} style={{ marginBottom: '8px', fontSize: '0.85rem' }}>
                  <div style={{ fontWeight: 600, color: '#1e293b' }}>{cert.name}</div>
                  <div style={{ color: '#64748b', fontSize: '0.8rem' }}>
                    {cert.issuer} {cert.date ? `| ${cert.date}` : ''}
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <section style={{ marginBottom: '24px' }}>
              <h2 style={{
                fontSize: '1.1rem',
                fontWeight: 700,
                color: '#0f172a',
                borderBottom: '1px solid #e2e8f0',
                paddingBottom: '6px',
                marginBottom: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Languages
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.85rem' }}>
                {languages.map((lang, index) => (
                  <div key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 500, color: '#334155' }}>{lang.name}</span>
                    <span style={{ color: '#64748b' }}>{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;
