import React from 'react';
import { GameState } from '../types/game';
import { History } from 'lucide-react';

type RoundHistoryProps = {
  gameState: GameState;
};

export const RoundHistory: React.FC<RoundHistoryProps> = ({ gameState }) => {
  if (gameState.rounds.length === 0) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 space-y-4">
      <div className="flex items-center gap-2">
        <History className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Round History</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="py-2 px-4 text-left text-gray-900 dark:text-white">Round</th>
              {gameState.teams.map(team => (
                <th key={team.id} className="py-2 px-4 text-left text-gray-900 dark:text-white">{team.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {gameState.rounds.map((round, index) => (
              <tr key={round.id} className="border-b border-gray-200 dark:border-gray-700">
                <td className="py-2 px-4 text-gray-900 dark:text-gray-300">{index + 1}</td>
                {gameState.teams.map(team => (
                  <td key={team.id} className="py-2 px-4 text-gray-900 dark:text-gray-300">
                    {round.scores.find(s => s.teamId === team.id)?.roundScore || 0}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};