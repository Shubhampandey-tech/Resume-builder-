import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useResumes } from '../context/ResumeContext';
import { useToast } from '../context/ToastContext';
import PersonalInfoForm from '../components/builder/PersonalInfoForm';
import ExperienceForm from '../components/builder/ExperienceForm';
import EducationForm from '../components/builder/EducationForm';
import SkillsForm from '../components/builder/SkillsForm';
import ProjectsForm from '../components/builder/ProjectsForm';
import DesignCustomizer from '../components/builder/DesignCustomizer';
import PreviewPanel from '../components/builder/PreviewPanel';
import { ArrowLeft, Save, Printer, Palette, User, Briefcase, GraduationCap, Code, FolderGit, Loader2, Check } from 'lucide-react';

const Builder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { getResumeById, currentResume, updateResume, updateCurrentResumeStateLocally, loading, saving } = useResumes();
  const [activeStep, setActiveStep] = useState('design');
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Load resume data on mount
  useEffect(() => {
    getResumeById(id);
  }, [id]);

  // Handle detecting when the initial load is complete
  useEffect(() => {
    if (currentResume && isInitialLoad) {
      setIsInitialLoad(false);
    }
  }, [currentResume]);

  // Debounced Autosave
  useEffect(() => {
    if (!currentResume || isInitialLoad) return;

    const timer = setTimeout(() => {
      updateResume(id, currentResume);
    }, 1500); // 1.5 seconds of inactivity triggers save

    return () => clearTimeout(timer);
  }, [currentResume, id, isInitialLoad]);

  const handlePrint = () => {
    window.print();
  };

  const steps = [
    { id: 'design', name: 'Design', icon: <Palette size={16} /> },
    { id: 'personal', name: 'Personal Details', icon: <User size={16} /> },
    { id: 'experience', name: 'Experience', icon: <Briefcase size={16} /> },
    { id: 'education', name: 'Education', icon: <GraduationCap size={16} /> },
    { id: 'skills', name: 'Skills', icon: <Code size={16} /> },
    { id: 'projects', name: 'Projects', icon: <FolderGit size={16} /> },
  ];

  if (loading && isInitialLoad) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 'calc(100vh - 140px)' }}>
        <Loader2 className="animate-spin" size={40} color="var(--accent-primary)" />
        <p style={{ marginTop: '16px', color: 'var(--text-secondary)' }}>Loading resume data...</p>
      </div>
    );
  }

  if (!currentResume) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <h2>Resume Not Found</h2>
        <button className="btn btn-primary" onClick={() => navigate('/dashboard')} style={{ marginTop: '16px' }}>
          Back to Dashboard
        </button>
      </div>
    );
  }

  const renderActiveForm = () => {
    switch (activeStep) {
      case 'design':
        return <DesignCustomizer />;
      case 'personal':
        return <PersonalInfoForm />;
      case 'experience':
        return <ExperienceForm />;
      case 'education':
        return <EducationForm />;
      case 'skills':
        return <SkillsForm />;
      case 'projects':
        return <ProjectsForm />;
      default:
        return <DesignCustomizer />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 70px)' }}>
      {/* Sub Header / Control Bar */}
      <div className="no-print" style={{
        padding: '12px 24px',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'rgba(15, 23, 42, 0.4)',
        backdropFilter: 'blur(8px)',
        zIndex: 50
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button
            onClick={() => navigate('/dashboard')}
            className="btn btn-secondary"
            style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <ArrowLeft size={16} />
            <span style={{ fontSize: '0.85rem' }}>Dashboard</span>
          </button>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
              type="text"
              value={currentResume.title || ''}
              onChange={(e) => updateCurrentResumeStateLocally('title', e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                borderBottom: '1px dashed var(--border-color)',
                fontSize: '1.1rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                outline: 'none',
                padding: '2px 4px',
                width: '200px'
              }}
              title="Click to rename resume"
            />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Save Status indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            {saving ? (
              <>
                <Loader2 className="animate-spin" size={14} color="var(--accent-primary)" />
                <span>Autosaving...</span>
              </>
            ) : (
              <>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--success)' }}>
                  <Check size={14} />
                </div>
                <span>Saved</span>
              </>
            )}
          </div>

          <button
            onClick={handlePrint}
            className="btn btn-primary"
            style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '8px', height: '38px' }}
          >
            <Printer size={16} />
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      {/* Main Split Screen Area */}
      <div className="builder-workspace">
        {/* Left Side: Form Controls */}
        <div className="form-panel no-print">
          {/* Stepper Navigation */}
          <div className="form-stepper">
            {steps.map((step) => (
              <button
                key={step.id}
                type="button"
                className={`step-btn ${activeStep === step.id ? 'active' : ''}`}
                onClick={() => setActiveStep(step.id)}
                style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                {step.icon}
                <span>{step.name}</span>
              </button>
            ))}
          </div>

          {/* Form Component Container */}
          <div style={{ marginTop: '8px' }}>
            {renderActiveForm()}
          </div>
        </div>

        {/* Right Side: Document Preview */}
        <div className="preview-panel">
          <div style={{
            maxHeight: '100%',
            overflowY: 'auto',
            padding: '20px',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            // On screen, let's scale down the preview slightly if the window is small
            zoom: '0.85',
          }}>
            <PreviewPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Builder;
