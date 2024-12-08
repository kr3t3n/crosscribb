import { GameState, Team, Round } from '../types/game';

export const calculateStats = (team: Team, rounds: Round[]): {
  averageScore: number;
  highestRound: number;
  totalRounds: number;
  winningPace: boolean;
  recentTrend: 'up' | 'down' | 'stable';
} => {
  const teamRounds = rounds
    .map(round => round.scores.find(score => score.teamId === team.id)?.roundScore || 0);

  const averageScore = teamRounds.length > 0
    ? Math.round((teamRounds.reduce((a, b) => a + b, 0) / teamRounds.length) * 10) / 10
    : 0;

  const highestRound = Math.max(0, ...teamRounds);

  // Calculate trend based on last 3 rounds
  const recentScores = teamRounds.slice(-3);
  let trend: 'up' | 'down' | 'stable' = 'stable';
  
  if (recentScores.length >= 2) {
    const diff = recentScores[recentScores.length - 1] - recentScores[recentScores.length - 2];
    trend = diff > 0 ? 'up' : diff < 0 ? 'down' : 'stable';
  }

  return {
    averageScore,
    highestRound,
    totalRounds: teamRounds.length,
    winningPace: averageScore > 15, // Assuming 15 points per round is a good pace
    recentTrend: trend,
  };
};

export const formatDuration = (ms: number): string => {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours > 0) {
    return `${hours}h ${minutes % 60}m`;
  }
  if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`;
  }
  return `${seconds}s`;
};