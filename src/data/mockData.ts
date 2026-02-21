// Comprehensive Mock Data - All sections of the GATE platform

// ============================================================================
// DASHBOARD MOCK DATA
// ============================================================================

export const studentStats = {
  testsTaken: 42,
  pyqsSolved: 287,
  resourcesViewed: 156,
  currentRank: 324,
  accuracy: 73.5,
  timeSpent: 156, // hours
  streakDays: 12,
};

export const notificationsData = [
  {
    id: 1,
    title: "GATE 2024 Exam Results",
    message: "Results for morning shift are now available",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: 2,
    title: "New Mock Test Available",
    message: "CS Full Mock Test 2024 - Check it out!",
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
  },
  {
    id: 3,
    title: "Study Reminder",
    message: "You haven\'t solved PYQ papers in 2 days",
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  },
];

export const leaderboardData = [
  { rank: 1, name: "Arjun Singh", score: 892, branch: "CS" },
  { rank: 2, name: "Priya Sharma", score: 878, branch: "CS" },
  { rank: 3, name: "Rohit Kumar", score: 865, branch: "ME" },
  { rank: 4, name: "Sneha Gupta", score: 856, branch: "EE" },
  { rank: 5, name: "Vikram Patel", score: 843, branch: "EC" },
  { rank: 6, name: "Neha Verma", score: 832, branch: "CE" },
  { rank: 7, name: "Amita Singh", score: 821, branch: "CS" },
  { rank: 8, name: "Deepak Ray", score: 815, branch: "ME" },
  { rank: 9, name: "Richa Singh", score: 803, branch: "EE" },
  { rank: 10, name: "Sanjay Gupta", score: 798, branch: "EC" },
];

export const recentTests = [
  {
    id: 1,
    name: "CS Full Mock Test 1",
    attemptDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    score: 78,
    totalMarks: 100,
    rank: 234,
  },
  {
    id: 2,
    name: "Digital Circuits Speed Test",
    attemptDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    score: 82,
    totalMarks: 100,
    rank: 145,
  },
  {
    id: 3,
    name: "Data Structures Subject Test",
    attemptDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    score: 75,
    totalMarks: 100,
    rank: 312,
  },
];

export const upcomingTests = [
  { id: 1, name: "CS Full Mock Test 2", date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000) },
  { id: 2, name: "ME Subject Test - Thermodynamics", date: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000) },
  { id: 3, name: "EE Speed Test - Power Systems", date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) },
];

// ============================================================================
// PYQ PAPERS (Previous Year Questions)
// ============================================================================

const branches = ["CS", "ME", "EE", "EC", "CE"];
const years = [2024, 2023, 2022, 2021, 2020, 2019];
const difficulties = ["Easy", "Medium", "Hard"];

const csTopics = ["DSA", "DBMS", "OS", "Networks", "Compiler", "AI/ML"];
const meTopics = ["Thermodynamics", "Heat Transfer", "Mechanics", "Theory of Machines", "Manufacturing", "Fluid Mechanics"];
const eeTopics = ["Power Systems", "Machines", "Power Electronics", "Electrical Measurements", "Signals & Systems", "Control Systems"];
const ecTopics = ["Digital Electronics", "Analog Circuits", "Communications", "Microprocessors", "Electromagnetics", "Signals"];
const ceTopics = ["Structural Analysis", "Design of Structures", "Geotechnical", "Hydraulics", "Transportation", "Environmental"];

const topicsMap = {
  CS: csTopics,
  ME: meTopics,
  EE: eeTopics,
  EC: ecTopics,
  CE: ceTopics,
};

export const paqPapers = (() => {
  const papers = [];
  let id = 1;

  branches.forEach((branch) => {
    years.forEach((year) => {
      // Create 4-5 papers per branch per year with different topics
      const topicsForBranch = topicsMap[branch as keyof typeof topicsMap];
      topicsForBranch.forEach((topic, idx) => {
        papers.push({
          id: id++,
          branch,
          year,
          topic,
          title: `${branch} Gate ${year} - ${topic} (Session ${Math.floor(idx / 2) + 1})`,
          totalQuestions: 65,
          markingScheme: "1/2 mark for MCQ, 1/2/2 marks for NAT",
          difficulty: difficulties[idx % difficulties.length],
          session: idx < 2 ? "Morning" : "Afternoon",
          syllabus: [topic],
          bookmark: false,
          downloadCount: Math.floor(Math.random() * 500),
        });
      });
    });
  });

  return papers;
})();

// ============================================================================
// MOCK TESTS
// ============================================================================

interface MockTest {
  id: number;
  name: string;
  branch: string;
  difficulty: string;
  totalQuestions: number;
  totalMarks: number;
  duration: number;
  description: string;
  topics: string[];
  completedBy: number;
  averageScore: number;
  solutions: boolean;
  previousAttempts?: Array<{ score: number; date: Date; rank: number }>;
}

export const mockTests: MockTest[] = [
  {
    id: 1,
    name: "CS Full Mock Test 1",
    branch: "CS",
    difficulty: "Hard",
    totalQuestions: 65,
    totalMarks: 100,
    duration: 180,
    description: "Comprehensive test covering all CS topics",
    topics: ["DSA", "DBMS", "OS", "Networks", "Compiler"],
    completedBy: 3420,
    averageScore: 62.5,
    solutions: true,
    previousAttempts: [
      { score: 78, date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), rank: 234 },
    ],
  },
  {
    id: 2,
    name: "CS Full Mock Test 2",
    branch: "CS",
    difficulty: "Hard",
    totalQuestions: 65,
    totalMarks: 100,
    duration: 180,
    description: "Comprehensive test with focus on system design",
    topics: ["DSA", "DBMS", "Networks"],
    completedBy: 2890,
    averageScore: 61.2,
    solutions: true,
  },
  {
    id: 3,
    name: "ME Full Mock Test 1",
    branch: "ME",
    difficulty: "Hard",
    totalQuestions: 65,
    totalMarks: 100,
    duration: 180,
    description: "Complete ME curriculum mock exam",
    topics: ["Thermodynamics", "Heat Transfer", "Mechanics"],
    completedBy: 2340,
    averageScore: 58.9,
    solutions: true,
  },
  {
    id: 4,
    name: "EE Full Mock Test 1",
    branch: "EE",
    difficulty: "Hard",
    totalQuestions: 65,
    totalMarks: 100,
    duration: 180,
    description: "Full EE exam simulation",
    topics: ["Power Systems", "Machines", "Control Systems"],
    completedBy: 1890,
    averageScore: 59.4,
    solutions: true,
  },
  {
    id: 5,
    name: "EC Full Mock Test 1",
    branch: "EC",
    difficulty: "Hard",
    totalQuestions: 65,
    totalMarks: 100,
    duration: 180,
    description: "Complete EC branch mock test",
    topics: ["Digital Electronics", "Analog Circuits", "Communications"],
    completedBy: 1560,
    averageScore: 60.1,
    solutions: true,
  },
  {
    id: 6,
    name: "CE Full Mock Test 1",
    branch: "CE",
    difficulty: "Hard",
    totalQuestions: 65,
    totalMarks: 100,
    duration: 180,
    description: "Comprehensive CE exam simulation",
    topics: ["Structural Analysis", "Geotechnical", "Hydraulics"],
    completedBy: 1230,
    averageScore: 57.8,
    solutions: true,
  },
  {
    id: 7,
    name: "CS Full Mock Test 3",
    branch: "CS",
    difficulty: "Medium",
    totalQuestions: 65,
    totalMarks: 100,
    duration: 180,
    description: "Medium level CS test",
    topics: ["DSA", "OS"],
    completedBy: 2120,
    averageScore: 68.3,
    solutions: true,
  },
  {
    id: 8,
    name: "CS Full Mock Test 4",
    branch: "CS",
    difficulty: "Medium",
    totalQuestions: 65,
    totalMarks: 100,
    duration: 180,
    description: "Medium level CS test - Networks focus",
    topics: ["Networks", "Security"],
    completedBy: 1840,
    averageScore: 67.1,
    solutions: true,
  },
  {
    id: 9,
    name: "ME Full Mock Test 2",
    branch: "ME",
    difficulty: "Medium",
    totalQuestions: 65,
    totalMarks: 100,
    duration: 180,
    description: "Medium difficulty ME test",
    topics: ["Thermodynamics", "Mechanics"],
    completedBy: 1560,
    averageScore: 65.2,
    solutions: true,
  },
  {
    id: 10,
    name: "EE Full Mock Test 2",
    branch: "EE",
    difficulty: "Medium",
    totalQuestions: 65,
    totalMarks: 100,
    duration: 180,
    description: "Medium difficulty EE test",
    topics: ["Power Electronics", "Machines"],
    completedBy: 1340,
    averageScore: 64.8,
    solutions: true,
  },
  {
    id: 11,
    name: "EC Full Mock Test 2",
    branch: "EC",
    difficulty: "Medium",
    totalQuestions: 65,
    totalMarks: 100,
    duration: 180,
    description: "Medium difficulty EC test",
    topics: ["Digital Electronics", "Signals"],
    completedBy: 1120,
    averageScore: 66.4,
    solutions: true,
  },
  {
    id: 12,
    name: "CE Full Mock Test 2",
    branch: "CE",
    difficulty: "Medium",
    totalQuestions: 65,
    totalMarks: 100,
    duration: 180,
    description: "Medium difficulty CE test",
    topics: ["Structural Design", "Hydraulics"],
    completedBy: 890,
    averageScore: 63.9,
    solutions: true,
  },
  {
    id: 13,
    name: "CS Full Mock Test 5",
    branch: "CS",
    difficulty: "Easy",
    totalQuestions: 65,
    totalMarks: 100,
    duration: 180,
    description: "Easy level CS test for beginners",
    topics: ["Basics", "Fundamentals"],
    completedBy: 1560,
    averageScore: 75.2,
    solutions: true,
  },
  {
    id: 14,
    name: "ME Full Mock Test 3",
    branch: "ME",
    difficulty: "Easy",
    totalQuestions: 65,
    totalMarks: 100,
    duration: 180,
    description: "Easy ME test",
    topics: ["Basics"],
    completedBy: 1260,
    averageScore: 72.1,
    solutions: true,
  },
  {
    id: 15,
    name: "General Aptitude & Reasoning",
    branch: "All",
    difficulty: "Medium",
    totalQuestions: 10,
    totalMarks: 15,
    duration: 30,
    description: "General Aptitude test common to all branches",
    topics: ["Quantitative", "Verbal", "Reasoning"],
    completedBy: 8900,
    averageScore: 9.4,
    solutions: true,
  },
];

