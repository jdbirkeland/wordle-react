import './App.css';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

function App() {
  const [wordGrid, setWordGrid] = useState([]);
  const [currentRow, setCurrentRow] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const solution = "width";

  useEffect(() => {
    function initializeWordGrid() {
      let newWordGrid = [];
      for (let i = 0; i < 6; i++) {
        newWordGrid.push([]);
      }
      for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 5; j++) {
          newWordGrid[i].push({ letter: "", state: "empty" }); //states: 'correct', 'incorrect', 'wrongposition', 'empty'
        }
      }

      setWordGrid(newWordGrid);
    }
    if (wordGrid.length === 0) {
      initializeWordGrid();
    }
  });

  const handleChange = (e, row, column) => {
    const newWordGrid = [...wordGrid];
    newWordGrid[row][column].letter = e.target.value;
    setWordGrid(newWordGrid);
  }

  const handleSubmit = () => {
    const newWordGrid = [...wordGrid];
    const currentWord = newWordGrid[currentRow];
    for (let i = 0; i < currentWord.length; i++) {
      if (currentWord[i].letter === solution[i]) {
        currentWord[i].state = "correct";
      } else if (solution.includes(currentWord[i].letter)) {
        currentWord[i].state = "wrongposition";
      } else {
        currentWord[i].state = "incorrect";
      }
    }
    let isCorrect = true;
    for (let i = 0; i < currentWord.length; i++) {
      if (currentWord[i].state !== "correct") {
        isCorrect = false;
        setCurrentRow(currentRow + 1);
      }
    }
    setIsGameOver(isCorrect);
  };


  return (
    <Div>
      {isGameOver && <div>Game Over</div>}
      {wordGrid.map((row, rowIndex) => (
        <RowWrapper key={rowIndex}>
          {row.map((col, colIndex) => (
            <Letter
              status={col.state}
              key={colIndex}
              value={wordGrid[rowIndex][colIndex].letter}
              onChange={(e) => handleChange(e, rowIndex, colIndex)}
            />
            // </Letter>
          ))}
        </RowWrapper>
      ))}
      <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
    </Div>
  );
}


const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  `;

const RowWrapper = styled.div`
  display: flex;
  gap: 10px;
  `;

const Letter = styled.input`
    font-size: 56px;
    font-weight: bold;
    background-color: ${(props) => {
       if (props.status === "correct") {
    return "green";
  } else if (props.status === "incorrect") {
    return "red"
  } else if (props.status === "wrongposition") {
    return "yellow"
  } else if (props.status === "empty") {
    return "whitesmoke"
  };
}};
    border: 1px solid black;
    padding: 10px;
    width: 50px;
    height: 50px;
    `;

  const SubmitButton = styled.button`
    font-size: 24px;
    font-weight: bold;
    color: whitesmoke;
    background: royalblue;
    border-radius: 10px;
    padding: 10px;
    `;

export default App;
