import React from "react";

const Notificaiton = ({ msg, type }: NotificationProps) => {
  if (!msg) return null;
  return (
    <div>
      {msg}
    </div>
  );
};
interface NotificationProps {
  msg: string;
  type?: string; 
}
export default Notificaiton;
