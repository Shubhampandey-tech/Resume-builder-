const Resume = require('../models/Resume');

// @desc    Get all user's resumes
// @route   GET /api/resumes
// @access  Private
const getResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ user: req.user.id }).sort({ updatedAt: -1 });
    res.status(200).json({ success: true, data: resumes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single resume by ID
// @route   GET /api/resumes/:id
// @access  Private
const getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({ success: false, message: 'Resume not found' });
    }

    // Check user ownership
    if (resume.user.toString() !== req.user.id) {
      return res.status(401).json({ success: false, message: 'Not authorized to view this resume' });
    }

    res.status(200).json({ success: true, data: resume });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create a new resume
// @route   POST /api/resumes
// @access  Private
const createResume = async (req, res) => {
  try {
    const { title, templateId, colorHex, fontFamily } = req.body;

    const newResume = new Resume({
      user: req.user.id,
      title: title || 'Untitled Resume',
      templateId: templateId || 'modern',
      colorHex: colorHex || '#6366f1',
      fontFamily: fontFamily || 'Inter',
      personalDetails: {
        name: '', email: '', phone: '', title: '', summary: '', location: '', website: '', github: '', linkedin: '', photoUrl: ''
      },
      education: [],
      experience: [],
      skills: [],
      projects: [],
      languages: [],
      certifications: []
    });

    const savedResume = await newResume.save();
    res.status(201).json({ success: true, data: savedResume });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update a resume
// @route   PUT /api/resumes/:id
// @access  Private
const updateResume = async (req, res) => {
  try {
    let resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({ success: false, message: 'Resume not found' });
    }

    // Check user ownership
    if (resume.user.toString() !== req.user.id) {
      return res.status(401).json({ success: false, message: 'Not authorized to edit this resume' });
    }

    // Update with req.body data
    resume = await Resume.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    res.status(200).json({ success: true, data: resume });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete a resume
// @route   DELETE /api/resumes/:id
// @access  Private
const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({ success: false, message: 'Resume not found' });
    }

    // Check user ownership
    if (resume.user.toString() !== req.user.id) {
      return res.status(401).json({ success: false, message: 'Not authorized to delete this resume' });
    }

    await resume.deleteOne();
    res.status(200).json({ success: true, message: 'Resume removed successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getResumes,
  getResumeById,
  createResume,
  updateResume,
  deleteResume,
};
