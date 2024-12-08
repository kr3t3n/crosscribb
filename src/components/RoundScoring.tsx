import React, { useState } from 'react';
import { GameState } from '../types/game';
import { PlusCircle, Check } from 'lucide-react';

type RoundScoringProps = {
  gameState: GameState;
  onScoreSubmit: (scores: { teamId: number; roundScore: number }[]) => void;
};

export const RoundScoring: React.FC<RoundScoringProps> = ({ gameState, onScoreSubmit }) => {
  const [roundScores, setRoundScores] = useState<{ teamId: number; roundScore: number }[]>(
    gameState.teams.map(team => ({ teamId: team.id, roundScore: 0 }))
  );
  const [submittedTeams, setSubmittedTeams] = useState<number[]>([]);

  const handleScoreChange = (teamId: number, value: string) => {
    const score = value === '' ? 0 : parseInt(value);
    setRoundScores(prev =>
      prev.map(s => (s.teamId === teamId ? { ...s, roundScore: score } : s))
    );
  };

  const handleTeamSubmit = (teamId: number) => {
    setSubmittedTeams(prev => [...prev, teamId]);

    // If all teams have submitted, process the round
    if (submittedTeams.length === gameState.teams.length - 1) {
      onScoreSubmit(roundScores);
      setRoundScores(gameState.teams.map(team => ({ teamId: team.id, roundScore: 0 })));
      setSubmittedTeams([]);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-3 sm:p-4 space-y-3 sm:space-y-4">
      <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">Round {gameState.currentRound + 1} Scoring</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {gameState.teams.map(team => {
          const isSubmitted = submittedTeams.includes(team.id);

          return (
            <div key={team.id} className="space-y-2">
              <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor={`score-${team.id}`}>
                {team.name} Round Score
              </label>
              <div className="space-y-2">
                <input
                  id={`score-${team.id}`}
                  type="number"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  min="0"
                  placeholder="0"
                  value={roundScores.find(s => s.teamId === team.id)?.roundScore || ''}
                  onChange={(e) => handleScoreChange(team.id, e.target.value)}
                  disabled={isSubmitted}
                  className={`w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 p-2 
                    text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 
                    focus:border-blue-500 dark:focus:border-blue-400 focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400
                    ${isSubmitted ? 'opacity-50 cursor-not-allowed' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => handleTeamSubmit(team.id)}
                  disabled={isSubmitted}
                  className={`w-full flex items-center justify-center gap-1.5 py-2 px-3 sm:px-4 rounded-md text-sm transition-colors
                    ${isSubmitted 
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                >
                  {isSubmitted ? (
                    <>
                      <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="hidden sm:inline">Score Submitted</span>
                      <span className="sm:hidden">Submitted</span>
                    </>
                  ) : (
                    <>
                      <PlusCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="hidden sm:inline">Submit Score</span>
                      <span className="sm:hidden">Submit</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 text-center">
        {submittedTeams.length === 0 
          ? "Enter and submit scores for each team"
          : submittedTeams.length === 1 
            ? "Waiting for the second team's score..."
            : "Processing round scores..."}
      </p>
    </div>
  );
};