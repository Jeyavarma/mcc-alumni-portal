// ═══════════════════════════════════════════════════════════════
//  MCC Portal — Centralized Sample Data Store
//  All mock data for frontend demo. Replace with API calls.
// ═══════════════════════════════════════════════════════════════

export const DEPARTMENTS = [
  'English', 'Tamil', 'History', 'Economics', 'Physics',
  'Chemistry', 'Mathematics', 'Botany', 'Zoology', 'Commerce',
  'Computer Science', 'Business Administration', 'Social Work', 'Philosophy',
];

export const ALUMNI = [
  { id: 1, name: 'Dr. Samuel Rajan', batch: '1999', dept: 'Physics', company: 'ISRO', role: 'Senior Scientist', city: 'Bengaluru', email: 'samuel.rajan@isro.gov.in', phone: '+91 98401 12345', engagement: 'Active', donationTotal: 150000, lastContact: '2024-03-15', avatar: 'SR' },
  { id: 2, name: 'Ms. Priya Annamalai', batch: '2005', dept: 'Computer Science', company: 'Google India', role: 'Engineering Manager', city: 'Hyderabad', email: 'priya.a@google.com', phone: '+91 99400 23456', engagement: 'Active', donationTotal: 75000, lastContact: '2024-04-02', avatar: 'PA' },
  { id: 3, name: 'Mr. Benjamin Matthew', batch: '1975', dept: 'Commerce', company: 'HDFC Bank', role: 'Retired MD', city: 'Chennai', email: 'ben.matthew@gmail.com', phone: '+91 94450 34567', engagement: 'Donor', donationTotal: 500000, lastContact: '2024-02-20', avatar: 'BM' },
  { id: 4, name: 'Dr. Anitha Krishnamurthy', batch: '1990', dept: 'Botany', company: 'Tamil Nadu Agricultural Univ.', role: 'Professor', city: 'Coimbatore', email: 'anitha.k@tnau.ac.in', phone: '+91 93820 45678', engagement: 'Moderately Active', donationTotal: 25000, lastContact: '2024-01-10', avatar: 'AK' },
  { id: 5, name: 'Mr. John Peter Rajasekaran', batch: '2000', dept: 'English', company: 'The Hindu', role: 'Associate Editor', city: 'Chennai', email: 'johnpeter@thehindu.com', phone: '+91 98840 56789', engagement: 'Active', donationTotal: 50000, lastContact: '2024-03-28', avatar: 'JP' },
  { id: 6, name: 'Ms. Leela Subramaniam', batch: '2010', dept: 'Mathematics', company: 'McKinsey & Co', role: 'Senior Consultant', city: 'Mumbai', email: 'leela.s@mckinsey.com', phone: '+91 96770 67890', engagement: 'Active', donationTotal: 30000, lastContact: '2024-04-10', avatar: 'LS' },
  { id: 7, name: 'Mr. Daniel Christopher', batch: '1985', dept: 'History', company: 'UNESCO', role: 'Programme Specialist', city: 'Paris', email: 'daniel.c@unesco.org', phone: '+33 612345678', engagement: 'Inactive', donationTotal: 200000, lastContact: '2023-11-05', avatar: 'DC' },
  { id: 8, name: 'Dr. Vasantha Kumari', batch: '1995', dept: 'Chemistry', company: 'Sun Pharma', role: 'Head of R&D', city: 'Mumbai', email: 'vasantha@sunpharma.com', phone: '+91 98430 78901', engagement: 'Donor', donationTotal: 120000, lastContact: '2024-02-14', avatar: 'VK' },
  { id: 9, name: 'Mr. Arjun Narayanan', batch: '2015', dept: 'Business Administration', company: 'Freshworks', role: 'Product Manager', city: 'Chennai', email: 'arjun.n@freshworks.com', phone: '+91 91760 89012', engagement: 'Active', donationTotal: 10000, lastContact: '2024-04-18', avatar: 'AN' },
  { id: 10, name: 'Ms. Ruth David', batch: '2008', dept: 'Social Work', company: 'UNICEF India', role: 'Programme Officer', city: 'New Delhi', email: 'ruth.d@unicef.org', phone: '+91 97890 90123', engagement: 'Moderately Active', donationTotal: 45000, lastContact: '2024-03-05', avatar: 'RD' },
  { id: 11, name: 'Mr. Isaac Thomas', batch: '1980', dept: 'Economics', company: 'Reserve Bank of India', role: 'Retired Deputy Governor', city: 'Chennai', email: 'isaac.t@rbi.org.in', phone: '+91 94490 01234', engagement: 'Donor', donationTotal: 750000, lastContact: '2024-01-22', avatar: 'IT' },
  { id: 12, name: 'Dr. Mary Josephine', batch: '2002', dept: 'Zoology', company: 'Wildlife Institute of India', role: 'Principal Scientist', city: 'Dehradun', email: 'mary.j@wii.gov.in', phone: '+91 94190 12345', engagement: 'Active', donationTotal: 55000, lastContact: '2024-04-05', avatar: 'MJ' },
];

