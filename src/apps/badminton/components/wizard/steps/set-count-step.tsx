import React from 'react';
import { colors } from '../../../theme/colors';
import { AnimatedRipple } from '../../common/animated-ripple';
import { useWizard } from '../context/wizard-context';
import type { SetCount } from '../types';
import { useRippleAnimation } from '../../../hooks/useRippleAnimation';
import { ButtonGroup, Button } from '../theme/button.styles';
import { Title } from '../theme/title.styles';

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
    <>
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
    </>
  );
};
