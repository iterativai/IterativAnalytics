import React, { createContext, useContext, useState, ReactNode } from 'react';

type SuggestionType = 'financial' | 'valueProposition' | 'marketResearch' | 'competitiveAnalysis';

interface MentorContextType {
  lastSuggestion: SuggestionType | null;
  setLastSuggestion: (suggestion: SuggestionType | null) => void;
  isSuggestionModalOpen: boolean;
  openSuggestionModal: (suggestion: SuggestionType) => void;
  closeSuggestionModal: () => void;
}

const MentorContext = createContext<MentorContextType | undefined>(undefined);

export const MentorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [lastSuggestion, setLastSuggestion] = useState<SuggestionType | null>(null);
  const [isSuggestionModalOpen, setIsSuggestionModalOpen] = useState(false);
  
  const openSuggestionModal = (suggestion: SuggestionType) => {
    setLastSuggestion(suggestion);
    setIsSuggestionModalOpen(true);
  };
  
  const closeSuggestionModal = () => {
    setIsSuggestionModalOpen(false);
  };
  
  return (
    <MentorContext.Provider 
      value={{
        lastSuggestion,
        setLastSuggestion,
        isSuggestionModalOpen,
        openSuggestionModal,
        closeSuggestionModal
      }}
    >
      {children}
    </MentorContext.Provider>
  );
};

export const useMentor = () => {
  const context = useContext(MentorContext);
  if (context === undefined) {
    throw new Error('useMentor must be used within a MentorProvider');
  }
  return context;
};