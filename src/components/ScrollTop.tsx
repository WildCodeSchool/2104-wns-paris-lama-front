import React from "react";
import { withRouter } from "react-router-dom";

const ScrollToTop = () => {
  window.scrollTo(0, 0);

  return <></>;
};

export default withRouter(ScrollToTop);
