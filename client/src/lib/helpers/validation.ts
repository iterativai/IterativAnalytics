/**
 * Validation Helpers
 * Utility functions for form validation
 */

import { z } from 'zod';
import { VALIDATION } from '@/lib/constants/app';

/**
 * Email validation
 */
export const emailSchema = z
  .string()
  .min(1, 'Email is required')
  .email('Invalid email address');

/**
 * Password validation
 */
export const passwordSchema = z
  .string()
  .min(VALIDATION.MIN_PASSWORD_LENGTH, `Password must be at least ${VALIDATION.MIN_PASSWORD_LENGTH} characters`)
  .max(VALIDATION.MAX_PASSWORD_LENGTH, `Password must not exceed ${VALIDATION.MAX_PASSWORD_LENGTH} characters`)
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number');

/**
 * Username validation
 */
export const usernameSchema = z
  .string()
  .min(VALIDATION.MIN_USERNAME_LENGTH, `Username must be at least ${VALIDATION.MIN_USERNAME_LENGTH} characters`)
  .max(VALIDATION.MAX_USERNAME_LENGTH, `Username must not exceed ${VALIDATION.MAX_USERNAME_LENGTH} characters`)
  .regex(/^[a-zA-Z0-9_-]+$/, 'Username can only contain letters, numbers, underscores, and hyphens');

/**
 * Name validation
 */
export const nameSchema = z
  .string()
  .min(2, 'Name must be at least 2 characters')
  .max(100, 'Name must not exceed 100 characters')
  .regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes');

/**
 * Phone validation
 */
export const phoneSchema = z
  .string()
  .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format');

/**
 * URL validation
 */
export const urlSchema = z
  .string()
  .url('Invalid URL format')
  .or(z.literal(''));

/**
 * File size validation
 */
export function validateFileSize(file: File, maxSize: number = VALIDATION.MAX_FILE_SIZE): boolean {
  return file.size <= maxSize;
}

/**
 * File type validation
 */
export function validateFileType(file: File, allowedTypes: string[]): boolean {
  return allowedTypes.some(type => {
    if (type.startsWith('.')) {
      return file.name.toLowerCase().endsWith(type);
    }
    return file.type === type;
  });
}

/**
 * Sanitize string input
 */
export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove angle brackets to prevent XSS
    .replace(/\s+/g, ' '); // Replace multiple spaces with single space
}

/**
 * Check if string is valid JSON
 */
export function isValidJSON(str: string): boolean {
  try {
    JSON.parse(str);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate score value (0-100)
 */
export const scoreSchema = z
  .number()
  .int('Score must be an integer')
  .min(0, 'Score must be at least 0')
  .max(100, 'Score must not exceed 100');

/**
 * Common form schemas
 */
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
});

export const registerSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: z.string(),
  name: nameSchema,
  userType: z.string().min(1, 'User type is required'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const profileUpdateSchema = z.object({
  name: nameSchema.optional(),
  avatarUrl: urlSchema.optional(),
  bio: z.string().max(500, 'Bio must not exceed 500 characters').optional(),
});
