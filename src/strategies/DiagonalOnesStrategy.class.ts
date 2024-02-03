import {LINK_STATE_X, Puzzle} from "../Puzzle.class";
import { AbstractCellWithValueStrategy } from "./AbstractStrategy.class";

/**
 * Filling in x-es based on adjacent 1-cells
 */
export class DiagonalOnesStrategy extends AbstractCellWithValueStrategy {

    public applyToPuzzleForCell(puzzle: Puzzle, row: number, col: number, cellValue: number): Puzzle {
        if (cellValue != 1) {
            return puzzle;
        }
        //Diagonal downward case: The cell below and to the right of this is also 1
        if (puzzle.getValidCellValue(row + 1, col + 1) == 1) {
            //Outer Xs
            // . X .   .
            // X*1*
            // .   .   .
            //       1 x
            // .   . x .
            if (puzzle.getHorizontalLinkState(row, col) === LINK_STATE_X
                && puzzle.getVerticalLinkState(row, col) === LINK_STATE_X) {
                puzzle = puzzle.optionalSetHorizontalLinkTo(row + 2, col + 1, LINK_STATE_X);
                puzzle = puzzle.optionalSetVerticalLinkTo(row + 1, col + 2, LINK_STATE_X);
            }
            //Inner Xs
            // .   .   .
            //  *1*X
            // . X . x .
            //     x 1
            // .   .   .
            if (puzzle.getHorizontalLinkState(row + 1, col) === LINK_STATE_X
                && puzzle.getVerticalLinkState(row, col + 1) === LINK_STATE_X) {
                puzzle = puzzle.optionalSetHorizontalLinkTo(row + 1, col + 1, LINK_STATE_X);
                puzzle = puzzle.optionalSetVerticalLinkTo(row + 1, col + 1, LINK_STATE_X);
            }
        }

        //Diagonal upward case: The cell above and to the right of this is also 1
        if (puzzle.getValidCellValue(row - 1, col + 1) == 1) {
            //Outer Xs
            // .   . x .
            //       1 x
            // .   .   .
            // X*1*
            // . X .   .
            if (puzzle.getHorizontalLinkState(row + 1, col) === LINK_STATE_X
                && puzzle.getVerticalLinkState(row, col) === LINK_STATE_X) {
                puzzle = puzzle.optionalSetHorizontalLinkTo(row - 1, col + 1, LINK_STATE_X);
                puzzle = puzzle.optionalSetVerticalLinkTo(row - 1, col + 2, LINK_STATE_X);
            }
            //Inner Xs
            // .   .   .
            //     x 1
            // . X . x .
            //  *1*X
            // .   .   .
            if (puzzle.getHorizontalLinkState(row, col) === LINK_STATE_X
                && puzzle.getVerticalLinkState(row, col + 1) === LINK_STATE_X) {
                puzzle = puzzle.optionalSetHorizontalLinkTo(row, col + 1, LINK_STATE_X);
                puzzle = puzzle.optionalSetVerticalLinkTo(row - 1, col + 1, LINK_STATE_X);
            }
        }
        return puzzle;
    }

}

// def cellfunc_handle_diagonal_ones(puzzle, row, col):
//     if puzzle.get_board(row, col) != '1':
//         return
//
//     for dr in [-1, 1]:
//         for dc in [-1, 1]:
//             next_row = row + 2 * dr
//             next_col = col + 2 * dc
//
//             if next_row < 0 or next_row >= puzzle.board_height or \
//                next_col < 0 or next_col >= puzzle.board_width:
//                 # Went off the edge of the board.
//                 continue
//
//             if puzzle.get_board(next_row, next_col) != '1':
//                 # Not a diagonal 1.  Skip.
//                 continue
//
//             if puzzle.get_board(row, col - dc) == 'x' and \
//                puzzle.get_board(row - dr, col) == 'x':
//                 # 'x' values on outer edges of 1-cell.  Put corresponding 'x'
//                 # values on outer edges of adjacent diagonal 1-cell.
//                 puzzle.cond_set_link_to_x(next_row, next_col + dc)
//                 puzzle.cond_set_link_to_x(next_row + dr, next_col)
//
//             elif puzzle.get_board(row, col + dc) == 'x' and \
//                  puzzle.get_board(row + dr, col) == 'x':
//                 # 'x' values on inner edges of 1-cell.  Put corresponding 'x'
//                 # values on inner edges of adjacent diagonal 1-cell.
//                 puzzle.cond_set_link_to_x(next_row, next_col - dc)
//                 puzzle.cond_set_link_to_x(next_row - dr, next_col)