// ============================================================================
// SPEED TESTS
// ============================================================================

interface SpeedTest {
  id: number;
  name: string;
  branch: string;
  subject: string;
  difficulty: string;
  totalQuestions: number;
  totalMarks: number;
  duration: number;
  description: string;
}

export const speedTests: SpeedTest[] = [
  // CS Speed Tests
  { id: 101, name: "DSA Basics", branch: "CS", subject: "DSA", difficulty: "Easy", totalQuestions: 10, totalMarks: 15, duration: 15, description: "Quick DSA fundamentals test" },
  { id: 102, name: "Trees & Graphs", branch: "CS", subject: "DSA", difficulty: "Medium", totalQuestions: 15, totalMarks: 22.5, duration: 20, description: "DSA advanced topics" },
  { id: 103, name: "DBMS Basics", branch: "CS", subject: "DBMS", difficulty: "Easy", totalQuestions: 10, totalMarks: 15, duration: 15, description: "Database fundamentals" },
  { id: 104, name: "SQL & Normalization", branch: "CS", subject: "DBMS", difficulty: "Medium", totalQuestions: 15, totalMarks: 22.5, duration: 20, description: "Advanced DBMS concepts" },
  { id: 105, name: "OS Basics", branch: "CS", subject: "OS", difficulty: "Easy", totalQuestions: 10, totalMarks: 15, duration: 15, description: "Operating systems fundamentals" },
  { id: 106, name: "Process Management", branch: "CS", subject: "OS", difficulty: "Hard", totalQuestions: 20, totalMarks: 30, duration: 25, description: "Complex OS topics" },
  { id: 107, name: "Networks Basics", branch: "CS", subject: "Networks", difficulty: "Easy", totalQuestions: 10, totalMarks: 15, duration: 15, description: "Network fundamentals" },
  { id: 108, name: "TCP/IP & Protocols", branch: "CS", subject: "Networks", difficulty: "Hard", totalQuestions: 20, totalMarks: 30, duration: 25, description: "Advanced networking" },

  // ME Speed Tests
  { id: 201, name: "Thermodynamics Basics", branch: "ME", subject: "Thermodynamics", difficulty: "Easy", totalQuestions: 10, totalMarks: 15, duration: 15, description: "Thermo fundamentals" },
  { id: 202, name: "Heat Transfer", branch: "ME", subject: "Heat Transfer", difficulty: "Medium", totalQuestions: 15, totalMarks: 22.5, duration: 20, description: "Conduction, Convection, Radiation" },
  { id: 203, name: "Mechanics Basics", branch: "ME", subject: "Mechanics", difficulty: "Easy", totalQuestions: 10, totalMarks: 15, duration: 15, description: "Classical mechanics" },
  { id: 204, name: "Fluid Mechanics", branch: "ME", subject: "Fluid Mechanics", difficulty: "Hard", totalQuestions: 20, totalMarks: 30, duration: 25, description: "Advanced fluid flow" },

  // EE Speed Tests
  { id: 301, name: "Power Systems Basics", branch: "EE", subject: "Power Systems", difficulty: "Easy", totalQuestions: 10, totalMarks: 15, duration: 15, description: "Power system fundamentals" },
  { id: 302, name: "Power Electronics", branch: "EE", subject: "Power Electronics", difficulty: "Medium", totalQuestions: 15, totalMarks: 22.5, duration: 20, description: "Converters and devices" },
  { id: 303, name: "Control Systems Basics", branch: "EE", subject: "Control Systems", difficulty: "Easy", totalQuestions: 10, totalMarks: 15, duration: 15, description: "Control theory basics" },
  { id: 304, name: "Machines", branch: "EE", subject: "Electrical Machines", difficulty: "Hard", totalQuestions: 20, totalMarks: 30, duration: 25, description: "DC, AC, and synchronous machines" },

  // EC Speed Tests
  { id: 401, name: "Digital Basics", branch: "EC", subject: "Digital Electronics", difficulty: "Easy", totalQuestions: 10, totalMarks: 15, duration: 15, description: "Digital circuit fundamentals" },
  { id: 402, name: "Microprocessors", branch: "EC", subject: "Microprocessors", difficulty: "Medium", totalQuestions: 15, totalMarks: 22.5, duration: 20, description: "8085, 8086, ARM basics" },
  { id: 403, name: "Analog Circuits", branch: "EC", subject: "Analog Circuits", difficulty: "Medium", totalQuestions: 15, totalMarks: 22.5, duration: 20, description: "Op-amps and amplifiers" },
  { id: 404, name: "Communications", branch: "EC", subject: "Communications", difficulty: "Hard", totalQuestions: 20, totalMarks: 30, duration: 25, description: "AM, FM, digital communications" },

  // CE Speed Tests
  { id: 501, name: "Structural Basics", branch: "CE", subject: "Structures", difficulty: "Easy", totalQuestions: 10, totalMarks: 15, duration: 15, description: "Structural analysis basics" },
  { id: 502, name: "RCC & Steel Design", branch: "CE", subject: "Design", difficulty: "Medium", totalQuestions: 15, totalMarks: 22.5, duration: 20, description: "Material design concepts" },
  { id: 503, name: "Geotechnical", branch: "CE", subject: "Geotechnical", difficulty: "Medium", totalQuestions: 15, totalMarks: 22.5, duration: 20, description: "Soil properties and bearing capacity" },
  { id: 504, name: "Hydraulics", branch: "CE", subject: "Hydraulics", difficulty: "Hard", totalQuestions: 20, totalMarks: 30, duration: 25, description: "Flow and channel design" },
];

// ============================================================================
// STUDY RESOURCES (Lectures, Notes, Documents)
// ============================================================================

interface StudyResource {
  id: number;
  type: "lecture" | "notes" | "document";
  branch: string;
  subject: string;
  topic: string;
  title: string;
  instructor?: string;
  duration?: number; // minutes for videos
  description: string;
  difficulty: string;
  rating: number;
  downloads: number;
  views: number;
  bookmark: boolean;
}

