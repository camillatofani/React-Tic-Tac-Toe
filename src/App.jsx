import { useState } from "react"
import "./App.css"

function App() {
	const [table, setTable] = useState([
		["", "", ""],
		["", "", ""],
		["", "", ""]
	])

	const [player, setPlayer] = useState(true)
	const [win, setWin] = useState(false)
	const [tableStyle, setTableStyle] = useState({})

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
			return newTable
		})
	}

	function aWinGame() {
		if (table[0][0] === "X" && table[0][1] === "X" && table[0][2] === "X" // O1X
			|| table[0][0] === "0" && table[0][1] === "0" && table[0][2] === "0" // O10
			|| table[1][0] === "X" && table[1][1] === "X" && table[1][2] === "X" // O2X
			|| table[1][0] === "0" && table[1][1] === "0" && table[1][2] === "0" // O20
			|| table[2][0] === "X" && table[2][1] === "X" && table[2][2] === "X" // O3X
			|| table[2][0] === "0" && table[2][1] === "0" && table[2][2] === "0" // O30
			|| table[0][0] === "X" && table[1][1] === "X" && table[2][2] === "X" // SDX
			|| table[0][0] === "0" && table[1][1] === "0" && table[2][2] === "0" // SD0
			|| table[0][2] === "X" && table[1][1] === "X" && table[2][0] === "X" // DSX
			|| table[0][2] === "0" && table[1][1] === "0" && table[2][0] === "0" // DS0
			|| table[0][0] === "X" && table[1][0] === "X" && table[2][0] === "X" // V1X
			|| table[0][0] === "0" && table[1][0] === "0" && table[2][0] === "0" // V10
			|| table[0][1] === "X" && table[1][1] === "X" && table[2][1] === "X" // V2X
			|| table[0][1] === "0" && table[1][1] === "0" && table[2][1] === "0" // V20
			|| table[0][2] === "X" && table[1][2] === "X" && table[2][2] === "X" // V3X
			|| table[0][2] === "0" && table[1][2] === "0" && table[2][2] === "0" // V30
		) {
			setWin(true)
			setTableStyle({ pointerEvents: 'none' })
		}
	}

	return (
		<div>
			<h1>Tic Tac Toe</h1>
			{ player }
			<div style={ tableStyle }>
				{ table.map((row, rowIndex) => (
					<div data-id={ rowIndex } key={ rowIndex } className="row">
						{ row.map((cell, cellIndex) => (
							<span className="cell" data-id={ cellIndex } key={ cellIndex } onClick={ (e) => { cellIndexFunc(e) } }>{ cell }</span>
						)) }
					</div>
				)) }
			</div>
			{ win && <h1>{ player ? "0" : "X"} ha vinto!!</h1> }
		</div>
	)
}

export default App
