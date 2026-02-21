/**
 * localStorage Helper Module
 * Manages persistent storage of user data across sessions
 * Includes bookmarks, test progress, preferences, and user interactions
 */

// ============================================================================
// BOOKMARKS - For PYQs, Resources, etc.
// ============================================================================

export const saveBookmark = (type: string, id: number): void => {
  const key = `bookmark_${type}`;
  const bookmarks = getBookmarks(type);
  if (!bookmarks.includes(id)) {
    bookmarks.push(id);
    localStorage.setItem(key, JSON.stringify(bookmarks));
  }
};

export const removeBookmark = (type: string, id: number): void => {
  const key = `bookmark_${type}`;
  const bookmarks = getBookmarks(type);
  const filtered = bookmarks.filter((b) => b !== id);
  localStorage.setItem(key, JSON.stringify(filtered));
};

export const getBookmarks = (type: string): number[] => {
  const key = `bookmark_${type}`;
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : [];
};

export const isBookmarked = (type: string, id: number): boolean => {
  return getBookmarks(type).includes(id);
};

// ============================================================================
// TEST PROGRESS & RESULTS
// ============================================================================

interface TestAttempt {
  testId: number;
  testName: string;
  score: number;
  totalMarks: number;
  accuracy: number;
  duration: number; // in minutes
  attemptDate: string;
  answers?: Record<number, string | number>;
  rank?: number;
}

export const saveTestResult = (attempt: TestAttempt): void => {
  const key = `test_result_${attempt.testId}`;
  const results = getTestResults(attempt.testId);
  results.push(attempt);
  localStorage.setItem(key, JSON.stringify(results));
};

export const getTestResults = (testId: number): TestAttempt[] => {
  const key = `test_result_${testId}`;
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : [];
};

export const getAllTestResults = (): TestAttempt[] => {
  const results: TestAttempt[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith("test_result_")) {
      const stored = localStorage.getItem(key);
      if (stored) {
        results.push(...JSON.parse(stored));
      }
    }
  }
  return results.sort((a, b) => new Date(b.attemptDate).getTime() - new Date(a.attemptDate).getTime());
};

export const getTestAttemptCount = (testId: number): number => {
  return getTestResults(testId).length;
};

export const getAverageTestScore = (testId: number): number => {
  const results = getTestResults(testId);
  if (results.length === 0) return 0;
  const sum = results.reduce((acc, r) => acc + r.score, 0);
  return Math.round((sum / results.length) * 10) / 10;
};

// ============================================================================
// TEST PROGRESS (In-Progress Test Data)
// ============================================================================

interface TestProgress {
  testId: number;
  currentQuestion: number;
  totalQuestions: number;
  answers: Record<number, string | number>;
  flaggedQuestions: number[];
  timeSpent: number; // in seconds
  startTime: string;
  lastUpdated: string;
}

export const saveTestProgress = (progress: TestProgress): void => {
  const key = `progress_${progress.testId}`;
  localStorage.setItem(key, JSON.stringify(progress));
};

export const getTestProgress = (testId: number): TestProgress | null => {
  const key = `progress_${testId}`;
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : null;
};

export const clearTestProgress = (testId: number): void => {
  const key = `progress_${testId}`;
  localStorage.removeItem(key);
};

// ============================================================================
// RESOURCE VIEW HISTORY
// ============================================================================

interface ResourceView {
  resourceId: number;
  resourceType: string; // "lecture", "notes", "document"
  viewDate: string;
  duration?: number; // minutes watched for videos
}

export const addResourceView = (resourceId: number, resourceType: string, duration?: number): void => {
  const key = "resource_views";
  const views = getResourceViews();
  const newView: ResourceView = {
    resourceId,
    resourceType,
    viewDate: new Date().toISOString(),
    duration,
  };
  views.push(newView);
  localStorage.setItem(key, JSON.stringify(views));
};

export const getResourceViews = (): ResourceView[] => {
  const key = "resource_views";
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : [];
};

export const getResourceViewCount = (resourceId: number): number => {
  return getResourceViews().filter((v) => v.resourceId === resourceId).length;
};

export const getRecentResources = (limit: number = 10): ResourceView[] => {
  return getResourceViews()
    .sort((a, b) => new Date(b.viewDate).getTime() - new Date(a.viewDate).getTime())
    .slice(0, limit);
};

// ============================================================================
// USER PREFERENCES
// ============================================================================

interface UserPreferences {
  theme: "light" | "dark";
  language: "en" | "hi";
  notifications: boolean;
  emailUpdates: boolean;
  autoSave: boolean;
  fontSize: "small" | "medium" | "large";
  lastActive?: string;
}

const defaultPreferences: UserPreferences = {
  theme: "light",
  language: "en",
  notifications: true,
  emailUpdates: true,
  autoSave: true,
  fontSize: "medium",
};

export const saveUserPreferences = (prefs: Partial<UserPreferences>): void => {
  const key = "user_preferences";
  const current = getUserPreferences();
  const updated = { ...current, ...prefs };
  localStorage.setItem(key, JSON.stringify(updated));
};