export const CAMPAIGNS = [
  {
    id: 1,
    title: 'Physics Laboratory Modernisation',
    dept: 'Physics',
    goal: 2500000,
    raised: 1875000,
    donors: 47,
    deadline: '2024-12-31',
    status: 'Active',
    description: 'Upgrade the undergraduate physics lab with state-of-the-art equipment including spectrometers, oscilloscopes, and optics kits.',
    image: '🔬',
  },
  {
    id: 2,
    title: 'Bishop Heber Library Restoration Fund',
    dept: 'General',
    goal: 5000000,
    raised: 3200000,
    donors: 128,
    deadline: '2025-03-31',
    status: 'Active',
    description: 'Restore and digitise the historic Bishop Heber Library collection, preserving 175 years of academic heritage.',
    image: '📚',
  },
  {
    id: 3,
    title: 'Merit Scholarship Endowment — Batch 2000',
    dept: 'All Departments',
    goal: 1000000,
    raised: 980000,
    donors: 89,
    deadline: '2024-06-30',
    status: 'Near Goal',
    description: 'Establish a permanent endowment to award annual merit scholarships to deserving students from economically weaker sections.',
    image: '🎓',
  },
  {
    id: 4,
    title: 'Computer Science Digital Innovation Hub',
    dept: 'Computer Science',
    goal: 3000000,
    raised: 450000,
    donors: 23,
    deadline: '2025-12-31',
    status: 'Active',
    description: 'Create a dedicated innovation lab with GPU servers, AR/VR equipment, and collaborative workspaces.',
    image: '💻',
  },
  {
    id: 5,
    title: 'Chapel Restoration & Heritage Preservation',
    dept: 'General',
    goal: 4000000,
    raised: 4000000,
    donors: 203,
    deadline: '2024-03-31',
    status: 'Completed',
    description: 'Fully restore the iconic Bishop Heber Chapel to its original 19th-century grandeur.',
    image: '⛪',
  },
];

export const CSR_COMPANIES = [
  { id: 1, name: 'Infosys Foundation', industry: 'Technology', csrBudget: 10000000, contact: 'Ms. Nandini Reddy', email: 'csr@infosys.com', focusAreas: ['Education', 'Technology', 'Research'], proposals: 3, city: 'Bengaluru' },
  { id: 2, name: 'Cognizant Foundation', industry: 'Technology', csrBudget: 8000000, contact: 'Mr. Raj Kumar', email: 'foundation@cognizant.com', focusAreas: ['Education', 'Scholarships', 'Infrastructure'], proposals: 2, city: 'Chennai' },
  { id: 3, name: 'Murugappa Group CSR', industry: 'Manufacturing', csrBudget: 6000000, contact: 'Mr. Arun Murugappa', email: 'csr@murugappa.com', focusAreas: ['Education', 'Infrastructure'], proposals: 1, city: 'Chennai' },
  { id: 4, name: 'Chennai Petroleum CSR', industry: 'Energy', csrBudget: 5000000, contact: 'Dr. K. Pandurangan', email: 'csr@cpcl.co.in', focusAreas: ['Education', 'Scholarships', 'Environment'], proposals: 2, city: 'Chennai' },
  { id: 5, name: 'Tata Consultancy Services', industry: 'Technology', csrBudget: 20000000, contact: 'Ms. Sneha Agrawal', email: 'csr@tcs.com', focusAreas: ['Education', 'Technology', 'Research', 'Scholarships'], proposals: 4, city: 'Mumbai' },
];

