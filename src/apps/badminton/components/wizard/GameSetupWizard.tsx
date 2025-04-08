import React, { useEffect } from 'react';
import { WizardProvider, useWizard } from './context/wizard-context';
import { steps } from './config/steps';
import ProgressBar from './components/progress-bar';
import styled from 'styled-components';
import type { GameSetupData } from './types';
import { colors } from '../../theme/colors';

interface GameSetupWizardProps {
  onComplete: (data: GameSetupData) => void;
}

const WizardContent: React.FC<{ onComplete: (data: GameSetupData) => void }> = ({ onComplete }) => {
  const { state, isComplete } = useWizard();
  const CurrentStep = steps[state.currentStep]?.component;

  useEffect(() => {
    if (isComplete) {
      onComplete(state.data as GameSetupData);
    }
  }, [isComplete, state.data, onComplete]);

  return (
    <Container>
      <ProgressBar currentStep={state.currentStep} totalSteps={steps.length} />
      <StepContainer>
      {CurrentStep && <CurrentStep />}
      </StepContainer>
    </Container>
  );
};

const GameSetupWizard: React.FC<GameSetupWizardProps> = ({ onComplete }) => {
  return (
    <WizardProvider>
      <WizardContent onComplete={onComplete} />
    </WizardProvider>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background-color: #1a1a1a;
  color: white;
  padding: 20px;
  box-sizing: border-box;
`;

const StepContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  background-color: ${colors.background};
`;

export default GameSetupWizard;