export const getUserPreferences = (): UserPreferences => {
  const key = "user_preferences";
  const stored = localStorage.getItem(key);
  return stored ? { ...defaultPreferences, ...JSON.parse(stored) } : defaultPreferences;
};

export const updateLastActive = (): void => {
  const prefs = getUserPreferences();
  saveUserPreferences({
    ...prefs,
    lastActive: new Date().toISOString(),
  });
};

// ============================================================================
// STUDY PLAN DATA
// ============================================================================

interface StudyPlanItem {
  id: string;
  subject: string;
  topic: string;
  startDate: string;
  targetDate: string;
  status: "not_started" | "in_progress" | "completed";
  progress: number; // 0-100
}

export const saveStudyPlanItem = (item: StudyPlanItem): void => {
  const key = "study_plan";
  const plan = getStudyPlan();
  const index = plan.findIndex((p) => p.id === item.id);
  if (index >= 0) {
    plan[index] = item;
  } else {
    plan.push(item);
  }
  localStorage.setItem(key, JSON.stringify(plan));
};

export const getStudyPlan = (): StudyPlanItem[] => {
  const key = "study_plan";
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : [];
};

export const updateStudyPlanProgress = (itemId: string, progress: number, status?: string): void => {
  const plan = getStudyPlan();
  const item = plan.find((p) => p.id === itemId);
  if (item) {
    item.progress = progress;
    if (status) item.status = status as "not_started" | "in_progress" | "completed";
    saveStudyPlanItem(item);
  }
};

// ============================================================================
// MENTOR SESSIONS
// ============================================================================

interface MentorSession {
  sessionId: string;
  mentorId: number;
  mentorName: string;
  scheduledDate: string;
  duration: number; // minutes
  subject: string;
  status: "scheduled" | "completed" | "cancelled";
  rating?: number;
  notes?: string;
}

export const saveMentorSession = (session: MentorSession): void => {
  const key = "mentor_sessions";
  const sessions = getMentorSessions();
  const index = sessions.findIndex((s) => s.sessionId === session.sessionId);
  if (index >= 0) {
    sessions[index] = session;
  } else {
    sessions.push(session);
  }
  localStorage.setItem(key, JSON.stringify(sessions));
};

export const getMentorSessions = (): MentorSession[] => {
  const key = "mentor_sessions";
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : [];
};

export const getUpcomingMentorSessions = (): MentorSession[] => {
  return getMentorSessions()
    .filter((s) => s.status === "scheduled" && new Date(s.scheduledDate) > new Date())
    .sort((a, b) => new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime());
};

export const getCompletedMentorSessions = (): MentorSession[] => {
  return getMentorSessions().filter((s) => s.status === "completed");
};

// ============================================================================
// NOTES & ANNOTATIONS
// ============================================================================

interface UserNote {
  noteId: string;
  resourceId: number;
  resourceType: string; // "pyq", "lecture", "resource"
  title: string;
  content: string;
  createdDate: string;
  lastModified: string;
  tags: string[];
}

export const saveNote = (note: UserNote): void => {
  const key = "user_notes";
  const notes = getNotes();
  const index = notes.findIndex((n) => n.noteId === note.noteId);
  if (index >= 0) {
    notes[index] = note;
  } else {
    notes.push(note);
  }
  localStorage.setItem(key, JSON.stringify(notes));
};

export const getNotes = (): UserNote[] => {
  const key = "user_notes";
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : [];
};

export const getNotesByResource = (resourceId: number): UserNote[] => {
  return getNotes().filter((n) => n.resourceId === resourceId);
};

export const deleteNote = (noteId: string): void => {
  const key = "user_notes";
  const notes = getNotes().filter((n) => n.noteId !== noteId);
  localStorage.setItem(key, JSON.stringify(notes));
};

// ============================================================================
// GENERAL UTILITIES
// ============================================================================

/**
 * Clear all localStorage data (use with caution)
 */
export const clearAllData = (): void => {
  const confirm = window.confirm(
    "Are you sure you want to clear all stored data? This cannot be undone."
  );
  if (confirm) {
    localStorage.clear();
  }
};

/**
 * Get storage usage statistics
 */
export const getStorageStats = (): { totalItems: number; estimatedSize: string } => {
  let totalSize = 0;
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key) {
      const value = localStorage.getItem(key);
      totalSize += key.length + (value ? value.length : 0);
    }
  }

  const sizeInKB = (totalSize / 1024).toFixed(2);
  return {
    totalItems: localStorage.length,
    estimatedSize: `${sizeInKB} KB`,
  };
};

/**
 * Export all data as JSON
 */
export const exportAllData = (): string => {
  const data: Record<string, any> = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key) {
      const value = localStorage.getItem(key);
      data[key] = value ? JSON.parse(value) : null;
    }
  }
  return JSON.stringify(data, null, 2);
};

/**
 * Import data from JSON export
 */
export const importData = (jsonString: string): boolean => {
  try {
    const data = JSON.parse(jsonString);
    for (const [key, value] of Object.entries(data)) {
      localStorage.setItem(key, JSON.stringify(value));
    }
    return true;
  } catch (error) {
    console.error("Error importing data:", error);
    return false;
  }
};
