import { GameTypeStep } from "../steps/game-type-step";
import { SetCountStep } from "../steps/set-count-step";
import { StartingSideStep } from "../steps/starting-side-step";

export const steps = [
  {
    id: 'gameType',
    component: GameTypeStep,
    title: 'Select Game Type'
  },
  {
    id: 'setCount',
    component: SetCountStep,
    title: 'Number of Sets'
  },
  {
    id: 'startingSide',
    component: StartingSideStep,
    title: 'Starting Side'
  }
] as const;

export type StepId = typeof steps[number]['id'];
