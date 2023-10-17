import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Item = ({ children }: Props) => {
  return <p>{children}</p>;
};

export default Item;
