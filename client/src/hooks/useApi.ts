/**
 * API Hooks
 * React Query hooks for data fetching and mutations
 */

import { useQuery, useMutation, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { userService, documentService, analysisService, activityService } from '@/lib/api/services';
import { useToast } from './use-toast';
import type { User, Document, Analysis, Activity } from '@shared/schema';

// Query Keys
export const queryKeys = {
  users: ['users'] as const,
  user: (id: number) => ['users', id] as const,
  userByUsername: (username: string) => ['users', 'username', username] as const,
  
  documents: ['documents'] as const,
  document: (id: number) => ['documents', id] as const,
  userDocuments: (userId: number) => ['documents', 'user', userId] as const,
  
  analyses: ['analyses'] as const,
  analysis: (id: number) => ['analyses', id] as const,
  documentAnalysis: (documentId: number) => ['analyses', 'document', documentId] as const,
  
  activities: ['activities'] as const,
  activity: (id: number) => ['activities', id] as const,
  recentActivities: (limit?: number) => ['activities', 'recent', limit] as const,
  userActivities: (userId: number, limit?: number) => ['activities', 'user', userId, limit] as const,
  documentActivities: (documentId: number, limit?: number) => ['activities', 'document', documentId, limit] as const,
};

// User Hooks
export function useUsers() {
  return useQuery({
    queryKey: queryKeys.users,
    queryFn: () => userService.getAll(),
  });
}

export function useUser(id: number) {
  return useQuery({
    queryKey: queryKeys.user(id),
    queryFn: () => userService.getById(id),
    enabled: !!id,
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: userService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users });
      toast({
        title: 'Success',
        description: 'User created successfully',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to create user',
        variant: 'destructive',
      });
    },
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, updates }: { id: number; updates: Partial<User> }) =>
      userService.update(id, updates),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users });
      queryClient.invalidateQueries({ queryKey: queryKeys.user(variables.id) });
      toast({
        title: 'Success',
        description: 'User updated successfully',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update user',
        variant: 'destructive',
      });
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: userService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users });
      toast({
        title: 'Success',
        description: 'User deleted successfully',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete user',
        variant: 'destructive',
      });
    },
  });
}

// Document Hooks
export function useDocuments() {
  return useQuery({
    queryKey: queryKeys.documents,
    queryFn: () => documentService.getAll(),
  });
}

export function useDocument(id: number) {
  return useQuery({
    queryKey: queryKeys.document(id),
    queryFn: () => documentService.getById(id),
    enabled: !!id,
  });
}

export function useUserDocuments(userId: number) {
  return useQuery({
    queryKey: queryKeys.userDocuments(userId),
    queryFn: () => documentService.getByUserId(userId),
    enabled: !!userId,
  });
}

export function useCreateDocument() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: documentService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.documents });
      toast({
        title: 'Success',
        description: 'Document created successfully',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to create document',
        variant: 'destructive',
      });
    },
  });
}

export function useUpdateDocument() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, updates }: { id: number; updates: Partial<Document> }) =>
      documentService.update(id, updates),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.documents });
      queryClient.invalidateQueries({ queryKey: queryKeys.document(variables.id) });
      toast({
        title: 'Success',
        description: 'Document updated successfully',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update document',
        variant: 'destructive',
      });
    },
  });
}

export function useDeleteDocument() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: documentService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.documents });
      toast({
        title: 'Success',
        description: 'Document deleted successfully',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete document',
        variant: 'destructive',
      });
    },
  });
}

// Analysis Hooks
export function useAnalyses() {
  return useQuery({
    queryKey: queryKeys.analyses,
    queryFn: () => analysisService.getAll(),
  });
}

export function useAnalysis(id: number) {
  return useQuery({
    queryKey: queryKeys.analysis(id),
    queryFn: () => analysisService.getById(id),
    enabled: !!id,
  });
}

export function useDocumentAnalysis(documentId: number) {
  return useQuery({
    queryKey: queryKeys.documentAnalysis(documentId),
    queryFn: () => analysisService.getByDocumentId(documentId),
    enabled: !!documentId,
  });
}

export function useCreateAnalysis() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: analysisService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.analyses });
      toast({
        title: 'Success',
        description: 'Analysis created successfully',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to create analysis',
        variant: 'destructive',
      });
    },
  });
}

// Activity Hooks
export function useRecentActivities(limit?: number) {
  return useQuery({
    queryKey: queryKeys.recentActivities(limit),
    queryFn: () => activityService.getRecent(limit),
  });
}

export function useUserActivities(userId: number, limit?: number) {
  return useQuery({
    queryKey: queryKeys.userActivities(userId, limit),
    queryFn: () => activityService.getByUserId(userId, limit),
    enabled: !!userId,
  });
}

export function useDocumentActivities(documentId: number, limit?: number) {
  return useQuery({
    queryKey: queryKeys.documentActivities(documentId, limit),
    queryFn: () => activityService.getByDocumentId(documentId, limit),
    enabled: !!documentId,
  });
}

export function useCreateActivity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: activityService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.activities });
    },
  });
}
