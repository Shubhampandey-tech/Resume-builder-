import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResumes } from '../context/ResumeContext';
import { useToast } from '../context/ToastContext';
import { Plus, Edit2, Trash2, Calendar, FileText, Loader2 } from 'lucide-react';

const Dashboard = () => {
  const { resumes, loading, fetchResumes, createResume, deleteResume } = useResumes();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    fetchResumes();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      addToast('Please enter a title', 'error');
      return;
    }

    setIsCreating(true);
    const newResume = await createResume(newTitle.trim());
    setIsCreating(false);
    setShowCreateModal(false);
    setNewTitle('');

    if (newResume) {
      addToast('Resume created successfully!', 'success');
      navigate(`/builder/${newResume._id}`);
    } else {
      addToast('Failed to create resume', 'error');
    }
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation(); // Avoid triggering card click redirection
    if (window.confirm('Are you sure you want to delete this resume?')) {
      const success = await deleteResume(id);
      if (success) {
        addToast('Resume deleted successfully', 'success');
      } else {
        addToast('Failed to delete resume', 'error');
      }
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="dashboard-container animate-fade-in">
      <div className="dashboard-header">
        <div className="dashboard-title-group">
          <h1>My Resumes</h1>
          <p>Create and edit professional documents</p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => setShowCreateModal(true)}
          style={{ height: '44px' }}
        >
          <Plus size={18} />
          <span>Create New</span>
        </button>
      </div>

      {loading && resumes.length === 0 ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '60px' }}>
          <Loader2 className="animate-spin" size={36} color="var(--accent-primary)" />
        </div>
      ) : resumes.length === 0 ? (
        <div className="glass-panel" style={{
          padding: '60px 24px',
          textAlign: 'center',
          marginTop: '20px',
          borderStyle: 'dashed',
          borderWidth: '2px',
        }}>
          <FileText size={48} style={{ color: 'var(--text-muted)', marginBottom: '16px' }} />
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '8px' }}>No resumes created yet</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', maxWidth: '400px', marginInline: 'auto' }}>
            Get started by creating your very first professional resume using our interactive builder.
          </p>
          <button className="btn btn-primary" onClick={() => setShowCreateModal(true)}>
            <Plus size={18} />
            <span>Create Your First Resume</span>
          </button>
        </div>
      ) : (
        <div className="resume-grid">
          {resumes.map((resume) => (
            <div
              key={resume._id}
              className="resume-card glass-panel"
              onClick={() => navigate(`/builder/${resume._id}`)}
            >
              <div>
                <h3 className="resume-card-title">{resume.title}</h3>
                <div className="resume-card-meta" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Calendar size={14} />
                  <span>Edited {formatDate(resume.updatedAt)}</span>
                </div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '12px' }}>
                  <span style={{
                    fontSize: '0.75rem',
                    padding: '4px 8px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: 'var(--border-radius-sm)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-secondary)',
                    textTransform: 'capitalize'
                  }}>
                    {resume.templateId} template
                  </span>
                  <span style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: resume.colorHex,
                    alignSelf: 'center',
                    border: '1px solid rgba(255,255,255,0.2)'
                  }} title={`Theme color: ${resume.colorHex}`} />
                </div>
              </div>

              <div className="resume-card-actions">
                <button
                  className="btn btn-secondary"
                  style={{ flex: 1, padding: '8px', fontSize: '0.8rem' }}
                  onClick={() => navigate(`/builder/${resume._id}`)}
                >
                  <Edit2 size={14} />
                  <span>Edit</span>
                </button>
                <button
                  className="btn btn-danger"
                  style={{ padding: '8px', minWidth: '38px' }}
                  onClick={(e) => handleDelete(e, resume._id)}
                  title="Delete Resume"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal for creating a new resume */}
      {showCreateModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
        }} onClick={() => setShowCreateModal(false)}>
          <div
            className="glass-panel"
            style={{
              width: '100%',
              maxWidth: '400px',
              padding: '32px',
              backgroundColor: 'var(--bg-secondary)',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-heading)', fontWeight: 700, marginBottom: '8px' }}>
              New Resume
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '24px' }}>
              Give your resume a name to get started. You can change this later.
            </p>

            <form onSubmit={handleCreate}>
              <div className="form-group">
                <label htmlFor="modal-title">Resume Title</label>
                <input
                  id="modal-title"
                  type="text"
                  className="form-input"
                  placeholder="e.g. Frontend Engineer 2026"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  autoFocus
                  required
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  style={{ flex: 1 }}
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ flex: 1 }}
                  disabled={isCreating}
                >
                  {isCreating ? 'Creating...' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
