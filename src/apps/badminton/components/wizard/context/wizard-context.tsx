import React, { createContext, useContext, useReducer, type ReactNode } from 'react';
import type { GameSetupData } from '../types';
import { steps } from '../config/steps';

interface WizardState {
  currentStep: number;
  data: Partial<GameSetupData>;
}

type WizardAction = 
  | { type: 'UPDATE_DATA'; key: keyof GameSetupData; value: any }
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' };

interface WizardContextType {
  state: WizardState;
  updateData: <K extends keyof GameSetupData>(key: K, value: GameSetupData[K]) => void;
  nextStep: () => void;
  prevStep: () => void;
  isComplete: boolean;
}

const TOTAL_STEPS = steps.length;

const initialState: WizardState = {
  currentStep: 0,
  data: {}
};

const WizardContext = createContext<WizardContextType | undefined>(undefined);

function wizardReducer(state: WizardState, action: WizardAction): WizardState {
  switch (action.type) {
    case 'UPDATE_DATA':
      return {
        ...state,
        data: { ...state.data, [action.key]: action.value }
      };
    case 'NEXT_STEP':
      return {
        ...state,
        currentStep: Math.min(state.currentStep + 1, TOTAL_STEPS)
      };
    case 'PREV_STEP':
      return {
        ...state,
        currentStep: Math.max(state.currentStep - 1, 0)
      };
    default:
      return state;
  }
}

export const WizardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(wizardReducer, initialState);

  const updateData = <K extends keyof GameSetupData>(key: K, value: GameSetupData[K]) => {
    dispatch({ type: 'UPDATE_DATA', key, value });
  };

  const nextStep = () => {
    dispatch({ type: 'NEXT_STEP' });
  };

  const prevStep = () => {
    dispatch({ type: 'PREV_STEP' });
  };

  const isComplete = state.currentStep === TOTAL_STEPS;

  return (
    <WizardContext.Provider value={{ state, updateData, nextStep, prevStep, isComplete }}>
      {children}
    </WizardContext.Provider>
  );
};

export const useWizard = () => {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error('useWizard must be used within a WizardProvider');
  }
  return context;
};

export const STEPS = ['gameType', 'setCount', 'startingSide'] as const;
