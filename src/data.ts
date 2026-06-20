import { Engineer, Equipment, ServiceRequest, Transaction, Complaint, WorkPost, ClientJob } from "./types";

export const INITIAL_ENGINEERS: Engineer[] = [
  {
    id: "eng_1",
    name: "Eng. Juma Jumanne",
    email: "juma.jumanne@engineerconnect.co.tz",
    phone: "+255 712 345 678",
    category: "Electrical",
    location: "Dar es Salaam (Posta)",
    rating: 4.8,
    experienceYears: 7,
    bio: "Certified power systems specialist graduated from University of Dar es Salaam (UDSM). Experienced in complex residential rewiring, substation automation, and domestic circuitry safety.",
    bioSwahili: "Mtaalamu aliyethibitishwa wa mifumo ya umeme aliyehitimu Chuo Kikuu cha Dar es Salaam (UDSM). Ana uzoefu wa kuweka nyaya za nyumbani, automatisering ya vituo vya umeme, na usalama wa umeme.",
    ratesPerHour: "35,000 TZS",
    isVerified: true,
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
    projects: [
      { id: "p1_1", title: "Mwenge Commercial Complex Rewiring", description: "Completed upgrade of 4-story electrical system complying with TANESCO safety codes.", mediaUrl: "⚡", category: "Electrical" },
      { id: "p1_2", title: "Kigamboni Residential Backup Installation", description: "Configured dual automatic transfer switch (ATS) with automatic generator backup.", mediaUrl: "🔋", category: "Electrical" }
    ],
    certifications: ["UDSM Electrical Engineering B.Sc.", "ERB registered (PE-10492)", "CRB safety certified"],
    completedJobs: 134
  },
  {
    id: "eng_2",
    name: "Eng. Neema Mushi",
    email: "neema.mushi@engineerconnect.co.tz",
    phone: "+255 754 987 654",
    category: "Civil",
    location: "Arusha (Njiro)",
    rating: 4.9,
    experienceYears: 9,
    bio: "Civil engineer specializing in structural integrity assessments, concrete foundation stability, pipeline rehabilitation, and waterproofing.",
    bioSwahili: "Mhandisi wa ujenzi anayejisomea tathmini ya uimara wa muundo, uthabiti wa msingi wa zege, ukarabati wa mabomba, na mifumo ya kuzuia uvujaji wa maji.",
    ratesPerHour: "40,000 TZS",
    isVerified: true,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    projects: [
      { id: "p2_1", title: "Njiro Villa Water Barrier Barrier", description: "Resolved persistent foundation leaks with modern subterranean damp-proofing.", mediaUrl: "🧱", category: "Civil" },
      { id: "p2_2", title: "Arusha Clinic Pipeline Layout", description: "Laid 2.5km PVC main pipe grid with dynamic velocity limiters.", mediaUrl: "🚰", category: "Civil" }
    ],
    certifications: ["M.Sc in Structural Eng (KIST)", "ERB Licensed Professional (PE-33494)"],
    completedJobs: 154
  },
  {
    id: "eng_3",
    name: "Eng. Emmanuel Lyimo",
    email: "emmanuel.lyimo@engineerconnect.co.tz",
    phone: "+255 683 456 123",
    category: "Solar",
    location: "Dodoma (Mlimani)",
    rating: 4.7,
    experienceYears: 5,
    bio: "Renewable energy consultant dedicated to solar PV array optimization, smart storage backups, and off-grid configurations for dryland regions.",
    bioSwahili: "Mshauri wa nishati mbadala anayejitolea kuboresha paneli za jua (PV), mifumo ya kisasa ya betri, na mitandao huru ya umeme kwa maeneo kame.",
    ratesPerHour: "30,000 TZS",
    isVerified: true,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    projects: [
      { id: "p3_1", title: "Mpwapwa Dispensary Solar Install", description: "Configured 15kW off-grid solar node with 24kWh lithium battery array supporting refrigeration.", mediaUrl: "☀️", category: "Solar" }
    ],
    certifications: ["B.Tech Renewable Energy", "COSTECH Solar Installer Class A"],
    completedJobs: 89
  },
  {
    id: "eng_4",
    name: "Eng. Amina Shehe",
    email: "amina.shehe@engineerconnect.co.tz",
    phone: "+255 777 555 333",
    category: "Biomedical",
    location: "Mwanza (Kirumba)",
    rating: 4.8,
    experienceYears: 6,
    bio: "Biomedical technician focusing on medical scanner repair, patient vital monitoring systems, clinical autoclaves and oxygen delivery circuits calibration.",
    bioSwahili: "Mtaalamu wa vifaa vya matibabu anayejikita katika ukarabati wa skana za matibabu, kurekebisha vifaa vya ufuatiliaji wa mgonjwa, na calibration ya mifumo ya oksijeni.",
    ratesPerHour: "45,000 TZS",
    isVerified: true,
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    projects: [
      { id: "p4_1", title: "Mwanza General ICU Monitor Calibrator", description: "Restored 12 multiparameter monitors with precise biosignals accuracy verification.", mediaUrl: "🏥", category: "Biomedical" }
    ],
    certifications: ["B.Sc Biomedical Engineering (MUHAS)", "Health Professions Council Registered"],
    completedJobs: 72
  },
  {
    id: "eng_5",
    name: "Eng. Benson Peter",
    email: "benson.peter@engineerconnect.co.tz",
    phone: "+255 765 111 222",
    category: "Mechanical",
    location: "Zanzibar (Mkunazini)",
    rating: 4.9,
    experienceYears: 10,
    bio: "Marine and HVAC industrial mechanical specialist. Expert in generator engine overhauls, commercial chilling pumps, and industrial steam pipes.",
    bioSwahili: "Mtaalamu wa kimekanika wa injini za baharini na mifumo ya HVAC ya viwandani. Bingwa wa ukarabati mkubwa wa injini za jenereta na pampu za baridi.",
    ratesPerHour: "50,000 TZS",
    isVerified: true,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    projects: [
      { id: "p5_1", title: "Hotel Air Duct Renewal", description: "Surgical replacement of central HVAC ductwork with anti-mold stainless conduits.", mediaUrl: "🌬️", category: "Mechanical" }
    ],
    certifications: ["DIT Mechanical Engineering Advanced Diploma", "ERB Licensed Tech"],
    completedJobs: 211
  }
];