export const studyResources: StudyResource[] = [
  // CS Lectures
  { id: 1, type: "lecture", branch: "CS", subject: "DSA", topic: "Arrays & Strings", title: "Arrays Fundamentals - Lecture 1", instructor: "Dr. Karan Singh", duration: 45, description: "Complete array concepts and operations", difficulty: "Easy", rating: 4.8, downloads: 2340, views: 5600, bookmark: false },
  { id: 2, type: "lecture", branch: "CS", subject: "DSA", topic: "Arrays & Strings", title: "String Manipulation - Lecture 2", instructor: "Dr. Karan Singh", duration: 52, description: "String algorithms and pattern matching", difficulty: "Medium", rating: 4.7, downloads: 1890, views: 4200, bookmark: false },
  { id: 3, type: "lecture", branch: "CS", subject: "DSA", topic: "Linked Lists", title: "Linked Lists Complete", instructor: "Prof. Arun Kumar", duration: 58, description: "Singly and doubly linked lists", difficulty: "Medium", rating: 4.6, downloads: 1560, views: 3400, bookmark: false },
  { id: 4, type: "lecture", branch: "CS", subject: "DBMS", topic: "SQL Basics", title: "SQL Fundamentals", instructor: "Dr. Priya Sharma", duration: 60, description: "SQL queries and database operations", difficulty: "Easy", rating: 4.9, downloads: 3120, views: 6800, bookmark: false },
  { id: 5, type: "lecture", branch: "CS", subject: "DBMS", topic: "Normalization", title: "Database Normalization", instructor: "Dr. Priya Sharma", duration: 75, description: "1NF to BCNF explained", difficulty: "Hard", rating: 4.5, downloads: 980, views: 2100, bookmark: false },
  { id: 6, type: "lecture", branch: "CS", subject: "OS", topic: "Process Management", title: "Processes & Threads", instructor: "Prof. Rajesh Verma", duration: 90, description: "Process creation, scheduling, and synchronization", difficulty: "Hard", rating: 4.7, downloads: 1340, views: 3200, bookmark: false },
  { id: 7, type: "lecture", branch: "CS", subject: "OS", topic: "Memory Management", title: "Virtual Memory & Paging", instructor: "Prof. Rajesh Verma", duration: 85, description: "Memory allocation and page replacement", difficulty: "Hard", rating: 4.6, downloads: 1120, views: 2800, bookmark: false },
  { id: 8, type: "lecture", branch: "CS", subject: "Networks", topic: "OSI Model", title: "Network Layers Explained", instructor: "Dr. Aman Singh", duration: 70, description: "Complete OSI model walkthrough", difficulty: "Medium", rating: 4.8, downloads: 2560, views: 5400, bookmark: false },
  { id: 9, type: "lecture", branch: "CS", subject: "Networks", topic: "TCP/IP", title: "TCP/IP Protocol Suite", instructor: "Dr. Aman Singh", duration: 95, description: "Transport and application layer protocols", difficulty: "Hard", rating: 4.6, downloads: 1680, views: 3600, bookmark: false },

  // ME Lectures
  { id: 21, type: "lecture", branch: "ME", subject: "Thermodynamics", topic: "Laws of Thermo", title: "First & Second Law Concepts", instructor: "Prof. Vikram Patel", duration: 80, description: "Fundamental thermodynamic laws with examples", difficulty: "Medium", rating: 4.7, downloads: 1890, views: 4200, bookmark: false },
  { id: 22, type: "lecture", branch: "ME", subject: "Heat Transfer", topic: "Conduction", title: "Heat Conduction Analysis", instructor: "Dr. Neha Gupta", duration: 75, description: "Fourier's law and heat conduction problems", difficulty: "Hard", rating: 4.6, downloads: 1340, views: 2900, bookmark: false },
  { id: 23, type: "lecture", branch: "ME", subject: "Mechanics", topic: "Dynamics", title: "Kinematics & Dynamics", instructor: "Prof. Suresh Kumar", duration: 70, description: "Motion analysis and force calculations", difficulty: "Medium", rating: 4.8, downloads: 2120, views: 4800, bookmark: false },
  { id: 24, type: "lecture", branch: "ME", subject: "Fluid Mechanics", topic: "Flow Analysis", title: "Fluid Dynamics Principles", instructor: "Dr. Arjun Singh", duration: 85, description: "Bernoulli's equation and flow calculations", difficulty: "Hard", rating: 4.7, downloads: 1560, views: 3400, bookmark: false },

  // EE Lectures
  { id: 41, type: "lecture", branch: "EE", subject: "Power Systems", topic: "Load Flow", title: "Power Flow Analysis", instructor: "Prof. Deepak Ray", duration: 90, description: "Load flow studies and fault analysis", difficulty: "Hard", rating: 4.6, downloads: 1120, views: 2600, bookmark: false },
  { id: 42, type: "lecture", branch: "EE", subject: "Power Electronics", topic: "Converters", title: "AC-DC Converters", instructor: "Dr. Richa Singh", duration: 80, description: "Rectifiers and converter circuits", difficulty: "Hard", rating: 4.7, downloads: 1340, views: 3000, bookmark: false },
  { id: 43, type: "lecture", branch: "EE", subject: "Control Systems", topic: "Stability", title: "System Stability Analysis", instructor: "Prof. Sanjay Gupta", duration: 75, description: "Routh-Hurwitz and Nyquist criteria", difficulty: "Hard", rating: 4.8, downloads: 1680, views: 3600, bookmark: false },
  { id: 44, type: "lecture", branch: "EE", subject: "Electrical Machines", topic: "Induction Motors", title: "3-Phase Induction Motors", instructor: "Dr. Amit Sharma", duration: 85, description: "Motor construction, operation, and characteristics", difficulty: "Hard", rating: 4.6, downloads: 1890, views: 4000, bookmark: false },

  // EC Lectures
  { id: 61, type: "lecture", branch: "EC", subject: "Digital Electronics", topic: "Logic Gates", title: "Digital Logic & Gates", instructor: "Prof. Sneha Verma", duration: 60, description: "Logic gates and boolean algebra", difficulty: "Easy", rating: 4.9, downloads: 3400, views: 7200, bookmark: false },
  { id: 62, type: "lecture", branch: "EC", subject: "Analog Circuits", topic: "Amplifiers", title: "Op-Amp Applications", instructor: "Dr. Rohit Sharma", duration: 75, description: "Operational amplifier circuits and applications", difficulty: "Medium", rating: 4.7, downloads: 2100, views: 4800, bookmark: false },
  { id: 63, type: "lecture", branch: "EC", subject: "Communications", topic: "Modulation", title: "AM & FM Modulation", instructor: "Prof. Arjun Verma", duration: 85, description: "Analog modulation techniques", difficulty: "Hard", rating: 4.6, downloads: 1560, views: 3200, bookmark: false },
  { id: 64, type: "lecture", branch: "EC", subject: "Microprocessors", topic: "8085", title: "8085 Microprocessor", instructor: "Dr. Pooja Singh", duration: 90, description: "8085 architecture and programming", difficulty: "Hard", rating: 4.7, downloads: 1840, views: 4000, bookmark: false },

  // CE Lectures
  { id: 81, type: "lecture", branch: "CE", subject: "Structures", topic: "Analysis Methods", title: "Structural Analysis Methods", instructor: "Prof. Vikram Mehta", duration: 80, description: "Method of joints and sections", difficulty: "Medium", rating: 4.6, downloads: 1340, views: 2800, bookmark: false },
  { id: 82, type: "lecture", branch: "CE", subject: "Design", topic: "RCC", title: "RCC Beam & Slab Design", instructor: "Dr. Suresh Patel", duration: 85, description: "Limit state design of RCC members", difficulty: "Hard", rating: 4.7, downloads: 1560, views: 3200, bookmark: false },
  { id: 83, type: "lecture", branch: "CE", subject: "Geotechnical", topic: "Soil Properties", title: "Soil Mechanics Basics", instructor: "Prof. Arun Kumar", duration: 90, description: "Soil classification and properties", difficulty: "Medium", rating: 4.6, downloads: 1120, views: 2600, bookmark: false },
  { id: 84, type: "lecture", branch: "CE", subject: "Hydraulics", topic: "Channels", title: "Open Channel Flow", instructor: "Dr. Neha Sharma", duration: 80, description: "Flow in open channels and discharge", difficulty: "Hard", rating: 4.7, downloads: 1340, views: 2900, bookmark: false },

  // Notes for all branches
  { id: 101, type: "notes", branch: "CS", subject: "DSA", topic: "Arrays & Strings", title: "Arrays - Complete Notes", description: "Comprehensive notes on array operations", difficulty: "Easy", rating: 4.8, downloads: 4500, views: 9200, bookmark: false },
  { id: 102, type: "notes", branch: "CS", subject: "DBMS", topic: "SQL", title: "SQL Query Guide", description: "SQL syntax and query optimization", difficulty: "Medium", rating: 4.7, downloads: 3800, views: 7600, bookmark: false },
  { id: 103, type: "notes", branch: "ME", subject: "Thermodynamics", topic: "Laws", title: "Thermodynamic Laws Summary", description: "Quick reference for thermodynamic laws", difficulty: "Medium", rating: 4.6, downloads: 2100, views: 4400, bookmark: false },
  { id: 104, type: "notes", branch: "EE", subject: "Power Systems", topic: "Load Flow", title: "Load Flow Analysis Notes", description: "Detailed load flow analysis notes", difficulty: "Hard", rating: 4.7, downloads: 1800, views: 3600, bookmark: false },
  { id: 105, type: "notes", branch: "EC", subject: "Digital Electronics", topic: "Gates", title: "Logic Gates Reference", description: "Truth tables and gate operations", difficulty: "Easy", rating: 4.9, downloads: 5200, views: 10400, bookmark: false },
  { id: 106, type: "notes", branch: "CE", subject: "Structures", topic: "Analysis", title: "Structural Analysis Quick Guide", description: "Method of joints, sections explained", difficulty: "Medium", rating: 4.6, downloads: 1600, views: 3200, bookmark: false },
  { id: 107, type: "notes", branch: "CS", subject: "OS", topic: "Processes", title: "OS Process Management", description: "Process scheduling and synchronization", difficulty: "Hard", rating: 4.7, downloads: 1900, views: 3800, bookmark: false },
  { id: 108, type: "notes", branch: "ME", subject: "Heat Transfer", topic: "Conduction", title: "Heat Transfer Formulas", description: "Key formulas for heat transfer", difficulty: "Medium", rating: 4.8, downloads: 2400, views: 4800, bookmark: false },

  // Official Documents
  { id: 201, type: "document", branch: "CS", subject: "DSA", topic: "All", title: "DSA Complete Handbook PDF", description: "Official GATE curriculum handbook for DSA", difficulty: "Medium", rating: 4.9, downloads: 6700, views: 13200, bookmark: false },
  { id: 202, type: "document", branch: "Multiple", subject: "General", topic: "Syllabus", title: "GATE Syllabus 2024", description: "Complete GATE exam syllabus for all branches", difficulty: "Easy", rating: 5.0, downloads: 12000, views: 24000, bookmark: false },
  { id: 203, type: "document", branch: "Multiple", subject: "General", topic: "Instructions", title: "GATE Exam Instructions", description: "Official instructions and guidelines", difficulty: "Easy", rating: 4.8, downloads: 5600, views: 11200, bookmark: false },
  { id: 204, type: "document", branch: "Multiple", subject: "General", topic: "Formulas", title: "Essential Formulas Sheet", description: "Important formulas for all branches", difficulty: "Medium", rating: 4.9, downloads: 8900, views: 17800, bookmark: false },
];

