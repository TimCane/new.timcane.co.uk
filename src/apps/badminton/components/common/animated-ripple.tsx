import React, { useEffect, useState, useMemo } from 'react';
import styled, { keyframes } from 'styled-components';

interface RippleProps {
  x: number;
  y: number;
  color: string;
  onAnimationComplete: () => void;
}

const RippleCircle = styled.div<{ x: number; y: number; color: string; scale: number }>`
  position: fixed;
  left: ${props => props.x}px;
  top: ${props => props.y}px;
  width: 100px;
  height: 100px;
  background: ${props => props.color};
  border-radius: 50%;
  pointer-events: none;
  z-index: 1000;
  transform-origin: center;
  animation: ${props => expandRipple(props.scale)} 0.6s ease-out forwards;
`;

const expandRipple = (scale: number) => keyframes`
  0% {
    transform: translate(-50%, -50%) scale(0);
    opacity: 0.5;
  }
  100% {
    transform: translate(-50%, -50%) scale(${scale});
    opacity: 1;
  }
`;

export const AnimatedRipple: React.FC<RippleProps> = ({ x, y, color, onAnimationComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  const scale = useMemo(() => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    
    // Calculate the distance to the furthest corner
    const distanceToTopLeft = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    const distanceToTopRight = Math.sqrt(Math.pow(screenWidth - x, 2) + Math.pow(y, 2));
    const distanceToBottomLeft = Math.sqrt(Math.pow(x, 2) + Math.pow(screenHeight - y, 2));
    const distanceToBottomRight = Math.sqrt(Math.pow(screenWidth - x, 2) + Math.pow(screenHeight - y, 2));
    
    // Get the maximum distance and add 20% for safety
    const maxDistance = Math.max(distanceToTopLeft, distanceToTopRight, distanceToBottomLeft, distanceToBottomRight);
    return (maxDistance / 50) * 1.2; // Divide by 50 (half of circle size) and add 20% margin
  }, [x, y]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onAnimationComplete();
    }, 600);

    return () => clearTimeout(timer);
  }, [onAnimationComplete]);

  if (!isVisible) return null;

  return <RippleCircle x={x} y={y} color={color} scale={scale} />;
};
