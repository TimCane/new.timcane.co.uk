export type GameType = 'Singles' | 'Doubles';
export type SetCount = 1 | 3 | 5 | 'Endless';
export type StartingSide = 'Left' | 'Right';

export interface GameSetupData {
  gameType: GameType;
  setCount: SetCount;
  startingSide: StartingSide;
}