// ============================================================================
// MENTORS
// ============================================================================

interface Mentor {
  id: number;
  name: string;
  branch: string;
  specialization: string[];
  gateScore: number;
  gateYear: number;
  qualifications: string;
  rating: number;
  totalReviews: number;
  sessionsCompleted: number;
  hourlyRate: number;
  successRate: number;
  availability: string[];
  imageUrl?: string;
  bio: string;
  reviews: Array<{ rating: number; comment: string; student: string }>;
}

export const mentorsList: Mentor[] = [
  {
    id: 1,
    name: "Dr. Arjun Singh",
    branch: "CS",
    specialization: ["DSA", "DBMS", "OS"],
    gateScore: 965,
    gateYear: 2021,
    qualifications: "PhD IIT Delhi, 8 years experience",
    rating: 4.9,
    totalReviews: 234,
    sessionsCompleted: 542,
    hourlyRate: 500,
    successRate: 94,
    availability: ["Mon-Fri 6-10 PM", "Sat 2-6 PM"],
    bio: "Expert in Data Structures and Database Management. Published researcher in algorithms.",
    reviews: [
      { rating: 5, comment: "Excellent! Very clear explanations.", student: "Priya M." },
      { rating: 5, comment: "Best for DSA concepts", student: "Rohit K." },
      { rating: 4, comment: "Highly knowledgeable mentor", student: "Sneha G." },
    ],
  },
  {
    id: 2,
    name: "Prof. Vikram Patel",
    branch: "ME",
    specialization: ["Thermodynamics", "Heat Transfer", "Mechanics"],
    gateScore: 932,
    gateYear: 2020,
    qualifications: "M.Tech NIT, 6 years experience",
    rating: 4.8,
    totalReviews: 189,
    sessionsCompleted: 456,
    hourlyRate: 450,
    successRate: 91,
    availability: ["Tue-Fri 5-9 PM", "Sun 3-7 PM"],
    bio: "ME toppers' choice. Excellent at breaking down complex thermodynamics.",
    reviews: [
      { rating: 5, comment: "Makes tough concepts simple", student: "Deepak R." },
      { rating: 4, comment: "Very patient and supportive", student: "Neha V." },
      { rating: 5, comment: "Perfect for ME preparation", student: "Ram K." },
    ],
  },
  {
    id: 3,
    name: "Dr. Richa Singh",
    branch: "EE",
    specialization: ["Power Electronics", "Machines", "Control Systems"],
    gateScore: 945,
    gateYear: 2019,
    qualifications: "PhD BITS, 7 years experience",
    rating: 4.8,
    totalReviews: 203,
    sessionsCompleted: 512,
    hourlyRate: 500,
    successRate: 92,
    availability: ["Mon-Wed 7-10 PM", "Sat-Sun 4-8 PM"],
    bio: "Power systems specialist. Helped 100+ students crack GATE in EE.",
    reviews: [
      { rating: 5, comment: "Power systems expert", student: "Ankit S." },
      { rating: 5, comment: "Exceptional teaching", student: "Aisha K." },
      { rating: 4, comment: "Very thorough approach", student: "Mohit G." },
    ],
  },
  {
    id: 4,
    name: "Prof. Sneha Verma",
    branch: "EC",
    specialization: ["Digital Electronics", "Microprocessors", "Communications"],
    gateScore: 928,
    gateYear: 2021,
    qualifications: "M.Tech Delhi University, 5 years experience",
    rating: 4.7,
    totalReviews: 156,
    sessionsCompleted: 389,
    hourlyRate: 400,
    successRate: 89,
    availability: ["Tue-Thu 6-9 PM", "Fri-Sat 3-7 PM"],
    bio: "EC specialist with focus on digital systems and microprocessors.",
    reviews: [
      { rating: 5, comment: "Great with digital logic", student: "Aman P." },
      { rating: 4, comment: "Clear and concise teaching", student: "Zara S." },
      { rating: 5, comment: "Helped me clear EC easily", student: "Karan M." },
    ],
  },
  {
    id: 5,
    name: "Dr. Suresh Patel",
    branch: "CE",
    specialization: ["Structural Design", "RCC", "Geotechnical"],
    gateScore: 918,
    gateYear: 2020,
    qualifications: "PhD NIT Surathkal, 8 years experience",
    rating: 4.8,
    totalReviews: 172,
    sessionsCompleted: 467,
    hourlyRate: 450,
    successRate: 90,
    availability: ["Mon-Wed 7-11 PM", "Sat 5-9 PM"],
    bio: "CE toppers' mentor. Specializes in structural and geotechnical engineering.",
    reviews: [
      { rating: 5, comment: "Expert in RCC design", student: "Vikram K." },
      { rating: 5, comment: "Very thorough explanations", student: "Priya S." },
      { rating: 4, comment: "Great problem-solving skills", student: "Rahul M." },
    ],
  },
  {
    id: 6,
    name: "Prof. Arun Kumar",
    branch: "CS",
    specialization: ["Networks", "Security", "Compiler Design"],
    gateScore: 941,
    gateYear: 2022,
    qualifications: "M.Tech IIT Bombay, 4 years experience",
    rating: 4.7,
    totalReviews: 142,
    sessionsCompleted: 334,
    hourlyRate: 450,
    successRate: 88,
    availability: ["Mon-Thu 6-9 PM", "Sat 2-6 PM"],
    bio: "Networks and security expert. Helps students understand complex protocols easily.",
    reviews: [
      { rating: 5, comment: "Networks made easy", student: "Simran K." },
      { rating: 4, comment: "Good communication", student: "Nikhil P." },
      { rating: 4, comment: "Very helpful mentor", student: "Ananya R." },
    ],
  },
  {
    id: 7,
    name: "Dr. Neha Gupta",
    branch: "ME",
    specialization: ["Heat Transfer", "Fluid Mechanics"],
    gateScore: 936,
    gateYear: 2021,
    qualifications: "PhD IIT Madras, 6 years experience",
    rating: 4.9,
    totalReviews: 198,
    sessionsCompleted: 501,
    hourlyRate: 480,
    successRate: 93,
    availability: ["Tue-Fri 7-10 PM", "Sun 4-8 PM"],
    bio: "Thermal and fluid mechanics specialist. Exceptional at visualizing complex phenomena.",
    reviews: [
      { rating: 5, comment: "Best heat transfer mentor", student: "Sanjay V." },
      { rating: 5, comment: "Fluids made simple", student: "Kavya S." },
      { rating: 5, comment: "Outstanding explanations", student: "Ravi P." },
    ],
  },
  {
    id: 8,
    name: "Prof. Deepak Ray",
    branch: "EE",
    specialization: ["Power Systems", "Network Analysis"],
    gateScore: 951,
    gateYear: 2019,
    qualifications: "M.Tech IIT Kharagpur, 7 years experience",
    rating: 4.8,
    totalReviews: 210,
    sessionsCompleted: 523,
    hourlyRate: 520,
    successRate: 94,
    availability: ["Mon-Tue-Thu 7-10 PM", "Fri-Sat 5-8 PM"],
    bio: "Power systems and network analysis expert. Thorough and dedicated mentor.",
    reviews: [
      { rating: 5, comment: "Excellent power systems mentor", student: "Gaurav M." },
      { rating: 5, comment: "Very patient and helpful", student: "Meera K." },
      { rating: 5, comment: "Great at explanations", student: "Arjun S." },
    ],
  },
  {
    id: 9,
    name: "Dr. Pooja Singh",
    branch: "EC",
    specialization: ["Microprocessors", "Digital Design", "Embedded Systems"],
    gateScore: 934,
    gateYear: 2020,
    qualifications: "PhD Delhi University, 5 years experience",
    rating: 4.7,
    totalReviews: 165,
    sessionsCompleted: 408,
    hourlyRate: 430,
    successRate: 87,
    availability: ["Wed-Fri 6-9 PM", "Sat-Sun 3-7 PM"],
    bio: "Microprocessor and digital systems expert with practical implementation experience.",
    reviews: [
      { rating: 5, comment: "Microprocessor guru", student: "Siddharth R." },
      { rating: 4, comment: "Clear concepts", student: "Divya K." },
      { rating: 4, comment: "Great teaching methodology", student: "Harsh M." },
    ],
  },
  {
    id: 10,
    name: "Prof. Rajesh Verma",
    branch: "CS",
    specialization: ["OS", "Concurrency", "System Design"],
    gateScore: 955,
    gateYear: 2021,
    qualifications: "M.Tech NIT Delhi, 6 years experience",
    rating: 4.9,
    totalReviews: 225,
    sessionsCompleted: 578,
    hourlyRate: 530,
    successRate: 95,
    availability: ["Mon-Wed-Fri 6-10 PM", "Sat-Sun 3-9 PM"],
    bio: "OS and system design expert. Known for depth and clarity in complex topics.",
    reviews: [
      { rating: 5, comment: "Best OS mentor", student: "Ashok K." },
      { rating: 5, comment: "Exceptional teacher", student: "Ritika P." },
      { rating: 5, comment: "Made OS crystal clear", student: "Vikram S." },
    ],
  },
  {
    id: 11,
    name: "Dr. Akansha Sharma",
    branch: "ME",
    specialization: ["Manufacturing", "Theory of Machines"],
    gateScore: 924,
    gateYear: 2020,
    qualifications: "PhD IIT Bombay, 5 years experience",
    rating: 4.7,
    totalReviews: 138,
    sessionsCompleted: 342,
    hourlyRate: 420,
    successRate: 86,
    availability: ["Tue-Thu 7-10 PM", "Sat 4-8 PM"],
    bio: "Manufacturing and theory of machines specialist. Passionate about mechatronics.",
    reviews: [
      { rating: 5, comment: "Great manufacturing mentor", student: "Neeraj K." },
      { rating: 4, comment: "Very knowledgeable", student: "Meenal S." },
      { rating: 4, comment: "Good problem solver", student: "Aryan P." },
    ],
  },
  {
    id: 12,
    name: "Prof. Sanjay Gupta",
    branch: "EE",
    specialization: ["Control Systems", "Signals & Systems"],
    gateScore: 938,
    gateYear: 2022,
    qualifications: "M.Tech BITS Pilani, 4 years experience",
    rating: 4.6,
    totalReviews: 129,
    sessionsCompleted: 312,
    hourlyRate: 400,
    successRate: 85,
    availability: ["Mon-Thu 6-9 PM", "Fri-Sun 5-8 PM"],
    bio: "Control systems and signal processing specialist. Good at practical applications.",
    reviews: [
      { rating: 4, comment: "Control systems expert", student: "Kunal M." },
      { rating: 5, comment: "Very helpful sessions", student: "Prachi K." },
      { rating: 4, comment: " 4Good fundamentals", student: "Anand P." },
    ],
  },
  {
    id: 13,
    name: "Dr. Vikram Mehta",
    branch: "CE",
    specialization: ["Structural Analysis", "Concrete Design"],
    gateScore: 929,
    gateYear: 2019,
    qualifications: "PhD NIT Rourkee, 7 years experience",
    rating: 4.8,
    totalReviews: 189,
    sessionsCompleted: 467,
    hourlyRate: 480,
    successRate: 91,
    availability: ["Tue-Fri 7-11 PM", "Sat-Sun 5-9 PM"],
    bio: "Structural analysis and concrete design expert. Very thorough in approach.",
    reviews: [
      { rating: 5, comment: "Structural design expert", student: "Varun K." },
      { rating: 5, comment: "Excellent mentor", student: "Ankita S." },
      { rating: 4, comment: "Very detailed explanations", student: "Manish P." },
    ],
  },
  {
    id: 14,
    name: "Prof. Aman Sharma",
    branch: "EC",
    specialization: ["Analog Circuits", "Signal Processing"],
    gateScore: 922,
    gateYear: 2021,
    qualifications: "M.Tech DTU, 4 years experience",
    rating: 4.6,
    totalReviews: 112,
    sessionsCompleted: 278,
    hourlyRate: 380,
    successRate: 82,
    availability: ["Wed-Fri 6-9 PM", "Sat-Sun 2-6 PM"],
    bio: "Analog circuits and signal processing specialist with hands-on experience.",
    reviews: [
      { rating: 4, comment: "Good mentor", student: "Chandni K." },
      { rating: 5, comment: "Analog circuits made easy", student: "Rohan S." },
      { rating: 4, comment: "Very supportive", student: "Tara P." },
    ],
  },
  {
    id: 15,
    name: "Dr. Aditya Singh",
    branch: "CS",
    specialization: ["Compiler Design", "Algorithm Design"],
    gateScore: 949,
    gateYear: 2020,
    qualifications: "PhD IIT Delhi, 6 years experience",
    rating: 4.7,
    totalReviews: 167,
    sessionsCompleted: 421,
    hourlyRate: 500,
    successRate: 89,
    availability: ["Mon-Wed-Fri 7-10 PM", "Sat 3-7 PM"],
    bio: "Compiler design and algorithm expert. Great at competitive programming too.",
    reviews: [
      { rating: 5, comment: "Best for algorithms", student: "Harsh K." },
      { rating: 4, comment: "Very knowledgeable", student: "Isha P." },
      { rating: 5, comment: "Excellent guidance", student: "Omkar S." },
    ],
  },
];