export const INITIAL_EQUIPMENT: Equipment[] = [
  {
    id: "eq_1",
    name: "Industrial Generator SDMO 150kVA",
    model: "SDMO-V150",
    serialNumber: "SN-938210-SDMO",
    location: "Arusha Lutheran Medical Centre - Backup Compound",
    nextServiceDate: "2026-07-15",
    assignedEngineerId: "eng_5",
    serviceHistory: [
      { id: "h1_1", date: "2026-03-10", notes: "Oil filter change and injector nozzle de-clogging. Load system tested.", engineerName: "Eng. Benson Peter" }
    ]
  },
  {
    id: "eq_2",
    name: "Off-Grid Solar Battery Micro-Grid",
    model: "PV-SmartGrid-50",
    serialNumber: "SN-PV-77621",
    location: "Dodoma Rural Dispensary - Solar Rooftop",
    nextServiceDate: "2026-08-01",
    assignedEngineerId: "eng_3",
    serviceHistory: [
      { id: "h2_1", date: "2025-12-05", notes: "Calibrated maximum power point tracking (MPPT) parameters.", engineerName: "Eng. Emmanuel Lyimo" }
    ]
  },
  {
    id: "eq_3",
    name: "Philips Everflo Clinical Oxygen Concentrator",
    model: "Philips-EverFlo-O2",
    serialNumber: "SN-PH-5544",
    location: "Zanzibar Coast Clinic - Ward 3",
    nextServiceDate: "2026-06-25",
    assignedEngineerId: "eng_4",
    serviceHistory: [
      { id: "h3_1", date: "2026-02-18", notes: "Sieve bed unit filter swap. Tested outlet purity at 94.2%.", engineerName: "Eng. Amina Shehe" }
    ]
  }
];

