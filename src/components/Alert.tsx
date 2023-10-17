import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  type: "success" | "danger" | "primary" | "info";
}

const Alert = ({ children, type }: Props) => {
  return <div className={"alert alert-" + type}>{children}</div>;
};

export default Alert;
