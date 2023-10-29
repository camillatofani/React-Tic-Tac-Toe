import { useState } from "react"
import "./App.css"
import Button from "./components/Button/Button"
import Title from "./components/Title/Title"

function App() {
	const [table, setTable] = useState([
		["", "", ""],
		["", "", ""],
		["", "", ""]
	])

	const [player, setPlayer] = useState(true)
	const [win, setWin] = useState(false)
	const [nobody, setNobody] = useState(false)
	const [tableStyle, setTableStyle] = useState({})
	const [moves, setMoves] = useState(0)

	function cellIndexFunc(e) {
		var row = e.target.parentNode.getAttribute("data-id")
		var cell = e.target.getAttribute("data-id")
		setTable(tab => {
			const newTable = [...tab]
			if (player) {
				newTable[row][cell] = "X"
			} else {
				newTable[row][cell] = "0"
			}
			setPlayer(!player)
			aWinGame()
			setMoves(moves + 1)
			if (moves === 8) {
				setTableStyle({ pointerEvents: 'none' })
				setNobody(true)
			}
			return newTable
		})
	}

	function aWinGame() {
		const winPatterns = [
			[[0, 0], [0, 1], [0, 2]],
			[[1, 0], [1, 1], [1, 2]],
			[[2, 0], [2, 1], [2, 2]],
			[[0, 0], [1, 0], [2, 0]],
			[[0, 1], [1, 1], [2, 1]],
			[[0, 2], [1, 2], [2, 2]],
			[[0, 0], [1, 1], [2, 2]],
			[[0, 2], [1, 1], [2, 0]]
		];

		for (const pattern of winPatterns) {
			const [x, y] = pattern[0]
			const [a, b] = pattern[1]
			const [c, d] = pattern[2]

			if (
				table[x][y] === "X" && table[a][b] === "X" && table[c][d] === "X" ||
				table[x][y] === "0" && table[a][b] === "0" && table[c][d] === "0"
			) {
				setWin(true)
				setTableStyle({ pointerEvents: 'none' })
				return
			}
		}
	}


	function resetGame() {
		setPlayer(true)
		setWin(false)
		setNobody(false)
		setTableStyle({})
		setMoves(0)
		setTable([
			["", "", ""],
			["", "", ""],
			["", "", ""]
		])
	}

	return (
		<div className="tictactoe">
			<Title tag={ 'h1' } title={ 'Tic Tac Toe' } />
			<div className="information">
				<div className="information-box">
					<Title tag={ 'h2' } title={ 'Player' } />
					<Title tag={ 'h2' } title={ `${ player ? 1 : 2 }` } />
				</div>
				<div className="information-box">
					<Title tag={ 'h2' } title={ 'Moves' } />
					<Title tag={ 'h2' } title={ `${ moves }` } />
				</div>
			</div>
			<div style={ tableStyle }>
				{ table.map((row, rowIndex) => (
					<div data-id={ rowIndex } key={ rowIndex } className="row">
						{ row.map((cell, cellIndex) => (
							<span className={ `cell table-${ rowIndex }-${ cellIndex }` } data-id={ cellIndex } key={ cellIndex } onClick={ (e) => { cellIndexFunc(e) } }>{ cell }</span>
						)) }
					</div>
				)) }
			</div>
			{ win && <div>
				<Title tag={ 'h1' } title={ `${ player? "0": "X" } ha vinto!!` } />
				<Button func={ resetGame } title={ 'New game?' } />
			</div> }
			{ nobody && <div>
				<Title tag={ 'h1' } title={ 'Nobody win!' } />
				<Button func={ resetGame } title={ 'New game?' } />
			</div> }
		</div>
	)
}

export default App
