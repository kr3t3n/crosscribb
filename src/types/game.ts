export type Player = {
  id: number;
  name: string;
  score: number;
};

export type Team = {
  id: number;
  name: string;
  players: Player[];
  score: number;
  highestRound: number;
  totalPoints: number;
  skunks: number;
};

export type GameMode = 'cribbage' | 'crosscrib';

export type Round = {
  id: number;
  scores: {
    teamId: number;
    roundScore: number;
  }[];
  dealer: number;
  timestamp: number;
};

export type GameState = {
  mode: GameMode;
  teams: Team[];
  currentDealer: number;
  isTeamGame: boolean;
  winningScore: number;
  rounds: Round[];
  currentRound: number;
  startTime: number;
  lastUpdateTime: number;
};