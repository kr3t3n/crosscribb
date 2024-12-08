import React from 'react';
import { GameState } from '../types/game';
import { Users, Award, TrendingUp, Target } from 'lucide-react';

type ScoreBoardProps = {
  gameState: GameState;
};

export const ScoreBoard: React.FC<ScoreBoardProps> = ({ gameState }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
      {gameState.teams.map((team) => {
        const isDealer = gameState.currentDealer === team.id - 1;
        const progress = (team.score / gameState.winningScore) * 100;
        
        return (
          <div
            key={team.id}
            className={`relative overflow-hidden rounded-xl shadow-lg transition-all duration-300
              ${isDealer 
                ? 'bg-gradient-to-br from-indigo-50/90 to-blue-50/90 dark:from-indigo-950/50 dark:to-blue-900/50 ring-2 ring-blue-500/20' 
                : 'bg-white/90 dark:bg-gray-800/90'}`}
          >
            {/* Progress bar background */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-blue-500/10 dark:from-indigo-600/20 dark:to-blue-600/20" />
            
            {/* Progress indicator */}
            <div 
              className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-indigo-500 to-blue-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />

            <div className="relative p-4 sm:p-6 space-y-3 sm:space-y-4">
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="p-1.5 sm:p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/50">
                    <Users className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">{team.name}</h3>
                </div>
                {team.highestRound >= 20 && (
                  <div className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/50">
                    <Award className="w-3 h-3 sm:w-4 sm:h-4 text-amber-600 dark:text-amber-400" />
                    <span className="text-xs sm:text-sm font-medium text-amber-600 dark:text-amber-400">High Score!</span>
                  </div>
                )}
              </div>

              {/* Players */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {team.players.map((player) => (
                  <div 
                    key={player.id}
                    className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-gray-100 dark:bg-gray-700/50 text-xs sm:text-sm text-gray-600 dark:text-gray-300"
                  >
                    {player.name}
                  </div>
                ))}
              </div>

              {/* Score and Status */}
              <div className="flex items-center justify-between pt-1 sm:pt-2">
                <div className="flex items-baseline gap-1 sm:gap-2">
                  <span className="text-2xl sm:text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                    {team.score}
                  </span>
                  <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    / {gameState.winningScore}
                  </span>
                </div>

                <div className="flex gap-2 sm:gap-3">
                  <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                    <Target className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="text-xs sm:text-sm">{Math.round(progress)}%</span>
                  </div>
                  
                  {isDealer && (
                    <div className="flex items-center gap-1 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md bg-blue-100 dark:bg-blue-900/50">
                      <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 dark:text-blue-400" />
                      <span className="text-xs sm:text-sm font-medium text-blue-600 dark:text-blue-400">Dealer</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};