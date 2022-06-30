import React, { useState, forwardRef, useImperativeHandle } from "react";

const Togglable = forwardRef(({ labels, children }: Props, refs) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => setVisible(!visible);

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{labels[0]}</button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <button onClick={toggleVisibility}>{labels[1]}</button>
      </div>
    </div>
  );
});

type Props = {
  labels: [string, string];
  children?: React.ReactNode;
};
export default Togglable;
