"use client"

import { useCallback, useMemo } from 'react';
import { getTileClassName } from './utils/getTileClassName';
import { TileValue } from '@/app/models';

export interface TileProps {
    row: number;
    column: number;
    size: number;
    value: TileValue;
    onClick: (row: number, column: number) => void;
}

export const Tile = ({ row, column, size, value, onClick }: TileProps) => {
    const className = useMemo(() => {
        return getTileClassName({ row, column, size, value });
    }, [row, column, size, value])

    const handleClick = useCallback(() => {
        onClick(row, column);
    }, [column, onClick, row]);

    return (
        <div className={className} onClick={handleClick}>
            <span>
                {value}
            </span>
        </div>
    )
};

Tile.displayName = 'Tile';
