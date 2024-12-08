import React, { useState } from 'react';
import { GameMode } from '../types/game';

type GameSetupProps = {
  onStartGame: (mode: GameMode, players: string[], isTeamGame: boolean) => void;
};

export const GameSetup: React.FC<GameSetupProps> = ({ onStartGame }) => {
  const [mode, setMode] = useState<GameMode>('cribbage');
  const [isTeamGame, setIsTeamGame] = useState(false);
  const [players, setPlayers] = useState(['', '', '', '']);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const filteredPlayers = players.filter(Boolean);
    onStartGame(mode, filteredPlayers, isTeamGame);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Game Setup</h2>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Game Mode</label>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value as GameMode)}
            className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 p-2 text-gray-900 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400"
          >
            <option value="cribbage">Cribbage</option>
            <option value="crosscrib">Cross-Crib</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Game Type</label>
          <select
            value={isTeamGame ? 'team' : 'individual'}
            onChange={(e) => setIsTeamGame(e.target.value === 'team')}
            className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 p-2 text-gray-900 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400"
          >
            <option value="individual">2 Players</option>
            <option value="team">2 Teams (4 Players)</option>
          </select>
        </div>

        {players.slice(0, isTeamGame ? 4 : 2).map((player, index) => (
          <div key={index} className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {isTeamGame ? `Team ${Math.floor(index / 2) + 1} Player ${index % 2 + 1}` : `Player ${index + 1}`}
            </label>
            <input
              type="text"
              value={player}
              onChange={(e) => {
                const newPlayers = [...players];
                newPlayers[index] = e.target.value;
                setPlayers(newPlayers);
              }}
              className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 p-2 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400"
              placeholder="Enter player name"
              required
            />
          </div>
        ))}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
      >
        Start Game
      </button>
    </form>
  );
};