import React from 'react';
import { useResumes } from '../../context/ResumeContext';
import ModernTemplate from '../templates/ModernTemplate';
import MinimalistTemplate from '../templates/MinimalistTemplate';
import CorporateTemplate from '../templates/CorporateTemplate';

const PreviewPanel = () => {
  const { currentResume } = useResumes();

  if (!currentResume) return null;

  const renderTemplate = () => {
    switch (currentResume.templateId) {
      case 'modern':
        return <ModernTemplate data={currentResume} />;
      case 'minimalist':
        return <MinimalistTemplate data={currentResume} />;
      case 'corporate':
        return <CorporateTemplate data={currentResume} />;
      default:
        return <ModernTemplate data={currentResume} />;
    }
  };

  return (
    <div
      className="print-container"
      style={{
        width: '210mm', // standard A4 width
        minHeight: '297mm', // standard A4 height
        backgroundColor: '#ffffff',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)',
        borderRadius: '2px',
        overflow: 'hidden',
        transformOrigin: 'top center',
        marginInline: 'auto',
      }}
    >
      {renderTemplate()}
    </div>
  );
};

export default PreviewPanel;
