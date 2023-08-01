import React, { useState } from 'react'
export function Square({ value, onClick }) {
  return (
    <button onClick={onClick} className="-mt-px -mr-px border">
      {value}
    </button>
  )
}
export function Board({ xIsNext, squares, onClick }) {
  return (
    <div className="grid grid-cols-3 grid-rows-3 w-36 h-36 ">
      {squares.map((value, index) => (
        <Square
          onClick={() => onClick({ value, index })}
          key={index}
          value={value}
        />
      ))}
    </div>
  )
}
export function Logs({ logs, initGame, moveTo }) {
  console.log('logs :>> ', logs)
  return (
    <>
      <ul>
        <li onClick={initGame}>开始游戏</li>
        {logs.map((log, i) => (
          <li onClick={() => moveTo(log, i)} className="cursor-pointer" key={i}>
            {log}
          </li>
        ))}
      </ul>
    </>
  )
}
export function calcWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}
export function calcWinnerLine(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return lines[i]
    }
  }
  return null
}
export default function Game() {
  const INITSQUARES = new Array(9).fill('')
  const initGame = () => {
    setSquares(INITSQUARES)
    setHistory([])
    setXIsNext(true)
    setWinner(null)
  }
  const moveTo = (step, i) => {
    setSquares(step)
    console.log('i :>> ', i)
    setHistory(history.slice(0, i + 1))
    setXIsNext(i % 2 === 1)
    const win = calcWinner(step)
    win ? setWinner(win) : setWinner(null)
  }
  const heighLightWinner = (line) => {}
  const [winner, setWinner] = useState(null)
  const [squares, setSquares] = useState(INITSQUARES)
  const [history, setHistory] = useState([])
  const handleBoardClick = ({ value, index }) => {
    if (winner || value !== '') return
    const currentSquares = squares.slice()
    currentSquares[index] = xIsNext ? 'X' : 'Y' // 当前落子
    setSquares(currentSquares)
    const log = history.slice()
    log.push(currentSquares)
    setHistory(log)
    setXIsNext(!xIsNext)
    const win = calcWinner(currentSquares)
    win ? setWinner(win) : setWinner(null)
  }
  const [xIsNext, setXIsNext] = useState(true)

  return (
    <div className="m-2">
      {winner ? (
        <h1>winner: {winner}</h1>
      ) : (
        <h1>下一位: {xIsNext ? 'X' : 'Y'}</h1>
      )}
      s
      <Board squares={squares} onClick={handleBoardClick} />
      <Logs logs={history} initGame={initGame} moveTo={moveTo} />
    </div>
  )
}
