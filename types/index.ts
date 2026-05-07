// ─── CORE TYPES ───────────────────────────────────────────

export interface College {
  id: string;
  name: string;
  slug: string;
  location: string;
  city: string;
  state: string;
  country: string;
  type: string;
  fees: number;
  feesMax?: number | null;
  rating: number;
  reviewCount: number;
  placementPct: number;
  avgPackage?: number | null;
  highestPackage?: number | null;
  coursesOffered: string[];
  description: string;
  about?: string | null;
  imageUrl?: string | null;
  websiteUrl?: string | null;
  established?: number | null;
  ranking?: number | null;
  nirf?: number | null;
  naac?: string | null;
  cutoffRank?: number | null;
  examName?: string | null;
  totalStudents?: number | null;
  totalFaculty?: number | null;
  campusArea?: number | null;
  hostelAvailable: boolean;
  courses?: Course[];
  reviews?: Review[];
  exams?: CollegeExam[];
  createdAt: string;
}

export interface Course {
  id: string;
  name: string;
  slug: string;
  duration: number;
  fees: number;
  description?: string | null;
  seats?: number | null;
  collegeId: string;
  college?: College;
  createdAt: string;
}

export interface Exam {
  id: string;
  name: string;
  slug: string;
  fullName: string;
  type: string;
  level: string;
  conductedBy: string;
  frequency: string;
  description: string;
  eligibility: string;
  syllabus?: string | null;
  importantDates?: Record<string, string> | null;
  colleges?: CollegeExam[];
  createdAt: string;
}

export interface CollegeExam {
  id: string;
  collegeId: string;
  examId: string;
  cutoff?: number | null;
  college?: College;
  exam?: Exam;
}

export interface Review {
  id: string;
  rating: number;
  title: string;
  content: string;
  pros?: string | null;
  cons?: string | null;
  batch?: number | null;
  course?: string | null;
  verified: boolean;
  helpfulCount: number;
  userId: string;
  collegeId: string;
  user?: User;
  createdAt: string;
}

export interface Question {
  id: string;
  title: string;
  content: string;
  tags: string[];
  views: number;
  answerCount: number;
  solved: boolean;
  userId: string;
  user?: User;
  answers?: Answer[];
  createdAt: string;
}

export interface Answer {
  id: string;
  content: string;
  isAccepted: boolean;
  helpfulCount: number;
  userId: string;
  questionId: string;
  user?: User;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string | null;
  createdAt: string;
}

// ─── API RESPONSE TYPES ───────────────────────────────────

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
}

export interface ApiError {
  error: string;
  message: string;
  status: number;
}

// ─── FILTER TYPES ─────────────────────────────────────────

export interface CollegeFilters {
  search?: string;
  state?: string;
  type?: string;
  course?: string;
  maxFees?: string;
  minRating?: string;
  exam?: string;
  sort?: string;
  page?: number;
}

export interface PredictInput {
  exam: string;
  rank: number;
  category: string;
}

export interface PredictResult {
  colleges: College[];
  message: string;
}
