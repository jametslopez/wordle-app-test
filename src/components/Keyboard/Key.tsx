import "./Key.scss";
import { useContext } from "react";
import { WordleContext } from "../../App";

interface Props {
  letter: any;
  keyAction?: boolean;
}

export default function Key({ ...props }: Props) {
  const { onGuessWord, backspace, pressEnter } = useContext(WordleContext);

  function onKeyAction() {
    if (props.letter === "ENTER") {
      pressEnter();
    } else {
      backspace();
    }
  }

  return (
    <>
      {props.keyAction ? (
        <button className="btn-key action" onClick={() => onKeyAction()}>
          {props.letter}
        </button>
      ) : (
        <button className="btn-key" onClick={() => onGuessWord(props.letter)}>
          {props.letter}
        </button>
      )}
    </>
  );
}
