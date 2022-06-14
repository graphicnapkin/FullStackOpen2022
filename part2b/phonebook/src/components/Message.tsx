import React from "react";

const Notificaiton = ({ msg, kind }: NotificationProps) => {
  if (!msg) return null;
  return <div style={{ ...styles[kind || ""] }}>{msg}</div>;
};
interface NotificationProps {
  msg: string;
  kind?: string;
}
const baseStyle = {
  background: "lightgrey",
  fontSize: "20px",
  borderStyle: "solid",
  borderRadius: "5px",
  padding: "10px",
  marginBottom: "10px",
};

const styles: { [kind: string]: React.CSSProperties } = {
  added: {
    color: "green",
    ...baseStyle,
  },
  deleted: {
    color: "red",
    ...baseStyle,
  },
  updated: {
    color: "black",
    ...baseStyle,
  },
};

export default Notificaiton;
