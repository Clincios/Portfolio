import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, ExternalLink, Code, Briefcase, GraduationCap, Send, Menu, X, ChevronDown, Building2, Calendar } from 'lucide-react';
import { portfolioAPI, getMediaUrl } from './services/api';

const DetailBlock = ({ title, content }) => {
  if (!content || (Array.isArray(content) && content.length === 0)) {
    return null;
  }

  const normalizedContent = Array.isArray(content) ? content : [content];

  return (
    <div>
      <h4 className="text-lg font-semibold text-gray-900 mb-3">{title}</h4>
      <ul className="list-disc list-inside space-y-2 text-gray-700">
        {normalizedContent.map((item, idx) => (
          <li key={`${title}-${idx}`}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

// Helper function to extract YouTube video ID and convert to embed URL
const getYouTubeEmbedUrl = (url) => {
  if (!url) return null;
  
  // Match YouTube URLs in various formats
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
  }
  
  return null;
};

const MediaBlock = ({ item }) => {
  if (!item) return null;
  const rawSrc =
    item.src ||
    item.url ||
    (typeof item === 'string' ? item : null);
  const src = getMediaUrl(rawSrc);
  
  // Check if it's a YouTube URL
  const youtubeEmbedUrl = getYouTubeEmbedUrl(rawSrc || src);
  
  const type =
    item.type ||
    (youtubeEmbedUrl ? 'youtube' : (typeof rawSrc === 'string' && rawSrc.toLowerCase().endsWith('.mp4') ? 'video' : 'image'));
  const alt = item.alt || 'Project media';

  if (!src && !youtubeEmbedUrl) return null;

  // Handle YouTube embeds
  if (type === 'youtube' || youtubeEmbedUrl) {
    return (
      <div className="relative w-full overflow-hidden rounded-lg border border-gray-200 bg-black" style={{ paddingBottom: '56.25%' }}>
        <iframe
          src={youtubeEmbedUrl}
          className="absolute top-0 left-0 w-full h-full"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={alt}
        />
      </div>
    );
  }

  if (type === 'video') {
    return (
      <div className="relative w-full overflow-hidden rounded-lg border border-gray-200 bg-black">
        <video controls className="w-full h-full">
          <source src={src} />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
      <img src={src} alt={alt} className="w-full h-full object-cover" loading="lazy" />
    </div>
  );
};

// Experience Section with Timeline
const ExperienceSection = ({ experience, education }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Format date period for display
  const formatPeriod = (exp) => {
    const start = exp.start_date || exp.startDate;
    const end = exp.current || exp.end_date === null ? 'Present' : (exp.end_date || exp.endDate);
    return `${start} - ${end}`;
  };

  const hasExperience = experience && experience.length > 0;
  const hasEducation = education && education.length > 0;

  return (
    <section id="experience" className="py-16 sm:py-24 md:py-32 bg-white relative" ref={ref}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-indigo-700 tracking-tight mb-3 sm:mb-4">
            Work Experience
          </h2>
          <div className="w-12 sm:w-16 h-1 sm:h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full mx-auto"></div>
        </motion.div>

        {/* Timeline */}
        {hasExperience ? (
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500 via-violet-500 to-purple-500 transform md:-translate-x-1/2" />

          <div className="space-y-12">
            {experience.map((exp, index) => (
              <motion.div
                key={exp.id || `exp-${index}`}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + index * 0.2, duration: 0.8 }}
                className={`relative flex flex-col md:flex-row gap-8 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-white border-4 border-indigo-500 rounded-full transform -translate-x-1.5 md:-translate-x-1/2 mt-6" />

                {/* Content */}
                <div className={`flex-1 ml-6 sm:ml-8 md:ml-0 ${index % 2 === 0 ? 'md:pr-16' : 'md:pl-16'}`}>
                  <div className="bg-slate-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:bg-slate-100/80 transition-colors">
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-indigo-600 font-medium mb-2">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                      {formatPeriod(exp)}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1">
                      {exp.title || exp.position}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-600 mb-3 sm:mb-4">
                      <Building2 className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>{exp.company}</span>
                      {exp.location && <span className="text-slate-400">• {exp.location}</span>}
                    </div>
                    {exp.description && (
                      <p className="text-sm sm:text-base text-slate-600 mb-3 sm:mb-4 leading-relaxed">
                        {exp.description}
                      </p>
                    )}
                    {exp.responsibilities && exp.responsibilities.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {exp.responsibilities.map((tech, idx) => (
                          <span 
                            key={idx}
                            className="px-2 sm:px-3 py-0.5 sm:py-1 text-xs font-medium bg-white text-slate-600 rounded-full border border-slate-200"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
        ) : (
          <div className="text-center text-slate-500 bg-slate-50 border border-dashed border-slate-300 rounded-2xl p-10">
            <Briefcase className="w-12 h-12 mx-auto mb-4 text-slate-400" />
            <p className="text-lg font-medium">No work experience added yet.</p>
            <p className="text-sm mt-2">Add your experience in the Django admin panel.</p>
          </div>
        )}

        {/* Education Section */}
        {hasEducation && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 + (experience?.length || 0) * 0.2, duration: 0.8 }}
            className="mt-20"
          >
            <div className="text-center mb-8 sm:mb-12">
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-indigo-700 tracking-tight mb-3 sm:mb-4">
                Education
              </h3>
              <div className="w-12 sm:w-16 h-1 sm:h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full mx-auto"></div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              {education.map((edu, index) => (
                <motion.div
                  key={edu.id || `edu-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + (experience?.length || 0) * 0.2 + index * 0.1, duration: 0.6 }}
                  className="bg-slate-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:bg-slate-100/80 transition-colors"
                >
                  <h4 className="text-base sm:text-lg font-bold text-slate-900">
                    {edu.degree} {edu.field_of_study && `in ${edu.field_of_study}`}
                  </h4>
                  <p className="text-sm sm:text-base text-indigo-600 font-semibold mt-1">{edu.institution}</p>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 mt-2">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                    {edu.start_date || edu.startDate} - {edu.current || edu.end_date === null ? 'Present' : (edu.end_date || edu.endDate)}
                  </div>
                  {edu.gpa && <p className="text-xs sm:text-sm text-slate-500 mt-2">GPA: {edu.gpa}</p>}
                  {edu.description && (
                    <p className="text-slate-600 mt-3 text-xs sm:text-sm leading-relaxed">{edu.description}</p>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitStatus, setSubmitStatus] = useState('');
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [techFilter, setTechFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [selectedProject, setSelectedProject] = useState(null);

  // Fetch data from Django backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching data from backend...');
        const [profileRes, skillsRes, projectsRes, expRes, eduRes] = await Promise.all([
          portfolioAPI.getProfile(),
          portfolioAPI.getSkills(),
          portfolioAPI.getProjects(),
          portfolioAPI.getExperience(),
          portfolioAPI.getEducation(),
        ]);
        
        console.log('API Responses:', {
          profile: profileRes.data,
          skills: skillsRes.data,
          projects: projectsRes.data,
          experience: expRes.data,
          education: eduRes.data,
        });
        
        // Handle paginated responses (if pagination is enabled) or direct arrays
        const getData = (response, name) => {
          // Check if response is paginated (has 'results' field)
          if (response.data && Array.isArray(response.data.results)) {
            console.log(`${name}: Using paginated results`);
            return response.data.results;
          }
          // Check if response is already an array
          if (Array.isArray(response.data)) {
            console.log(`${name}: Using direct array`);
            return response.data;
          }
          // Otherwise return the data as-is
          console.log(`${name}: Using data as-is`);
          return response.data;
        };
        
        const profileData = getData(profileRes, 'Profile');
        setProfile(Array.isArray(profileData) ? (profileData[0] || null) : profileData);
        setSkills(getData(skillsRes, 'Skills') || []);
        setProjects(getData(projectsRes, 'Projects') || []);
        setExperience(getData(expRes, 'Experience') || []);
        setEducation(getData(eduRes, 'Education') || []);
        
        console.log('Data set successfully:', {
          profile: Array.isArray(profileData) ? (profileData[0] || null) : profileData,
          skillsCount: (getData(skillsRes, 'Skills') || []).length,
          projectsCount: (getData(projectsRes, 'Projects') || []).length,
          experienceCount: (getData(expRes, 'Experience') || []).length,
          educationCount: (getData(eduRes, 'Education') || []).length,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
        console.error('Error details:', {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
          url: error.config?.url,
        });
        // Set empty states on error to prevent UI crashes
        setProfile(null);
        setSkills([]);
        setProjects([]);
        setExperience([]);
        setEducation([]);
      }
    };
    
    fetchData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('sending');
    
    try {
      await portfolioAPI.submitContact(formData);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitStatus(''), 3000);
    } catch (error) {
      setSubmitStatus('error');
      console.error('Error submitting form:', error);
      setTimeout(() => setSubmitStatus(''), 3000);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Derived project helpers
  const availableCategories = React.useMemo(() => {
    const categories = new Set(
      projects
        .map((project) => project.category || project.type)
        .filter(Boolean)
        .map((c) => c.toLowerCase())
    );
    return ['all', ...Array.from(categories)];
  }, [projects]);

  const availableTech = React.useMemo(() => {
    const tech = new Set(
      projects.flatMap((project) =>
        (project.technologies || []).map((t) => t.toLowerCase())
      )
    );
    return ['all', ...Array.from(tech)];
  }, [projects]);

  const getProjectDate = (project) => {
    const rawDate =
      project.date ||
      project.completed_at ||
      project.completedAt ||
      project.created_at ||
      project.createdAt ||
      project.year;
    const parsed = rawDate ? new Date(rawDate) : null;
    return parsed && !Number.isNaN(parsed.valueOf()) ? parsed : null;
  };

  const filteredProjects = React.useMemo(() => {
    const normalizedCategory = (value) =>
      (value || 'uncategorized').toLowerCase();

    const matchesCategory = (project) =>
      categoryFilter === 'all' ||
      normalizedCategory(project.category || project.type) === categoryFilter;

    const matchesTech = (project) =>
      techFilter === 'all' ||
      (project.technologies || []).some(
        (tech) => tech.toLowerCase() === techFilter
      );

    const sorters = {
      title: (a, b) => (a.title || '').localeCompare(b.title || ''),
      date: (a, b) => {
        const dateA = getProjectDate(a);
        const dateB = getProjectDate(b);
        if (dateA && dateB) return dateB - dateA;
        if (dateA) return -1;
        if (dateB) return 1;
        return 0;
      },
    };

    return [...projects]
      .filter((project) => matchesCategory(project) && matchesTech(project))
      .sort(sorters[sortBy] || sorters.date);
  }, [projects, categoryFilter, techFilter, sortBy]);

  const openProjectDetails = (project) => {
    setSelectedProject(project);
  };

  const closeProjectDetails = () => {
    setSelectedProject(null);
  };

  // Default profile data if API hasn't loaded yet
  const displayProfile = profile || {
    name: "Loading...",
    title: "Software Developer",
    bio: "Loading profile information...",
    email: "",
    phone: "",
    location: "",
    github: "#",
    linkedin: "#",
    twitter: "#"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-slate-50 text-gray-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 pointer-events-none">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pointer-events-auto">
          <div className="bg-white/80 backdrop-blur-xl border border-indigo-100 shadow-lg rounded-full px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-14">
              <div className="text-lg sm:text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 tracking-tight">
                {displayProfile.name.split(' ').map(n => n[0]).join('').substring(0, 2) || 'DK'}
              </div>
              
              {/* Desktop Menu */}
              <div className="hidden md:flex items-center gap-2">
                {['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className={`px-3 py-2 rounded-full text-sm font-semibold transition-all ${
                      activeSection === item.toLowerCase() 
                        ? 'bg-indigo-600 text-white shadow-sm' 
                        : 'text-gray-700 hover:text-indigo-700 hover:bg-indigo-50'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden text-gray-600 hover:text-indigo-700"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white/90 backdrop-blur-xl border-t border-indigo-100 shadow-lg mt-2 mx-4 rounded-2xl overflow-hidden pointer-events-auto">
            {['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors font-medium"
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-4 sm:px-6 pt-24 sm:pt-28 pb-8 sm:pb-12">
        <div className="w-full max-w-5xl bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-[32px] shadow-2xl border border-indigo-100 px-4 sm:px-6 md:px-10 py-8 sm:py-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-indigo-50 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6 shadow-sm">
            <span className="inline-flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-white text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 font-bold shadow-inner text-xs sm:text-sm">
              {displayProfile.name.split(' ').map(n => n[0]).join('').substring(0, 2) || 'DK'}
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">Home</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-3 sm:mb-4 text-indigo-700 tracking-tight leading-tight px-2">
            {displayProfile.name}
          </h1>
          <p className="text-base sm:text-lg md:text-xl font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mb-3 sm:mb-4 typewriter px-2">
            SOFTWARE ENGINEER
          </p>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-600 mb-4 sm:mb-6 font-semibold px-2">
            {displayProfile.title || displayProfile.bio?.substring(0, 50)}
          </p>
          <p className="text-sm sm:text-base md:text-lg text-slate-600 mb-6 sm:mb-10 max-w-3xl mx-auto leading-relaxed px-2">
            {displayProfile.bio}
          </p>
          
          <div className="flex justify-center gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-10 flex-wrap px-2">
            {displayProfile.github && (
              <a href={displayProfile.github} target="_blank" rel="noopener noreferrer" className="p-2.5 sm:p-3 bg-white rounded-full hover:bg-indigo-50 transition-colors shadow-sm border border-indigo-100 text-indigo-600">
                <Github size={20} className="sm:w-[22px] sm:h-[22px]" />
              </a>
            )}
            {displayProfile.linkedin && (
              <a href={displayProfile.linkedin} target="_blank" rel="noopener noreferrer" className="p-2.5 sm:p-3 bg-white rounded-full hover:bg-indigo-50 transition-colors shadow-sm border border-indigo-100 text-indigo-600">
                <Linkedin size={20} className="sm:w-[22px] sm:h-[22px]" />
              </a>
            )}
            {displayProfile.twitter && (
              <a href={displayProfile.twitter} target="_blank" rel="noopener noreferrer" className="p-2.5 sm:p-3 bg-white rounded-full hover:bg-indigo-50 transition-colors shadow-sm border border-indigo-100 text-indigo-600">
                <Twitter size={20} className="sm:w-[22px] sm:h-[22px]" />
              </a>
            )}
          </div>
          <button
            onClick={() => scrollToSection('contact')}
            className="bg-indigo-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-semibold hover:bg-indigo-700 transition-colors shadow-lg"
          >
            Get In Touch
          </button>
          <div className="mt-8 sm:mt-12">
            <ChevronDown size={24} className="sm:w-8 sm:h-8 mx-auto text-indigo-300 animate-bounce" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-gradient-to-b from-slate-50 via-white to-slate-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-indigo-700 tracking-tight mb-3 sm:mb-4">About Me</h2>
            <div className="w-12 sm:w-16 h-1 sm:h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full mx-auto"></div>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
            {/* About Text Card */}
            <div className="bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-[28px] shadow-2xl border border-indigo-100 px-4 sm:px-6 md:px-10 py-6 sm:py-8 md:py-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    {displayProfile.name.split(' ').map(n => n[0]).join('').substring(0, 2) || 'ME'}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{displayProfile.name}</h3>
                  <p className="text-sm text-indigo-600 font-medium">{displayProfile.title}</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                {displayProfile.about || displayProfile.bio}
              </p>
            </div>

            {/* Contact Information Card */}
            <div className="bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-[28px] shadow-2xl border border-indigo-100 px-4 sm:px-6 md:px-10 py-6 sm:py-8 md:py-10">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
                <div className="w-1 h-6 sm:h-8 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 rounded-full"></div>
                Contact Information
              </h3>
              <div className="space-y-3 sm:space-y-4">
                {displayProfile.email && (
                  <motion.a
                    href={`mailto:${displayProfile.email}`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 hover:border-indigo-300 hover:shadow-md transition-all group"
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-indigo-600 flex items-center justify-center group-hover:bg-indigo-700 transition-colors flex-shrink-0">
                      <Mail className="text-white w-4 h-4 sm:w-[22px] sm:h-[22px]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">Email</p>
                      <p className="text-sm sm:text-base text-gray-800 font-semibold truncate">{displayProfile.email}</p>
                    </div>
                  </motion.a>
                )}
                {displayProfile.phone && (
                  <motion.a
                    href={`tel:${displayProfile.phone}`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 hover:border-purple-300 hover:shadow-md transition-all group"
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-purple-600 flex items-center justify-center group-hover:bg-purple-700 transition-colors flex-shrink-0">
                      <Phone className="text-white w-4 h-4 sm:w-[22px] sm:h-[22px]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">Phone</p>
                      <p className="text-sm sm:text-base text-gray-800 font-semibold">{displayProfile.phone}</p>
                    </div>
                  </motion.a>
                )}
                {displayProfile.location && (
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-gradient-to-r from-pink-50 to-indigo-50 border border-pink-100 hover:border-pink-300 hover:shadow-md transition-all"
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-pink-600 flex items-center justify-center flex-shrink-0">
                      <MapPin className="text-white w-4 h-4 sm:w-[22px] sm:h-[22px]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">Location</p>
                      <p className="text-sm sm:text-base text-gray-800 font-semibold">{displayProfile.location}</p>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Social Links */}
              {(displayProfile.github || displayProfile.linkedin || displayProfile.twitter) && (
                <div className="mt-8 pt-8 border-t border-indigo-100">
                  <p className="text-sm text-gray-600 font-medium mb-4">Connect with me</p>
                  <div className="flex gap-3">
                    {displayProfile.github && (
                      <motion.a
                        href={displayProfile.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-12 h-12 rounded-xl bg-gray-900 hover:bg-gray-800 flex items-center justify-center text-white transition-colors shadow-lg"
                      >
                        <Github size={22} />
                      </motion.a>
                    )}
                    {displayProfile.linkedin && (
                      <motion.a
                        href={displayProfile.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, rotate: -5 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-12 h-12 rounded-xl bg-blue-600 hover:bg-blue-700 flex items-center justify-center text-white transition-colors shadow-lg"
                      >
                        <Linkedin size={22} />
                      </motion.a>
                    )}
                    {displayProfile.twitter && (
                      <motion.a
                        href={displayProfile.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-12 h-12 rounded-xl bg-sky-500 hover:bg-sky-600 flex items-center justify-center text-white transition-colors shadow-lg"
                      >
                        <Twitter size={22} />
                      </motion.a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      {skills.length > 0 && (
        <section id="skills" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-gradient-to-b from-slate-100 via-white to-slate-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-indigo-700 tracking-tight mb-3 sm:mb-4">Skills & Technologies</h2>
              <div className="w-12 sm:w-16 h-1 sm:h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full mx-auto"></div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {['frontend', 'backend', 'database', 'tools'].map((category) => {
                const categorySkills = skills.filter(s => s.category === category);
                if (categorySkills.length === 0) return null;
                return (
                  <div key={category} className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 border border-indigo-100 shadow-lg">
                    <h3 className="text-lg font-semibold mb-4 capitalize text-indigo-700">{category}</h3>
                    {categorySkills.map((skill) => (
                      <div key={skill.id} className="mb-4">
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-semibold text-gray-800">{skill.name}</span>
                          {skill.proficiency && (
                            <span className="text-sm text-indigo-600 font-semibold">{skill.proficiency}%</span>
                          )}
                        </div>
                        <div className="h-2 bg-indigo-50 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                            style={{ width: `${skill.proficiency || 80}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Projects Section */}
      {projects.length > 0 && (
        <section id="projects" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-gradient-to-b from-slate-50 via-white to-slate-100">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-indigo-700 tracking-tight mb-3 sm:mb-4">Featured Projects</h2>
              <div className="w-12 sm:w-16 h-1 sm:h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full mx-auto"></div>
            </div>
            <div className="bg-white/90 backdrop-blur-xl border border-indigo-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 shadow-xl">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 sm:gap-4">
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {availableCategories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setCategoryFilter(category)}
                      className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors border ${
                        categoryFilter === category
                          ? 'bg-blue-600 text-white border-blue-600 shadow'
                          : 'bg-white text-gray-700 border-gray-200 hover:border-blue-200 hover:text-blue-700'
                      }`}
                    >
                      {category === 'all' ? 'All' : category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  <select
                    value={techFilter}
                    onChange={(e) => setTechFilter(e.target.value)}
                    className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-gray-200 bg-white text-xs sm:text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-200 flex-1 min-w-[140px]"
                  >
                    {availableTech.map((tech) => (
                      <option key={tech} value={tech}>
                        {tech === 'all' ? 'All Tech' : tech.charAt(0).toUpperCase() + tech.slice(1)}
                      </option>
                    ))}
                  </select>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-gray-200 bg-white text-xs sm:text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-200 flex-1 min-w-[140px]"
                  >
                    <option value="date">Sort by Date</option>
                    <option value="title">Sort by Title</option>
                  </select>
                </div>
              </div>
            </div>

            {filteredProjects.length === 0 ? (
              <div className="text-center text-gray-600 bg-gray-50 border border-dashed border-gray-300 rounded-xl p-10">
                No projects match these filters yet.
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                {filteredProjects.map((project, idx) => (
                  <div
                    key={project.id || `${project.title}-${idx}`}
                    onClick={() => openProjectDetails(project)}
                    className="bg-white/90 backdrop-blur-xl rounded-xl sm:rounded-2xl overflow-hidden border border-indigo-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 project-fade-in cursor-pointer"
                  >
                    <div className="h-40 sm:h-48 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center overflow-hidden">
                      {project.image ? (
                        <img 
                          src={getMediaUrl(project.image)} 
                          alt={project.title} 
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <Code size={64} className="text-indigo-600" />
                      )}
                    </div>
                    <div className="p-4 sm:p-6">
                      <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-900">{project.title}</h3>
                      <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed line-clamp-2">{project.description}</p>
                      {project.technologies && project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                          {project.technologies.slice(0, 3).map((tech) => (
                            <span key={tech} className="px-2 sm:px-3 py-0.5 sm:py-1 bg-indigo-50 text-indigo-700 text-xs rounded-full font-semibold border border-indigo-100">
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 3 && (
                            <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-semibold">
                              +{project.technologies.length - 3}
                            </span>
                          )}
                        </div>
                      )}
                        <div className="flex gap-3 sm:gap-4 pt-2">
                          {(project.github || project.github_url) && (
                            <a href={project.github || project.github_url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-indigo-600 hover:text-indigo-700 font-semibold">
                              <Github size={14} className="sm:w-4 sm:h-4" /> <span className="hidden sm:inline">Code</span>
                            </a>
                          )}
                          {(project.live || project.live_url) && (
                            <a href={project.live || project.live_url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-indigo-600 hover:text-indigo-700 font-semibold">
                              <ExternalLink size={14} className="sm:w-4 sm:h-4" /> <span className="hidden sm:inline">Live Demo</span>
                            </a>
                          )}
                        </div>
                    </div>
                </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Project Detail Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center px-3 sm:px-4 py-4 sm:py-10"
          onClick={closeProjectDetails}
        >
          <div
            className="bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto border border-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between p-4 sm:p-6 border-b border-gray-100">
              <div>
                <p className="text-sm uppercase tracking-wide text-blue-600 font-semibold">
                  {selectedProject.category || selectedProject.type || 'Project'}
                </p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">{selectedProject.title}</h3>
                {selectedProject.date && (
                  <p className="text-sm text-gray-500 mt-1">{selectedProject.date}</p>
                )}
              </div>
              <button
                onClick={closeProjectDetails}
                className="text-gray-500 hover:text-gray-800 transition-colors"
                aria-label="Close project details"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{selectedProject.description}</p>

              {selectedProject.technologies && selectedProject.technologies.length > 0 && (
                <div>
                  <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">Tech Stack</h4>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <span key={tech} className="px-2 sm:px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full font-medium border border-blue-100">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selectedProject.image ||
              (selectedProject.media && selectedProject.media.length > 0) ||
              (selectedProject.images && selectedProject.images.length > 0) ||
              (selectedProject.videos && selectedProject.videos.length > 0) ? (
                <div>
                  <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">Gallery</h4>
                  <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                    {selectedProject.image && (
                      <MediaBlock key="main-image" item={{ type: 'image', src: selectedProject.image }} />
                    )}
                    {(selectedProject.media || []).map((item, idx) => (
                      <MediaBlock key={`media-${idx}`} item={item} />
                    ))}
                    {(selectedProject.images || []).map((src, idx) => (
                      <MediaBlock key={`img-${idx}`} item={{ type: 'image', src }} />
                    ))}
                    {(selectedProject.videos || []).map((src, idx) => (
                      <MediaBlock key={`vid-${idx}`} item={{ type: 'video', src }} />
                    ))}
                  </div>
                </div>
              ) : null}

              <DetailBlock
                title="Challenges Faced"
                content={selectedProject.challenges || selectedProject.challengesFaced}
              />
              <DetailBlock
                title="Solutions Implemented"
                content={selectedProject.solutions || selectedProject.solutionsImplemented}
              />
              <DetailBlock
                title="Key Learnings"
                content={selectedProject.learnings || selectedProject.keyLearnings}
              />

              {(selectedProject.github || selectedProject.github_url || selectedProject.live || selectedProject.live_url) && (
                <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pt-3 sm:pt-4">
                  {(selectedProject.live || selectedProject.live_url) && (
                    <a 
                      href={selectedProject.live || selectedProject.live_url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-sm sm:text-base font-semibold rounded-full transition-colors shadow-md"
                    >
                      <ExternalLink size={16} className="sm:w-[18px] sm:h-[18px]" /> Visit Live
                    </a>
                  )}
                  {(selectedProject.github || selectedProject.github_url) && (
                    <a 
                      href={selectedProject.github || selectedProject.github_url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-900 text-sm sm:text-base font-semibold rounded-full transition-colors shadow-sm"
                    >
                      <Github size={16} className="sm:w-[18px] sm:h-[18px]" /> View Code
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Experience Section */}
      <ExperienceSection experience={experience} education={education} />

      {/* Contact Section */}
      <section id="contact" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-gradient-to-b from-slate-50 via-white to-slate-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-indigo-700 tracking-tight mb-3 sm:mb-4">Get In Touch</h2>
            <div className="w-12 sm:w-16 h-1 sm:h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full mx-auto"></div>
            <p className="text-gray-600 mt-3 sm:mt-4 text-sm sm:text-base md:text-lg px-2">I'd love to hear from you. Send me a message and I'll respond as soon as possible.</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Contact Information Side */}
            <div className="space-y-4 sm:space-y-6">
              <div className="bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-[28px] shadow-2xl border border-indigo-100 p-5 sm:p-6 md:p-8">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
                  <div className="w-1 h-6 sm:h-8 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 rounded-full"></div>
                  Let's Connect
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                  Feel free to reach out through any of these channels. I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                </p>
                
                <div className="space-y-3 sm:space-y-4">
                  {displayProfile.email && (
                    <motion.a
                      href={`mailto:${displayProfile.email}`}
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5 rounded-xl bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 border border-indigo-100 hover:border-indigo-300 hover:shadow-lg transition-all group"
                  >
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-md flex-shrink-0">
                        <Mail className="text-white w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-1">Email Address</p>
                        <p className="text-sm sm:text-base md:text-lg text-gray-800 font-bold truncate">{displayProfile.email}</p>
                      </div>
                    </motion.a>
                  )}
                  
                  {displayProfile.phone && (
                    <motion.a
                      href={`tel:${displayProfile.phone}`}
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5 rounded-xl bg-gradient-to-r from-purple-50 via-pink-50 to-indigo-50 border border-purple-100 hover:border-purple-300 hover:shadow-lg transition-all group"
                    >
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-md flex-shrink-0">
                        <Phone className="text-white w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-1">Phone Number</p>
                        <p className="text-sm sm:text-base md:text-lg text-gray-800 font-bold">{displayProfile.phone}</p>
                      </div>
                    </motion.a>
                  )}
                  
                  {displayProfile.location && (
                    <motion.div
                      whileHover={{ scale: 1.02, x: 5 }}
                      className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5 rounded-xl bg-gradient-to-r from-pink-50 via-indigo-50 to-purple-50 border border-pink-100 hover:border-pink-300 hover:shadow-lg transition-all"
                    >
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-pink-500 to-indigo-600 flex items-center justify-center shadow-md flex-shrink-0">
                        <MapPin className="text-white w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-1">Location</p>
                        <p className="text-sm sm:text-base md:text-lg text-gray-800 font-bold">{displayProfile.location}</p>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Social Links */}
                {(displayProfile.github || displayProfile.linkedin || displayProfile.twitter) && (
                  <div className="mt-8 pt-8 border-t border-indigo-100">
                    <p className="text-sm text-gray-600 font-semibold mb-4 uppercase tracking-wide">Follow Me</p>
                    <div className="flex gap-4">
                      {displayProfile.github && (
                        <motion.a
                          href={displayProfile.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.15, y: -5 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-14 h-14 rounded-xl bg-gray-900 hover:bg-gray-800 flex items-center justify-center text-white transition-colors shadow-lg"
                        >
                          <Github size={24} />
                        </motion.a>
                      )}
                      {displayProfile.linkedin && (
                        <motion.a
                          href={displayProfile.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.15, y: -5 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-14 h-14 rounded-xl bg-blue-600 hover:bg-blue-700 flex items-center justify-center text-white transition-colors shadow-lg"
                        >
                          <Linkedin size={24} />
                        </motion.a>
                      )}
                      {displayProfile.twitter && (
                        <motion.a
                          href={displayProfile.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.15, y: -5 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-14 h-14 rounded-xl bg-sky-500 hover:bg-sky-600 flex items-center justify-center text-white transition-colors shadow-lg"
                        >
                          <Twitter size={24} />
                        </motion.a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Contact Form Side */}
            <div className="bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-[28px] shadow-2xl border border-indigo-100 p-5 sm:p-6 md:p-8">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
                <div className="w-1 h-6 sm:h-8 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 rounded-full"></div>
                Send a Message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2 text-gray-800">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white rounded-lg sm:rounded-xl border border-indigo-100 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-none text-sm sm:text-base text-gray-900 transition-colors shadow-sm"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2 text-gray-800">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white rounded-lg sm:rounded-xl border border-indigo-100 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-none text-sm sm:text-base text-gray-900 transition-colors shadow-sm"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2 text-gray-800">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white rounded-lg sm:rounded-xl border border-indigo-100 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-none text-sm sm:text-base text-gray-900 transition-colors shadow-sm"
                    placeholder="What's this about?"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2 text-gray-800">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="5"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white rounded-lg sm:rounded-xl border border-indigo-100 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-none resize-none text-sm sm:text-base text-gray-900 transition-colors shadow-sm"
                    placeholder="Tell me about your project or just say hello..."
                    required
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={submitStatus === 'sending'}
                  whileHover={{ scale: submitStatus === 'sending' ? 1 : 1.02 }}
                  whileTap={{ scale: submitStatus === 'sending' ? 1 : 0.98 }}
                  className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
                >
                  {submitStatus === 'sending' ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={20} /> Send Message
                    </>
                  )}
                </motion.button>
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-green-50 border border-green-200 rounded-xl"
                  >
                    <p className="text-green-700 text-center font-semibold flex items-center justify-center gap-2">
                      <span className="text-green-600">✓</span> Message sent successfully!
                    </p>
                  </motion.div>
                )}
                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-50 border border-red-200 rounded-xl"
                  >
                    <p className="text-red-700 text-center font-semibold">Error sending message. Please try again.</p>
                  </motion.div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 border-t border-indigo-800 py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-300">© 2025 {displayProfile.name}. All rights reserved.</p>
          <div className="flex justify-center gap-4 mt-4">
            {displayProfile.github && (
              <a href={displayProfile.github} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                <Github size={20} />
              </a>
            )}
            {displayProfile.linkedin && (
              <a href={displayProfile.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
            )}
            {displayProfile.twitter && (
              <a href={displayProfile.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
