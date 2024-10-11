"use client"

import { useCallback, useState } from 'react';
import { Player, TileValue, getTileKey } from '@/app/models';

interface BoardStateProps {
    size: number;
    roundWinner: Player | null;
    updateScore: (row: number, column: number, player: Player) => void;
    resetScore: () => void;
}

export const useBoardState = ({ size, updateScore, resetScore, roundWinner }: BoardStateProps) => {
    const [currentPlayer, setCurrentPlayer] = useState<Player>('p1');
    const [tileValues, setTileValues] = useState<Map<string, TileValue>>(
        new Map()
    );

    const togglePlayer = useCallback(() => {
        setCurrentPlayer(player => player === 'p1' ? 'p2' : 'p1');
    }, []);

    const resetBoard = useCallback(() => {
        setTileValues(new Map());
    }, []);

    const startNewGame = useCallback(() => {
        setCurrentPlayer('p1');
        resetScore();
        resetBoard();
    }, [resetBoard, resetScore])

    const handleTileClick = useCallback((row: number, column: number) => {
        if (roundWinner || tileValues.size === size * size) {
            startNewGame();
            return;
        }

        const tileKey = getTileKey(row, column);
        if (tileValues.has(tileKey)) return;

        setTileValues(values => {
            const newTileValues = new Map(values);
            const newValue = currentPlayer === 'p1' ? 'x' : 'o';
            newTileValues.set(tileKey, newValue);

            return newTileValues;
        });

        updateScore(row, column, currentPlayer);
        togglePlayer();
    }, [currentPlayer, roundWinner, size, startNewGame, tileValues, togglePlayer, updateScore]);

    return {
        currentPlayer,
        tileValues,
        onTileClick: handleTileClick,
    }
};