export const CSR_PROPOSALS = [
  { id: 1, company: 'Infosys Foundation', title: 'AI Research Lab Setup', amount: 2500000, status: 'Approved', date: '2024-03-01', focusArea: 'Technology', officer: 'Dr. Rajan', nextFollowUp: '2024-05-01' },
  { id: 2, company: 'Cognizant Foundation', title: 'Merit Scholarship Programme 2024-25', amount: 1500000, status: 'Under Review', date: '2024-04-10', focusArea: 'Scholarships', officer: 'Ms. Preethi', nextFollowUp: '2024-05-15' },
  { id: 3, company: 'TCS', title: 'Smart Classroom Infrastructure', amount: 3500000, status: 'Sent', date: '2024-04-20', focusArea: 'Infrastructure', officer: 'Mr. Vincent', nextFollowUp: '2024-05-25' },
  { id: 4, company: 'Murugappa Group CSR', title: 'Library Digitisation Project', amount: 1000000, status: 'Draft', date: '2024-04-25', focusArea: 'Education', officer: 'Ms. Preethi', nextFollowUp: null },
  { id: 5, company: 'Chennai Petroleum CSR', title: 'Chemistry Lab Equipment Grant', amount: 800000, status: 'Completed', date: '2023-11-15', focusArea: 'Education', officer: 'Dr. Rajan', nextFollowUp: null },
  { id: 6, company: 'TCS', title: 'Women in STEM Scholarship', amount: 2000000, status: 'Approved', date: '2024-02-28', focusArea: 'Scholarships', officer: 'Mr. Vincent', nextFollowUp: '2024-06-01' },
];

export const REUNION_EVENTS = [
  {
    id: 1,
    title: 'Silver Jubilee Reunion — Batch of 1999',
    type: 'Silver Jubilee',
    batch: '1999',
    date: '2024-12-14',
    venue: 'Bishop Heber Hall, MCC Campus',
    invitesSent: 120,
    rsvpYes: 87,
    rsvpNo: 15,
    rsvpMaybe: 18,
    status: 'Upcoming',
    description: 'Celebrate 25 glorious years since graduation! Join your batchmates for an evening of nostalgia, music, and memories.',
  },
  {
    id: 2,
    title: 'Golden Jubilee Reunion — Batch of 1974',
    type: 'Golden Jubilee',
    batch: '1974',
    date: '2024-11-23',
    venue: 'Centenary Auditorium, MCC',
    invitesSent: 95,
    rsvpYes: 62,
    rsvpNo: 10,
    rsvpMaybe: 23,
    status: 'Upcoming',
    description: '50 years of friendship, learning, and legacy! A landmark celebration for the pioneering batch of 1974.',
  },
  {
    id: 3,
    title: 'Annual Alumni Meet 2024',
    type: 'Annual Meet',
    batch: 'All Batches',
    date: '2024-09-07',
    venue: 'MCC Main Campus',
    invitesSent: 500,
    rsvpYes: 312,
    rsvpNo: 45,
    rsvpMaybe: 143,
    status: 'Planning',
    description: 'The flagship annual gathering bringing together alumni from all batches for a day of connection and celebration.',
  },
];

export const NEWS_ARTICLES = [
  {
    id: 1,
    title: 'MCC Ranks Among Top 10 Colleges in Tamil Nadu — NIRF 2024',
    category: 'Achievement',
    date: '2024-04-15',
    author: 'Communications Office',
    excerpt: 'Madras Christian College has once again secured a prestigious position in the NIRF rankings, reflecting its commitment to academic excellence.',
    content: '',
    image: '🏆',
  },
  {
    id: 2,
    title: 'Distinguished Alumnus Dr. Samuel Rajan Receives Padma Shri',
    category: 'Alumni Success',
    date: '2024-03-28',
    author: 'Alumni Relations',
    excerpt: 'MCC alumnus and ISRO scientist Dr. Samuel Rajan (Batch 1999, Physics) has been conferred with the Padma Shri for his contributions to space science.',
    content: '',
    image: '⭐',
  },
  {
    id: 3,
    title: 'Infosys Foundation Approves ₹25 Lakh AI Research Lab Grant',
    category: 'CSR Partnership',
    date: '2024-04-01',
    author: 'Development Office',
    excerpt: 'In a landmark CSR partnership, Infosys Foundation has approved a grant to establish a state-of-the-art Artificial Intelligence research laboratory.',
    content: '',
    image: '🤝',
  },
  {
    id: 4,
    title: 'Bishop Heber Library Restoration: 64% of Funding Goal Achieved',
    category: 'Fundraising',
    date: '2024-04-10',
    author: 'Development Office',
    excerpt: 'Thanks to the generous contributions of 128 alumni donors, the Library Restoration Fund has crossed ₹32 lakh.',
    content: '',
    image: '📖',
  },
];

