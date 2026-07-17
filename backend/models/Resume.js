const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Please provide a title for the resume'],
      trim: true,
      default: 'My Resume',
    },
    templateId: {
      type: String,
      required: true,
      default: 'modern',
    },
    colorHex: {
      type: String,
      required: true,
      default: '#6366f1',
    },
    fontFamily: {
      type: String,
      required: true,
      default: 'Inter',
    },
    personalDetails: {
      name: { type: String, default: '' },
      email: { type: String, default: '' },
      phone: { type: String, default: '' },
      title: { type: String, default: '' },
      summary: { type: String, default: '' },
      location: { type: String, default: '' },
      website: { type: String, default: '' },
      github: { type: String, default: '' },
      linkedin: { type: String, default: '' },
      photoUrl: { type: String, default: '' },
    },
    education: [
      {
        school: { type: String, default: '' },
        degree: { type: String, default: '' },
        fieldOfStudy: { type: String, default: '' },
        startDate: { type: String, default: '' },
        endDate: { type: String, default: '' },
        current: { type: Boolean, default: false },
        description: { type: String, default: '' },
      },
    ],
    experience: [
      {
        company: { type: String, default: '' },
        role: { type: String, default: '' },
        location: { type: String, default: '' },
        startDate: { type: String, default: '' },
        endDate: { type: String, default: '' },
        current: { type: Boolean, default: false },
        description: { type: String, default: '' },
      },
    ],
    skills: [
      {
        name: { type: String, default: '' },
        level: { type: String, default: 'Intermediate' }, // Beginner, Intermediate, Expert
      },
    ],
    projects: [
      {
        name: { type: String, default: '' },
        description: { type: String, default: '' },
        github: { type: String, default: '' },
        live: { type: String, default: '' },
        technologies: { type: String, default: '' },
      },
    ],
    languages: [
      {
        name: { type: String, default: '' },
        proficiency: { type: String, default: '' }, // e.g. Native, Fluent, Conversational
      },
    ],
    certifications: [
      {
        name: { type: String, default: '' },
        issuer: { type: String, default: '' },
        date: { type: String, default: '' },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Resume', ResumeSchema);
