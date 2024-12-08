import React from 'react';
import { GameState } from '../types/game';
import { calculateStats, formatDuration } from '../utils/stats';
import { TrendingUp, TrendingDown, Minus, Clock, Award, BarChart2 } from 'lucide-react';

type GameStatsProps = {
  gameState: GameState;
};

export const GameStats: React.FC<GameStatsProps> = ({ gameState }) => {
  const gameDuration = Date.now() - gameState.startTime;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
      <div className="flex items-center gap-2 mb-4">
        <BarChart2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Game Statistics</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {gameState.teams.map((team) => {
          const stats = calculateStats(team, gameState.rounds);
          return (
            <div key={team.id} className="space-y-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white">{team.name} Stats</h4>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <div className="text-sm text-gray-600 dark:text-gray-400">Average Score</div>
                  <div className="font-semibold text-gray-900 dark:text-white">{stats.averageScore} pts</div>
                </div>
                
                <div className="space-y-1">
                  <div className="text-sm text-gray-600 dark:text-gray-400">Highest Round</div>
                  <div className="font-semibold text-gray-900 dark:text-white">{stats.highestRound} pts</div>
                </div>

                <div className="space-y-1">
                  <div className="text-sm text-gray-600 dark:text-gray-400">Recent Trend</div>
                  <div className="flex items-center gap-1 text-gray-900 dark:text-white">
                    {stats.recentTrend === 'up' && <TrendingUp className="w-4 h-4 text-green-500" />}
                    {stats.recentTrend === 'down' && <TrendingDown className="w-4 h-4 text-red-500" />}
                    {stats.recentTrend === 'stable' && <Minus className="w-4 h-4 text-gray-500" />}
                    <span className="capitalize">{stats.recentTrend}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-sm text-gray-600 dark:text-gray-400">Winning Pace</div>
                  <div className="flex items-center gap-1 text-gray-900 dark:text-white">
                    <Award className={`w-4 h-4 ${stats.winningPace ? 'text-green-500' : 'text-gray-400'}`} />
                    <span>{stats.winningPace ? 'Yes' : 'No'}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
        <Clock className="w-4 h-4" />
        <span>Game Duration: {formatDuration(gameDuration)}</span>
      </div>
    </div>
  );
};