export const CALENDAR_EVENTS = [
  { id: 1, title: 'Monthly Alumni Newsletter', date: '2024-05-01', category: 'Communication', color: 'maroon' },
  { id: 2, title: 'CSR Follow-Up Round — Q2', date: '2024-05-15', category: 'CSR', color: 'gold' },
  { id: 3, title: 'Fundraising Campaign Review', date: '2024-05-20', category: 'Fundraising', color: 'green' },
  { id: 4, title: 'Board Development Committee Meeting', date: '2024-05-28', category: 'Department', color: 'blue' },
  { id: 5, title: 'Annual Alumni Meet Planning', date: '2024-06-03', category: 'Reunion', color: 'purple' },
  { id: 6, title: 'Q1 Donation Report Deadline', date: '2024-06-10', category: 'Reporting', color: 'gray' },
  { id: 7, title: 'Alumni Database Update Drive', date: '2024-06-15', category: 'Communication', color: 'maroon' },
  { id: 8, title: 'Silver Jubilee Invitation Blast', date: '2024-06-20', category: 'Reunion', color: 'purple' },
  { id: 9, title: 'CSR Proposal — TCS Follow-Up', date: '2024-05-25', category: 'CSR', color: 'gold' },
  { id: 10, title: 'Endowment Corpus Review Meeting', date: '2024-07-01', category: 'Fundraising', color: 'green' },
];

export const COMMUNICATIONS = [
  { id: 1, alumniId: 1, alumniName: 'Dr. Samuel Rajan', type: 'Call', subject: 'Thank You — Padma Shri', date: '2024-04-02', status: 'Completed', officer: 'Ms. Preethi', notes: 'Congratulated on Padma Shri. Discussed AI lab naming opportunity.' },
  { id: 2, alumniId: 3, alumniName: 'Mr. Benjamin Matthew', type: 'Email', subject: 'Golden Jubilee Invitation', date: '2024-03-25', status: 'Completed', officer: 'Mr. Vincent', notes: 'Sent formal invitation. He confirmed attendance and pledge of ₹1 lakh.' },
  { id: 3, alumniId: 11, alumniName: 'Mr. Isaac Thomas', type: 'Meeting', subject: 'Endowment Discussion', date: '2024-03-10', status: 'Follow-Up Due', officer: 'Dr. Rajan', notes: 'Met at his residence. Interested in naming endowment after his late wife.' },
  { id: 4, alumniId: 2, alumniName: 'Ms. Priya Annamalai', type: 'Email', subject: 'Alumni Newsletter April 2024', date: '2024-04-01', status: 'Completed', officer: 'System', notes: 'Mass newsletter sent via email.' },
  { id: 5, alumniId: 7, alumniName: 'Mr. Daniel Christopher', type: 'WhatsApp', subject: 'Annual Meet Save the Date', date: '2024-04-15', status: 'Completed', officer: 'Ms. Preethi', notes: 'Sent save-the-date for Annual Alumni Meet September 2024.' },
];

export const DASHBOARD_STATS = {
  totalAlumni: 12847,
  activeAlumni: 4312,
  totalDonations: 28750000,
  thisYearDonations: 4250000,
  activeCampaigns: 4,
  csrProposals: 6,
  upcomingReunions: 3,
  pendingFollowUps: 8,
};

export const DONATION_TREND = [
  { month: 'Jan', donations: 320000, donors: 28 },
  { month: 'Feb', donations: 480000, donors: 45 },
  { month: 'Mar', donations: 750000, donors: 67 },
  { month: 'Apr', donations: 620000, donors: 58 },
  { month: 'May', donations: 890000, donors: 81 },
  { month: 'Jun', donations: 420000, donors: 39 },
  { month: 'Jul', donations: 550000, donors: 52 },
  { month: 'Aug', donations: 680000, donors: 63 },
  { month: 'Sep', donations: 920000, donors: 84 },
  { month: 'Oct', donations: 770000, donors: 71 },
  { month: 'Nov', donations: 1050000, donors: 96 },
  { month: 'Dec', donations: 980000, donors: 89 },
];