export const INITIAL_REQUESTS: ServiceRequest[] = [
  {
    id: "req_101",
    title: "ICU Ventilator Oxygen Leakage",
    description: "The clinic's oxygen delivery oxygen lines flow meter fluctuates wildly and shows an warning alarm indicating drop in supply pressure.",
    category: "Biomedical",
    customerName: "Dr. Maria Mtui",
    customerPhone: "+255 738 989 123",
    location: "Mwanza General Hospital",
    urgency: "High",
    status: "in_progress",
    engineerId: "eng_4",
    chatHistory: [
      { id: "m1", sender: "customer", text: "Habari Eng. Amina. The pressure is drops below safety mark in Ward B.", timestamp: "10:15 AM" },
      { id: "m2", sender: "engineer", text: "Habari Dr. Maria. I am on my way with a replacement pressure safety valve. Please prioritize backup oxygen cylinders.", timestamp: "10:20 AM" }
    ]
  }
];

export const TRANSLATIONS = {
  en: {
    title: "Builda",
    tagline: "Connecting Tanzania with Verified Engineering Professionals",
    swahili: "Swahili",
    english: "English",
    getStarted: "Get Started",
    splashText: "Your Trusted Gateway to Professional Technical Care",
    roleSelectTitle: "Choose Your Path",
    roleSelectDesc: "Are you searching for technical assistance, or are you a certified engineering professional?",
    customer: "I am a Customer",
    customerDesc: "Access premium assistance for construction, electronics, solar, biomedical devices and maintenance.",
    engineer: "I am an Engineer / Technician",
    engineerDesc: "Showcase your portfolio, receive client requests, track invoices, and expand your carrier.",
    admin: "Platform Administrator",
    adminDesc: "Verify credentials, audit pending invoices, monitor transactions, and handle emergency dispatches.",
    guest: "Continue as Guest",
    loginTitle: "Access Your Dashboard",
    loginSubtitle: "Sign in to view requests, history and connect",
    phoneInput: "Phone Number (e.g. +255 712 ...)",
    otpTitle: "Security OTP Verification",
    otpDesc: "We've dispatched a 6-digit one-time PIN to your phone.",
    verifyOtp: "Verify & Log In",
    findEng: "Find Engineering Professionals",
    allCategories: "All Expertise Areas",
    searchPlaceholder: "Search by skill, name or city (e.g. Dar es Salaam, solar, AC)...",
    verified: "Verified Specialist",
    viewPortfolio: "View Experience & Portfolio",
    hireEng: "Initiate Assistance Request",
    activeRequests: "Track Active Tasks",
    newRequest: "Submit New Technical Concern",
    problemBrief: "Brief title of the technical issue",
    probDescPlaceholder: "Provide a detailed description of the breakdown (explain abnormal sounds, smoke, leaks, errors)...",
    uploadMedia: "Attach Diagnostic Photos / Videos",
    selectSiteLoc: "Enter Jobsite Location Address",
    aiBtn: "Analyze Issue with AI Diagnosis Assistant",
    aiDone: "AI Diagnosis Completed!",
    emergencyBtn: "⚠️ Emergency SOS Dispatch",
    emergencyAlert: "Critical Incident Safety Alert",
    emergencyDesc: "Instantly broadcast your exact GPS coordinates and issue to nearby certified engineers.",
    emergencySuccess: "Emergency alert sent! Nearby responders have been notified with high priority.",
    equipmentTitle: "Medical & Industrial Equipment Registry",
    registerEquip: "Register Asset/Equipment",
    equipName: "Asset Name",
    serialNo: "Serial / Chassis Number",
    scheduleMaintenance: "Schedule Next Proactive Maintenance",
    activeChats: "Conversations & Chat Room",
    voiceNoteBtn: "Hold to send Swahili Voice Note",
    invoiceBtn: "Raise Settlement Invoice",
    recordedTransactions: "Secure Transaction Ledger",
    adminVerificationTitle: "Verification Registry",
    approveEngBtn: "Verify ERB License Credentials",
    pendingComplaints: "Resolve Incidental Dispute Petitions",
    complaintsText: "Complaints & Arbitration Log",
  },
  sw: {
    title: "Builda",
    tagline: "Kuunganisha Tanzania na Wahandisi na Mafundi Waliothibitishwa",
    swahili: "Kiswahili",
    english: "Kiingereza",
    getStarted: "Anza Sasa",
    splashText: "Lango Lako Salama la Kupata Usaidizi wa Kitaalamu wa Kiufundi",
    roleSelectTitle: "Chagua Jukumu Lako",
    roleSelectDesc: "Unatafuta msaada wa kitalamu au wewe ni mhandisi aliyethibitishwa kihalali?",
    customer: "Mimi ni Mteja",
    customerDesc: "Pata huduma bora za ujenzi, umeme wa nyumbani, nishati ya jua, vifaa vya hospitali na matengenezo.",
    engineer: "Mimi ni Mhandisi / Fundi",
    engineerDesc: "Weka kwingineko yako, pokea maombi ya kazi, dhibiti malipo, na kukuza taaluma yako.",
    admin: "Msimamizi wa Mfumo",
    adminDesc: "Hakiki vyeti vya wahandisi, kagua ankara ambazo hazijalipwa, na dhibiti dharura.",
    guest: "Endelea bila Akaunti",
    loginTitle: "Ingia kwenye Mfumo",
    loginSubtitle: "Ingiza maelezo yako ili kuona maombi, historia na kuungana",
    phoneInput: "Namba ya Simu (mf. +255 712 ...)",
    otpTitle: "Uthibitishaji wa Usalama (OTP)",
    otpDesc: "Tumetuma namba ya siri ya tarakimu 6 (OTP) kwenye simu yako.",
    verifyOtp: "Thibitisha na Ingia",
    findEng: "Tafuta Wahandisi Waliothibitishwa",
    allCategories: "Maeneo Yote ya Utaalamu",
    searchPlaceholder: "Tafuta kwa ujuzi, jina au mkoa (mf. Dar es Salaam, solar, AC)...",
    verified: "Mtaalamu Aliyethibitishwa",
    viewPortfolio: "Angalia Kazi Zake & Vyeti",
    hireEng: "Tengeneza Ombi la Matengenezo",
    activeRequests: "Fuatilia Kazi Zinazoendelea",
    newRequest: "Wasilisha Ombi Jipya la Matengenezo",
    problemBrief: "Kichwa kifupi cha hitilafu husika",
    probDescPlaceholder: "Toa maelezo ya kina ya hitilafu (fafanua sauti zisizo za kawaida, moshi, uvujaji au makosa)...",
    uploadMedia: "Ambatisha Picha / Video za Hitilafu",
    selectSiteLoc: "Weka Anwani / Eneo la Kazi",
    aiBtn: "Changanua Suala hili kwa Msaidizi wa AI",
    aiDone: "Uchambuzi wa AI Umekamilika!",
    emergencyBtn: "⚠️ Dharura ya Haraka (SOS)",
    emergencyAlert: "Tahadhari ya Dharura ya Usalama",
    emergencyDesc: "Tuma eneo lako la GPS na maelezo ya hitilafu mara moja kwa wahandisi walio karibu nawe.",
    emergencySuccess: "Msaada umetumwa! Wahandisi wa karibu wamearifiwa kwa kipaumbele cha juu.",
    equipmentTitle: "Sajili ya Vifaa vya Hospitali na Viwanda",
    registerEquip: "Sajili Kifaa Kipya",
    equipName: "Jina la Kifaa",
    serialNo: "Namba ya Usajili / Kifaa",
    scheduleMaintenance: "Panga Matengenezo Kinga Yajayo",
    activeChats: "Mazungumzo & Vyumba vya Soga",
    voiceNoteBtn: "Shikilia kutuma Ujumbe wa Sauti (Voice)",
    invoiceBtn: "Toa Ankara ya Malipo",
    recordedTransactions: "Kumbukumbu ya Malipo Salama",
    adminVerificationTitle: "Sajili ya Uhakiki wa Cheti",
    approveEngBtn: "Hakiki Vyeti vya Usajili wa ERB",
    pendingComplaints: "Suluhisha Migogoro na Malalamiko",
    complaintsText: "Kumbukumbu ya Malalamiko na Uamuzi",
  }
};

