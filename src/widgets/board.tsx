import { Grid } from "../components/Grid/Grid";
import { Keyboard } from "../components/Keyboard/Keyboard";

export default function Board() {
  return (
    <div className="flex flex-col justify-center items-center">
      <Grid />
      <Keyboard />
    </div>
  );
}
