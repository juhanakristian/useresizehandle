import * as React from "react";
import logo from "./logo.svg";
import "./App.css";

import { useResizeHandle } from "useresizehandle";

function App() {
  const { containerProps, handleProps } = useResizeHandle({ axis: "both" });

  return (
    <div className="App">
      <div {...containerProps}>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <div {...handleProps}>
          <div
            style={{ width: 30, height: 30, backgroundColor: "black" }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default App;
