"use client"

import { useMemo } from 'react';
import { Tile } from '@/app/components/Tile';
import { getTileKey, TileValue } from '@/app/models';

export interface BoardProps {
    size: number;
    tileValues: Map<string, TileValue>;
    onTileClick: (row: number, column: number) => void;
}

export const Board = ({ size, tileValues, onTileClick }: BoardProps) => {
    const tiles = useMemo(() => {
        const result = [];

        for (let r = 0; r < size; r++) {
            for (let c = 0; c < size; c++) {
                const tileKey = getTileKey(r, c);
                result.push(
                    <Tile
                        key={tileKey}
                        row={r}
                        column={c}
                        size={size}
                        value={tileValues.get(tileKey)}
                        onClick={onTileClick}
                    />
                );
            }
        }

        return result;
    }, [size, tileValues, onTileClick]);

    return (
        <div className={`grid grid-cols-3`}>
            {tiles}
        </div>
    );
};

Board.displayName = 'Board';
