import { colors } from "@/apps/badminton/theme/colors";
import styled from "styled-components";

interface ButtonProps {
    $color: string;
    $hoverColor: string;
    $activeColor: string;
  }
  
export const Button = styled.button<ButtonProps>`
  padding: 1.5rem 3rem;
  font-size: 1.5rem;
  border: none;
  border-radius: 8px;
  background-color: ${props => props.$color};
  color: ${colors.shuttlecockWhite};
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
    background-color: ${props => props.$hoverColor};
  }

  &:active {
    transform: scale(0.95);
    background-color: ${props => props.$activeColor};
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 2rem;
`;