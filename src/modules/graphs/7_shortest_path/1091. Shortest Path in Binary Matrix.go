package main

type queueItem struct {
	distance int
	row      int
	col      int
}

func shortestPathBinaryMatrix(grid [][]int) int {
	nRows, nCols := len(grid), len(grid[0])
	if nRows == 0 {
		return -1
	}

	source := []int{0, 0}
	destination := []int{nRows - 1, nCols - 1}

	// if the start or end cell is blocked, return -1
	if grid[0][0] == 1 || grid[nRows-1][nCols-1] == 1 {
		return -1
	}

	if source[0] == destination[0] && source[1] == destination[1] {
		return 1
	}

	minDistance := make([][]int, nRows)
	for i := range minDistance {
		minDistance[i] = make([]int, nCols)
	}
	// marking all the values as infinity
	for i := 0; i < nRows; i++ {
		for j := 0; j < nCols; j++ {
			minDistance[i][j] = (1 << 31) - 1 // max value for 32-bit architecture
		}
	}
	// making the source as 0
	minDistance[source[0]][source[1]] = 1

	queue := []*queueItem{}
	// inserted the starting position
	queue = append(queue, &queueItem{
		distance: 1,
		row:      0,
		col:      0,
	})

	directions := [][]int{
		{0, 1},   // Up
		{1, 0},   // Right
		{0, -1},  // Down
		{-1, 0},  // Left
		{-1, 1},  // Up-Left (diagonal)
		{1, 1},   // Up-Right (diagonal)
		{-1, -1}, // Down-Left (diagonal)
		{1, -1},  // Down-Right (diagonal)
	}

	for len(queue) > 0 {
		curr := queue[0]
		queue = queue[1:]

		for _, dir := range directions {
			newRow, newCol := curr.row+dir[0], curr.col+dir[1]

			if newRow >= 0 && newRow < nRows && newCol >= 0 && newCol < nCols && grid[newRow][newCol] == 0 && curr.distance+1 < minDistance[newRow][newCol] {
				minDistance[newRow][newCol] = curr.distance + 1

				if newRow == destination[0] && newCol == destination[1] {
					return minDistance[newRow][newCol]
				}

				queue = append(queue, &queueItem{
					distance: minDistance[newRow][newCol],
					row:      newRow,
					col:      newCol,
				})
			}
		}
	}
	return -1
}
