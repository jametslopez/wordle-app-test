import Cube from "./Cube";

export const Row = (props: any) => {
  const rows = [1, 2, 3, 4, 5];
  return (
    <div className="flex flex-row items-center justify-center gap-2 mb-2">
      {rows.map((item, index) => (
        <Cube rowId={props.id} key={item} id={index} />
      ))}
    </div>
  );
};
