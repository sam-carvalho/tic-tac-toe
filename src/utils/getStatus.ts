import { SquareType } from "../types";

const getStatus = (winner: SquareType, xIsNext: boolean ): string => {
    if (winner) {
        return `Winner: ${winner}`;
    }
    else return "Next player: " + (xIsNext ? "X" : "O");
    
}

export default getStatus;