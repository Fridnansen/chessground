import React from "react";
import Chessground from "react-chessground";
import "react-chessground/dist/styles/chessground.css";

export default function App() {
  return (
    <div style={{ width: 400, height: 400 }}>
      <Chessground 
        width={400}
        height={400}
        config={{
          orientation: "white",
          turnColor: "white",
          movable: { free: true, color: "white" }
        }}
      />
    </div>
  );
}
