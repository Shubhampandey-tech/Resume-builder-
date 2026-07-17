import React from 'react';
import { Mail, Phone, MapPin, Globe, Briefcase, GraduationCap, Award } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './BrandIcons';

const CorporateTemplate = ({ data }) => {
  const { personalDetails = {}, education = [], experience = [], skills = [], projects = [], languages = [], certifications = [] } = data;
  const accentColor = data.colorHex || '#1e3a8a'; // Classic dark blue default
  const font = data.fontFamily || 'Inter';

  return (
    <div style={{
      fontFamily: font,
      color: '#1e293b',
      backgroundColor: '#ffffff',
      minHeight: '297mm',
      width: '100%',
      boxSizing: 'border-box',
      display: 'grid',
      gridTemplateColumns: '3.2fr 6.8fr',
    }}>
      {/* Left Sidebar Column */}
      <div style={{
        backgroundColor: '#f8fafc',
        borderRight: '1px solid #e2e8f0',
        padding: '36px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px'
      }}>
        {/* Contact Info Group */}
        <div>
          <h3 style={{
            fontSize: '0.85rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            color: accentColor,
            borderBottom: `2px solid ${accentColor}`,
            paddingBottom: '4px',
            marginBottom: '12px'
          }}>
            Contact Details
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8rem', color: '#475569' }}>
            {personalDetails.email && (
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <Mail size={12} style={{ marginTop: '2px', flexShrink: 0 }} />
                <span style={{ wordBreak: 'break-all' }}>{personalDetails.email}</span>
              </div>
            )}
            {personalDetails.phone && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={12} style={{ flexShrink: 0 }} />
                <span>{personalDetails.phone}</span>
              </div>
            )}
            {personalDetails.location && (
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <MapPin size={12} style={{ marginTop: '2px', flexShrink: 0 }} />
                <span>{personalDetails.location}</span>
              </div>
            )}
            {personalDetails.website && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Globe size={12} style={{ flexShrink: 0 }} />
                <span>{personalDetails.website}</span>
              </div>
            )}
            {personalDetails.github && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <GithubIcon size={12} style={{ flexShrink: 0 }} />
                <span>{personalDetails.github}</span>
              </div>
            )}
            {personalDetails.linkedin && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <LinkedinIcon size={12} style={{ flexShrink: 0 }} />
                <span>{personalDetails.linkedin}</span>
              </div>
            )}
          </div>
        </div>

        {/* Education Group */}
        {education.length > 0 && (
          <div>
            <h3 style={{
              fontSize: '0.85rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              color: accentColor,
              borderBottom: `2px solid ${accentColor}`,
              paddingBottom: '4px',
              marginBottom: '12px'
            }}>
              Education
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {education.map((edu, index) => (
                <div key={index} style={{ fontSize: '0.78rem' }}>
                  <div style={{ fontWeight: 700, color: '#0f172a' }}>{edu.degree}</div>
                  <div style={{ color: '#475569', fontWeight: 500, margin: '2px 0' }}>{edu.school}</div>
                  <div style={{ color: '#64748b' }}>{edu.startDate} – {edu.current ? 'Present' : edu.endDate}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills Group */}
        {skills.length > 0 && (
          <div>
            <h3 style={{
              fontSize: '0.85rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              color: accentColor,
              borderBottom: `2px solid ${accentColor}`,
              paddingBottom: '4px',
              marginBottom: '12px'
            }}>
              Skills
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {skills.map((skill, index) => (
                <div key={index} style={{ fontSize: '0.78rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px', fontWeight: 500 }}>
                    <span>{skill.name}</span>
                    <span style={{ color: '#64748b', fontSize: '0.7rem' }}>{skill.level}</span>
                  </div>
                  <div style={{ height: '4px', backgroundColor: '#e2e8f0', borderRadius: '2px' }}>
                    <div style={{
                      height: '100%',
                      backgroundColor: accentColor,
                      width: skill.level === 'Expert' ? '100%' : skill.level === 'Intermediate' ? '65%' : '35%'
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <div>
            <h3 style={{
              fontSize: '0.85rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              color: accentColor,
              borderBottom: `2px solid ${accentColor}`,
              paddingBottom: '4px',
              marginBottom: '12px'
            }}>
              Languages
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.78rem' }}>
              {languages.map((lang, index) => (
                <div key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 500 }}>{lang.name}</span>
                  <span style={{ color: '#64748b' }}>{lang.proficiency}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Primary Column */}
      <div style={{ padding: '36px 32px' }}>
        {/* Name and Title */}
        <div style={{ marginBottom: '28px' }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 800,
            color: '#0f172a',
            margin: 0,
            lineHeight: 1.1
          }}>
            {personalDetails.name || 'Your Name'}
          </h1>
          <p style={{
            fontSize: '1.15rem',
            fontWeight: 600,
            color: accentColor,
            marginTop: '6px',
            letterSpacing: '0.5px'
          }}>
            {personalDetails.title || 'Professional Title'}
          </p>
        </div>

        {/* Profile Summary */}
        {personalDetails.summary && (
          <div style={{ marginBottom: '28px' }}>
            <p style={{
              fontSize: '0.875rem',
              lineHeight: '1.6',
              margin: 0,
              color: '#334155',
              borderLeft: `3px solid ${accentColor}`,
              paddingLeft: '12px'
            }}>
              {personalDetails.summary}
            </p>
          </div>
        )}

        {/* Work Experience */}
        {experience.length > 0 && (
          <div style={{ marginBottom: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <Briefcase size={16} color={accentColor} />
              <h2 style={{
                fontSize: '1.05rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                color: '#0f172a',
                margin: 0
              }}>
                Work History
              </h2>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {experience.map((exp, index) => (
                <div key={index}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontWeight: 700, fontSize: '0.9rem' }}>
                    <span style={{ color: '#0f172a' }}>{exp.role}</span>
                    <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 500 }}>
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 600, color: accentColor, margin: '2px 0 6px' }}>
                    <span>{exp.company}</span>
                    <span style={{ color: '#94a3b8', fontWeight: 400 }}>{exp.location}</span>
                  </div>
                  <p style={{ fontSize: '0.82rem', lineHeight: '1.5', whiteSpace: 'pre-line', margin: 0, color: '#334155' }}>
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Selected Projects */}
        {projects.length > 0 && (
          <div style={{ marginBottom: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <GraduationCap size={16} color={accentColor} />
              <h2 style={{
                fontSize: '1.05rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                color: '#0f172a',
                margin: 0
              }}>
                Featured Projects
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {projects.map((proj, index) => (
                <div key={index}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontWeight: 700, fontSize: '0.9rem' }}>
                    <span style={{ color: '#0f172a' }}>{proj.name}</span>
                    <div style={{ display: 'flex', gap: '8px', fontSize: '0.75rem', fontWeight: 400 }}>
                      {proj.github && <a href={proj.github} target="_blank" rel="noreferrer" style={{ color: accentColor, textDecoration: 'underline' }}>Code</a>}
                      {proj.live && <a href={proj.live} target="_blank" rel="noreferrer" style={{ color: accentColor, textDecoration: 'underline' }}>Demo</a>}
                    </div>
                  </div>
                  {proj.technologies && (
                    <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 500, margin: '2px 0 4px' }}>
                      Built with: {proj.technologies}
                    </div>
                  )}
                  <p style={{ fontSize: '0.82rem', lineHeight: '1.5', margin: 0, color: '#334155' }}>
                    {proj.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications & Awards */}
        {certifications.length > 0 && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <Award size={16} color={accentColor} />
              <h2 style={{
                fontSize: '1.05rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                color: '#0f172a',
                margin: 0
              }}>
                Certifications
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {certifications.map((cert, index) => (
                <div key={index} style={{ fontSize: '0.8rem', borderLeft: `2px solid #cbd5e1`, paddingLeft: '8px' }}>
                  <div style={{ fontWeight: 700, color: '#0f172a' }}>{cert.name}</div>
                  <div style={{ color: '#475569', fontSize: '0.75rem' }}>{cert.issuer} {cert.date ? `(${cert.date})` : ''}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CorporateTemplate;
