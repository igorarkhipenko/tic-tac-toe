import { TileValue } from '@/app/models';

export interface TileClassNameProps {
    row: number;
    column: number;
    size: number;
    value: TileValue;
}

export const getTileClassName = ({ row, column, size, value }: TileClassNameProps) => {
    const isTopRow = row === 0;
    const isBottomRow = row === size - 1;
    const isLeftCol = column === 0;
    const isRightCol = column === size - 1;

    // base styles
    let className = 'flex justify-center items-center text-7xl font-bold w-24 h-24 border-gray-300';

    // board border styles
    if (!isTopRow) className += ' border-t';
    if (!isBottomRow) className += ' border-b';
    if (!isLeftCol) className += ' border-l';
    if (!isRightCol) className += ' border-r';

    if (value === 'o') className += ' text-blue-600';
    if (value === 'x') className += ' text-green-700';

    return className;
};
