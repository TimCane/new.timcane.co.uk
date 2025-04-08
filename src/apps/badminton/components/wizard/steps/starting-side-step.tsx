import React from 'react';
import { useWizard } from '../context/wizard-context';
import type { StartingSide } from '../types';
import { colors } from '../../../theme/colors';
import { AnimatedRipple } from '../../common/animated-ripple';
import { useRippleAnimation } from '../../../hooks/useRippleAnimation';
import { ButtonGroup, Button } from '../theme/button.styles';
import { Title } from '../theme/title.styles';

export const StartingSideStep: React.FC = () => {
  const { updateData, nextStep } = useWizard();
  const { ripple, startAnimation, handleAnimationComplete } = useRippleAnimation(nextStep);

  const handleSelect = (side: StartingSide, event: React.MouseEvent<HTMLButtonElement>) => {
    updateData('startingSide', side);
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    startAnimation(rect.left + rect.width / 2, rect.top + rect.height / 2, getButtonColor(side, "normal"));
  };

  const getButtonColor = (side: StartingSide, state: "normal" | "hover" | "active" = "normal") => {
    switch (state) {
      case "hover":
        return side === 'Left' ? colors.courtBlueHover : colors.yonexRedHover
      case "active":
        return side === 'Left' ? colors.courtBlueActive : colors.yonexRedActive
      default:
        return side === 'Left' ? colors.courtBlue : colors.yonexRed
    }
  };

  return (
    <>
      <Title>Starting Side</Title>
      <ButtonGroup>
        <Button
          onClick={(e) => handleSelect('Left', e)}
          $color={getButtonColor('Left', "normal")}
          $hoverColor={getButtonColor('Left', "hover")}
          $activeColor={getButtonColor('Left', "active")}
        >
          Left
        </Button>
        <Button
          onClick={(e) => handleSelect('Right', e)}
          $color={getButtonColor('Right', "normal")}
          $hoverColor={getButtonColor('Right', "hover")}
          $activeColor={getButtonColor('Right', "active")}
        >
          Right
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

