interface ScoreProps {
    p1: number;
    p2: number;
}

export const Score = ({ p1, p2 }: ScoreProps) => {
    return (
        <div className=" min-w-full text-center pt-16 fixed">
            <div className="grid grid-cols-2 gap-4 text-center font-semibold text-2xl">
                <span>Player 1</span>
                <span>{p1}</span>
                <span>Player 2</span>
                <span>{p2}</span>
            </div>
        </div>
    );
};

Score.displayName = 'Score';
