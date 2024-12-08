import React, { useState } from 'react';
import { GameSetup } from '../components/GameSetup';
import { ScoreBoard } from '../components/ScoreBoard';
import { RoundScoring } from '../components/RoundScoring';
import { RoundHistory } from '../components/RoundHistory';
import { GameStats } from '../components/GameStats';
import { Footer } from '../components/Footer';
import { GameState, GameMode, Team } from '../types/game';
import { WINNING_SCORE, isGameOver, calculateRoundTotal } from '../utils/scoring';
import { Trophy, Users2, Calculator, History } from 'lucide-react';

export function GamePage() {
  const [gameState, setGameState] = useState<GameState | null>(null);

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
      <div className="flex-1 container mx-auto px-4 py-8">
        {!gameState ? (
          <div className="flex flex-col items-center">
            <GameSetup onStartGame={handleStartGame} />
            
            <div className="mt-12 max-w-3xl mx-auto">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
                  <Users2 className="w-10 h-10 text-primary-600 dark:text-primary-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                    Flexible Player Options
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Perfect for 2 players or 2 teams of 2 players each
                  </p>
                </div>

                <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
                  <Calculator className="w-10 h-10 text-secondary-500 dark:text-secondary-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                    Smart Scoring System
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Supports both traditional Cribbage and Cross-Crib scoring
                  </p>
                </div>

                <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
                  <History className="w-10 h-10 text-accent dark:text-accent mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                    Complete Game History
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Track rounds, statistics, and performance trends
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[rgb(71,71,255)] to-[rgb(255,85,221)] bg-clip-text text-transparent">
                CrossCribb.Click
              </h1>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
                Your Ultimate Cribbage Score Tracking Companion
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                The perfect scoring companion for both traditional Cribbage and Cross-Crib games. 
                Designed for casual players and serious enthusiasts alike.
              </p>
            </div>
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