export const INITIAL_WORK_POSTS: WorkPost[] = [
  {
    id: "post_1",
    engineerId: "eng_3",
    engineerName: "Eng. Emmanuel Lyimo",
    engineerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    engineerCategory: "Solar",
    title: "☀️ 15kW Solar PV Grid Installed at Mpwapwa Clinic",
    location: "Mpwapwa, Dodoma",
    description: "Successfully stabilized vaccine refrigeration for children by installing a high-efficiency 15kW solar array with dynamic MPPT controllers and safe Lithium-Ion backups. Solved a persistent power issue that plagued local medical storage.",
    descriptionSwahili: "Tumefanikiwa kuokoa na kusawazisha friji za chanjo kwa watoto kwa kuweka mfumo wa umeme wa jua wa 15kW na betri salama za Lithium-Ion huko Mpwapwa. Lengo letu ni huduma bora za afya!",
    imageUrl: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&auto=format&fit=crop&q=80",
    likes: 42,
    likedByUser: false,
    date: "2026-06-12",
    comments: [
      { id: "c1_1", userName: "Dr. Maria Mtui", text: "Excellent execution of works, Emmanuel. The storage freezer has been running stably for 72 straight hours now!", time: "1 day ago" },
      { id: "c1_2", userName: "Eng. Juma Jumanne", text: "Safi sana kiongozi! Dynamic MPPT and Lithium setups are definitely the way to go for rural reliability.", time: "12 hours ago", isVerifiedReply: true }
    ]
  },
  {
    id: "post_2",
    engineerId: "eng_1",
    engineerName: "Eng. Juma Jumanne",
    engineerAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
    engineerCategory: "Electrical",
    title: "⚡ Fully Automated Switchover Circuit at Mwenge Complex",
    location: "Mwenge, Dar es Salaam",
    description: "Successfully built and integrated a 3-Phase Automatic Transfer Switch (ATS) to manage backup power transition. Transition delay reduced from minutes to exactly 2.4 seconds, shielding active computer servers from severe damage.",
    descriptionSwahili: "Tumekamilisha kuunda na kufunga swichi ya kisasa (ATS) ya awamu tatu ili kurahisisha kuwasha jenereta la dharura. Jengo la Mwenge sasa halizimi kompyuta tena umeme ukikatika!",
    imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&auto=format&fit=crop&q=80",
    likes: 29,
    likedByUser: false,
    date: "2026-06-11",
    comments: [
      { id: "c2_1", userName: "Hamisi Juma", text: "Je, hii mfumo inafaa pia kwa matumizi ya nyumbani tukiwa na jenereta ndogo ya 10kVA?", time: "2 days ago" },
      { id: "c2_2", userName: "Eng. Juma Jumanne", text: "Ndio Hamisi, tunaweza kufunga ATS maalum ya kiwango cha nyumbani (Single Phase) inayofaa kabisa kwa 10kVA. Wasiliana nami nikupe mchanganuo.", time: "1 day ago", isVerifiedReply: true }
    ]
  },
  {
    id: "post_3",
    engineerId: "eng_2",
    engineerName: "Eng. Neema Mushi",
    engineerAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    engineerCategory: "Civil",
    title: "🧱 Foundation Crack Grouting & Subterranean Damp-Proofing",
    location: "Njiro, Arusha",
    description: "Rescued a multi-story residential villa from serious foundation decay due to heavy groundwater intrusion. Injected high-grade elastomeric polymers into micro-cracks and installed active waterproof drainage around the footings.",
    descriptionSwahili: "Tumeweka kizuizi cha unyevu chini ya ardhi na kuimarisha nguzo za msingi wa zege kwenye ghorofa Njiro baada ya kuanza kuingiliana na maji ya ardhini. Sasa nyumba ipo imara kwa miaka mia!",
    imageUrl: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?w=600&auto=format&fit=crop&q=80",
    likes: 38,
    likedByUser: false,
    date: "2026-06-10",
    comments: [
      { id: "c3_1", userName: "Aisha Mushi", text: "Amazing technical work! Building a property near the mountain is difficult due to underground streams.", time: "3 days ago" }
    ]
  },
  {
    id: "post_4",
    engineerId: "eng_4",
    engineerName: "Eng. Amina Shehe",
    engineerAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    engineerCategory: "Biomedical",
    title: "🏥 Patient Vital Monitors Re-Calibration in ICU Ward",
    location: "Kirumba, Mwanza",
    description: "Conducted precision calibration and sensor membrane overhauls for five clinical ECG & Multiparameter biosignal monitors. Re-established compliance with national safety thresholds for infant healthcare delivery.",
    descriptionSwahili: "Tumefanya calibration na kurekebisha vifaa tano vya ICU vinavyosajili mapigo ya moyo na oksijeni kwa watoto. Vipimo sasa viko sahihi kwa asilimia 100 kulingana na viwango vya kitaifa.",
    imageUrl: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&auto=format&fit=crop&q=80",
    likes: 47,
    likedByUser: false,
    date: "2026-06-08",
    comments: [
      { id: "c4_1", userName: "Mwanza General Director", text: "Thank you for the quick and compliant execution under emergency notice, Amina.", time: "5 days ago" }
    ]
  }
];

