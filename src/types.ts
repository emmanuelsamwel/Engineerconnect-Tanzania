export interface WorkPost {
  id: string;
  engineerId: string;
  engineerName: string;
  engineerAvatar: string;
  engineerCategory: Category;
  title: string;
  location: string;
  description: string;
  descriptionSwahili: string;
  imageUrl: string;
  likes: number;
  likedByUser?: boolean;
  date: string;
  comments: {
    id: string;
    userName: string;
    text: string;
    time: string;
    isVerifiedReply?: boolean;
  }[];
}

export interface ClientJob {
  id: string;
  clientName: string;
  clientAvatar?: string;
  clientEmail: string;
  title: string;
  category: Category;
  location: string;
  description: string;
  descriptionSwahili?: string;
  budget: string;
  urgency: 'Low' | 'Medium' | 'High' | 'Emergency';
  datePosted: string;
  status: 'open' | 'assigned' | 'completed';
  proposals: {
    id: string;
    engineerId: string;
    engineerName: string;
    engineerAvatar: string;
    bidAmount: string;
    comment: string;
    time: string;
    isAccepted?: boolean;
  }[];
}

export type Language = 'en' | 'sw';

export type UserRole = 'customer' | 'engineer' | 'admin' | 'guest';

export type Screen = 'splash' | 'lang-select' | 'welcome' | 'auth' | 'dashboard';

export type Category = 'Electrical' | 'Mechanical' | 'Civil' | 'Biomedical' | 'Solar' | 'Automation' | 'HVAC' | 'Maintenance' | 'Chemical' | 'Mining' | 'Agricultural' | 'Telecom & ICT' | 'Water Resources' | 'Marine' | 'Geotechnical' | 'Environmental';

export interface ProjectDoc {
  id: string;
  title: string;
  description: string;
  mediaUrl: string;
  category: string;
}

export interface Engineer {
  id: string;
  name: string;
  email: string;
  phone: string;
  category: Category;
  location: string;
  rating: number;
  experienceYears: number;
  bio: string;
  bioSwahili: string;
  ratesPerHour: string;
  isVerified: boolean;
  avatar: string;
  projects: ProjectDoc[];
  certifications: string[];
  completedJobs: number;
}

export interface ChatMessage {
  id: string;
  sender: 'customer' | 'engineer';
  text: string;
  timestamp: string;
  fileUrl?: string;
  isVoiceNote?: boolean;
}

export interface ServiceRequest {
  id: string;
  title: string;
  description: string;
  category: Category;
  customerName: string;
  customerPhone: string;
  location: string;
  mediaUrl?: string;
  status: 'pending' | 'accepted' | 'in_progress' | 'completed' | 'paid' | 'reviewed';
  engineerId?: string;
  urgency: 'Low' | 'Medium' | 'High' | 'Emergency';
  cost?: number;
  aiDiagnostic?: {
    diagnosis: string;
    recommendedCategory: string;
    urgency: string;
    estimatedCostRange: string;
    safetySteps: string[];
    technicalReasoning: string;
  };
  chatHistory: ChatMessage[];
  rating?: number;
  reviewText?: string;
}

export interface Equipment {
  id: string;
  name: string;
  model: string;
  serialNumber: string;
  location: string;
  nextServiceDate: string;
  assignedEngineerId?: string;
  serviceHistory: {
    id: string;
    date: string;
    notes: string;
    engineerName: string;
  }[];
}

export interface Transaction {
  id: string;
  requestId: string;
  customerName: string;
  engineerName: string;
  amount: number;
  paymentMethod: 'M-Pesa' | 'Tigo Pesa' | 'Airtel Money' | 'NMB/CRDB Bank';
  transactionRef: string;
  status: 'Pending' | 'Completed';
  date: string;
}

export interface Complaint {
  id: string;
  title: string;
  description: string;
  userEmail: string;
  accusedEmail: string;
  status: 'Pending' | 'Resolved';
  date: string;
  resolutionNotes?: string;
}
