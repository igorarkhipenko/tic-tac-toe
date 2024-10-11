"use client"

import { Score } from '@/app/components/Score';
import { Board } from '@/app/components/Board';
import { useBoardState } from './state/useBoardState';
import { useScoreState } from './state/useScoreState';

export const Game = () => {
    const { wins, roundWinner, updateScore, resetScore } = useScoreState({ size: 3 });
    const { tileValues, onTileClick } = useBoardState({ size: 3, roundWinner, updateScore, resetScore });

    return (
        <div>
            <Score p1={wins[0]} p2={wins[1]} />
            <div className="flex min-h-screen justify-center items-center">
                <Board size={3} tileValues={tileValues} onTileClick={onTileClick} />
            </div>
        </div>
    )
};

Game.displayName = 'Game';