export const INITIAL_CLIENT_JOBS: ClientJob[] = [
  {
    id: "job_1",
    clientName: "Al-Hassan Enterprises",
    clientEmail: "hassan@alhassan.co.tz",
    clientAvatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80",
    title: "⚡ Required: 120kVA Auto Switchover Generator (ATS) Calibration",
    category: "Electrical",
    location: "Kariakoo, Dar es Salaam",
    description: "Our commercial center suffers severe voltage dropouts. We purchased a 120kVA backup genset but need a qualified electrical/power systems engineer to build and certify the ATS panel so building circuits auto-transfer within 3 seconds.",
    descriptionSwahili: "Kituo chetu cha biashara kinahitaji kurekebisha na kuunganisha jenereta la kVA 120 na swichi ya kisasa (ATS) ili kuwahi dharura ndani ya sekunde 3.",
    budget: "1,500,000 TZS",
    urgency: "High",
    datePosted: "2026-06-12",
    status: "open",
    proposals: [
      {
        id: "prop_1_1",
        engineerId: "eng_1",
        engineerName: "Eng. Juma Jumanne",
        engineerAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
        bidAmount: "1,400,000 TZS",
        comment: "I have extensive experience with ATS design (check my recent Mwenge Complex post in the Completed Work Feed!). I can complete this in 3 days with safety certification.",
        time: "10 hours ago"
      },
      {
        id: "prop_1_2",
        engineerId: "eng_3",
        engineerName: "Eng. Emmanuel Lyimo",
        engineerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
        bidAmount: "1,350,000 TZS",
        comment: "I can design the switch panel and also balance the 3-phase load elements to avoid phase over-amperage. Can start tomorrow morning.",
        time: "4 hours ago"
      }
    ]
  },
  {
    id: "job_2",
    clientName: "Rift Valley Agri-Tech",
    clientEmail: "info@riftvalleyagri.com",
    clientAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    title: "☀️ Solar Irrigation Water Pump System installation",
    category: "Solar",
    location: "Mto wa Mbu, Manyara",
    description: "We are establishing a 5-acre drip farm and need a custom solar DC hydraulic system calculation plus physical pump layout mapping. Already got panels (10x 400W), need engineer to set controller, ground lightning spike protection, and optimize high-noon water yields.",
    descriptionSwahili: "Tunahitaji mtaalamu wa nishati ya jua kufunga mfumo wa kusukuma maji ya umwagiliaji kwa mashamba yetu ya ekari 5 ya drip. Karibuni!",
    budget: "850,000 TZS",
    urgency: "Medium",
    datePosted: "2026-06-11",
    status: "open",
    proposals: [
      {
        id: "prop_2_1",
        engineerId: "eng_3",
        engineerName: "Eng. Emmanuel Lyimo",
        engineerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
        bidAmount: "800,000 TZS",
        comment: "Perfect solar-sizing is my expertise. I will structure the hybrid inverter with maximum efficiency, calibrate the dry-run protection probe correctly to protect your pump.",
        time: "1 day ago"
      }
    ]
  },
  {
    id: "job_3",
    clientName: "St. Raphael's Medical Center",
    clientEmail: "equipment@raphaelhealth.org",
    clientAvatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    title: "🏥 Calibration of Critical Medical Autoclave & Oxygen Concentrators",
    category: "Biomedical",
    location: "Kirumba, Mwanza",
    description: "Two clinical sterilizers are showing fluctuating pressure seals, violating municipal bio-waste limits. We need a certified Biomedical specialist to run temperature-pressure curves and verify optimal seal function. High priority.",
    descriptionSwahili: "Vifaa vyetu vya kusafisha vifaa vya tiba (autoclave) vinaleta hitilafu kwenye shinikizo la joto. Tunahitaji mtaalamu vya hospitali kurekebisha.",
    budget: "1,200,500 TZS",
    urgency: "Emergency",
    datePosted: "2026-06-10",
    status: "open",
    proposals: []
  }
];

