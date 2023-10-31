import { Row } from "./Row";

export const Grid = () => {
  const rows = [1, 2, 3, 4, 5];
  return (
    <div className="my-12">
      {rows.map((row, index) => (
        <Row key={index} id={index} />
      ))}
    </div>
  );
};
