import React, { useState, useEffect } from 'react';
import { Language, UserRole, Screen, Category, Engineer, ServiceRequest, Equipment, Transaction, Complaint, ChatMessage, WorkPost, ClientJob } from './types';
import { INITIAL_ENGINEERS, INITIAL_EQUIPMENT, INITIAL_REQUESTS, TRANSLATIONS, INITIAL_WORK_POSTS, INITIAL_CLIENT_JOBS } from './data';

// Modular Components
import SplashView from './components/SplashView';
import AIAssistantDashboard from './components/AIAssistantDashboard';
import EmergencyDashboard from './components/EmergencyDashboard';
import ChatDashboard from './components/ChatDashboard';
import MaintenancePlanner from './components/MaintenancePlanner';
import AdminPanel from './components/AdminPanel';

// Icons
import { 
  Globe, Briefcase, Zap, AlertTriangle, ShieldCheck, 
  MessageSquare, Settings, CreditCard, Star, Search, 
  MapPin, Plus, Sparkles, Building, ChevronRight, CheckCircle, Smartphone,
  Camera, Video, Image as ImageIcon, Trash2, Film, Paperclip
} from 'lucide-react';

export default function App() {
  // Global States
  const [language, setLanguage] = useState<Language>('en');
  const [screen, setScreen] = useState<Screen>('dashboard');
  const [userRole, setUserRole] = useState<UserRole>('guest');
  const [userProfile, setUserProfile] = useState<{ name: string; phone: string; email?: string; location: string; engineerId?: string } | null>(null);

  // Entities
  const [engineers, setEngineers] = useState<Engineer[]>(() => {
    const saved = localStorage.getItem('ec_engineers');
    return saved ? JSON.parse(saved) : INITIAL_ENGINEERS;
  });

  useEffect(() => {
    localStorage.setItem('ec_engineers', JSON.stringify(engineers));
  }, [engineers]);
  const [equipmentList, setEquipmentList] = useState<Equipment[]>(INITIAL_EQUIPMENT);
  const [requests, setRequests] = useState<ServiceRequest[]>(INITIAL_REQUESTS);
  
  // Platform logs
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 'tx_1', requestId: 'req_101', customerName: 'Mwanza General Hospital', engineerName: 'Eng. Amina Shehe', amount: 150000, paymentMethod: 'M-Pesa', transactionRef: 'TX-MPESA-93821-TZ', status: 'Completed', date: '2026-06-11' }
  ]);
  const [complaints, setComplaints] = useState<Complaint[]>([
    { id: 'comp_1', title: 'Subcontractor delay', description: 'Engineer failed to calibrate the autoclave backup within promised 2 hours.', userEmail: 'hospital@clinic.co.tz', accusedEmail: 'amina.shehe@engineerconnect.co.tz', status: 'Pending', date: '2026-06-12' }
  ]);

  // Social Media Work Posts State
  const [posts, setPosts] = useState<WorkPost[]>(() => {
    const saved = localStorage.getItem('ec_work_posts');
    return saved ? JSON.parse(saved) : INITIAL_WORK_POSTS;
  });

  useEffect(() => {
    localStorage.setItem('ec_work_posts', JSON.stringify(posts));
  }, [posts]);

  // Home Screen Sub-tab: Default to Social Media Work Feed
  const [homeSubTab, setHomeSubTab] = useState<'feed' | 'directory' | 'jobs'>('feed');

  // Client Jobs Board State
  const [clientJobs, setClientJobs] = useState<ClientJob[]>(() => {
    const saved = localStorage.getItem('ec_client_jobs');
    return saved ? JSON.parse(saved) : INITIAL_CLIENT_JOBS;
  });

  useEffect(() => {
    localStorage.setItem('ec_client_jobs', JSON.stringify(clientJobs));
  }, [clientJobs]);

  // Client Job Board inputs
  const [showCreateJobForm, setShowCreateJobForm] = useState(false);
  const [jobTitle, setJobTitle] = useState('');
  const [jobCategory, setJobCategory] = useState<Category>('Electrical');
  const [jobLocation, setJobLocation] = useState('');
  const [jobBudget, setJobBudget] = useState('');
  const [jobUrgency, setJobUrgency] = useState<'Low' | 'Medium' | 'High' | 'Emergency'>('Medium');
  const [jobDescEn, setJobDescEn] = useState('');
  const [jobDescSw, setJobDescSw] = useState('');

  // Engineer bidding interactive panel
  const [biddingJobId, setBiddingJobId] = useState<string | null>(null);
  const [bidAmount, setBidAmount] = useState('');
  const [bidComment, setBidComment] = useState('');

  // Comment input state for posts
  const [newCommentText, setNewCommentText] = useState<Record<string, string>>({});

  // New Post Submission Form State for certified Engineers
  const [showCreatePostForm, setShowCreatePostForm] = useState(false);
  const [postTitle, setPostTitle] = useState('');
  const [postCategory, setPostCategory] = useState<Category>('Electrical');
  const [postLocation, setPostLocation] = useState('');
  const [postDescEn, setPostDescEn] = useState('');
  const [postDescSw, setPostDescSw] = useState('');
  const [postImagePreset, setPostImagePreset] = useState<string>('https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&auto=format&fit=crop&q=80');

  // Extended Media Post uploads
  const [postUploadType, setPostUploadType] = useState<'preset' | 'file' | 'link'>('preset');
  const [postCustomFileName, setPostCustomFileName] = useState<string>('');
  const [postCustomFileBase64, setPostCustomFileBase64] = useState<string>('');
  const [postUploadedMediaType, setPostUploadedMediaType] = useState<'image' | 'video'>('image');
  const [postCustomLink, setPostCustomLink] = useState<string>('');
  const [isDragActive, setIsDragActive] = useState<boolean>(false);

  // UI Selection States
  const [activeTab, setActiveTab] = useState<'find' | 'requests' | 'emergency' | 'equipment' | 'admin'>('find');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEngineer, setSelectedEngineer] = useState<Engineer | null>(null);
  
  // Hiring Form states
  const [hireTitle, setHireTitle] = useState('');
  const [hireDesc, setHireDesc] = useState('');
  const [hireLoc, setHireLoc] = useState('');
  const [hireUrgency, setHireUrgency] = useState<'Low' | 'Medium' | 'High' | 'Emergency'>('Medium');
  const [showHiringForm, setShowHiringForm] = useState(false);

  // Active Chats
  const [activeChatRequest, setActiveChatRequest] = useState<ServiceRequest | null>(null);

  // Mobile Money simulated drawer
  const [payingRequestId, setPayingRequestId] = useState<string | null>(null);
  const [paymentProvider, setPaymentProvider] = useState<'M-Pesa' | 'Tigo Pesa' | 'Airtel Money' | 'NMB/CRDB Bank'>('M-Pesa');
  const [paymentPhone, setPaymentPhone] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Authentication Modal States & Inputs
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [regRole, setRegRole] = useState<'customer' | 'engineer'>('customer');

  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regLocation, setRegLocation] = useState('Dar es Salaam');
  const [regCategory, setRegCategory] = useState<Category>('Electrical');
  const [regExperience, setRegExperience] = useState('2');
  const [regCertifications, setRegCertifications] = useState('');
  const [regBio, setRegBio] = useState('');

  // Handle local persistence load
  useEffect(() => {
    const savedProfile = localStorage.getItem('ec_user_profile');
    const savedRole = localStorage.getItem('ec_user_role');
    const savedLang = localStorage.getItem('ec_user_language');
    if (savedProfile && savedRole) {
      setUserProfile(JSON.parse(savedProfile));
      setUserRole(savedRole as UserRole);
      setScreen('dashboard');
      if (savedLang) setLanguage(savedLang as Language);
    } else {
      setUserProfile(null);
      setUserRole('guest');
      setScreen('dashboard');
    }
  }, []);

  const handleOnboardingComplete = (user: { name: string; phone: string; role: UserRole; location: string }) => {
    setUserProfile({ name: user.name, phone: user.phone, location: user.location });
    setUserRole(user.role);
    localStorage.setItem('ec_user_profile', JSON.stringify({ name: user.name, phone: user.phone, location: user.location }));
    localStorage.setItem('ec_user_role', user.role);
    localStorage.setItem('ec_user_language', language);
    setScreen('dashboard');
  };

  const logout = () => {
    localStorage.removeItem('ec_user_profile');
    localStorage.removeItem('ec_user_role');
    setUserProfile(null);
    setUserRole('guest');
    setScreen('dashboard');
  };

  // Social feed handlers
  const handleLikePost = (postId: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        const liked = !p.likedByUser;
        return {
          ...p,
          likedByUser: liked,
          likes: liked ? p.likes + 1 : p.likes - 1
        };
      }
      return p;
    }));
  };

  const handleAddComment = (postId: string, text: string) => {
    if (!text.trim()) return;
    const authorName = userProfile?.name || (userRole === 'engineer' ? 'Eng. Anonymous' : 'Mteja Guest');
    
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          comments: [
            ...p.comments,
            {
              id: `comment_${Date.now()}`,
              userName: authorName,
              text,
              time: 'Just now',
              isVerifiedReply: userRole === 'engineer'
            }
          ]
        };
      }
      return p;
    }));

    setNewCommentText(prev => ({
      ...prev,
      [postId]: ''
    }));
  };

  const handlePostFileSelect = (file: File) => {
    if (!file) return;
    setPostCustomFileName(file.name);
    const isVideo = file.type.startsWith('video/') || file.name.endsWith('.mp4') || file.name.endsWith('.mov') || file.name.endsWith('.webm');
    setPostUploadedMediaType(isVideo ? 'video' : 'image');

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setPostCustomFileBase64(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle || !postDescEn) return;

    // Determine author profile
    const activeEngId = userProfile?.engineerId;
    const activeEng = engineers.find(eng => eng.id === activeEngId) || engineers.find(eng => eng.id === 'eng_1') || engineers[0];

    let finalImageUrl = 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&auto=format&fit=crop&q=80';
    let finalVideoUrl = '';
    let finalMediaType: 'image' | 'video' = 'image';

    if (postUploadType === 'preset') {
      finalImageUrl = postImagePreset;
      finalMediaType = 'image';
    } else if (postUploadType === 'file') {
      if (postUploadedMediaType === 'video') {
        finalVideoUrl = postCustomFileBase64;
        finalMediaType = 'video';
        finalImageUrl = '';
      } else {
        finalImageUrl = postCustomFileBase64;
        finalMediaType = 'image';
      }
    } else if (postUploadType === 'link') {
      const isVideoLink = postCustomLink.toLowerCase().includes('video') || 
                          postCustomLink.match(/\.(mp4|webm|mov|ogg|m4v)(\?.*)?$/i);
      if (isVideoLink) {
        finalVideoUrl = postCustomLink;
        finalMediaType = 'video';
        finalImageUrl = '';
      } else {
        finalImageUrl = postCustomLink;
        finalMediaType = 'image';
      }
    }

    const newPost: WorkPost = {
      id: `post_${Date.now()}`,
      engineerId: activeEng.id,
      engineerName: activeEng.name,
      engineerAvatar: activeEng.avatar,
      engineerCategory: postCategory,
      title: postTitle,
      location: postLocation || activeEng.location,
      description: postDescEn,
      descriptionSwahili: postDescSw || postDescEn,
      imageUrl: finalImageUrl,
      videoUrl: finalVideoUrl,
      mediaType: finalMediaType,
      likes: 0,
      likedByUser: false,
      date: new Date().toISOString().split('T')[0],
      comments: []
    };

    setPosts(prev => [newPost, ...prev]);
    setPostTitle('');
    setPostLocation('');
    setPostDescEn('');
    setPostDescSw('');
    setPostCustomFileName('');
    setPostCustomFileBase64('');
    setPostCustomLink('');
    setPostUploadType('preset');
    setShowCreatePostForm(false);
  };

  // Client Job Board handlers
  const handleCreateJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobTitle || !jobDescEn || !jobBudget) return;

    const newJob: ClientJob = {
      id: `job_${Date.now()}`,
      clientName: userProfile?.name || 'Mteja Guest',
      clientEmail: userProfile?.phone ? `${userProfile.phone.replace(/\s+/g, '')}@client.co.tz` : 'guest@client.co.tz',
      clientAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      title: jobTitle,
      category: jobCategory,
      location: jobLocation || userProfile?.location || 'Dar es Salaam',
      description: jobDescEn,
      descriptionSwahili: jobDescSw || jobDescEn,
      budget: jobBudget + (jobBudget.toLowerCase().includes('tzs') ? '' : ' TZS'),
      urgency: jobUrgency,
      datePosted: new Date().toISOString().split('T')[0],
      status: 'open',
      proposals: []
    };

    setClientJobs(prev => [newJob, ...prev]);
    setJobTitle('');
    setJobLocation('');
    setJobBudget('');
    setJobDescEn('');
    setJobDescSw('');
    setShowCreateJobForm(false);
  };

  const handlePlaceBid = (jobId: string, amount: string, commentText: string) => {
    if (!amount.trim() || !commentText.trim()) return;

    // Determine bidding engineer
    const activeEngId = userProfile?.engineerId;
    const activeEng = engineers.find(eng => eng.id === activeEngId) || engineers.find(eng => eng.id === 'eng_1') || engineers[0];

    setClientJobs(prev => prev.map(job => {
      if (job.id === jobId) {
        // filter out pre-existing proposals from same engineer to support bid updates
        const remainingProps = job.proposals.filter(p => p.engineerId !== activeEng.id);
        const newProposal = {
          id: `prop_${Date.now()}`,
          engineerId: activeEng.id,
          engineerName: activeEng.name,
          engineerAvatar: activeEng.avatar,
          bidAmount: amount + (amount.toLowerCase().includes('tzs') ? '' : ' TZS'),
          comment: commentText,
          time: 'Just now'
        };
        return {
          ...job,
          proposals: [...remainingProps, newProposal]
        };
      }
      return job;
    }));

    setBidAmount('');
    setBidComment('');
    setBiddingJobId(null);
  };

  const handleAcceptBid = (jobId: string, bidId: string) => {
    setClientJobs(prev => prev.map(job => {
      if (job.id === jobId) {
        return {
          ...job,
          status: 'assigned',
          proposals: job.proposals.map(p => p.id === bidId ? { ...p, isAccepted: true } : p)
        };
      }
      return job;
    }));
  };

  // State manipulation handlers
  const handleToggleVerifyEngineer = (id: string) => {
    setEngineers(prev => prev.map(e => e.id === id ? { ...e, isVerified: !e.isVerified } : e));
  };

  const handleResolveComplaint = (id: string, notes: string) => {
    setComplaints(prev => prev.map(c => c.id === id ? { ...c, status: 'Resolved', resolutionNotes: notes } : c));
  };

  const handleAddEquipment = (newEq: Omit<Equipment, 'id'>) => {
    const fresh: Equipment = { ...newEq, id: `eq_${Date.now()}` };
    setEquipmentList(prev => [...prev, fresh]);
  };

  const handleLogService = (eqId: string, notes: string, engineerName: string) => {
    setEquipmentList(prev => prev.map(eq => {
      if (eq.id === eqId) {
        return {
          ...eq,
          nextServiceDate: new Date(Date.now() + 90*24*60*60*1000).toISOString().split('T')[0],
          serviceHistory: [
            { id: `h_${Date.now()}`, date: new Date().toISOString().split('T')[0], notes, engineerName },
            ...eq.serviceHistory
          ]
        };
      }
      return eq;
    }));
  };

  const handlePostRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEngineer) return;

    const newReq: ServiceRequest = {
      id: `req_${Date.now()}`,
      title: hireTitle || `System Restoration: ${selectedCategory}`,
      description: hireDesc,
      category: selectedEngineer.category,
      customerName: userProfile?.name || 'Authorized Mteja',
      customerPhone: userProfile?.phone || '+255 700 000 000',
      location: hireLoc || userProfile?.location || 'Dar es Salaam',
      urgency: hireUrgency,
      status: 'pending',
      engineerId: selectedEngineer.id,
      cost: parseInt(selectedEngineer.ratesPerHour.replace(/[^\d]/g, '')) * 3 || 120000,
      chatHistory: [
        { id: 'init', sender: 'engineer', text: `Habari! I have received your request regarding "${hireTitle}". Assessing details now.`, timestamp: 'Just now' }
      ]
    };

    setRequests(prev => [newReq, ...prev]);
    setShowHiringForm(false);
    setSelectedEngineer(null);
    setHireTitle('');
    setHireDesc('');
    setActiveTab('requests');
  };

  // AI to Direct-Hire trigger
  const handleInitiateHireFromAI = (category: Category, description: string, urgency: 'Low' | 'Medium' | 'High' | 'Emergency', costRange: string) => {
    const match = engineers.find(e => e.category === category) || engineers[0];
    setSelectedEngineer(match);
    setSelectedCategory(category);
    setHireTitle(`AI Diagnosed: ${category} Breakdown`);
    setHireDesc(description);
    setHireUrgency(urgency);
    setHireLoc(userProfile?.location || 'Dar es Salaam');
    setShowHiringForm(true);
  };

  // SOS trigger
  const handleDispatchSOS = (issueTitle: string, description: string, category: Category, gps: string) => {
    const newReq: ServiceRequest = {
      id: `req_${Date.now()}`,
      title: `🚨 EMERGENCY SOS: ${issueTitle}`,
      description,
      category,
      customerName: userProfile?.name || 'Emergency Unit Dispatch',
      customerPhone: userProfile?.phone || '+255 700 000 000',
      location: gps,
      urgency: 'Emergency',
      status: 'accepted',
      engineerId: engineers.find(e => e.category === category)?.id || engineers[0].id,
      cost: 200000,
      chatHistory: [
        { id: 'sos_1', sender: 'engineer', text: 'SOS broadcast received! Sat-responder on high alert. Confirming dispatch sequence now.', timestamp: 'Just now' }
      ]
    };
    setRequests(prev => [newReq, ...prev]);
  };

  // Accept job (for Engineer perspective)
  const handleAcceptJob = (reqId: string) => {
    setRequests(prev => prev.map(r => r.id === reqId ? { ...r, status: 'accepted' } : r));
  };

  const handleUpdateStatus = (reqId: string, status: 'in_progress' | 'completed') => {
    setRequests(prev => prev.map(r => r.id === reqId ? { ...r, status } : r));
  };

  // Mobile Money Payment simulator
  const handleOpenPayment = (req: ServiceRequest) => {
    setPayingRequestId(req.id);
    setPaymentPhone(userProfile?.phone || '');
    setPaymentSuccess(false);
  };

  const processPayment = () => {
    if (!payingRequestId) return;
    setTimeout(() => {
      setRequests(prev => prev.map(r => r.id === payingRequestId ? { ...r, status: 'paid' } : r));
      
      const reqObj = requests.find(r => r.id === payingRequestId);
      const engObj = engineers.find(e => e.id === reqObj?.engineerId);
      
      const newTx: Transaction = {
        id: `tx_${Date.now()}`,
        requestId: payingRequestId,
        customerName: reqObj?.customerName || userProfile?.name || 'Client',
        engineerName: engObj?.name || 'Technician',
        amount: reqObj?.cost || 150000,
        paymentMethod: paymentProvider,
        transactionRef: `TX-${paymentProvider.toUpperCase().replace(/\//g,'')}-${Math.floor(10000 + Math.random() * 90000)}-TZ`,
        status: 'Completed',
        date: new Date().toISOString().split('T')[0]
      };
      
      setTransactions(prev => [newTx, ...prev]);
      setPaymentSuccess(true);
      setTimeout(() => {
        setPayingRequestId(null);
      }, 1500);
    }, 1200);
  };

  // Send massage in chat channel
  const handleSendChat = (text: string, fileUrl?: string, isVoiceNote?: boolean) => {
    if (!activeChatRequest) return;
    const freshMessage: ChatMessage = {
      id: `m_${Date.now()}`,
      sender: userRole === 'engineer' ? 'engineer' : 'customer',
      text,
      timestamp: 'Just now',
      fileUrl,
      isVoiceNote
    };

    setRequests(prev => prev.map(r => {
      if (r.id === activeChatRequest.id) {
        const update = { ...r, chatHistory: [...r.chatHistory, freshMessage] };
        setActiveChatRequest(update);
        return update;
      }
      return r;
    }));
  };

  // Filter logic
  const filteredEngineers = engineers.filter(e => {
    const matchesCategory = selectedCategory === 'All' || e.category === selectedCategory;
    const matchesQuery = e.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         e.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         e.bio.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const filteredPosts = posts.filter(p => {
    const matchesCategory = selectedCategory === 'All' || p.engineerCategory === selectedCategory;
    const matchesQuery = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         p.engineerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         p.descriptionSwahili.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const filteredJobs = clientJobs.filter(j => {
    const matchesCategory = selectedCategory === 'All' || j.category === selectedCategory;
    const matchesQuery = j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         j.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         j.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         j.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (j.descriptionSwahili && j.descriptionSwahili.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  const t = TRANSLATIONS[language];

  if (screen === 'splash') {
    return <SplashView language={language} setLanguage={setLanguage} onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans" id="master-app-root">
      
      <header className="bg-slate-900/95 sticky top-0 z-40 border-b border-white/5 backdrop-blur px-4 py-2.5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          
          {/* Logo Brand */}
          <div className="flex items-center space-x-2 w-full md:w-auto justify-between md:justify-start">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-br from-emerald-400 via-teal-500 to-blue-500 rounded-xl shadow border border-white/10">
                <span className="font-mono text-slate-950 text-sm font-black">B</span>
              </div>
              <div>
                <div className="flex items-center space-x-1">
                  <span className="text-sm font-black tracking-tight text-white">Builda</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono">Tanzania</span>
                </div>
                <p className="text-[10px] text-slate-450 leading-none">{t.tagline}</p>
              </div>
            </div>
          </div>

          {/* Combined Controls Row (Switch Roles Live + Lang + Auth) */}
          <div className="flex items-center space-x-2 w-full md:w-auto overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden py-1 justify-start md:justify-end shrink-0">
                      {/* Controller Hub Pill (Switch Roles Live) */}
            <div className="flex items-center space-x-1 bg-slate-950/80 p-1 rounded-full ring-1 ring-white/10 text-[9.5px] uppercase font-mono shrink-0">
              <span className="text-slate-500 px-1.5 select-none text-[8px] font-black">ACT AS:</span>
              {[
                { id: 'customer', label: language === 'sw' ? 'Mteja' : 'Customer' },
                { id: 'engineer', label: language === 'sw' ? 'Mhandisi' : 'Engineer' }
              ].map((role) => (
                <button
                  key={role.id}
                  onClick={() => {
                    setUserRole(role.id as UserRole);
                    localStorage.setItem('ec_user_role', role.id);
                    if (role.id === 'customer' && activeTab === 'admin') setActiveTab('find');
                  }}
                  className={`px-2.5 py-1 rounded-full transition-all text-[9px] font-black ${
                    userRole === role.id 
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold shadow' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {role.label}
                </button>
              ))}
            </div>

            {/* Lang switcher toggler */}
            <button
              onClick={() => {
                const stepL = language === 'en' ? 'sw' : 'en';
                setLanguage(stepL);
                localStorage.setItem('ec_user_language', stepL);
              }}
              className="flex items-center space-x-1.5 text-slate-350 hover:text-white transition px-2.5 py-1.5 rounded-full bg-slate-800 border border-white/5 text-[9.5px] font-mono font-bold shrink-0 uppercase"
            >
              <Globe className="w-3 h-3 text-yellow-405" />
              <span>{language === 'en' ? 'SW' : 'EN'}</span>
            </button>

            {/* Auth section */}
            {userProfile ? (
              <div className="flex items-center space-x-2 shrink-0">
                <div className="text-right hidden sm:block">
                  <p className="font-bold text-white text-[10px] leading-tight max-w-[90px] truncate">{userProfile.name}</p>
                </div>
                <button
                  onClick={logout}
                  className="px-2.5 py-1.5 rounded-full bg-slate-800 border border-white/5 text-rose-450 hover:text-rose-400 text-[9.5px] font-mono tracking-wider transition-all font-bold uppercase shrink-0"
                >
                  {language === 'sw' ? 'Ondoka' : 'Sign Out'}
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setAuthMode('login');
                  setShowAuthModal(true);
                }}
                className="px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:brightness-110 text-slate-950 font-black text-[9.5px] font-mono uppercase tracking-wider transition shadow-lg shrink-0"
              >
                🔑 {language === 'sw' ? 'Ingia' : 'Sign In'}
              </button>
            )}

          </div>

        </div>
      </header>

      {/* Main Tab Navigator (Customer role oriented) */}
      <div className="bg-slate-900 border-b border-white/5 py-1">
        <div className="max-w-7xl mx-auto px-4 flex overflow-x-auto space-x-2 scrolls-custom select-none">
          {userRole !== 'admin' && (
            <>
              <button
                onClick={() => setActiveTab('find')}
                className={`px-4 py-2 text-xs font-bold font-mono tracking-wide transition rounded-md ${
                  activeTab === 'find' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                🔍 {language === 'sw' ? 'Tafuta Fundi' : 'Find Engineer'}
              </button>
              <button
                onClick={() => setActiveTab('requests')}
                className={`px-4 py-2 text-xs font-bold font-mono tracking-wide transition rounded-md ${
                  activeTab === 'requests' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                💼 {language === 'sw' ? 'Kazi Zangu' : 'Active Contracts'} ({requests.length})
              </button>
              <button
                onClick={() => setActiveTab('emergency')}
                className={`px-4 py-2 text-xs font-bold text-rose-400 font-mono tracking-wide transition rounded-md ${
                  activeTab === 'emergency' ? 'bg-rose-550/20 text-rose-300' : 'hover:text-rose-300'
                }`}
              >
                🚨 {language === 'sw' ? 'SOS Dharura' : 'SOS Emergency'}
              </button>
              <button
                onClick={() => setActiveTab('equipment')}
                className={`px-4 py-2 text-xs font-bold font-mono tracking-wide transition rounded-md ${
                  activeTab === 'equipment' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                ⚙️ {language === 'sw' ? 'Sajili Mitambo' : 'Equipments Log'}
              </button>
            </>
          )}

          {userRole === 'admin' && (
            <span className="p-2 py-2 text-[11px] text-yellow-405 font-bold font-mono tracking-wider">
              🛡️ ADMINISTRATOR PLATFORM AUDITING PROTOCOL
            </span>
          )}
        </div>
      </div>

      {/* Main Body Grid */}
      <main className="flex-grow max-w-7xl mx-auto w-full p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 pb-24">
        
        {/* Left Interactive Panel */}
        <div className="lg:col-span-8 space-y-6">
          {userRole === 'admin' ? (
            <AdminPanel
              language={language}
              engineers={engineers}
              onToggleVerifyEngineer={handleToggleVerifyEngineer}
              complaints={complaints}
              onResolveComplaint={handleResolveComplaint}
              transactions={transactions}
            />
          ) : (
            <>
              {/* Find/Map section */}
              {activeTab === 'find' && (
                <div className="space-y-6" id="find-view-stage">
                  
                  {/* Home Sub-Navigator Sub-tabs */}
                  <div className="flex border-b border-white/5 pb-1 gap-4 overflow-x-auto scroller-hidden">
                    <button
                      onClick={() => setHomeSubTab('feed')}
                      className={`pb-2.5 text-sm font-bold transition-all relative whitespace-nowrap ${
                        homeSubTab === 'feed'
                          ? 'text-emerald-400 border-b-2 border-emerald-500'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      📸 {language === 'sw' ? 'Kazi Zilizokamilika (Work Feed)' : 'Completed Work Feed'}
                    </button>
                    <button
                      onClick={() => setHomeSubTab('jobs')}
                      className={`pb-2.5 text-sm font-bold transition-all relative whitespace-nowrap ${
                        homeSubTab === 'jobs'
                          ? 'text-emerald-400 border-b-2 border-emerald-500'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      💼 {language === 'sw' ? 'Kazi za Wateja & Zabuni' : 'Client Bidding Board'}
                    </button>
                    <button
                      onClick={() => setHomeSubTab('directory')}
                      className={`pb-2.5 text-sm font-bold transition-all relative whitespace-nowrap ${
                        homeSubTab === 'directory'
                          ? 'text-emerald-400 border-b-2 border-emerald-500'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      👥 {language === 'sw' ? 'Wataalamu Walioidhinishwa' : 'Certified Specialists'}
                    </button>
                  </div>

                  {/* Category filters */}
                  <div className="flex flex-wrap gap-2 max-h-36 overflow-y-auto p-1 bg-slate-950/20 rounded-xl">
                    {['All', 'Electrical', 'Mechanical', 'Civil', 'Biomedical', 'Solar', 'Automation', 'HVAC', 'Maintenance', 'Chemical', 'Mining', 'Agricultural', 'Telecom & ICT', 'Water Resources', 'Marine', 'Geotechnical', 'Environmental'].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat as Category | 'All')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                          selectedCategory === cat 
                            ? 'bg-emerald-500 text-slate-950 border-emerald-450 font-bold shadow' 
                            : 'bg-slate-900 text-slate-350 border-white/5 hover:border-white/10'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Search input - shared between feed and directory */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-grow">
                      <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={
                          homeSubTab === 'feed'
                            ? (language === 'sw' ? 'Tafuta kazi kwa eneo, neno au jina la mhandisi...' : 'Search completed jobs by location, keyword or engineer...')
                            : homeSubTab === 'jobs'
                            ? (language === 'sw' ? 'Tafuta kazi za wateja kwa mkoa, bajeti au hitilafu...' : 'Search active client jobs by location, budget, or trouble...')
                            : t.searchPlaceholder
                        }
                        className="w-full bg-slate-900 border border-white/10 text-slate-100 rounded-xl py-2.5 pl-10 pr-4 text-xs focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  {/* SUB-TAB A: SOCIAL MEDIA WORK FEED */}
                  {homeSubTab === 'feed' && (
                    <div className="space-y-6">
                      
                      {/* Creator Banner for Engineers to Post Work */}
                      <div className="p-4 rounded-xl bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-emerald-500/10 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="p-1.5 rounded bg-emerald-500/10 text-emerald-400">
                              <Sparkles className="w-4 h-4" />
                            </div>
                            <div>
                              <h4 className="font-bold text-slate-200 text-xs">
                                {language === 'sw' ? 'Mhandisi? Tangaza Kazi Yako Hapa' : 'Are you an Engineer? Showcase Completed Work'}
                              </h4>
                              <p className="text-[10px] text-slate-500">
                                {language === 'sw' ? 'Weka picha za mradi wako uliokamilika ili kuvutia wateja zaidi Tanzania.' : 'Post real case studies to show practical execution & attract premium clients.'}
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              if (userRole !== 'engineer') {
                                setAuthMode('register');
                                setRegRole('engineer');
                                setShowAuthModal(true);
                              } else {
                                setShowCreatePostForm(!showCreatePostForm);
                              }
                            }}
                            className="p-1 px-3 rounded-lg bg-emerald-500 hover:bg-emerald-450 text-slate-950 font-extrabold text-[11px] transition shadow"
                          >
                            {showCreatePostForm ? (language === 'sw' ? 'Funga' : 'Cancel') : (language === 'sw' ? '📢 Tangaza Kazi' : '📢 Post Work')}
                          </button>
                        </div>

                        {/* Interactive Post creation form */}
                        {showCreatePostForm && (
                          <form onSubmit={handleCreatePost} className="pt-3 border-t border-white/5 space-y-4 animate-fade-in text-xs">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div className="space-y-1">
                                <label className="text-[10px] uppercase font-mono text-slate-400">Project Title / Jina la Mradi</label>
                                <input
                                  type="text"
                                  required
                                  placeholder="e.g., 20kVA Auto Switchover generator at Morogoro Complex"
                                  value={postTitle}
                                  onChange={(e) => setPostTitle(e.target.value)}
                                  className="w-full bg-slate-950 border border-white/10 text-slate-150 rounded-lg p-2 focus:outline-none focus:border-emerald-500 text-xs"
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="text-[10px] uppercase font-mono text-slate-400">Location / Mkoa na Eneo</label>
                                <input
                                  type="text"
                                  placeholder="e.g., Morogoro Mjini"
                                  value={postLocation}
                                  onChange={(e) => setPostLocation(e.target.value)}
                                  className="w-full bg-slate-950 border border-white/10 text-slate-150 rounded-lg p-2 focus:outline-none focus:border-emerald-500 text-xs"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div className="space-y-1">
                                <label className="text-[10px] uppercase font-mono text-slate-400">Category / Kitengo</label>
                                <select
                                  value={postCategory}
                                  onChange={(e) => setPostCategory(e.target.value as Category)}
                                  className="w-full bg-slate-950 border border-white/10 text-slate-150 rounded-lg p-2 focus:outline-none focus:border-emerald-500 text-xs"
                                >
                                  {['Electrical', 'Mechanical', 'Civil', 'Biomedical', 'Solar', 'Automation', 'HVAC', 'Maintenance', 'Chemical', 'Mining', 'Agricultural', 'Telecom & ICT', 'Water Resources', 'Marine', 'Geotechnical', 'Environmental'].map((cat) => (
                                    <option key={cat} value={cat}>{cat}</option>
                                  ))}
                                </select>
                              </div>
                              <div className="space-y-1">
                                <label className="text-[10px] uppercase font-mono text-slate-400">Showcase Media / Picha au Video ya Mradi</label>
                                <div className="flex gap-1.5 mb-2">
                                  {[
                                    { id: 'preset', label: language === 'sw' ? 'Mifano (Presets)' : 'Presets' },
                                    { id: 'file', label: language === 'sw' ? 'Weka File (Upload)' : 'Upload File' },
                                    { id: 'link', label: language === 'sw' ? 'Weka Link (URL)' : 'Media URL' }
                                  ].map((mode) => (
                                    <button
                                      type="button"
                                      key={mode.id}
                                      onClick={() => setPostUploadType(mode.id as 'preset' | 'file' | 'link')}
                                      className={`px-2.5 py-0.5 text-[9px] font-bold rounded-md transition-all ${
                                        postUploadType === mode.id
                                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-extrabold'
                                          : 'bg-slate-950 text-slate-400 border border-white/5 hover:text-slate-200'
                                      }`}
                                    >
                                      {mode.label}
                                    </button>
                                  ))}
                                </div>

                                {postUploadType === 'preset' && (
                                  <div className="grid grid-cols-5 gap-1">
                                    {[
                                      { id: 'solar', label: '☀️ Solar', url: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&auto=format&fit=crop&q=80' },
                                      { id: 'electrical', label: '🔌 Circuit', url: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&auto=format&fit=crop&q=80' },
                                      { id: 'foundation', label: '🧱 Concrete', url: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?w=600&auto=format&fit=crop&q=80' },
                                      { id: 'medical', label: '🏥 ICU Unit', url: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&auto=format&fit=crop&q=80' },
                                      { id: 'turbine', label: '⚙️ Machine', url: 'https://images.unsplash.com/photo-1537462715879-360eeb61a0bc?w=600&auto=format&fit=crop&q=80' }
                                    ].map((preset) => (
                                      <button
                                        type="button"
                                        key={preset.id}
                                        onClick={() => setPostImagePreset(preset.url)}
                                        className={`px-1 py-1 bg-slate-950 border text-[9px] rounded-md transition text-center truncate ${
                                          postImagePreset === preset.url
                                            ? 'border-emerald-500 text-emerald-400 font-extrabold bg-slate-900'
                                            : 'border-white/5 text-slate-400 hover:text-slate-200'
                                        }`}
                                      >
                                        {preset.label}
                                      </button>
                                    ))}
                                  </div>
                                )}

                                {postUploadType === 'file' && (
                                  <div 
                                    onDragOver={(e) => { e.preventDefault(); setIsDragActive(true); }}
                                    onDragLeave={() => setIsDragActive(false)}
                                    onDrop={(e) => {
                                      e.preventDefault();
                                      setIsDragActive(false);
                                      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                                        handlePostFileSelect(e.dataTransfer.files[0]);
                                      }
                                    }}
                                    className={`relative p-2.5 rounded-lg border border-dashed text-center transition-all ${
                                      isDragActive ? 'border-emerald-500 bg-emerald-500/5' : 'border-white/10 bg-slate-950'
                                    }`}
                                  >
                                    <input 
                                      type="file" 
                                      id="post-file-element"
                                      accept="image/*,video/*"
                                      className="hidden" 
                                      onChange={(e) => {
                                        if (e.target.files && e.target.files[0]) {
                                          handlePostFileSelect(e.target.files[0]);
                                        }
                                      }}
                                    />
                                    <label htmlFor="post-file-element" className="cursor-pointer flex flex-col items-center justify-center space-y-1 py-0.5">
                                      {postCustomFileBase64 ? (
                                        <div className="flex flex-col items-center space-y-1">
                                          {postUploadedMediaType === 'video' ? (
                                            <Film className="w-5 h-5 text-emerald-400 animate-pulse" />
                                          ) : (
                                            <ImageIcon className="w-5 h-5 text-emerald-400 animate-pulse" />
                                          )}
                                          <p className="text-[9px] text-emerald-400 font-bold max-w-[160px] truncate">{postCustomFileName}</p>
                                          <p className="text-[7.5px] text-slate-500">{(postCustomFileBase64.length * 0.75 / 1024 / 1024).toFixed(1)} MB • Click to replace</p>
                                        </div>
                                      ) : (
                                        <>
                                          <div className="flex items-center space-x-1 justify-center text-slate-450 hover:text-white transition">
                                            <Paperclip className="w-3.5 h-3.5 text-slate-500" />
                                            <span className="text-[9px] font-bold">{language === 'sw' ? 'Chagua Picha/Video au Buruta' : 'Choose Photo/Video or Drag & Drop'}</span>
                                          </div>
                                          <p className="text-[8px] text-slate-500">PNG, JPG, MP4, WebM (Click to browse)</p>
                                        </>
                                      )}
                                    </label>
                                  </div>
                                )}

                                {postUploadType === 'link' && (
                                  <div className="space-y-1">
                                    <input
                                      type="url"
                                      placeholder="https://example.com/project_video.mp4"
                                      value={postCustomLink}
                                      onChange={(e) => setPostCustomLink(e.target.value)}
                                      className="w-full bg-slate-950 border border-white/10 text-slate-150 rounded-lg p-1.5 focus:outline-none focus:border-emerald-500 text-[11px]"
                                    />
                                    <p className="text-[8px] text-slate-500 italic leading-none">
                                      💡 {language === 'sw' ? 'Inacheza video ikiwa kiungo kinaishia na .mp4, .webm n.k.' : 'Plays as video if the URL ends with .mp4 or contains video.'}
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="space-y-3">
                              <div className="space-y-1">
                                <label className="text-[10px] uppercase font-mono text-slate-400">Work Execution Summary (English)</label>
                                <textarea
                                  required
                                  rows={2}
                                  placeholder="Describe what challenge you solved, what materials were used, and the final stability output..."
                                  value={postDescEn}
                                  onChange={(e) => setPostDescEn(e.target.value)}
                                  className="w-full bg-slate-950 border border-white/10 text-slate-150 rounded-lg p-2 focus:outline-none focus:border-emerald-500 text-xs"
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="text-[10px] uppercase font-mono text-slate-400">Maelezo ya Kazi Swahili (Optional)</label>
                                <textarea
                                  rows={2}
                                  placeholder="Elezea kwa muhtasari jinsi ulivyotatua tatizo hili ili wateja waelewe kwa haraka..."
                                  value={postDescSw}
                                  onChange={(e) => setPostDescSw(e.target.value)}
                                  className="w-full bg-slate-950 border border-white/10 text-slate-150 rounded-lg p-2 focus:outline-none focus:border-emerald-500 text-xs"
                                />
                              </div>
                            </div>

                            <div className="flex justify-end gap-2 pt-1">
                              <button
                                type="submit"
                                className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-450 text-slate-950 font-black shadow transition text-xs"
                              >
                                🚀 {language === 'sw' ? 'Tangaza Kazi Feed Sasa' : 'Publish to Feed Now'}
                              </button>
                            </div>
                          </form>
                        )}
                      </div>

                      {/* Filtered Posts Feed */}
                      <div className="space-y-6">
                        {filteredPosts.length === 0 ? (
                          <div className="p-12 text-center text-slate-500 border border-white/5 border-dashed rounded-xl font-mono text-xs">
                            No social showcases match the active filters. Try resetting search parameters.
                          </div>
                        ) : (
                          filteredPosts.map((post) => {
                            // Find the respective engineer object
                            const eng = engineers.find(e => e.id === post.engineerId) || engineers[0];
                            const isLiked = post.likedByUser;
                            
                            // Category color styling
                            const catStyle = {
                              'Electrical': 'text-amber-400 bg-amber-500/10 border-amber-500/20',
                              'Mechanical': 'text-blue-400 bg-blue-500/10 border-blue-500/20',
                              'Civil': 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
                              'Biomedical': 'text-purple-400 bg-purple-500/10 border-purple-500/20',
                              'Solar': 'text-orange-400 bg-orange-500/10 border-orange-500/20',
                              'Automation': 'text-pink-400 bg-pink-500/10 border-pink-500/20',
                              'HVAC': 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
                              'Maintenance': 'text-rose-400 bg-rose-500/10 border-rose-500/20',
                              'Chemical': 'text-teal-400 bg-teal-500/10 border-teal-500/20',
                              'Mining': 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20',
                              'Agricultural': 'text-lime-400 bg-lime-500/10 border-lime-500/20',
                              'Telecom & ICT': 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
                              'Water Resources': 'text-sky-400 bg-sky-500/10 border-sky-500/20',
                              'Marine': 'text-violet-400 bg-violet-500/10 border-violet-500/20',
                              'Geotechnical': 'text-amber-600 bg-amber-650/10 border-amber-652/20',
                              'Environmental': 'text-green-400 bg-green-500/10 border-green-500/20'
                            }[post.engineerCategory] || 'text-slate-400 bg-slate-500/10 border-slate-500/20';

                            return (
                              <div key={post.id} className="p-5 rounded-2xl bg-slate-900 border border-white/5 space-y-4 shadow-xl">
                                
                                {/* Post Author Header */}
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-3">
                                    <button 
                                      onClick={() => {
                                        // Highlight directories for this engineer's profile
                                        setSelectedCategory('All');
                                        setSearchQuery(post.engineerName);
                                        setHomeSubTab('directory');
                                        const el = document.getElementById("find-view-stage");
                                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                                      }}
                                      className="text-left flex items-center space-x-2.5 group"
                                      title="View Professional Profile"
                                    >
                                      <img
                                        src={post.engineerAvatar}
                                        alt={post.engineerName}
                                        referrerPolicy="no-referrer"
                                        className="w-10 h-10 rounded-full object-cover border border-emerald-500/20 ring-2 ring-emerald-500/5 group-hover:scale-105 transition"
                                      />
                                      <div>
                                        <h4 className="font-extrabold text-slate-100 text-xs flex items-center gap-1 group-hover:text-emerald-400 transition">
                                          <span>{post.engineerName}</span>
                                          <span className="p-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-mono text-[9px] font-black" title="Verified Specialist">✓ Verified</span>
                                        </h4>
                                        <p className="text-[10px] text-slate-500 flex items-center gap-1">
                                          <span>📍 {post.location}</span>
                                          <span>•</span>
                                          <span>{post.date}</span>
                                        </p>
                                      </div>
                                    </button>
                                  </div>

                                  <div className="flex items-center space-x-2">
                                    <span className={`px-2 py-1 rounded text-[9.5px] font-bold border ${catStyle}`}>
                                      {post.engineerCategory}
                                    </span>
                                  </div>
                                </div>

                                {/* Post Image/Video Showcase Frame */}
                                <div className="relative overflow-hidden rounded-xl border border-white/5 aspect-video bg-slate-950">
                                  {post.mediaType === 'video' || post.videoUrl ? (
                                    <video 
                                      src={post.videoUrl} 
                                      controls
                                      playsInline
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <img 
                                      src={post.imageUrl} 
                                      alt={post.title} 
                                      referrerPolicy="no-referrer"
                                      className="w-full h-full object-cover hover:scale-105 transition duration-500"
                                    />
                                  )}
                                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent p-4 flex flex-col justify-end pointer-events-none">
                                    <h3 className="font-black text-slate-100 text-sm leading-snug drop-shadow-md">
                                      {post.title}
                                    </h3>
                                  </div>
                                </div>

                                {/* Post Case Study Body Description */}
                                <div className="space-y-1 bg-slate-950/30 p-3 rounded-lg border border-white/5">
                                  <p className="text-slate-200 text-xs leading-relaxed font-sans">
                                    {language === 'sw' ? post.descriptionSwahili : post.description}
                                  </p>
                                </div>

                                {/* Social Interactions Line */}
                                <div className="flex items-center justify-between border-t border-b border-white/5 py-2">
                                  <div className="flex items-center space-x-4">
                                    <button
                                      onClick={() => handleLikePost(post.id)}
                                      className="flex items-center space-x-2 text-slate-400 hover:text-rose-400 transition text-[11px] font-bold font-mono group"
                                      id={`btn-like-${post.id}`}
                                    >
                                      <span className={`text-sm transition group-hover:scale-125 ${isLiked ? 'text-rose-500 scale-110 animate-bounce' : ''}`}>
                                        {isLiked ? '❤️' : '🤍'}
                                      </span>
                                      <span className={isLiked ? 'text-rose-400 font-extrabold' : ''}>{post.likes} Likes</span>
                                    </button>
                                    
                                    <span className="text-[11px] text-slate-500 font-mono">
                                      💬 {post.comments.length} Comments
                                    </span>
                                  </div>

                                  {/* Immediate Social Direct-Hire Conversion Button */}
                                  <button
                                    onClick={() => {
                                      setSelectedEngineer(eng);
                                      setHireTitle(`Inquiry: ${post.title}`);
                                      setHireDesc(`Hello, I saw your completed showcase of "${post.title}" on the Builda Work Feed and would like to hire you for a similar engineering project in my area.`);
                                      setHireLoc(userProfile?.location || post.location);
                                      setHireUrgency('Medium');
                                      setShowHiringForm(true);
                                    }}
                                    className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-[10.5px] transition shadow flex items-center gap-1"
                                    id={`btn-hire-post-${post.id}`}
                                  >
                                    <span>⚡</span>
                                    <span>{language === 'sw' ? 'Mpe Kazi Hii' : 'Hire for Similar Job'}</span>
                                  </button>
                                </div>

                                {/* Comments commentary tree section */}
                                <div className="space-y-3 pt-1">
                                  {post.comments.length > 0 && (
                                    <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                                      {post.comments.map((comment) => (
                                        <div key={comment.id} className="p-2 py-2.5 rounded-lg bg-slate-950/60 border border-white/5 flex gap-2">
                                          <div className="text-[10px] space-y-1 flex-1">
                                            <div className="flex items-center justify-between">
                                              <span className="font-extrabold text-slate-300 flex items-center gap-1">
                                                {comment.userName}
                                                {comment.isVerifiedReply && (
                                                  <span className="bg-emerald-505 bg-emerald-500/10 text-emerald-450 border border-emerald-500/20 px-1 rounded text-[8px] uppercase tracking-wide font-mono font-bold">
                                                    Mhandisi
                                                  </span>
                                                )}
                                              </span>
                                              <span className="text-slate-550 font-mono text-[8px]">{comment.time}</span>
                                            </div>
                                            <p className="text-slate-350 text-[11px] leading-relaxed italic">
                                              "{comment.text}"
                                            </p>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  )}

                                  {/* Quick Technical/Price question Input form */}
                                  <div className="flex gap-2">
                                    <input
                                      type="text"
                                      placeholder={language === 'sw' ? "Uliza swali au omba msaada wa gharama..." : "Ask a technical or pricing question..."}
                                      value={newCommentText[post.id] || ''}
                                      onChange={(e) => setNewCommentText(prev => ({ ...prev, [post.id]: e.target.value }))}
                                      onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                          handleAddComment(post.id, newCommentText[post.id]);
                                        }
                                      }}
                                      className="flex-1 bg-slate-950/90 border border-white/10 text-slate-100 rounded-lg p-2.5 text-[11px] focus:outline-none focus:border-emerald-500"
                                    />
                                    <button
                                      onClick={() => handleAddComment(post.id, newCommentText[post.id])}
                                      className="px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition text-xs font-bold font-mono"
                                    >
                                      {language === 'sw' ? 'Tuma' : 'Send'}
                                    </button>
                                  </div>
                                </div>

                              </div>
                            );
                          })
                        )}
                      </div>

                    </div>
                  )}

                  {/* SUB-TAB C: CLIENT JOB TENDERS BOARD (BIDDING SYSTEM) */}
                  {homeSubTab === 'jobs' && (
                    <div className="space-y-6">
                      
                      {/* Creator Board Banner */}
                      <div className="p-5 rounded-2xl bg-slate-900 border border-emerald-500/10 space-y-3 shadow-xl">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="flex items-center space-x-3">
                            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
                              <Briefcase className="w-5 h-5 animate-pulse" />
                            </div>
                            <div>
                              <h4 className="font-extrabold text-slate-100 text-sm">
                                {language === 'sw' ? 'Mbao la Kazi za Wateja & Zabuni' : 'Client Job Tenders & Bidding Board'}
                              </h4>
                              <p className="text-[11px] text-slate-400">
                                {language === 'sw' ? 'Wateja wanaeleza nini wanahitaji, kisha Wahandisi wanashindana kwa zabuni zao hapa.' : 'Clients post their technical tasks, and verified specialists compete in public listings.'}
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              if (userRole === 'guest') {
                                setAuthMode('register');
                                setRegRole('customer');
                                setShowAuthModal(true);
                              } else {
                                setShowCreateJobForm(!showCreateJobForm);
                              }
                            }}
                            className="p-2 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-450 text-slate-950 font-black text-xs transition shadow flex items-center gap-1.5 self-start"
                          >
                            {showCreateJobForm ? (language === 'sw' ? 'Funga Fomu' : 'Cancel Post') : (language === 'sw' ? '📢 Tangaza Kazi / Post Job' : '📢 Post New Job Tender')}
                          </button>
                        </div>

                        {/* Interactive Client Job creation Form */}
                        {showCreateJobForm && (
                          <form onSubmit={handleCreateJob} className="pt-4 border-t border-white/5 space-y-4 animate-fade-in text-xs">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div className="space-y-1">
                                <label className="text-[10px] uppercase font-mono text-slate-400">Project Title / Hitaji la Kazi</label>
                                <input
                                  type="text"
                                  required
                                  placeholder="e.g., Hospital Autoclave Door Seal Repair & Pressure Lock Calibration"
                                  value={jobTitle}
                                  onChange={(e) => setJobTitle(e.target.value)}
                                  className="w-full bg-slate-950 border border-white/10 text-slate-150 rounded-lg p-2.5 focus:outline-none focus:border-emerald-500 text-xs"
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="text-[10px] uppercase font-mono text-slate-400">Rough Budget / Makadirio ya Bajeti (TZS)</label>
                                <input
                                  type="text"
                                  required
                                  placeholder="e.g., 650,000 TZS"
                                  value={jobBudget}
                                  onChange={(e) => setJobBudget(e.target.value)}
                                  className="w-full bg-slate-950 border border-white/10 text-slate-150 rounded-lg p-2.5 focus:outline-none focus:border-emerald-500 text-xs"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                              <div className="space-y-1">
                                <label className="text-[10px] uppercase font-mono text-slate-400">Category / Sekta Maalum</label>
                                <select
                                  value={jobCategory}
                                  onChange={(e) => setJobCategory(e.target.value as Category)}
                                  className="w-full bg-slate-950 border border-white/10 text-slate-150 rounded-lg p-2.5 focus:outline-none focus:border-emerald-500 text-xs"
                                >
                                  {['Electrical', 'Mechanical', 'Civil', 'Biomedical', 'Solar', 'Automation', 'HVAC', 'Maintenance', 'Chemical', 'Mining', 'Agricultural', 'Telecom & ICT', 'Water Resources', 'Marine', 'Geotechnical', 'Environmental'].map((cat) => (
                                    <option key={cat} value={cat}>{cat}</option>
                                  ))}
                                </select>
                              </div>
                              <div className="space-y-1">
                                <label className="text-[10px] uppercase font-mono text-slate-400">Location / Mkoa na Eneo</label>
                                <input
                                  type="text"
                                  placeholder="e.g., Sakina, Arusha"
                                  value={jobLocation}
                                  onChange={(e) => setJobLocation(e.target.value)}
                                  className="w-full bg-slate-950 border border-white/10 text-slate-150 rounded-lg p-2.5 focus:outline-none focus:border-emerald-500 text-xs"
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="text-[10px] uppercase font-mono text-slate-400">Urgency Level / Kiwango cha Haraka</label>
                                <select
                                  value={jobUrgency}
                                  onChange={(e) => setJobUrgency(e.target.value as any)}
                                  className="w-full bg-slate-950 border border-white/10 text-slate-150 rounded-lg p-2.5 focus:outline-none focus:border-emerald-500 text-xs"
                                >
                                  <option value="Low">Low (Sio ya Haraka)</option>
                                  <option value="Medium">Medium (Kawaida)</option>
                                  <option value="High">High (Haraka Sana)</option>
                                  <option value="Emergency">Emergency (Dharura Kubwa!)</option>
                                </select>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div className="space-y-1">
                                <label className="text-[10px] uppercase font-mono text-slate-400">Problem Description (English)</label>
                                <textarea
                                  required
                                  rows={3}
                                  placeholder="Detail the failure symptom, model/brand of equipment, and scope of works required..."
                                  value={jobDescEn}
                                  onChange={(e) => setJobDescEn(e.target.value)}
                                  className="w-full bg-slate-950 border border-white/10 text-slate-150 rounded-lg p-2.5 focus:outline-none focus:border-emerald-500 text-xs"
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="text-[10px] uppercase font-mono text-slate-400">Maelezo kwa Kiswahili (Optional)</label>
                                <textarea
                                  rows={3}
                                  placeholder="Elezea dalili ya tatizo, vifaa gani vimeharibika na jinsi ya kusaidiwa..."
                                  value={jobDescSw}
                                  onChange={(e) => setJobDescSw(e.target.value)}
                                  className="w-full bg-slate-950 border border-white/10 text-slate-150 rounded-lg p-2.5 focus:outline-none focus:border-emerald-500 text-xs"
                                />
                              </div>
                            </div>

                            <div className="flex justify-end pt-1">
                              <button
                                type="submit"
                                className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-450 text-slate-950 font-black shadow transition text-xs"
                              >
                                🚀 {language === 'sw' ? 'Sajili Kazi Board Sasa' : 'Broadcast Live Job Tender Now'}
                              </button>
                            </div>
                          </form>
                        )}
                      </div>

                      {/* Display Client Posted Job Listings */}
                      <div className="space-y-6">
                        {filteredJobs.length === 0 ? (
                          <div className="p-12 text-center text-slate-500 border border-white/5 border-dashed rounded-2xl font-mono text-xs">
                            No active client tenders match the selected filters.
                          </div>
                        ) : (
                          filteredJobs.map((job) => {
                            const urgencyColor = {
                              'Low': 'text-slate-400 bg-slate-500/10 border-slate-500/20',
                              'Medium': 'text-amber-400 bg-amber-500/10 border-amber-500/20',
                              'High': 'text-orange-400 bg-orange-500/10 border-orange-500/20',
                              'Emergency': 'text-red-400 bg-red-400/25 border-red-500/30 animate-pulse font-black'
                            }[job.urgency];

                            return (
                              <div key={job.id} className="p-5 rounded-2xl bg-slate-900 border border-white/5 space-y-4 shadow-xl">
                                
                                {/* Job Header */}
                                <div className="flex justify-between items-start gap-2">
                                  <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-white/10 font-bold text-slate-350 select-none text-sm">
                                      👤
                                    </div>
                                    <div>
                                      <h4 className="font-extrabold text-slate-100 text-xs flex items-center gap-1.5">
                                        <span>{job.clientName}</span>
                                        <span className="p-1 py-0.5 rounded bg-blue-500/10 text-blue-400 text-[8px] font-bold font-mono tracking-wide uppercase">Client</span>
                                      </h4>
                                      <p className="text-[10px] text-slate-500">
                                        📍 {job.location} • Posted on {job.datePosted}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="flex items-center space-x-2">
                                    <span className={`px-2 py-1 rounded text-[9px] font-mono border ${urgencyColor}`}>
                                      {job.urgency}
                                    </span>
                                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold border ${
                                      job.status === 'assigned' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                                    }`}>
                                      {job.status === 'assigned' ? '✓ ASSIGNED' : '● OPEN FOR BIDS'}
                                    </span>
                                  </div>
                                </div>

                                {/* Content block */}
                                <div className="p-4 rounded-xl bg-slate-950/60 border border-white/5 space-y-2.5">
                                  <div className="flex items-center gap-2">
                                    <span className="px-1.5 py-0.5 text-[8.5px] bg-slate-850 text-slate-400 rounded uppercase tracking-wider font-mono">
                                      {job.category}
                                    </span>
                                    <h3 className="font-black text-slate-200 text-xs sm:text-sm">
                                      {job.title}
                                    </h3>
                                  </div>

                                  <p className="text-slate-300 text-xs leading-relaxed font-sans">
                                    {language === 'sw' && job.descriptionSwahili ? job.descriptionSwahili : job.description}
                                  </p>

                                  <div className="pt-2 flex justify-between items-center text-[11px] border-t border-white/5 font-mono text-slate-400">
                                    <div>
                                      {language === 'sw' ? 'Bajeti ya Kazi:' : 'Offered Budget:'} <span className="text-emerald-450 font-black text-xs">{job.budget}</span>
                                    </div>
                                    <div>
                                      ⚡ {job.proposals.length} {job.proposals.length === 1 ? 'Bid Received' : 'Bids Received'}
                                    </div>
                                  </div>
                                </div>

                                {/* Bids / proposals competitors list */}
                                {job.proposals.length > 0 && (
                                  <div className="space-y-2.5 pt-1">
                                    <h5 className="text-[10px] uppercase font-mono tracking-wider text-slate-500">
                                      🛡️ {language === 'sw' ? 'Zabuni Kutoka kwa Wataalamu Walioidhinishwa:' : 'Verified Specialist Bids & Submissions:'}
                                    </h5>
                                    
                                    <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                                      {job.proposals.map((prop) => {
                                        return (
                                          <div key={prop.id} className={`p-3 rounded-xl border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 transition-all ${
                                            prop.isAccepted 
                                              ? 'bg-emerald-950/40 border-emerald-500/30 ring-1 ring-emerald-500/20' 
                                              : 'bg-slate-950/90 border-white/5'
                                          }`}>
                                            
                                            <div className="flex items-start space-x-2.5 flex-1">
                                              <img
                                                src={prop.engineerAvatar}
                                                alt={prop.engineerName}
                                                referrerPolicy="no-referrer"
                                                className="w-8 h-8 rounded-full object-cover"
                                              />
                                              <div className="text-[11px] space-y-1">
                                                <h6 className="font-extrabold text-slate-200 flex items-center gap-1.5 flex-wrap">
                                                  <span>{prop.engineerName}</span>
                                                  <span className="p-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-mono text-[8px] font-black">✓ Verified</span>
                                                  {prop.isAccepted && (
                                                    <span className="bg-emerald-500 text-slate-950 px-1.5 py-0.5 rounded text-[8.5px] uppercase font-bold tracking-wider">
                                                      ✓ Selected Bidder
                                                    </span>
                                                  )}
                                                </h6>
                                                <p className="text-slate-350 italic text-[10.5px]">
                                                  "{prop.comment}"
                                                </p>
                                                <p className="text-[9px] text-slate-500 font-mono">
                                                  Submitted {prop.time}
                                                </p>
                                              </div>
                                            </div>

                                            <div className="flex sm:flex-col items-end justify-between w-full sm:w-auto gap-2 border-t sm:border-t-0 border-white/5 pt-2 sm:pt-0">
                                              <div className="text-right">
                                                <span className="text-[10px] text-slate-550 font-mono uppercase block">{language === 'sw' ? 'Gharama:' : 'Proposed Fee:'}</span>
                                                <span className="text-xs text-emerald-400 font-black font-mono">{prop.bidAmount}</span>
                                              </div>

                                              {job.status !== 'assigned' && (
                                                <button
                                                  onClick={() => handleAcceptBid(job.id, prop.id)}
                                                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 transition text-[9.5px] font-black tracking-wide uppercase shadow"
                                                >
                                                  {language === 'sw' ? 'Kubali Zabuni' : 'Accept Proposal'}
                                                </button>
                                              )}
                                            </div>

                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>
                                )}

                                {/* Competitor Bidding Entry trigger/box */}
                                {job.status !== 'assigned' && (
                                  <div className="border-t border-white/5 pt-3">
                                    {biddingJobId === job.id ? (
                                      <div className="p-3 bg-slate-100 bg-slate-950 border border-emerald-500/10 rounded-xl space-y-3 animate-fade-in text-xs">
                                        <h5 className="font-bold text-slate-200 text-xs flex items-center gap-1.5">
                                          <span>✍️</span>
                                          <span>{language === 'sw' ? 'Tuma Mchanganuo wako wa Zabuni' : 'Submit your Bidding Offer & Method'}</span>
                                        </h5>

                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                                          <div className="space-y-1">
                                            <label className="text-[9px] uppercase font-mono text-slate-400">{language === 'sw' ? 'Gharama yako (TZS)' : 'Your Bid (TZS)'}</label>
                                            <input
                                              type="text"
                                              required
                                              placeholder="e.g., 1,100,000 TZS"
                                              value={bidAmount}
                                              onChange={(e) => setBidAmount(e.target.value)}
                                              className="w-full bg-slate-900 border border-white/10 text-slate-100 rounded p-2 focus:outline-none focus:border-emerald-500 text-[11px]"
                                            />
                                          </div>
                                          <div className="sm:col-span-2 space-y-1">
                                            <label className="text-[9px] uppercase font-mono text-slate-400">{language === 'sw' ? 'Maelekezo na Guarantee Yako' : 'Guarantee & Work Plan Comment'}</label>
                                            <input
                                              type="text"
                                              required
                                              placeholder="e.g., I have spare original Autoclave gaskets; will complete in 1 day with 6 months warranty."
                                              value={bidComment}
                                              onChange={(e) => setBidComment(e.target.value)}
                                              className="w-full bg-slate-900 border border-white/10 text-slate-100 rounded p-2 focus:outline-none focus:border-emerald-500 text-[11px]"
                                            />
                                          </div>
                                        </div>

                                        <div className="flex justify-end gap-2 text-[10.5px]">
                                          <button
                                            type="button"
                                            onClick={() => setBiddingJobId(null)}
                                            className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-350"
                                          >
                                            {language === 'sw' ? 'Ghairi' : 'Cancel'}
                                          </button>
                                          <button
                                            type="button"
                                            onClick={() => handlePlaceBid(job.id, bidAmount, bidComment)}
                                            className="px-4 py-1.5 rounded bg-emerald-500 hover:bg-emerald-450 text-slate-950 font-black shadow"
                                          >
                                            🚀 {language === 'sw' ? 'Tuma Sasa' : 'Publish Bid Now'}
                                          </button>
                                        </div>
                                      </div>
                                    ) : (
                                      <div className="flex justify-between items-center bg-slate-950/40 p-2.5 rounded-xl border border-white/5">
                                        <span className="text-[10px] text-slate-500 font-mono">
                                          {language === 'sw' ? 'Wete ni Mhandisi? Shindana na wenzako!' : 'Are you a Specialist? Compete for this contract!'}
                                        </span>
                                        <button
                                          onClick={() => {
                                            if (userRole !== 'engineer') {
                                              setAuthMode('register');
                                              setRegRole('engineer');
                                              setShowAuthModal(true);
                                            } else {
                                              setBiddingJobId(job.id);
                                              // Pre-fill rough competitive guess
                                              setBidAmount(job.budget);
                                              setBidComment('');
                                            }
                                          }}
                                          className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-emerald-400 hover:text-emerald-305 transition text-[11px] font-black border border-emerald-500/10 flex items-center gap-1"
                                        >
                                          <span>⚙️</span>
                                          <span>{language === 'sw' ? 'Weka Zabuni' : 'Submit Competitive Proposal'}</span>
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                )}

                              </div>
                            );
                          })
                        )}
                      </div>

                    </div>
                  )}

                  {/* SUB-TAB B: DETAILED DIRECTORY OF SPECIAlISTS (Classic layout) */}
                  {homeSubTab === 'directory' && (
                    <div className="space-y-6">
                      
                      {/* Simulated Tanzanian Interactive Map Pin Grid */}
                      <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 space-y-3 relative overflow-hidden">
                        <div className="flex items-center justify-between border-b border-white/5 pb-2">
                          <h3 className="text-xs font-bold text-slate-300 flex items-center gap-1.5 tracking-wider uppercase font-mono">
                            <MapPin className="w-4 h-4 text-emerald-400" />
                            <span>Interactive Tanzania Hub Pinboard</span>
                          </h3>
                          <span className="text-[9px] font-mono text-slate-500">Live Satellite Pin Status</span>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-center text-[10px] font-bold">
                          {[
                            { name: 'Dar es Salaam', pins: 9, coords: 'Posta, Kariakoo' },
                            { name: 'Arusha', pins: 4, coords: 'Njiro, Sakina' },
                            { name: 'Dodoma', pins: 3, coords: 'Mlimani' },
                            { name: 'Mwanza', pins: 5, coords: 'Kirumba' },
                            { name: 'Zanzibar', pins: 2, coords: 'Stone Town' }
                          ].map((hub) => (
                            <button
                              key={hub.name}
                              onClick={() => setSearchQuery(hub.name)}
                              className="p-3.5 rounded-lg bg-slate-950 border border-white/5 hover:border-emerald-500/20 text-slate-300 hover:text-emerald-300 transition flex flex-col justify-between items-center space-y-1 group"
                            >
                              <span className="text-xs">📍</span>
                              <span className="group-hover:underline text-[11px] font-extrabold">{hub.name}</span>
                              <span className="text-[9px] text-emerald-450 font-mono font-medium mt-1">({hub.pins} Online)</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Active list of engineers with portfolio detail triggers */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {filteredEngineers.length === 0 ? (
                          <div className="p-10 text-center font-mono text-slate-500 text-xs border border-dashed border-white/5 rounded-xl col-span-2">
                            No verified specialists matching query.
                          </div>
                        ) : (
                          filteredEngineers.map((eg) => (
                            <div key={eg.id} className="p-4 rounded-xl bg-slate-900 border border-white/5 space-y-4 text-xs font-sans">
                              
                              {/* Header section */}
                              <div className="flex justify-between items-start">
                                <div className="flex space-x-3.5">
                                  <img
                                    src={eg.avatar}
                                    alt={eg.name}
                                    referrerPolicy="no-referrer"
                                    className="w-11 h-11 rounded-xl object-cover ring-2 ring-emerald-500/10"
                                  />
                                  <div>
                                    <h3 className="font-extrabold text-slate-150 text-sm flex items-center gap-1.5">
                                      <span>{eg.name}</span>
                                      {eg.isVerified && <span className="p-1 px-2 rounded bg-emerald-500/10 text-emerald-400 font-mono text-[9px] font-black inline-flex items-center gap-1" title="Verified Badge">✓ Verified</span>}
                                    </h3>
                                    <p className="text-[10px] text-slate-450">{eg.category} Specialist • {eg.experienceYears} Yrs Exp</p>
                                    <p className="text-[9.5px] text-yellow-405 font-mono mt-0.5 flex items-center gap-0.5">
                                      <Star className="w-3 h-3 fill-yellow-450 stroke-none" /> {eg.rating} • {eg.completedJobs} Jobs Done
                                    </p>
                                  </div>
                                </div>

                                <span className="p-1 px-2 rounded bg-slate-850 text-emerald-400 font-mono tracking-tight font-extrabold text-[11px]" title="Standard consultancy wage">
                                  {eg.ratesPerHour}/hr
                                </span>
                              </div>

                              {/* Localization Bio */}
                              <p className="text-slate-300 text-xs leading-relaxed italic">
                                "{language === 'sw' ? eg.bioSwahili : eg.bio}"
                              </p>

                              {/* Past Projects List */}
                              <div className="space-y-2">
                                <span className="text-[9.5px] uppercase font-mono text-slate-500 tracking-wider">PROJECT PORTFOLIOS:</span>
                                <div className="grid grid-cols-2 gap-2">
                                  {eg.projects.map((proj) => (
                                    <div key={proj.id} className="p-2 py-2.5 rounded-lg bg-slate-950 border border-white/5 space-y-1">
                                      <div className="flex gap-1.5 items-center">
                                        <span className="text-xs">👷</span>
                                        <h4 className="font-bold text-[10.5px] text-slate-205 line-clamp-1">{proj.title}</h4>
                                      </div>
                                      <p className="text-[10px] text-slate-450 line-clamp-2">{proj.description}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* CTA Panel */}
                              <div className="flex space-x-2 pt-2 border-t border-white/5">
                                <button
                                  onClick={() => {
                                    setSelectedEngineer(eg);
                                    setHireTitle('');
                                    setHireDesc('');
                                    setHireLoc(userProfile?.location || 'Dar es Salaam');
                                    setShowHiringForm(true);
                                  }}
                                  className="flex-1 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-450 text-slate-950 font-extrabold shadow text-center"
                                >
                                  Initialize Service Application
                                </button>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}

                </div>
              )}

              {/* Service Hiring Application form */}
              {showHiringForm && selectedEngineer && (
                <div className="fixed inset-0 bg-slate-950/80 z-50 flex items-center justify-center p-4 backdrop-blur-md">
                  <div className="p-5 rounded-2xl bg-slate-900 border border-emerald-500/20 max-w-md w-full scroll-y-auto space-y-4 animate-fade-in text-xs">
                    <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                      <div>
                        <h3 className="font-extrabold text-sm text-slate-100 uppercase font-mono">Service Application Desk</h3>
                        <p className="text-[10px] text-slate-450 mt-0.5">Assigned: {selectedEngineer.name} ({selectedEngineer.category})</p>
                      </div>
                      <button
                        onClick={() => setShowHiringForm(false)}
                        className="p-1 hover:text-rose-450 text-slate-550 transition text-sm"
                      >
                        [✕]
                      </button>
                    </div>

                    <form onSubmit={handlePostRequest} className="space-y-4">
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-mono text-slate-400">Brief technical topic title</label>
                        <input
                          type="text"
                          required
                          value={hireTitle}
                          onChange={(e) => setHireTitle(e.target.value)}
                          placeholder="e.g. Inverter Charge Controller E03 Alarm Red Light"
                          className="w-full p-2 bg-slate-950 border border-white/10 rounded focus:border-emerald-500 font-medium text-white focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-mono text-slate-400">Detailed break symptoms description</label>
                        <textarea
                          required
                          value={hireDesc}
                          onChange={(e) => setHireDesc(e.target.value)}
                          placeholder="Enter symptoms, error codes displaying, sound registers, pipe diameters..."
                          className="w-full h-24 p-2 bg-slate-950 border border-white/10 rounded focus:border-emerald-500 font-medium text-white focus:outline-none h-24 resize-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-mono text-slate-400">Site Location Address / Mtaa na nyumba</label>
                        <input
                          type="text"
                          required
                          value={hireLoc}
                          onChange={(e) => setHireLoc(e.target.value)}
                          placeholder="e.g. ORCI Compound, postcode OR-9321"
                          className="w-full p-2 bg-slate-950 border border-white/10 rounded focus:border-emerald-500 font-medium text-white focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-mono text-slate-400">Urgency level criteria</label>
                        <select
                          value={hireUrgency}
                          onChange={(e) => setHireUrgency(e.target.value as any)}
                          className="w-full p-2 bg-slate-950 border border-white/10 rounded font-medium text-white focus:outline-none"
                        >
                          <option value="Low">Low - Cosmetic/Routine</option>
                          <option value="Medium">Medium - Standard Breakdown</option>
                          <option value="High">High - Emergency hazard potential</option>
                          <option value="Emergency">Emergency - Instant satellite dispatch requested</option>
                        </select>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 bg-emerald-500 hover:bg-emerald-450 text-slate-950 font-bold tracking-wider rounded transition"
                      >
                        Submit Binding Service Request
                      </button>
                    </form>
                  </div>
                </div>
              )}

              {/* Chat View Panel overlay if chat box requested */}
              {activeChatRequest && (
                <div className="fixed inset-0 bg-slate-950/80 z-50 flex items-center justify-center p-4 backdrop-blur-md">
                  <div className="p-4 rounded-2xl bg-slate-900 border border-emerald-500/20 max-w-lg w-full space-y-4 animate-fade-in text-xs position-relative">
                    <div className="flex justify-end">
                      <button
                        onClick={() => setActiveChatRequest(null)}
                        className="text-slate-550 hover:text-white uppercase font-mono text-[10px] tracking-widest border border-white/5 py-1 px-2.5 rounded bg-white/5"
                      >
                        ✕ Close Chat Screen
                      </button>
                    </div>
                    {/* Render Chat Component */}
                    <ChatDashboard
                      language={language}
                      chatMessages={activeChatRequest.chatHistory}
                      onSendMessage={handleSendChat}
                      partnerName={userRole === 'engineer' ? activeChatRequest.customerName : (engineers.find(e => e.id === activeChatRequest.engineerId)?.name || 'Specialist')}
                      partnerRole={userRole === 'engineer' ? 'Client' : 'Verified Specialist'}
                    />
                  </div>
                </div>
              )}

              {/* Active Contracts & Client Request Manager view */}
              {activeTab === 'requests' && (
                <div className="space-y-6" id="contracts-stage">
                  <h3 className="text-sm font-bold text-slate-300 font-mono uppercase tracking-wider">
                    {language === 'en' ? 'Active Contract Portfolio' : 'Mikataba ya Matengenezo Hai'}
                  </h3>

                  {requests.length === 0 ? (
                    <div className="p-10 text-center font-mono text-slate-500 text-xs border border-dashed border-white/5 rounded-xl">
                      No active requests filed under current system registry.
                    </div>
                  ) : (
                    <div className="space-y-4 font-sans text-xs [content-visibility:auto]">
                      {requests.map((req) => {
                        const egObj = engineers.find(e => e.id === req.engineerId);
                        
                        // Condition check for user perspectives
                        const isTechnicianSelf = userRole === 'engineer' && req.engineerId === 'eng_1'; // assuming the registered engineer represents Eng 1
                        
                        return (
                          <div key={req.id} className="p-4 rounded-xl bg-slate-900 border border-white/5 space-y-4">
                            
                            {/* request header info */}
                            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-2.5">
                              <div>
                                <span className="text-[10px] font-mono text-slate-550 uppercase">Contract ID: {req.id}</span>
                                <h4 className="font-extrabold text-white text-sm">{req.title}</h4>
                              </div>

                              <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-tight uppercase ${
                                req.status === 'pending' ? 'bg-yellow-500/10 text-yellow-400' :
                                req.status === 'accepted' ? 'bg-blue-500/10 text-blue-400' :
                                req.status === 'in_progress' ? 'bg-indigo-500/10 text-indigo-400' :
                                req.status === 'completed' ? 'bg-purple-500/15 text-purple-305' :
                                'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              }`}>
                                {req.status}
                              </span>
                            </div>

                            <p className="text-slate-300 text-xs leading-relaxed bg-slate-950/20 p-2.5 rounded text-[11.5px] border border-white/5">
                              {req.description}
                            </p>

                            {/* Client & Engineer names mapping */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-[10px] p-2 bg-slate-950/35 rounded border border-white/5 text-slate-400">
                              <span className="flex items-center gap-1">👤 Client/Applicant: <strong className="text-slate-200">{req.customerName} ({req.location})</strong></span>
                              {egObj && <span className="flex items-center gap-1">🧑‍✈️ assigned Contractor: <strong className="text-slate-200">{egObj.name} ({egObj.category})</strong></span>}
                            </div>

                            {/* CTAs */}
                            <div className="flex flex-wrap gap-2.5 items-center justify-between pt-1">
                              <div className="flex gap-2">
                                <button
                                  onClick={() => setActiveChatRequest(req)}
                                  className="py-1.5 px-3.5 rounded-lg bg-slate-800 hover:bg-slate-750 font-bold border border-white/10 flex items-center gap-1.5"
                                >
                                  <MessageSquare className="w-3.5 h-3.5" />
                                  <span>{language === 'en' ? 'Open Secured Chat' : 'Fungua Soga'} ({req.chatHistory.length})</span>
                                </button>
                              </div>

                              {/* Customer perspective payment logic */}
                              {userRole === 'customer' || userRole === 'guest' ? (
                                <div className="flex space-x-2 items-center">
                                  {req.status === 'completed' && (
                                    <button
                                      onClick={() => handleOpenPayment(req)}
                                      className="py-1.5 px-4 bg-gradient-to-r from-yellow-405 to-amber-500 text-slate-950 font-black rounded-lg shadow-md flex items-center gap-1.5 animate-pulse"
                                    >
                                      <CreditCard className="w-4 h-4" />
                                      <span>Settle Invoice ({(req.cost || 120000).toLocaleString()} TZS)</span>
                                    </button>
                                  )}
                                  {req.status === 'paid' && (
                                    <span className="text-emerald-430 text-xs font-mono font-bold flex items-center gap-1.5">
                                      <CheckCircle className="w-4 h-4 text-emerald-430" />
                                      <span>Paid under Tx ledger verification.</span>
                                    </span>
                                  )}
                                </div>
                              ) : (
                                /* Technician role controls */
                                <div className="flex gap-2.5">
                                  {req.status === 'pending' && (
                                    <button
                                      onClick={() => handleAcceptJob(req.id)}
                                      className="p-1 px-3 rounded bg-emerald-500 hover:bg-emerald-450 text-slate-950 font-bold"
                                    >
                                      Accept civic Job application
                                    </button>
                                  )}
                                  {req.status === 'accepted' && (
                                    <button
                                      onClick={() => handleUpdateStatus(req.id, 'in_progress')}
                                      className="p-1 px-3 rounded bg-teal-600 hover:bg-teal-500 text-white font-bold"
                                    >
                                      Mark Asset status "Active In-Progress"
                                    </button>
                                  )}
                                  {req.status === 'in_progress' && (
                                    <button
                                      onClick={() => handleUpdateStatus(req.id, 'completed')}
                                      className="p-1 px-3 rounded bg-purple-600 hover:bg-purple-500 text-white font-bold"
                                    >
                                      Mark Complete & Raise Settlement Invoice
                                    </button>
                                  )}
                                </div>
                              )}
                            </div>

                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}



              {/* Emergency tab */}
              {activeTab === 'emergency' && (
                <EmergencyDashboard
                  language={language}
                  onDispatchSOS={handleDispatchSOS}
                />
              )}

              {/* Equipment Planner tab */}
              {activeTab === 'equipment' && (
                <MaintenancePlanner
                  language={language}
                  engineers={engineers}
                  equipment={equipmentList}
                  onAddEquipment={handleAddEquipment}
                  onLogService={handleLogService}
                />
              )}
            </>
          )}

        </div>

        {/* Right Audit Sidebar Information */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Quick Informational block */}
          {userRole === 'admin' ? (
            <div className="p-4 rounded-xl bg-slate-900 border border-white/5 space-y-3">
              <h3 className="text-xs font-bold text-slate-300 font-mono uppercase tracking-wider border-b border-white/5 pb-2 flex items-center justify-between">
                <span>National Engineering Registry</span>
                <Building className="w-4 h-4 text-emerald-400" />
              </h3>
              
              <div className="space-y-2 text-[11px] text-slate-350 leading-relaxed font-sans">
                <p>
                  <strong>ERB Tanzania Compliance:</strong> Under the Engineers Registration Act, Cap 295, all civil, mechanical, and solar specialists must maintain valid licensing status to execute industrial public works.
                </p>
                <div className="p-2 bg-slate-950 border border-white/5 rounded text-[10px] text-yellow-300">
                  ⚠️ Platform handles random verification compliance audits on technician licensing cards automatically with the ERB satellite server.
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-slate-900 border border-white/5 space-y-3 block">
              <h3 className="text-xs font-bold text-slate-300 font-mono uppercase tracking-wider border-b border-white/5 pb-2 flex items-center justify-between">
                <span>{language === 'sw' ? 'Miongozo ya Usalama' : 'Client Connection Pledge'}</span>
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </h3>
              
              <div className="space-y-2 text-[11px] text-slate-350 leading-relaxed font-sans w-full">
                <p>
                  <strong>{language === 'sw' ? 'Wataalamu Wakomavu:' : 'Verified Excellence:'}</strong> {language === 'sw' ? 'Kila mhandisi kwenye jukwaa hili amehakikiwa kulinada misingi ya kazi.' : 'Every specialist profile with a verified badge has passed our rigorous multi-point professional vetting process.'}
                </p>
                <div className="p-2 bg-slate-950 border border-white/5 rounded text-[10px] text-emerald-450 font-mono">
                  🛡️ {language === 'sw' ? 'Malipo yote huhifadhiwa salama kwenye akaunti ya kati mpaka kazi ikamilike.' : 'All payments are protected in secure offline escrow until the service is fully completed and authorized.'}
                </div>
              </div>
            </div>
          )}

          {/* Secure Payment Gateway Simulator drawer panel */}
          {payingRequestId && (
            <div className="p-4 rounded-xl bg-slate-900 border-2 border-yellow-500/30 space-y-4 font-mono animate-fade-in text-xs position-relative">
              <div className="flex justify-end">
                <button onClick={() => setPayingRequestId(null)} className="text-[9px] hover:underline text-rose-450">[Cancel]</button>
              </div>

              <div className="space-y-1">
                <span className="text-[9px] text-slate-500">GATEWAY AGGREGATOR SIMULATOR</span>
                <h4 className="font-extrabold text-yellow-300 text-xs">Mobile Money Push Portal</h4>
              </div>

              {paymentSuccess ? (
                <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-lg text-center font-bold animate-pulse space-y-1">
                  <CheckCircle className="w-5 h-5 mx-auto" />
                  <p>Transaction Settlement Authorized!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400">Select Tanzania Money Provider</label>
                    <select
                      value={paymentProvider}
                      onChange={(e: any) => setPaymentProvider(e.target.value)}
                      className="w-full p-2 bg-slate-950 border border-white/10 rounded font-medium text-white focus:outline-none text-xs"
                    >
                      <option value="M-Pesa">M-Pesa (Vodacom)</option>
                      <option value="Tigo Pesa">Tigo Pesa</option>
                      <option value="Airtel Money">Airtel Money</option>
                      <option value="NMB/CRDB Bank">NMB/CRDB Bank Transfer</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400">Wallet Phone Identifier</label>
                    <input
                      type="tel"
                      value={paymentPhone}
                      onChange={(e) => setPaymentPhone(e.target.value)}
                      placeholder="+255 712 ..."
                      className="w-full p-2 bg-slate-950 border border-white/10 rounded font-medium text-white focus:outline-none text-xs"
                    />
                  </div>

                  <button
                    onClick={processPayment}
                    className="w-full py-2 bg-yellow-405 hover:bg-yellow-400 text-slate-950 font-black rounded transition text-center uppercase tracking-wide text-[10px]"
                  >
                    Authenticate PIN Authorization push
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Local Security Verification Stamp */}
          <div className="p-4 rounded-xl bg-slate-900 border border-white/5 space-y-2.5 text-center">
            <span className="text-xl">🛡️</span>
            <h4 className="text-[11px] font-bold text-white uppercase tracking-wider font-mono">Secured Financial Escrow Protocol</h4>
            <p className="text-[10px] text-slate-450 leading-relaxed max-w-xs mx-auto">
              Funds are kept securely locked within the platforms secure escrow node until verified technician reports completion approval criteria.
            </p>
          </div>

        </div>

      </main>

      {/* Persistent global footer credits */}
      <footer className="bg-slate-900/45 py-3.5 border-t border-white/5 text-center text-[10px] text-slate-600 font-mono">
        {userRole === 'admin' 
          ? "Platform Builda Tanzania is fully compatible with ERB caps regulation guidelines. Active CMM logs." 
          : "Secure Professional Engineering Marketplace • Builda Tanzania © 2026"}
      </footer>

      {/* Modern Interactive Authentication and Registration Overlay Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fade-in" id="auth-modal-overlay">
          <div className="relative w-full max-w-lg bg-slate-900 border border-white/10 rounded-2xl shadow-2xl p-6 md:p-8 overflow-y-auto max-h-[90vh]" id="auth-modal-content">
            
            {/* Close button */}
            <button 
              onClick={() => setShowAuthModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition p-1.5 bg-slate-950/40 rounded-full border border-white/5 font-mono text-xs w-7 h-7 flex items-center justify-center"
            >
              ✕
            </button>

            {/* Header */}
            <div className="text-center mb-6">
              <h2 className="text-xl font-black text-white tracking-tight flex items-center justify-center gap-2">
                <span>🔑</span>
                <span>{authMode === 'login' ? 'Account Authentication' : 'Create an Account'}</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                {authMode === 'login' 
                  ? 'Sign in to access your projects, bids, and administrator controls.' 
                  : 'Join the professional directory. Essential details are checked during directory listing.'}
              </p>
            </div>

            {/* Auth Tab Picker */}
            <div className="grid grid-cols-2 bg-slate-950 p-1 rounded-xl mb-6 border border-white/5">
              <button
                onClick={() => setAuthMode('login')}
                className={`py-2 text-xs font-bold font-mono transition-all rounded-lg ${
                  authMode === 'login' 
                    ? 'bg-slate-800 text-white shadow' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                🔐 {language === 'sw' ? 'Ingia Sasa' : 'Sign In'}
              </button>
              <button
                onClick={() => setAuthMode('register')}
                className={`py-2 text-xs font-bold font-mono transition-all rounded-lg ${
                  authMode === 'register' 
                    ? 'bg-slate-800 text-white shadow' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                📝 {language === 'sw' ? 'Jisajili Kazi' : 'Register Account'}
              </button>
            </div>

            {authMode === 'login' ? (
              /* ================== SIGN IN VIEW ================== */
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Email or Phone Number</label>
                  <input 
                    type="text"
                    id="signin-identity"
                    placeholder="e.g. admin@builda.co.tz or custom email"
                    className="w-full bg-slate-950 border border-white/10 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-emerald-500 placeholder-slate-600 font-medium"
                  />
                  <p className="text-[10px] text-slate-500 italic mt-0.5">
                    💡 {language === 'sw' ? 'Ingiza neno "admin" kwenye barua pepe kuingia kama msimamizi.' : 'Type "admin" anywhere in email to authenticate as Admin.'}
                  </p>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Password / verification pin</label>
                  <input 
                    type="password"
                    id="signin-password"
                    placeholder="••••••"
                    defaultValue="123456"
                    className="w-full bg-slate-950 border border-white/10 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-emerald-500 placeholder-slate-600"
                  />
                </div>

                <button
                  onClick={() => {
                    const identity = (document.getElementById('signin-identity') as HTMLInputElement)?.value.trim() || '';
                    
                    if (!identity) {
                      alert('Please enter your email or phone number to sign in.');
                      return;
                    }

                    // Determine role
                    let computedRole: UserRole = 'customer';
                    let computedName = 'User';
                    let computedLocation = 'Dar es Salaam';
                    let computedId: string | undefined = undefined;

                    if (identity.toLowerCase().includes('admin')) {
                      computedRole = 'admin';
                      computedName = 'Chief Administrator';
                      computedLocation = 'Dodoma Gov Hub';
                    } else if (identity.toLowerCase().includes('amina') || identity.toLowerCase().includes('eng_') || identity.toLowerCase().includes('mhandisi') || identity.toLowerCase().includes('shehe')) {
                      computedRole = 'engineer';
                      const matchesEng = engineers.find(e => e.email.toLowerCase().includes(identity.toLowerCase()) || e.name.toLowerCase().includes(identity.toLowerCase()));
                      computedName = matchesEng ? matchesEng.name : 'Eng. Amina Shehe';
                      computedLocation = matchesEng ? matchesEng.location : 'Mwanza';
                      computedId = matchesEng ? matchesEng.id : 'eng_1';
                    } else {
                      // Look into engineers as well in case they registered
                      const matchesEng = engineers.find(e => e.email.toLowerCase() === identity.toLowerCase() || e.phone === identity);
                      if (matchesEng) {
                        computedRole = 'engineer';
                        computedName = matchesEng.name;
                        computedLocation = matchesEng.location;
                        computedId = matchesEng.id;
                      } else {
                        computedRole = 'customer';
                        computedName = identity.split('@')[0];
                        computedLocation = 'Dar es Salaam';
                      }
                    }

                    const newProf = { name: computedName, phone: '+255 712 000 000', email: identity, location: computedLocation, engineerId: computedId };
                    setUserProfile(newProf);
                    setUserRole(computedRole);
                    localStorage.setItem('ec_user_profile', JSON.stringify(newProf));
                    localStorage.setItem('ec_user_role', computedRole);
                    setShowAuthModal(false);
                    if (computedRole === 'admin') setActiveTab('admin');
                  }}
                  className="w-full mt-2 py-3 bg-gradient-to-r from-emerald-500 to-teal-550 text-slate-950 font-extrabold rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg hover:brightness-110 active:scale-98"
                >
                  Authenticate Profile Check
                </button>

                {/* Quick-test accounts list */}
                <div className="pt-4 border-t border-white/5 space-y-2">
                  <p className="text-[10px] uppercase font-mono tracking-wider text-slate-450 text-center">Click to immediately sign in as simulation profile:</p>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => {
                        const newProf = { name: 'Mwanza General Hospital', phone: '+255 655 432 109', email: 'hospital@clinic.co.tz', location: 'Mwanza' };
                        setUserProfile(newProf);
                        setUserRole('customer');
                        localStorage.setItem('ec_user_profile', JSON.stringify(newProf));
                        localStorage.setItem('ec_user_role', 'customer');
                        setShowAuthModal(false);
                        setActiveTab('find');
                      }}
                      className="p-2 py-2.5 rounded bg-slate-950 border border-white/5 hover:border-emerald-500/20 text-center text-[10px] text-slate-300 hover:text-white transition"
                    >
                      🏫 Client Demo
                    </button>
                    <button
                      onClick={() => {
                        const newProf = { name: 'Eng. Amina Shehe', phone: '+255 765 990 120', email: 'amina.shehe@engineerconnect.co.tz', location: 'Mwanza', engineerId: 'eng_1' };
                        setUserProfile(newProf);
                        setUserRole('engineer');
                        localStorage.setItem('ec_user_profile', JSON.stringify(newProf));
                        localStorage.setItem('ec_user_role', 'engineer');
                        setShowAuthModal(false);
                        setActiveTab('find');
                      }}
                      className="p-2 py-2.5 rounded bg-slate-950 border border-white/5 hover:border-yellow-500/20 text-center text-[10px] text-slate-300 hover:text-white transition"
                    >
                      🛠️ Engineer Demo
                    </button>
                    <button
                      onClick={() => {
                        const newProf = { name: 'Chief Administrator', phone: '+255 222 333 444', email: 'admin@engineerconnect.co.tz', location: 'Dar es Salaam' };
                        setUserProfile(newProf);
                        setUserRole('admin');
                        localStorage.setItem('ec_user_profile', JSON.stringify(newProf));
                        localStorage.setItem('ec_user_role', 'admin');
                        setShowAuthModal(false);
                        setActiveTab('admin');
                      }}
                      className="p-2 py-2.5 rounded bg-slate-950 border border-white/5 hover:border-blue-500/20 text-center text-[10px] text-slate-300 hover:text-white transition"
                    >
                      🛡️ Admin Demo
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* ================== SIGN UP (REGISTER) VIEW ================== */
              <div className="space-y-4">
                
                {/* Register Role Picker */}
                <div className="flex gap-4 p-1 bg-slate-950 rounded-lg border border-white/5 text-xs font-medium">
                  <button
                    type="button"
                    onClick={() => setRegRole('customer')}
                    className={`flex-1 py-1.5 text-center rounded transition-all ${
                      regRole === 'customer' 
                        ? 'bg-slate-800 text-white font-bold' 
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    🙋 {language === 'sw' ? 'Mimi ni Mteja' : 'I am a Client'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setRegRole('engineer')}
                    className={`flex-1 py-1.5 text-center rounded transition-all ${
                      regRole === 'engineer' 
                        ? 'bg-slate-800 text-white font-bold' 
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    🛠️ {language === 'sw' ? 'Mimi ni Mtaalamu' : 'I am a Specialist'}
                  </button>
                </div>

                <form onSubmit={(e) => {
                  e.preventDefault();
                  if (!regName || !regEmail || !regPhone) {
                    alert('Please fill out Name, Email, and Phone fields.');
                    return;
                  }

                  if (regRole === 'engineer') {
                    // Create a brand new Engineer profile in our directory
                    const newEngId = `eng_reg_${Date.now()}`;
                    const newEng: Engineer = {
                      id: newEngId,
                      name: regName,
                      email: regEmail,
                      phone: regPhone,
                      category: regCategory,
                      location: regLocation,
                      rating: 5.0,
                      experienceYears: Number(regExperience) || 1,
                      bio: regBio || 'Registered service specialist in engineering works.',
                      bioSwahili: regBio || '',
                      ratesPerHour: '35,000 TZS/hr',
                      isVerified: false, // Starts as unverified! Admins will verify them in their separate audit panel
                      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
                      projects: [],
                      certifications: regCertifications ? regCertifications.split(',').map(s => s.trim()) : ['Tanzania Professional Board Candidate'],
                      completedJobs: 0
                    };

                    // Add to engineers state & save
                    const updatedEngineers = [newEng, ...engineers];
                    setEngineers(updatedEngineers);
                    localStorage.setItem('ec_engineers', JSON.stringify(updatedEngineers));

                    const activeProf = {
                      name: regName,
                      phone: regPhone,
                      email: regEmail,
                      location: regLocation,
                      engineerId: newEngId
                    };

                    setUserProfile(activeProf);
                    setUserRole('engineer');
                    localStorage.setItem('ec_user_profile', JSON.stringify(activeProf));
                    localStorage.setItem('ec_user_role', 'engineer');

                    alert(language === 'sw' 
                      ? 'Umefanikiwa kusajiliwa kama Mtaalamu! Akaunti yako itakuwa Chini ya Uthibitishaji Mpaka Msimamizi atakapokagua nyaraka zako.' 
                      : 'You registered successfully as a Specialist! Your profile starts unverified until an Admin verifies your credentials in the administrator portal.');
                  } else {
                    // Register as customer
                    const activeProf = {
                      name: regName,
                      phone: regPhone,
                      email: regEmail,
                      location: regLocation
                    };

                    setUserProfile(activeProf);
                    setUserRole('customer');
                    localStorage.setItem('ec_user_profile', JSON.stringify(activeProf));
                    localStorage.setItem('ec_user_role', 'customer');

                    alert(language === 'sw' 
                      ? 'Sajili yako imekamilika kikamilifu!' 
                      : 'Client Registration Completed Successfully!');
                  }

                  // Clean inputs & close
                  setRegName('');
                  setRegEmail('');
                  setRegPhone('');
                  setRegCertifications('');
                  setRegBio('');
                  setShowAuthModal(false);
                  setActiveTab('find');
                }} className="space-y-3.5">
                  
                  {/* Essential Info fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono uppercase text-slate-400">Full Name</label>
                      <input 
                        type="text" 
                        required
                        value={regName}
                        onChange={(e) => setRegName(e.target.value)}
                        placeholder="e.g. Yohana Massero"
                        className="w-full bg-slate-950 border border-white/10 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 placeholder-slate-700 font-medium"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono uppercase text-slate-400">Email Address</label>
                      <input 
                        type="email" 
                        required
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        placeholder="e.g. yohana@gmail.com"
                        className="w-full bg-slate-950 border border-white/10 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 placeholder-slate-700 font-medium"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono uppercase text-slate-400">Phone Number</label>
                      <input 
                        type="tel" 
                        required
                        value={regPhone}
                        onChange={(e) => setRegPhone(e.target.value)}
                        placeholder="e.g. +255 712 111 222"
                        className="w-full bg-slate-950 border border-white/10 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 placeholder-slate-700 font-medium"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono uppercase text-slate-400">Primary Station Region</label>
                      <select 
                        value={regLocation}
                        onChange={(e) => setRegLocation(e.target.value)}
                        className="w-full bg-slate-950 border border-white/10 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 font-medium"
                      >
                        <option value="Dar es Salaam">Dar es Salaam</option>
                        <option value="Mwanza">Mwanza</option>
                        <option value="Arusha">Arusha</option>
                        <option value="Dodoma">Dodoma</option>
                        <option value="Mbeya">Mbeya</option>
                        <option value="Zanzibar">Zanzibar</option>
                        <option value="Morogoro">Morogoro</option>
                      </select>
                    </div>
                  </div>

                  {/* Specialist detailed parameters */}
                  {regRole === 'engineer' && (
                    <div className="space-y-3 p-3 bg-slate-950/60 rounded-xl border border-white/5 animate-fade-in text-xs">
                      <div className="grid grid-cols-2 gap-35">
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono uppercase text-slate-400">Engineering Specialty</label>
                          <select
                            value={regCategory}
                            onChange={(e) => setRegCategory(e.target.value as Category)}
                            className="w-full bg-slate-950 border border-white/10 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                          >
                            {['Electrical', 'Mechanical', 'Civil', 'Biomedical', 'Solar', 'Automation', 'HVAC', 'Maintenance', 'Chemical', 'Mining', 'Agricultural', 'Telecom & ICT', 'Water Resources', 'Marine', 'Geotechnical', 'Environmental'].map((cat) => (
                              <option key={cat} value={cat}>{cat}</option>
                            ))}
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-mono uppercase text-slate-400">Years of Experience</label>
                          <input 
                            type="number" 
                            min="1"
                            max="50"
                            required
                            value={regExperience}
                            onChange={(e) => setRegExperience(e.target.value)}
                            className="w-full bg-slate-950 border border-white/10 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-emerald-500 font-medium text-center"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-mono uppercase text-slate-400">Submtted Certificate कॉपी / Titles list</label>
                        <input 
                          type="text" 
                          value={regCertifications}
                          onChange={(e) => setRegCertifications(e.target.value)}
                          placeholder="e.g. B.Sc. Electrical Engineering (UDSM), Solar Installation License B"
                          className="w-full bg-slate-950 border border-white/10 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 placeholder-slate-700 font-medium"
                        />
                        <p className="text-[9px] text-slate-500">Provide comma-separated listings of certificates for administrative verification.</p>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-mono uppercase text-slate-400">Personal Tagline & Biography Summary</label>
                        <textarea
                          rows={2}
                          value={regBio}
                          onChange={(e) => setRegBio(e.target.value)}
                          placeholder="Introduce your special calibration tools or technical repair achievements..."
                          className="w-full bg-slate-950 border border-white/10 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-emerald-500 placeholder-slate-700 resize-none font-medium"
                        />
                      </div>

                      <div className="p-2 border border-dashed border-white/10 bg-slate-900 rounded flex items-center justify-between text-[10px] font-mono text-slate-400">
                        <span>📁 Attach Scanned PDF Degrees copy:</span>
                        <span className="text-emerald-450 font-bold">✓ credentials_verified.pdf</span>
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full mt-2 py-3 bg-emerald-500 hover:bg-emerald-450 text-slate-950 font-extrabold rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg hover:brightness-110"
                  >
                    Submit Registration & Log In
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
