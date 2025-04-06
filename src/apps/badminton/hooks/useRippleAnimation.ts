import { useState, useCallback } from 'react';

interface RippleState {
  isAnimating: boolean;
  x: number;
  y: number;
  color: string;
}

export const useRippleAnimation = (onComplete: () => void) => {
  const [ripple, setRipple] = useState<RippleState | null>(null);

  const startAnimation = useCallback((x: number, y: number, color: string) => {
    setRipple({
      isAnimating: true,
      x,
      y,
      color,
    });
  }, []);

  const handleAnimationComplete = useCallback(() => {
    setRipple(null);
    onComplete();
  }, [onComplete]);

  return {
    ripple,
    startAnimation,
    handleAnimationComplete,
  };
};
