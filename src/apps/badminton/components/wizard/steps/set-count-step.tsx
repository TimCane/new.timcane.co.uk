import React from 'react';
import styled from 'styled-components';
import { colors } from '../../../theme/colors';
import { AnimatedRipple } from '../../common/animated-ripple';
import { useWizard } from '../context/wizard-context';
import type { SetCount } from '../types';
import { useRippleAnimation } from '../../../hooks/useRippleAnimation';
import { Button } from '@/apps/badminton/theme/button.styles';

export const SetCountStep: React.FC = () => {
  const { updateData, nextStep } = useWizard();
  const { ripple, startAnimation, handleAnimationComplete } = useRippleAnimation(nextStep);
  const options: SetCount[] = [1, 3, 5, 'Endless'];

  const handleSelect = (count: SetCount, event: React.MouseEvent<HTMLButtonElement>) => {
    updateData('setCount', count);
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    startAnimation(rect.left + rect.width / 2, rect.top + rect.height / 2, getButtonColor(count, "normal"));
  };

  const getButtonColor = (count: SetCount, state: "normal" | "hover" | "active" = "normal") => {
    switch (state) {
      case "hover":
        return count === 'Endless' ? colors.liNingGoldHover : colors.courtBlueHover;
      case "active":
        return count === 'Endless' ? colors.liNingGoldActive : colors.courtBlueActive;
      default:
        return count === 'Endless' ? colors.liNingGold : colors.courtBlue;
    }
  };

  return (
    <Container>
      <Title>Number of Sets</Title>
      <ButtonGroup>
        {options.map((count) => (
          <Button
            key={count}
            onClick={(e) => handleSelect(count, e)}
            $color={getButtonColor(count, "normal")}
            $hoverColor={getButtonColor(count, "hover")}
            $activeColor={getButtonColor(count, "active")}
          >
            {count}
          </Button>
        ))}
      </ButtonGroup>
      {ripple && (
        <AnimatedRipple
          x={ripple.x}
          y={ripple.y}
          color={ripple.color}
          onAnimationComplete={handleAnimationComplete}
        />
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  background-color: ${colors.background};
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: ${colors.text};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 2rem;
`;
