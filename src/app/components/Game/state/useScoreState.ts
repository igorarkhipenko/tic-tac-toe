"use client"

import { Player } from '@/app/models';
import { useState, useCallback } from 'react';

interface ScoreState {
    size: number;
}

export const useScoreState = ({ size }: ScoreState) => {
    const [winsP1, setWinsP1] = useState(0);
    const [winsP2, setWinsP2] = useState(0);
    const [roundWinner, setRoundWinner] = useState<Player | null>(null)

    const [rowsScore, setRowsScore] = useState<number[]>(Array(size).fill(0));
    const [colsScore, setColsScore] = useState<number[]>(Array(size).fill(0));
    const [diagScore, setDiagScore] = useState<number>(0);
    const [antiDiagScore, setAntiDiagScore] = useState<number>(0);

    const resetScore = useCallback(() => {
        setRowsScore(Array(size).fill(0));
        setColsScore(Array(size).fill(0));
        setDiagScore(0);
        setAntiDiagScore(0);
        setRoundWinner(null);
    }, [size]);

    const checkWinConditionsForPlayer = useCallback(
        (rowsScore: number, colsScore: number, diagScore: number, antiDiagScore: number, player: Player | null) => {
            if (
                Math.abs(rowsScore) === size ||
                Math.abs(colsScore) === size ||
                Math.abs(diagScore) === size ||
                Math.abs(antiDiagScore) === size
            ) {
                if (player === 'p1') {
                    setWinsP1(wins => wins + 1);
                } else {
                    setWinsP2(wins => wins + 1);
                }
                setRoundWinner(player);
            }
        }, [size]);

    const handleScoreUpdate = useCallback((r: number, c: number, player: Player) => {
        const scoreToAdd = player === 'p1' ? 1 : -1;

        const updatedRowsScore = [...rowsScore];
        updatedRowsScore[r] += scoreToAdd;
        setRowsScore(updatedRowsScore);

        const updatedColsScore = [...colsScore];
        updatedColsScore[c] += scoreToAdd;
        setColsScore(updatedColsScore);

        const isDiagTile = r === c;
        const updatedDiagScore = isDiagTile ? diagScore + scoreToAdd : diagScore;
        setDiagScore(updatedDiagScore);

        const isAntiDiagTile = c === size - r - 1;
        const updatedAntiDiagScore = isAntiDiagTile ? antiDiagScore + scoreToAdd : antiDiagScore;
        setAntiDiagScore(updatedAntiDiagScore)

        checkWinConditionsForPlayer(updatedRowsScore[r], updatedColsScore[c], updatedDiagScore, updatedAntiDiagScore, player);
    }, [antiDiagScore, checkWinConditionsForPlayer, colsScore, diagScore, rowsScore, size]);

    return {
        wins: [winsP1, winsP2],
        roundWinner,
        resetScore,
        updateScore: handleScoreUpdate,
    };
};
