import { Operation } from "./Operation.class";

export class FillInLinks extends Operation {


//     def fill_in_links(self):
//         self.iter_cells(cellfunc_fill_in_links)
//
//
//     def cellfunc_fill_in_links(puzzle, row, col):
//         '''
//     This helper function handles the case where a cell has a number in it,
//     call it cellnum, and the cell is surrounded by 4 - cellnum 'x' values.
//     In this case, the remaining slots must be links.
//     '''
//
//     cellval = puzzle.get_board(row, col)
//     if cellval != ' ':
//         links_required = int(cellval)
//
//     num_links = puzzle.count_adjacent_links(row, col)
//     num_xes = puzzle.count_adjacent_xes(row, col)
//
//     if num_links < links_required and (4 - num_xes) == links_required:
// # Remaining empty slots are set to links!
//     puzzle.cond_set_link_to(row - 1, col, '-')
//     puzzle.cond_set_link_to(row + 1, col, '-')
//     puzzle.cond_set_link_to(row, col - 1, '|')
//     puzzle.cond_set_link_to(row, col + 1, '|')


}