export const WINNING_SCORE = {
  cribbage: 121,
  crosscrib: 61,
};

export const calculateRoundTotal = (
  roundScores: { teamId: number; roundScore: number }[],
  gameMode: GameMode
): { teamId: number; points: number }[] => {
  if (gameMode === 'crosscrib') {
    // In Cross-Crib, only the difference between scores counts
    const [team1Score, team2Score] = roundScores;
    const difference = Math.abs(team1Score.roundScore - team2Score.roundScore);
    
    if (team1Score.roundScore > team2Score.roundScore) {
      return [
        { teamId: team1Score.teamId, points: difference },
        { teamId: team2Score.teamId, points: 0 }
      ];
    } else if (team2Score.roundScore > team1Score.roundScore) {
      return [
        { teamId: team1Score.teamId, points: 0 },
        { teamId: team2Score.teamId, points: difference }
      ];
    }
    return [
      { teamId: team1Score.teamId, points: 0 },
      { teamId: team2Score.teamId, points: 0 }
    ];
  } else {
    // In Cribbage, each team gets their full points
    return roundScores.map(score => ({
      teamId: score.teamId,
      points: score.roundScore
    }));
  }
};

export const isGameOver = (score: number, gameMode: GameMode): boolean => {
  return score >= WINNING_SCORE[gameMode];
};