// ============================================================================
// COMMUNITY DATA
// ============================================================================

interface CommunityPost {
  id: number;
  type: "announcement" | "question" | "tip";
  title: string;
  content: string;
  author: string;
  date: Date;
  likes: number;
  shares: number;
  category?: string;
  answers?: number;
  views?: number;
}

export const communityPosts: CommunityPost[] = [
  // Announcements
  {
    id: 1,
    type: "announcement",
    title: "GATE 2024 Exam Schedule Released",
    content: "The official GATE 2024 exam schedule has been announced. Registration opens from Oct 2023. Visit official.gate.iit.ac.in for details.",
    author: "Admissions Team",
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    likes: 145,
    shares: 89,
    views: 3400,
  },
  {
    id: 2,
    type: "announcement",
    title: "New Study Materials Added",
    content: "We have added 50+ new video lectures and practice papers across all branches. Check the Study Resources section to access them.",
    author: "Content Team",
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    likes: 234,
    shares: 123,
    views: 5600,
  },
  {
    id: 3,
    type: "announcement",
    title: "Mentor Availability Update",
    content: "Our mentor community has expanded! Now connecting with 15+ experienced mentors across all branches. Book your first session today!",
    author: "Mentor Program",
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    likes: 189,
    shares: 98,
    views: 4200,
  },
  {
    id: 4,
    type: "announcement",
    title: "Important: New RLS Policies Updated",
    content: "Student row-level security policies have been fixed. All data access now properly authenticated. Thank you for your patience!",
    author: "Tech Support",
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    likes: 56,
    shares: 34,
    views: 1200,
  },
  {
    id: 5,
    type: "announcement",
    title: "Weekly Webinar Series Starting",
    content: "Join us for weekly webinars with top GATE mentors. Topics: Strategy, Time Management, Subject-specific Tips. Register now!",
    author: "Learning Team",
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    likes: 198,
    shares: 145,
    views: 4800,
  },

  // Preparation Tips
  {
    id: 101,
    type: "tip",
    title: "Time Management Strategy for GATE",
    category: "Strategy",
    content: "Allocate 70% time for your main branch subject, 20% for engineering mathematics, and 10% for general aptitude. Adjust based on your strengths.",
    author: "Dr. Arjun Singh (Mentor)",
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    likes: 567,
    shares: 289,
  },
  {
    id: 102,
    type: "tip",
    title: "Effective PYQ Solving Approach",
    category: "Study Tips",
    content: "Solve PYQs topicwise first, then branch-wise, and finally mixed. This helps you understand question patterns and topic weightage effectively.",
    author: "Prof. Vikram Patel (Mentor)",
    date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
    likes: 423,
    shares: 201,
  },
  {
    id: 103,
    type: "tip",
    title: "Mastering Digital Electronics for EC",
    category: "Subject Guide",
    content: "Focus on K-maps, multiplexers, and flip-flops first. These form the foundation for more complex digital design. Practice is key!",
    author: "Prof. Sneha Verma (Mentor)",
    date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    likes: 312,
    shares: 156,
  },
  {
    id: 104,
    type: "tip",
    title: "Thermodynamics Made Easy",
    category: "Subject Guide",
    content: "Draw diagrams for every process. Understand P-V diagrams, T-S diagrams, and H-S diagrams. Visual understanding helps a lot!",
    author: "Dr. Neha Gupta (Mentor)",
    date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    likes: 389,
    shares: 174,
  },
  {
    id: 105,
    type: "tip",
    title: "Last Month Preparation",
    category: "Strategy",
    content: "In the final month: 40% revision, 40% mock tests, 20% weak areas. Don't learn anything new. Focus on accuracy and speed.",
    author: "Top GATE Ranker",
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    likes: 678,
    shares: 345,
  },
  {
    id: 106,
    type: "tip",
    title: "Handling Negative Marking",
    category: "Exam Tips",
    content: "In MCQs, mark only if 80%+ confident. Leave NATs that look difficult. It's better to get guaranteed 1 mark than risk losing 0.33 marks.",
    author: "Exam Strategist",
    date: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000),
    likes: 445,
    shares: 223,
  },

  // Q&A Questions
  {
    id: 201,
    type: "question",
    title: "How to approach DBMS queries?",
    content: "I struggle with complex SQL queries especially with joins. Any tips on how to systematize my approach?",
    author: "Rohit Kumar",
    date: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000),
    likes: 234,
    shares: 0,
    answers: 5,
    views: 1200,
  },
  {
    id: 202,
    type: "question",
    title: "Best way to memorize formulas?",
    content: "I have difficulty memorizing mechanical engineering formulas. Should I derive them every time or memorize?",
    author: "Priya Sharma",
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    likes: 187,
    shares: 0,
    answers: 8,
    views: 980,
  },
  {
    id: 203,
    type: "question",
    title: "Time management in exams",
    content: "How should I manage time during the exam? Should I attempt MCQ first or NAT first?",
    author: "Aman Singh",
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    likes: 312,
    shares: 0,
    answers: 12,
    views: 1567,
  },
  {
    id: 204,
    type: "question",
    title: "How many mock tests should I take?",
    content: "Is 20 full tests enough or should I do more? I want to optimize my study plan.",
    author: "Sneha Gupta",
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    likes: 456,
    shares: 0,
    answers: 15,
    views: 2345,
  },
  {
    id: 205,
    type: "question",
    title: "Struggling with OS scheduling algorithms",
    content: "Can anyone explain FCFS, SJF, and Round Robin scheduling clearly? I always get confused.",
    author: "Karan Verma",
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    likes: 189,
    shares: 0,
    answers: 7,
    views: 823,
  },
  {
    id: 206,
    type: "question",
    title: "Power Systems analysis tutorial",
    content: "Can someone recommend the best way to learn load flow analysis? Books/videos/notes?",
    author: "Neha Sharma",
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    likes: 142,
    shares: 0,
    answers: 6,
    views: 645,
  },
];

