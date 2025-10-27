/**
 * API Services
 * Service layer for API interactions
 */

import { apiClient } from './client';
import type { User, Document, Analysis, Activity } from '@shared/schema';

// User Services
export const userService = {
  getAll: () => apiClient.get<{ users: User[]; count: number }>('/users'),
  
  getById: (id: number) => apiClient.get<{ user: User }>(`/users/${id}`),
  
  getByUsername: (username: string) => 
    apiClient.get<{ user: User }>(`/users/username/${username}`),
  
  create: (userData: Omit<User, 'id' | 'createdAt'>) => 
    apiClient.post<{ user: User }>('/users', userData),
  
  update: (id: number, updates: Partial<User>) => 
    apiClient.put<{ user: User }>(`/users/${id}`, updates),
  
  delete: (id: number) => 
    apiClient.delete(`/users/${id}`),
};

// Document Services
export const documentService = {
  getAll: () => 
    apiClient.get<{ documents: Document[]; count: number }>('/documents'),
  
  getById: (id: number) => 
    apiClient.get<{ document: Document }>(`/documents/${id}`),
  
  getByUserId: (userId: number) => 
    apiClient.get<{ documents: Document[]; count: number }>(`/documents/user/${userId}`),
  
  create: (documentData: Omit<Document, 'id' | 'createdAt' | 'updatedAt'>) => 
    apiClient.post<{ document: Document }>('/documents', documentData),
  
  update: (id: number, updates: Partial<Document>) => 
    apiClient.put<{ document: Document }>(`/documents/${id}`, updates),
  
  delete: (id: number) => 
    apiClient.delete(`/documents/${id}`),
};

// Analysis Services
export const analysisService = {
  getAll: () => 
    apiClient.get<{ analyses: Analysis[]; count: number }>('/analyses'),
  
  getById: (id: number) => 
    apiClient.get<{ analysis: Analysis }>(`/analyses/${id}`),
  
  getByDocumentId: (documentId: number) => 
    apiClient.get<{ analysis: Analysis | null }>(`/analyses/document/${documentId}`),
  
  create: (analysisData: Omit<Analysis, 'id' | 'createdAt'>) => 
    apiClient.post<{ analysis: Analysis }>('/analyses', analysisData),
  
  update: (id: number, updates: Partial<Analysis>) => 
    apiClient.put<{ analysis: Analysis }>(`/analyses/${id}`, updates),
  
  delete: (id: number) => 
    apiClient.delete(`/analyses/${id}`),
};

// Activity Services
export const activityService = {
  getRecent: (limit?: number) => {
    const queryParams = limit ? `?limit=${limit}` : '';
    return apiClient.get<{ activities: Activity[]; count: number }>(`/activities/recent${queryParams}`);
  },
  
  getById: (id: number) => 
    apiClient.get<{ activity: Activity }>(`/activities/${id}`),
  
  getByUserId: (userId: number, limit?: number) => {
    const queryParams = limit ? `?limit=${limit}` : '';
    return apiClient.get<{ activities: Activity[]; count: number }>(`/activities/user/${userId}${queryParams}`);
  },
  
  getByDocumentId: (documentId: number, limit?: number) => {
    const queryParams = limit ? `?limit=${limit}` : '';
    return apiClient.get<{ activities: Activity[]; count: number }>(`/activities/document/${documentId}${queryParams}`);
  },
  
  create: (activityData: Omit<Activity, 'id' | 'createdAt'>) => 
    apiClient.post<{ activity: Activity }>('/activities', activityData),
  
  delete: (id: number) => 
    apiClient.delete(`/activities/${id}`),
};
