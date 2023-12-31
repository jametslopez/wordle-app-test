import "./Keyboard.scss";
import Key from "./Key";
import { useContext } from "react";
import { WordleContext } from "../../App";
import iconKeyDelete from "../../assets/images/icon-key-delete.svg";
import iconKeyDeleteDark from "../../assets/images/icon-key-delete-dark.svg";

export const Keyboard = () => {
  const { isThemeDark } = useContext(WordleContext);

  const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const keys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ñ"];
  const keys3 = ["Z", "X", "C", "V", "B", "N", "M"];

  const Keys1 = () => {
    return (
      <div className="flex flex-row justify-center gap-2">
        {keys1.map((char, index) => (
          <Key key={index} letter={char} />
        ))}
      </div>
    );
  };

  const Keys2 = () => {
    return (
      <div className="flex flex-row justify-center gap-2">
        {keys2.map((char, index) => (
          <Key key={index} letter={char} />
        ))}
      </div>
    );
  };

  const Keys3 = () => {
    return (
      <div className="flex flex-row justify-center gap-2">
        <Key keyAction={true} letter={"ENTER"} />
        {keys3.map((char, index) => (
          <Key key={index} letter={char} />
        ))}
        <Key
          keyAction={true}
          letter={
            isThemeDark ? (
              <img src={iconKeyDeleteDark} />
            ) : (
              <img src={iconKeyDelete} />
            )
          }
        />
      </div>
    );
  };

  return (
    <div className="keyboard flex items-center">
      <div className="flex flex-wrap justify-center gap-2">
        <Keys1 />
        <Keys2 />
        <Keys3 />
      </div>
    </div>
  );
};
