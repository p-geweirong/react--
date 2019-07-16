import React from "react";
import ReactDOM from "react-dom";

import "antd/dist/antd.css";
import "./index.css";
import App from "./App";
import Bmob from "hydrogen-js-sdk";
Bmob.initialize(
  "8627d3b39665d23fbf65d8df3d396455",
  "fa046d5196f2d27170620808e239b5b5"
);
window.Bmob = Bmob;
ReactDOM.render(<App />, document.getElementById("root"));
