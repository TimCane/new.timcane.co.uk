import React from 'react';
import { useWizard } from '../context/wizard-context';
import type { GameType } from '../types';
import { colors } from '@/apps/badminton/theme/colors';
import { useRippleAnimation } from '../../../hooks/useRippleAnimation';
import { AnimatedRipple } from '../../common/animated-ripple';
import { ButtonGroup, Button } from '../theme/button.styles';
import { Title } from '../theme/title.styles';

export const GameTypeStep: React.FC = () => {
  const { updateData, nextStep } = useWizard();
  const { ripple, startAnimation, handleAnimationComplete } = useRippleAnimation(nextStep);

  const handleSelect = (type: GameType, event: React.MouseEvent<HTMLButtonElement>) => {
    updateData('gameType', type);
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    startAnimation(rect.left + rect.width / 2, rect.top + rect.height / 2, getButtonColor(type));
  };

  const getButtonColor = (type: GameType, state: "normal" | "hover" | "active" = "normal") => {
    switch (state) {
      case "hover":
        return type === 'Singles' ? colors.courtBlueHover : colors.yonexRedHover;
      case "active":
        return type === 'Singles' ? colors.courtBlueActive : colors.yonexRedActive;
      default:
        return type === 'Singles' ? colors.courtBlue : colors.yonexRed;
    }
  };

  return (
    <>
      <Title>Select Game Type</Title>
      <ButtonGroup>
        <Button
          onClick={(e) => handleSelect('Singles', e)}
          $color={getButtonColor('Singles', 'normal')}
          $hoverColor={getButtonColor('Singles', 'hover')}
          $activeColor={getButtonColor('Singles', 'active')}
        >
          Singles
        </Button>
        <Button
          onClick={(e) => handleSelect('Doubles', e)}
          $color={getButtonColor('Doubles', 'normal')}
          $hoverColor={getButtonColor('Doubles', "hover")}
          $activeColor={getButtonColor('Doubles', "active")}
        >
          Doubles
        </Button>
      </ButtonGroup>
      {ripple && (
        <AnimatedRipple
          x={ripple.x}
          y={ripple.y}
          color={ripple.color}
          onAnimationComplete={handleAnimationComplete}
        />
      )}
    </>
  );
};