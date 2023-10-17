import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Card = ({ children }: Props) => {
  return (
    <div className="card">
      <div className="card-body">{children}</div>
    </div>
  );
};

export default Card;