export const ENGAGEMENT_BY_DEPT = [
  { dept: 'Physics', active: 142, inactive: 58 },
  { dept: 'Commerce', active: 289, inactive: 121 },
  { dept: 'Computer Sc.', active: 312, inactive: 88 },
  { dept: 'English', active: 198, inactive: 102 },
  { dept: 'Chemistry', active: 167, inactive: 83 },
  { dept: 'Mathematics', active: 156, inactive: 94 },
];

export const CSR_STATUS_DIST = [
  { name: 'Approved', value: 2, color: '#4ade80' },
  { name: 'Under Review', value: 1, color: '#f0b429' },
  { name: 'Sent', value: 1, color: '#60a5fa' },
  { name: 'Draft', value: 1, color: '#9ca3af' },
  { name: 'Completed', value: 1, color: '#c8961a' },
];

export const USERS = [
  { id: 1, name: 'Dr. V.J. Philip', email: 'admin@mcc.edu.in', role: 'Admin', avatar: 'VP' },
  { id: 2, name: 'Ms. Preethi Doss', email: 'preethi@mcc.edu.in', role: 'Staff', avatar: 'PD' },
  { id: 3, name: 'Dr. Samuel Rajan', email: 'samuel.rajan@isro.gov.in', role: 'Alumni', avatar: 'SR' },
  { id: 4, name: 'TCS CSR Team', email: 'csr@tcs.com', role: 'Corporate', avatar: 'TC' },
];

export const AI_FAQ = [
  { keywords: ['profile', 'update', 'edit', 'change'], answer: 'To update your alumni profile, navigate to **Settings → My Profile** from the sidebar. You can update your contact details, current employer, and location. Changes are saved immediately.' },
  { keywords: ['donation', 'donate', 'contribute', 'fund', 'give'], answer: 'To make a donation, go to **Fundraising → Active Campaigns** and select a campaign. Click "Donate Now" to record your contribution. You can also call the Development Office at +91-44-2367-4641 for bank transfer details.' },
  { keywords: ['reunion', 'event', 'jubilee', 'rsvp', 'attend'], answer: 'Check upcoming reunions under **Reunion Management**. Click on an event to view details and RSVP. For the Silver Jubilee (Batch 1999) on December 14, 2024, registrations are open until November 30.' },
  { keywords: ['password', 'login', 'forgot', 'reset', 'access'], answer: 'If you forgot your password, click "Forgot Password" on the login page. A reset link will be sent to your registered email. For further assistance, contact alumni@mcc.edu.in.' },
  { keywords: ['csr', 'corporate', 'proposal', 'partnership', 'company'], answer: 'For CSR partnership enquiries, visit the **CSR & Corporate Relations** module. You can view active proposals or submit a new partnership enquiry. Contact our Development Office at development@mcc.edu.in.' },
  { keywords: ['scholarship', 'financial', 'aid', 'scholarship', 'stipend'], answer: 'MCC offers merit and need-based scholarships. The **Merit Scholarship Endowment Fund** (Batch 2000 initiative) currently supports 15 students annually. Visit the Fundraising module to contribute.' },
  { keywords: ['alumni', 'register', 'join', 'new', 'sign up'], answer: 'New alumni can register at **mcc.edu.in/register-now**. For portal access, use the registration form on the login page. Your account will be verified within 2 working days.' },
  { keywords: ['contact', 'office', 'phone', 'email', 'reach'], answer: 'Alumni & Development Office: 📍 Madras Christian College, Tambaram, Chennai – 600 059. 📞 +91-44-2367-4641. 📧 alumni@mcc.edu.in. Office hours: Mon–Fri, 9 AM – 5 PM.' },
  { keywords: ['history', 'about', 'mcc', 'college', 'founded', 'established'], answer: 'Madras Christian College was established in **1837** by the Free Church of Scotland Mission. It is one of Asia\'s oldest and most distinguished liberal arts colleges, with a motto *"In Hoc Signo"* (In This Sign). It became autonomous in 1978.' },
];
