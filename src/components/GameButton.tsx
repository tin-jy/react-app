import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  onClick: () => void;
}

const GameButton = ({ children, onClick }: Props) => {
  return (
    <button className="btn btn-primary" onClick={onClick}>
      {children}
    </button>
  );
};

export default GameButton;
