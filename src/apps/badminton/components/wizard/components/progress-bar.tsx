import React from 'react';
import styled from 'styled-components';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <Container>
      <Progress progress={progress} />
    </Container>
  );
};


const Container = styled.div`
  width: 100%;
  height: 10px;
  background-color: #333;
  border-radius: 5px;
  margin-bottom: 20px;
`;

const Progress = styled.div<{ progress: number }>`
  height: 100%;
  width: ${props => props.progress}%;
  background-color: #4CAF50;
  border-radius: 5px;
  transition: width 0.3s ease;
`;


export default ProgressBar;