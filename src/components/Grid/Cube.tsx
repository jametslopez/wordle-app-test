import "./Cube.scss";
import { WordleContext } from "../../App";
import { useContext, useEffect, useState } from "react";

interface Props {
  id: any;
  rowId?: any;
}

export default function Cube({ id, rowId }: Props) {
  const [status, setStatus] = useState("");
  const [letter, setLetter] = useState("");
  const [completed, setCompleted] = useState(true);
  const { guessWord, word, currentRow, completedRows, isVictory, isNoVictory } =
    useContext(WordleContext);

  useEffect(() => {
    if (currentRow === rowId) {
      setLetter(guessWord[id]);
    }
    if (completedRows.includes(rowId) && completed) {
      changeColors();
      setCompleted(false);
    }
  }, [guessWord, completedRows]);

  const changeColors = () => {
    const arrayWord = word.split("");
    if (arrayWord.includes(letter)) {
      if (arrayWord[id] === letter) {
        setStatus("success");
      } else {
        setStatus("warning");
      }
    } else {
      setStatus("error");
    }
  };
  useEffect(() => {
    if (isVictory === true || isNoVictory === true) {
      setTimeout(() => {
        setLetter("");
        setStatus("");
        setCompleted(true);
      }, 2000);
    }
  }, [isVictory, isNoVictory]);

  return (
    <div className={`cube ${status} flex justify-center items-center`}>
      <p>{letter}</p>
    </div>
  );
}
