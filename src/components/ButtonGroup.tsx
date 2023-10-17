interface Props {
  buttonFunc: (arg0: number) => void;
}

const ButtonGroup = ({ buttonFunc }: Props) => {
  return (
    <div className="btn-group" role="group" aria-label="Basic example">
      <button
        type="button"
        className={"btn btn-primary"}
        onClick={() => {
          buttonFunc(0);
        }}
      >
        Left
      </button>
      <button
        type="button"
        className={"btn btn-primary"}
        onClick={() => {
          buttonFunc(1);
        }}
      >
        Right
      </button>
    </div>
  );
};

export default ButtonGroup;