// ============================================================================
// SUBJECTS DATA (Detailed Subject Information)
// ============================================================================

interface Subject {
  id: number;
  code: string;
  name: string;
  branch: string;
  description: string;
  marks: number;
  topics: string[];
  keyFormulas: string[];
  relatedResources?: number[]; // IDs of related study resources
  enrollment: number;
  avgScore: number;
}

export const subjectsData: Subject[] = [
  // CS Subjects
  {
    id: 1,
    code: "CS01",
    name: "Data Structures and Algorithms",
    branch: "CS",
    description: "Foundation for problem-solving using data structures and efficient algorithms.",
    marks: 13,
    topics: [
      "Arrays and Lists", "Linked Lists", "Stacks and Queues", "Trees (Binary, BST, AVL)", "Graphs",
      "Sorting Algorithms (Quick, Merge, Heap)", "Searching Algorithms", "Hash Tables", "Heaps",
      "Dynamic Programming", "Greedy Algorithms", "Bit Manipulation", "String Algorithms"
    ],
    keyFormulas: [
      "Time Complexity Analysis", "Master Theorem", "Recurrence Relations",
      "Big O Notation", "Space Complexity"
    ],
    enrollment: 12450,
    avgScore: 73.5,
  },
  {
    id: 2,
    code: "CS02",
    name: "Database Management Systems",
    branch: "CS",
    description: "Design and management of databases, SQL, and database systems.",
    marks: 13,
    topics: [
      "Database Design", "ER Model", "Relational Model", "SQL (DDL, DML, DCL)", "Normalization (1NF-BCNF)",
      "Transactions (ACID)", "Concurrency Control", "Locking Mechanisms", "Deadlock", "File Organization",
      "Indexing", "Query Optimization", "NoSQL Basics", "Backup and Recovery"
    ],
    keyFormulas: [
      "Normal Forms", "Join Operations", "Functional Dependencies",
      "ACID Properties", "Serialization"
    ],
    enrollment: 11890,
    avgScore: 71.2,
  },
  {
    id: 3,
    code: "CS03",
    name: "Operating Systems",
    branch: "CS",
    description: "System software managing hardware and application interactions.",
    marks: 13,
    topics: [
      "Process Management", "Scheduling Algorithms (FCFS, SJF, RR, Priority)", "Synchronization",
      "Semaphores and Mutexes", "Deadlock", "Memory Management", "Virtual Memory", "Paging",
      "Segmentation", "File Systems", "I/O Management", "Disk Scheduling", "Security and Protection"
    ],
    keyFormulas: [
      "Scheduling Metrics (AWT, TAT)", "Page Replacement Algorithms",
      "Banker's Algorithm", "Semaphore operations"
    ],
    enrollment: 12120,
    avgScore: 68.9,
  },
  {
    id: 4,
    code: "CS04",
    name: "Computer Networks",
    branch: "CS",
    description: "Network communication protocols and architectures.",
    marks: 13,
    topics: [
      "OSI Model (All 7 layers)", "TCP/IP Model", "Physical Layer", "Data Link Layer", "Network Layer",
      "IP Addressing (IPv4, IPv6)", "Subnetting", "Routing Algorithms", "Transport Layer (TCP, UDP)",
      "Application Layer", "DNS", "DHCP", "HTTP/HTTPS", "FTP", "Email", "Wireless Networks", "Network Security"
    ],
    keyFormulas: [
      "Subnet Masks", "CIDR Notation", "Hamming Distance",
      "CRC", "Stop-and-Wait Protocol", "Sliding Window"
    ],
    enrollment: 10560,
    avgScore: 69.4,
  },
  {
    id: 5,
    code: "CS05",
    name: "Compiler Design",
    branch: "CS",
    description: "Design and implementation of programming language compilers.",
    marks: 6,
    topics: [
      "Lexical Analysis", "Syntax Analysis", "Parsing (Top-Down, Bottom-Up)", "Context Free Grammars",
      "Semantic Analysis", "Code Generation", "Machine Code", "Optimization", "Symbol Table",
      "Error Detection and Recovery", "Type Checking", "Phases of Compiler"
    ],
    keyFormulas: [
      "Grammar Transformations", "Parsing Table Generation",
      "First and Follow Sets", "Backtracking"
    ],
    enrollment: 7890,
    avgScore: 62.1,
  },

  // ME Subjects
  {
    id: 21,
    code: "ME01",
    name: "Thermodynamics",
    branch: "ME",
    description: "Study of heat, work, and energy transformations.",
    marks: 13,
    topics: [
      "First Law", "Second Law", "Entropy", "Available Energy", "Thermodynamic Cycles",
      "Otto Cycle", "Diesel Cycle", "Rankine Cycle", "Refrigeration Cycles", "Properties of Pure Substances",
      "Steam Tables", "Superheat", "Phase Diagrams", "Clausius-Clapeyron Equation"
    ],
    keyFormulas: [
      "Q = ΔU + W", "ΔS = Q/T", "E = Cv(T2-T1)", "Thermal Efficiency",
      "COP (Coefficient of Performance)", "Work = P×ΔV"
    ],
    enrollment: 8234,
    avgScore: 64.5,
  },
  {
    id: 22,
    code: "ME02",
    name: "Heat and Mass Transfer",
    branch: "ME",
    description: "Heat conduction, convection, radiation, and mass transfer.",
    marks: 13,
    topics: [
      "Conduction (Fourier's Law)", "Thermal Conductivity", "Steady State Heat Transfer", "Transient Conduction",
      "Convection (Newton's Law)", "Natural and Forced Convection", "Boiling and Condensation", "Radiation",
      "Stefan-Boltzmann Law", "Heat Exchangers", "Mass Transfer", "Diffusion"
    ],
    keyFormulas: [
      "q = -kA(dT/dx)", "h = kNu/Lc", "Q = hA(Ts - T∞)", "σ = 5.67×10⁻⁸ W/m²K⁴",
      "Nu = hL/k", "Re = ρVL/μ", "Pr = μCp/k"
    ],
    enrollment: 8012,
    avgScore: 65.8,
  },
  {
    id: 23,
    code: "ME03",
    name: "Mechanics of Solids",
    branch: "ME",
    description: "Mechanics of rigid and deformable bodies.",
    marks: 13,
    topics: [
      "Stress and Strain", "Hooke's Law", "Modulus of Elasticity", "Stress-Strain Diagrams", "Poisson's Ratio",
      "Bending Moments", "Shear Forces", "Combined Stresses", "Torsion", "Deflection of Beams",
      "Strain Energy", "Circular Motion", "Centrifugal Force"
    ],
    keyFormulas: [
      "Stress = F/A", "Strain = ΔL/L", "Young's Modulus E = σ/ε", "Shear Stress τ = F/A",
      "Bending Stress σ = M×y/I", "Torsion τ = T×r/J"
    ],
    enrollment: 7456,
    avgScore: 66.2,
  },
  {
    id: 24,
    code: "ME04",
    name: "Theory of Machines",
    branch: "ME",
    description: "Study of mechanisms, machines, and kinematics.",
    marks: 10,
    topics: [
      "Mechanisms", "Machines", "Kinematic Pairs", "Degrees of Freedom (Kutzbach Criterion)", "Link Mechanisms",
      "Four Bar Mechanism", "Slider-Crank Mechanism", "Cams and Followers", "Gears", "Gear Trains",
      "Governors", "Balancing of Masses", "Vibrations"
    ],
    keyFormulas: [
      "DOF = 3(N-1) - 2j - h", "Velocity Analysis", "Acceleration Analysis",
      "Mechanical Advantage", "Gear Ratio"
    ],
    enrollment: 6789,
    avgScore: 63.4,
  },
  {
    id: 25,
    code: "ME05",
    name: "Manufacturing Engineering",
    branch: "ME",
    description: "Manufacturing processes and technologies.",
    marks: 10,
    topics: [
      "Casting", "Molding", "Forming", "Machining", "Cutting Tools", "Tool Life", "Tool Wear",
      "Surface Finish", "Grinding", "Welding", "Joining", "Sheet Metal Operations", "Manufacturing Systems",
      "CNC Machines", "Automation"
    ],
    keyFormulas: [
      "Material Removal Rate", "Tool Life Equation", "Power Consumption",
      "Surface Roughness", "Stress Distribution"
    ],
    enrollment: 5234,
    avgScore: 61.7,
  },
  {
    id: 26,
    code: "ME06",
    name: "Mechanical Engineering (Related)",
    branch: "ME",
    description: "General mechanical engineering topics.",
    marks: 6,
    topics: [
      "Fluid Mechanics", "Dimensional Analysis", "Energy", "Power", "Friction", "Hydrostatics", "Hydraulics"
    ],
    keyFormulas: [
      "Bernoulli's Theorem", "Continuity Equation", "Pressure = Force/Area"
    ],
    enrollment: 5123,
    avgScore: 60.1,
  },

  // EE Subjects
  {
    id: 41,
    code: "EE01",
    name: "Power Systems",
    branch: "EE",
    description: "Generation, transmission, distribution, and protection of electric power.",
    marks: 13,
    topics: [
      "Insulators", "Corona", "Overhead Line Parameters", "Underground Cables", "Voltage Regulation",
      "Power Flow Studies", "Load Flow Analysis", "Economic Load Dispatch", "Unit Commitment",
      "Fault Analysis", "Symmetrical Faults", "Unsymmetrical Faults", "Protection Systems", "Synchronous Stability"
    ],
    keyFormulas: [
      "Power = V×I×cosφ", "Voltage Drop = IR + IX", "Corona Loss", "Capacitance of Lines",
      "Load Flow Equations", "Fault Levels"
    ],
    enrollment: 5678,
    avgScore: 58.9,
  },
  {
    id: 42,
    code: "EE02",
    name: "Power Electronics",
    branch: "EE",
    description: "Control and conversion of electric power.",
    marks: 13,
    topics: [
      "Semiconductors", "Diodes", "Transistors", "SCR", "MOSFET", "IGBT", "AC to DC Conversion (Rectifiers)",
      "DC to DC Conversion (Choppers)", "DC to AC Conversion (Inverters)", "AC to AC Conversion (Cycloconverters)",
      "Pulse Width Modulation", "Power Factor Correction", "UPS Systems"
    ],
    keyFormulas: [
      "Conduction Angle", "RMS Voltage", "Trigger Angle", "Duty Cycle",
      "Output Frequency", "Harmonic Distortion"
    ],
    enrollment: 5234,
    avgScore: 59.4,
  },
  {
    id: 43,
    code: "EE03",
    name: "Electrical Machines",
    branch: "EE",
    description: "DC, AC, and synchronous machines.",
    marks: 13,
    topics: [
      "DC Machines", "DC Motor Characteristics", "DC Generator", "Synchronous Machines", "Synchronous Motor",
      "Synchronous Generator", "Induction Machines", "Three-Phase Induction Motor", "Single-Phase Motors",
      "Transformer", "Parallel Operation", "Efficiency", "Losses"
    ],
    keyFormulas: [
      "EMF = P×Φ×N/60", "Torque = P×Φ×I", "Efficiency = Output/Input",
      "Slip s = (Ns - N)/Ns", "Transformer Equation Vs/Vp = Ns/Np"
    ],
    enrollment: 6123,
    avgScore: 61.2,
  },
  {
    id: 44,
    code: "EE04",
    name: "Control Systems",
    branch: "EE",
    description: "Analysis and design of control systems.",
    marks: 10,
    topics: [
      "Transfer Functions", "Block Diagrams", "Signal Flow Graphs", "Feedback Systems", "Stability Analysis",
      "Routh-Hurwitz Criterion", "Nyquist Criterion", "Bode Plots", "Root Locus", "Compensators",
      "PID Controllers", "Steady State Error", "Transient Response"
    ],
    keyFormulas: [
      "Transfer Function = Output/Input", "Pole-Zero Plot", "Gain Margin", "Phase Margin",
      "Bandwidth", "Damping Ratio", "Natural Frequency"
    ],
    enrollment: 5890,
    avgScore: 57.6,
  },
  {
    id: 45,
    code: "EE05",
    name: "Analog Electronics",
    branch: "EE",
    description: "Analog circuits and signal processing.",
    marks: 8,
    topics: [
      "Transistors", "BJT", "FET", "Amplifiers", "Small Signal Analysis", "Frequency Response",
      "Feedback Amplifiers", "Op-Amps", "Application Circuits", "Filters", "Oscillators", "Regulators"
    ],
    keyFormulas: [
      "Gain = Vout/Vin", "Bandwidth = fH - fL", "Gain-Bandwidth Product",
      "Input Impedance", "Output Impedance", "Slew Rate"
    ],
    enrollment: 5567,
    avgScore: 62.8,
  },

  // EC Subjects
  {
    id: 61,
    code: "EC01",
    name: "Digital Electronics",
    branch: "EC",
    description: "Digital circuits, logic gates, and digital systems.",
    marks: 13,
    topics: [
      "Number Systems", "Boolean Algebra", "Logic Gates", "Combinational Circuits", "Multiplexers",
      "Demultiplexers", "Decoders", "Encoders", "Adders", "Subtractors", "Comparators", "Sequential Circuits",
      "Flip-Flops", "Counters", "Shift Registers", "State Machines", "Complexity and Timing"
    ],
    keyFormulas: [
      "Boolean Simplification", "Karnaugh Maps", "Quine-McCluskey Method",
      "Timing Analysis", "Power Dissipation"
    ],
    enrollment: 7234,
    avgScore: 70.5,
  },
  {
    id: 62,
    code: "EC02",
    name: "Analog Circuits",
    branch: "EC",
    description: "Analog circuit design and analysis.",
    marks: 10,
    topics: [
      "Diodes", "Transistors (BJT, FET)", "Amplifier Configurations", "Frequency Response",
      "Multi-stage Amplifiers", "Feedback Systems", "Oscillators", "Comparators", "Voltage Regulators",
      "Power Amplifiers", "Classes of Amplifiers", "Filters", "Impedance Matching"
    ],
    keyFormulas: [
      "Voltage Gain = Vout/Vin", "Current Gain = Iout/Iin", "Input/Output Impedance",
      "Feedback Gain", "Stability Criteria", "Power Efficiency"
    ],
    enrollment: 6567,
    avgScore: 65.2,
  },
  {
    id: 63,
    code: "EC03",
    name: "Communications",
    branch: "EC",
    description: "Analog and digital communication systems.",
    marks: 10,
    topics: [
      "Modulation (AM, FM, PM)", "Demodulation", "Noise", "Signal Processing", "Sampling Theorem",
      "Quantization", "Digital Modulation (PSK, FSK, QAM)", "Encoding", "Channel Capacity",
      "Information Theory", "Error Correction Codes", "Wireless Communications"
    ],
    keyFormulas: [
      "Modulation Index", "Bandwidth", "SNR (Signal-to-Noise Ratio)", "Bit Error Rate",
      "Channel Capacity = B×log₂(1+SNR)", "Nyquist Criterion"
    ],
    enrollment: 5890,
    avgScore: 62.1,
  },
  {
    id: 64,
    code: "EC04",
    name: "Microprocessors & Microcontrollers",
    branch: "EC",
    description: "8085, 8086, ARM processors and microcontrollers.",
    marks: 10,
    topics: [
      "8085 Architecture", "8085 Instructions", "Addressing Modes", "Interrupts", "Assembly Language",
      "8086 Architecture", "Instruction Set", "Protected Mode", "Memory Management", "Real Mode",
      "ARM Basics", "Embedded Systems", "Microcontroller Programming", "Interfacing"
    ],
    keyFormulas: [
      "Timing Diagrams", "Instruction Cycles", "Machine Cycles",
      "Interrupt Vector", "Stack Operations", "Memory Addressing"
    ],
    enrollment: 6234,
    avgScore: 63.7,
  },
  {
    id: 65,
    code: "EC05",
    name: "Electromagnetics",
    branch: "EC",
    description: "Electromagnetic theory and wave propagation.",
    marks: 8,
    topics: [
      "Electrostatics", "Current and Conductivity", "Magnetostatics", "Maxwell's Equations",
      "EM Waves", "Wave Propagation", "Reflection and Refraction", "Polarization", "Transmission Lines",
      "Waveguides", "Antennas", "Radiation"
    ],
    keyFormulas: [
      "Gauss Law", "Ampere's Law", "Faraday's Law", "Wave Equation",
      "Poynting Vector", "Impedance", "Propagation Constant"
    ],
    enrollment: 4567,
    avgScore: 58.9,
  },

  // CE Subjects
  {
    id: 81,
    code: "CE01",
    name: "Structural Analysis",
    branch: "CE",
    description: "Analysis of beams, frames, and structures.",
    marks: 13,
    topics: [
      "Beams", "Bending Moment and Shear Force Diagrams", "Methods of Analysis", "Method of Joints",
      "Method of Sections", "Trusses", "Frames", "Arches", "Cables", "Energy Methods",
      "Virtual Work", "Castigliano's Theorem", "Matrix Methods", "Influence Lines"
    ],
    keyFormulas: [
      "Bending Moment = ∫Shear×dx", "Deflection = ∫∫(M/EI)×dx²", "Slope-Deflection Equations",
      "Moment Distribution", "Stiffness Matrix Methods"
    ],
    enrollment: 4234,
    avgScore: 59.8,
  },
  {
    id: 82,
    code: "CE02",
    name: "Design of Structures",
    branch: "CE",
    description: "Design of reinforced concrete and steel structures.",
    marks: 13,
    topics: [
      "Limit State Design", "RCC Design", "Strength of Materials", "Stress-Strain", "Bending Design",
      "Shear Design", "Torsion Design", "Columns", "Slabs", "Footings", "Steel Design",
      "Bolted Connections", "Welded Connections", "Beam-Column Joints"
    ],
    keyFormulas: [
      "Flexural Strength = 0.87×fy×Ast×d", "Shear Strength = 0.87×vy×Asv", "Effective Length",
      "Slenderness Ratio", "Load Factor", "Partial Safety Factors"
    ],
    enrollment: 4567,
    avgScore: 60.2,
  },
  {
    id: 83,
    code: "CE03",
    name: "Geotechnical Engineering",
    branch: "CE",
    description: "Soil properties, foundation design, and earth structures.",
    marks: 10,
    topics: [
      "Soil Classification", "Soil Properties", "Compaction", "Permeability", "Seepage", "Effective Stress",
      "Shear Strength", "Consolidation", "Bearing Capacity", "Foundation Design", "Shallow Foundations",
      "Deep Foundations", "Piles", "Earth Dams", "Slope Stability"
    ],
    keyFormulas: [
      "Void Ratio e = Vv/Vs", "Porosity n = Vv/V", "Gamma_sat = (Gs + e)×ϒw/(1+e)",
      "Bearing Capacity q = cNc + ϒ×D×Nq + 0.5×ϒ×B×Nϒ", "Safety Factor"
    ],
    enrollment: 3890,
    avgScore: 56.7,
  },
  {
    id: 84,
    code: "CE04",
    name: "Hydraulics and Fluid Mechanics",
    branch: "CE",
    description: "Fluid flow, open channel flow, and hydraulic structures.",
    marks: 10,
    topics: [
      "Fluid Properties", "Hydrostatics", "Hydrodynamics", "Bernoulli's Theorem", "Moody Diagram",
      "Pipe Flow", "Flow through Orifices", "Flow through Notches", "Open Channel Flow", "Manning's Formula",
      "Chezy's Formula", "Turbulence", "Boundary Layer", "Drag and Lift"
    ],
    keyFormulas: [
      "Bernoulli = P/ϒ + V²/2g + Z = const", "Darcy-Weisbach hf = f×(L/D)×(V²/2g)",
      "Manning V = (1/n)×R^(2/3)×S^(1/2)", "Discharge Q = A×V", "Chezy V = C×√(R×S)"
    ],
    enrollment: 3456,
    avgScore: 55.4,
  },
  {
    id: 85,
    code: "CE05",
    name: "Transportation Engineering",
    branch: "CE",
    description: "Road design, traffic engineering, and highway planning.",
    marks: 6,
    topics: [
      "Highway Design", "Pavement Design", "Flexible Pavements", "Rigid Pavements", "Traffic Engineering",
      "Traffic Flow", "Capacity Analysis", "Signal Design", "Road Safety", "Drainage"
    ],
    keyFormulas: [
      "CBR Method", "Asphalt Concrete Mix Design", "Traffic Intensity", "T-intersection Spacing"
    ],
    enrollment: 2345,
    avgScore: 52.1,
  },
];

