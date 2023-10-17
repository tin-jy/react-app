import "../App.css";

interface Props {
  predictions: number[];
}

const gbox = (key: number) => <div className="gbox" key={key}></div>;
const rbox = (key: number) => <div className="rbox" key={key}></div>;

const VisualDisplay = ({ predictions }: Props) => {
  return (
    <div>
      {predictions.map((item, index) =>
        // Render Component A if the item is 1, or Component B if the item is 0
        item === 1 ? rbox(index) : gbox(index)
      )}
    </div>
  );
};

export default VisualDisplay;
