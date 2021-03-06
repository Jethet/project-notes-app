import React, { useState } from "react";
import Counter from "./Counter";
import Cell from "./Cell";
import Button from "./Button";

function Game() {
  const [cells, setCells] = useState(initialCellState());
  const [correctChoices, setCorrectChoices] = useState([]);
  const [disableCells, setDisableCells] = useState({ disabled: true });
  const [disableButton, setDisableButton] = useState(false);
  const [count, setCount] = useState(0);

  // create an array of 25 cells with key, color and disabled properties;
  // this is the initial state of the grid
  function initialCellState() {
    let cellsArray = [];
    for (let i = 0; i < 25; i++) {
      cellsArray.push({ key: i, color: "lightgrey" });
    }
    return cellsArray;
  }

  // create an array of random cells (this is used by the PLAY button)
  function selectRandom(number) {
    let randomIndexes = [];
    while (randomIndexes.length < number) {
      let randomIndex = Math.floor(Math.random() * cells.length);
      if (!randomIndexes.includes(randomIndex)) {
        randomIndexes.push(randomIndex);
      }
    }
    return randomIndexes;
  }

  // modify state so that cells in cellsArray change color
  const colorCells = (cellsArray, color) => {
    let newCellsState = cells.slice();
    cellsArray.map((item) => {
      newCellsState[item].color = color;
      return newCellsState;
    });
    // console.log(newCellsState);
    setCells(newCellsState);
  };

  // when the PLAY button is clicked, 7 random cells are selected and colorGame is run
  const handlePlay = () => {
    let randomCells = selectRandom(7);
    setCorrectChoices(randomCells);
    startGameTime(randomCells);
    // the PLAY button cannot be clicked again during the game
    setDisableButton(true);
  };

  // a cells array is passed in and cells change colour
  const startGameTime = (cellsArray) => {
    // this sets the color for the 7 random cells when PLAY is clicked
    colorCells(cellsArray, "rgb(75, 53, 93)");
    // after five seconds, the 7 cells turn grey again
    setTimeout(startGamePlay, 5000);
  };

  // reset grid colors and allow player to click the cells
  const startGamePlay = () => {
    resetGridColors();
    // cells in the grid are made clickable
    setDisableCells(false);
  };

  // reset entire grid colors to original state
  const resetGridColors = () => {
    setCells(initialCellState());
  };

  const restartGame = () => {
    resetGridColors();
    setCount(0)
    setDisableButton(false);
    // cells in the grid are no longer clickable
    setDisableCells(true);
  };

  return (
    <div className="wrapper">
      <Counter count={count} />
      <div className="grid-container">
        <div className="grid">
          {cells.map((cell) => {
            return (
              <Cell
                key={cell.key}
                color={cell.color}
                id={cell.key}
                disableCells={disableCells}
                setDisableCells={setDisableCells}
                correctChoices={correctChoices}
                colorCells={colorCells}
                count={count}
                setCount={setCount}
              />
            );
          })}
        </div>
      </div>
      <div className="button-container">
        <div className="button-play">
          <Button
            name={"PLAY!"}
            onClick={handlePlay}
            selectRandom={selectRandom}
            setCorrectChoices={setCorrectChoices}
            setDisableCells={setDisableCells}
            disableButton={disableButton}
            setDisableButton={setDisableButton}
            startGameTime={startGameTime}
          />
        </div>
        <div className="button-restart">
          <Button name={"REPLAY"} onClick={restartGame} />
        </div>
      </div>
    </div>
  );
}

export default Game;