// ============================================================================
// GENERAL RESOURCES
// ============================================================================

interface GeneralResource {
  id: number;
  title: string;
  category: string;
  description: string;
  downloads: number;
  rating: number;
  type: string;
}

export const generalResources: GeneralResource[] = [
  {
    id: 1,
    title: "GATE Syllabus Handbook 2024",
    category: "Syllabus",
    description: "Complete syllabus for all GATE branches",
    downloads: 15000,
    rating: 5.0,
    type: "PDF",
  },
  {
    id: 2,
    title: "Formula Sheet - All Subjects",
    category: "Quick Reference",
    description: "Essential formulas organized by subject",
    downloads: 12340,
    rating: 4.9,
    type: "PDF",
  },
  {
    id: 3,
    title: "Time Management Strategy",
    category: "Strategy",
    description: "How to plan your GATE preparation",
    downloads: 8900,
    rating: 4.8,
    type: "Guide",
  },
  {
    id: 4,
    title: "Exam Day Checklist",
    category: "Exam Tips",
    description: "What to do and not do on exam day",
    downloads: 7600,
    rating: 4.9,
    type: "Checklist",
  },
  {
    id: 5,
    title: "Weak Areas Improvement Plan",
    category: "Strategy",
    description: "How to overcome your weak subjects",
    downloads: 6800,
    rating: 4.7,
    type: "Guide",
  },
];
