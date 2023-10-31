import "./App.css";
import Navbar from "./widgets/navbar";
import Board from "./widgets/board";
import { createContext, useEffect, useState } from "react";
import { dictionary } from "./helpers/dictionary";

export interface ContextProps {
  word?: any;
  guessWord?: any;
  onGuessWord?: any;
  pressEnter?: any;
  backspace?: any;
  currentRow?: any;
  completedRows?: any;
  totalGames?: any;
  totalVictories?: any;
  isVictory?: boolean;
  setIsVictory?: any;
  isNoVictory?: boolean;
  setIsNoVictory?: any;
  isThemeDark?: boolean;
  setIsThemeDark?: any;
}

export const WordleContext = createContext<ContextProps>({} as ContextProps);

function App() {
  const [word, setWord] = useState("");
  const [guessWord, setGuessWord] = useState("");
  const [currentRow, setCurrentRow] = useState(0);
  const [completedRows, setCompletedRows] = useState<number[]>([]);

  const [totalGames, setTotalGames] = useState(0);
  const [totalVictories, setTotalVictories] = useState(0);
  const [isVictory, setIsVictory] = useState<boolean | undefined>(undefined);
  const [isNoVictory, setIsNoVictory] = useState<boolean | undefined>(
    undefined
  );

  const [isThemeDark, setIsThemeDark] = useState(false);

  const randomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const loadDictionary = async () => {
    const data: any = await dictionary();
    const keyDic: number = randomNumber(0, data.length - 1);
    const wordValue = data[keyDic].toUpperCase();
    setWord(wordValue);
    console.log(`Winner word: ${wordValue}`);
  };

  const onGuessWord = (char: string) => {
    if (guessWord.length === 5) return;
    setGuessWord(guessWord.concat(char));
  };

  const pressEnter = () => {
    if (guessWord.length < 5) return;

    if (currentRow >= 4) {
      setIsNoVictory(true);
      setTotalGames(totalGames + 1);
    }

    if (guessWord === word) {
      setIsVictory(true);
      setTotalGames(totalGames + 1);
      setTotalVictories(totalVictories + 1);
    }
    setCurrentRow(currentRow + 1);
    setCompletedRows([...completedRows, currentRow]);
    setGuessWord("");
  };

  const backspace = () => {
    setGuessWord(guessWord.slice(0, guessWord.length - 1));
  };

  useEffect(() => {
    if (!word) {
      loadDictionary();
    }
  });

  useEffect(() => {
    if (isVictory === false || isNoVictory === false) {
      loadDictionary();
      setCurrentRow(0);
      setCompletedRows([]);
      setIsVictory(undefined);
      setIsNoVictory(undefined);
    }
  }, [isVictory, isNoVictory]);

  return (
    <div className="my-10">
      <WordleContext.Provider
        value={{
          word,
          guessWord,
          onGuessWord,
          pressEnter,
          backspace,
          currentRow,
          completedRows,
          totalGames,
          totalVictories,
          isVictory,
          setIsVictory,
          isNoVictory,
          setIsNoVictory,
          isThemeDark,
          setIsThemeDark,
        }}
      >
        <Navbar />
        <Board />
      </WordleContext.Provider>
    </div>
  );
}

export default App;
