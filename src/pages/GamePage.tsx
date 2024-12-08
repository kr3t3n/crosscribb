import React from 'react';
import { GameSetup } from '../components/GameSetup';
import { ScoreBoard } from '../components/ScoreBoard';
import { RoundScoring } from '../components/RoundScoring';
import { RoundHistory } from '../components/RoundHistory';
import { GameStats } from '../components/GameStats';
import { Footer } from '../components/Footer';
import { GameState, GameMode, Team } from '../types/game';
import { WINNING_SCORE, isGameOver, calculateRoundTotal } from '../utils/scoring';
import { Trophy } from 'lucide-react';

export function GamePage() {
  const [gameState, setGameState] = React.useState<GameState | null>(null);

  const handleStartGame = (mode: GameMode, players: string[], isTeamGame: boolean) => {
    const teams: Team[] = isTeamGame
      ? [
          {
            id: 1,
            name: 'Team 1',
            players: [
              { id: 1, name: players[0], score: 0 },
              { id: 2, name: players[1], score: 0 },
            ],
            score: 0,
            highestRound: 0,
            totalPoints: 0,
            skunks: 0,
          },
          {
            id: 2,
            name: 'Team 2',
            players: [
              { id: 3, name: players[2], score: 0 },
              { id: 4, name: players[3], score: 0 },
            ],
            score: 0,
            highestRound: 0,
            totalPoints: 0,
            skunks: 0,
          },
        ]
      : [
          {
            id: 1,
            name: players[0],
            players: [{ id: 1, name: players[0], score: 0 }],
            score: 0,
            highestRound: 0,
            totalPoints: 0,
            skunks: 0,
          },
          {
            id: 2,
            name: players[1],
            players: [{ id: 2, name: players[1], score: 0 }],
            score: 0,
            highestRound: 0,
            totalPoints: 0,
            skunks: 0,
          },
        ];

    setGameState({
      mode,
      teams,
      currentDealer: 0,
      isTeamGame,
      winningScore: WINNING_SCORE[mode],
      rounds: [],
      currentRound: 0,
      startTime: Date.now(),
      lastUpdateTime: Date.now(),
    });
  };

  const handleRoundScore = (roundScores: { teamId: number; roundScore: number }[]) => {
    if (!gameState) return;

    const roundPoints = calculateRoundTotal(roundScores, gameState.mode);
    
    const newRound = {
      id: gameState.rounds.length + 1,
      scores: roundScores,
      dealer: gameState.currentDealer,
      timestamp: Date.now(),
    };

    const updatedTeams = gameState.teams.map(team => {
      const roundPoint = roundPoints.find(p => p.teamId === team.id)?.points || 0;
      const roundScore = roundScores.find(s => s.teamId === team.id)?.roundScore || 0;
      return {
        ...team,
        score: team.score + roundPoint,
        highestRound: Math.max(team.highestRound, roundScore),
        totalPoints: team.totalPoints + roundScore,
      };
    });

    setGameState({
      ...gameState,
      teams: updatedTeams,
      rounds: [...gameState.rounds, newRound],
      currentRound: gameState.currentRound + 1,
      currentDealer: (gameState.currentDealer + 1) % gameState.teams.length,
      lastUpdateTime: Date.now(),
    });
  };

  const winner = gameState?.teams.find((team) =>
    isGameOver(team.score, gameState.mode)
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-2 text-indigo-900 dark:text-indigo-300">
          CrossCribb.Click
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
          {gameState?.mode === 'crosscrib' ? 'Cross-Crib' : 'Cribbage'} Score Tracker
        </p>

        {!gameState ? (
          <div className="flex justify-center items-center">
            <GameSetup onStartGame={handleStartGame} />
          </div>
        ) : (
          <div className="space-y-6 max-w-4xl mx-auto">
            {winner ? (
              <div className="text-center mb-8 p-6 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900 rounded-lg">
                <Trophy className="w-12 h-12 text-green-600 dark:text-green-400 mx-auto mb-2" />
                <h2 className="text-2xl font-bold text-green-800 dark:text-green-300">
                  {winner.name} Wins!
                </h2>
              </div>
            ) : null}
            
            <ScoreBoard gameState={gameState} />
            
            {!winner && (
              <RoundScoring
                gameState={gameState}
                onScoreSubmit={handleRoundScore}
              />
            )}
            
            <GameStats gameState={gameState} />
            <RoundHistory gameState={gameState} />
            
            <div className="text-center text-sm text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
              <p className="font-medium">First to {gameState.winningScore} points wins!</p>
              {gameState.mode === 'crosscrib' && (
                <p className="mt-1 text-indigo-600 dark:text-indigo-400">
                  In Cross-Crib, only the difference between round scores counts as points
                </p>
              )}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}