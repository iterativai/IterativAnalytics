import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, formatDistanceToNow } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, 'PPP');
}

export function formatRelativeTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return formatDistanceToNow(dateObj, { addSuffix: true });
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

export function getFileIcon(contentType: string): string {
  if (contentType.includes('pdf')) {
    return 'file-pdf';
  } else if (contentType.includes('presentation') || contentType.includes('pptx')) {
    return 'file-presentation';
  } else if (contentType.includes('spreadsheet') || contentType.includes('xlsx')) {
    return 'file-spreadsheet';
  } else if (contentType.includes('document') || contentType.includes('docx')) {
    return 'file-text';
  }
  return 'file';
}

export function getScoreColor(score: number): string {
  if (score >= 80) return 'bg-green-100 text-green-800';
  if (score >= 70) return 'bg-yellow-100 text-yellow-800';
  return 'bg-red-100 text-red-800';
}

export function getProgressColor(score: number): string {
  if (score >= 80) return 'bg-success-500';
  if (score >= 70) return 'bg-warning-500';
  return 'bg-danger-500';
}

export function getActivityIcon(activityType: string): { type: string; bgColor: string; textColor: string; svgPath: string; } {
  if (activityType === 'document_upload' || activityType === 'document_update') {
    return {
      type: 'document',
      bgColor: 'bg-primary-100',
      textColor: 'text-primary-600',
      svgPath: 'M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z'
    };
  } else if (activityType === 'investor_view') {
    return {
      type: 'view',
      bgColor: 'bg-accent-100',
      textColor: 'text-accent-600',
      svgPath: 'M10 12a2 2 0 100-4 2 2 0 000 4z M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z'
    };
  } else if (activityType === 'score_improvement') {
    return {
      type: 'improvement',
      bgColor: 'bg-success-100',
      textColor: 'text-success-600',
      svgPath: 'M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
    };
  }
  
  return {
    type: 'default',
    bgColor: 'bg-gray-100',
    textColor: 'text-gray-600',
    svgPath: 'M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
  };
}

export function formatActivityTitle(activityType: string, details: any): string {
  if (activityType === 'document_upload') {
    return `Document Uploaded: ${details.title}`;
  } else if (activityType === 'document_update') {
    return `Document Updated: ${details.title}`;
  } else if (activityType === 'investor_view') {
    return `Investor View: ${details.investorName}`;
  } else if (activityType === 'score_improvement') {
    return `Score Improvement: +${details.improvement} points`;
  }
  
  return 'Activity';
}

export function formatActivityDetails(activityType: string, details: any): string {
  if (activityType === 'document_upload') {
    return details.summary || `Document "${details.title}" uploaded and analyzed with a score of ${details.score}/100.`;
  } else if (activityType === 'document_update') {
    return details.summary || `Document "${details.title}" updated with new content.`;
  } else if (activityType === 'investor_view') {
    return `Your ${details.documentTitle} was viewed by ${details.investorName} from ${details.investorCompany}.`;
  } else if (activityType === 'score_improvement') {
    return `Your ${details.documentTitle} document score improved from ${details.previousScore} to ${details.newScore} after implementing AI suggestions.`;
  }
  
  return JSON.stringify(details);
}
