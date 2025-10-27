/**
 * Application Constants
 * Centralized constants for the application
 */

export const APP_NAME = 'Iterativ Analytics';
export const APP_VERSION = '1.0.0';
export const APP_DESCRIPTION = 'AI-powered analytics platform for African startups and investors';

export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  DOCUMENTS: '/documents',
  ANALYTICS: '/analytics',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  LOGIN: '/login',
  REGISTER: '/register',
} as const;

export const USER_TYPES = {
  STARTUP: 'startup',
  INVESTOR: 'investor',
  PARTNER: 'partner',
  LENDER: 'lender',
  ENTERPRISE: 'enterprise',
  ANALYST: 'analyst',
  ADVISOR: 'advisor',
  MENTOR: 'mentor',
} as const;

export const ACTIVITY_TYPES = {
  DOCUMENT_UPDATE: 'document_update',
  INVESTOR_VIEW: 'investor_view',
  SCORE_IMPROVEMENT: 'score_improvement',
  PROFILE_UPDATE: 'profile_update',
  LOGIN: 'login',
  LOGOUT: 'logout',
} as const;

export const DOCUMENT_TYPES = {
  PDF: 'pdf',
  PPTX: 'pptx',
  DOCX: 'docx',
  XLSX: 'xlsx',
} as const;

export const SCORE_CATEGORIES = {
  FEASIBILITY: 'feasibility',
  SCALABILITY: 'scalability',
  FINANCIAL_HEALTH: 'financial_health',
  INNOVATION: 'innovation',
  MARKET_FIT: 'market_fit',
} as const;

export const SCORE_THRESHOLDS = {
  EXCELLENT: 80,
  GOOD: 60,
  FAIR: 40,
  POOR: 20,
} as const;

export const DATE_FORMAT = {
  SHORT: 'MMM dd, yyyy',
  LONG: 'MMMM dd, yyyy',
  WITH_TIME: 'MMM dd, yyyy HH:mm',
  TIME_ONLY: 'HH:mm',
} as const;

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
} as const;

export const VALIDATION = {
  MIN_PASSWORD_LENGTH: 8,
  MAX_PASSWORD_LENGTH: 128,
  MIN_USERNAME_LENGTH: 3,
  MAX_USERNAME_LENGTH: 50,
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
} as const;

export const API = {
  TIMEOUT: 30000, // 30 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
} as const;

export const LOCAL_STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_PREFERENCES: 'user_preferences',
  THEME: 'preferred-sector-theme',
  LAST_LOGIN: 'lastLoginTime',
} as const;

export const TOAST_DURATION = {
  SHORT: 2000,
  MEDIUM: 5000,
  LONG: 10000,
} as const;
