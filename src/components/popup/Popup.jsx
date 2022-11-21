import React from "react";
import "./_popup.scss";

const Popup = (props) => {
  return props.trigger ? (
    <div className="popup row">
      <div className="popup_inner">{props.children}</div>
    </div>
  ) : (
    ""
  );
};

export default Popup;
