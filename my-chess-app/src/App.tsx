import React, { useState } from "react";
import "./masterdrez.css";

type Square = {
  x: number;
  y: number;
  piece?: string; // Ej: "wK", "bQ", etc.
};

const BOARD_SIZE = 16;

// Posiciones iniciales de piezas para Masterdrez
const setupPieces = (board: Square[][]) => {
  const whiteRow = 15;
  const blackRow = 0;
  const redCol = 0;
  const blueCol = 15;

  // Blancas
  const whitePieces = ["R", "N", "B", "Q", "K", "B", "N", "R"];
  whitePieces.forEach((p, i) => (board[whiteRow][4 + i].piece = `w${p}`));
  for (let i = 0; i < 8; i++) board[whiteRow - 1][4 + i].piece = "wP";

  // Negras
  const blackPieces = ["R", "N", "B", "Q", "K", "B", "N", "R"];
  blackPieces.forEach((p, i) => (board[blackRow][4 + i].piece = `b${p}`));
  for (let i = 0; i < 8; i++) board[blackRow + 1][4 + i].piece = "bP";

  // Rojas
  const redPieces = ["R", "N", "B", "Q", "K", "B", "N", "R"];
  redPieces.forEach((p, i) => (board[4 + i][redCol].piece = `r${p}`));
  for (let i = 0; i < 8; i++) board[4 + i][redCol + 1].piece = "rP";

  // Azules
  const bluePieces = ["R", "N", "B", "Q", "K", "B", "N", "R"];
  bluePieces.forEach((p, i) => (board[4 + i][blueCol].piece = `u${p}`));
  for (let i = 0; i < 8; i++) board[4 + i][blueCol - 1].piece = "uP";
};

// Generar tablero en cruz 16x16
const generateBoard = (): Square[][] => {
  const board: Square[][] = [];
  for (let y = 0; y < BOARD_SIZE; y++) {
    const row: Square[] = [];
    for (let x = 0; x < BOARD_SIZE; x++) {
      const isPlayable = (x >= 4 && x <= 11) || (y >= 4 && y <= 11);
      row.push({ x, y, piece: isPlayable ? undefined : "null" });
    }
    board.push(row);
  }
  setupPieces(board);
  return board;
};

// Obtener la imagen SVG según la pieza
const getPieceImage = (piece: string) => {
  try {
    return new URL(`./assets/pieces/${piece}.svg`, import.meta.url).href;
  } catch {
    return "";
  }
};

const MasterdrezBoard: React.FC = () => {
  const [board] = useState<Square[][]>(generateBoard());

  return (
    <div className="masterdrez-board">
      {board.map((row, y) =>
        row.map((square, x) => {
          if (square.piece === "null") {
            return <div key={`${x}-${y}`} className="square empty" />;
          }
          return (
            <div
              key={`${x}-${y}`}
              className={`square ${(x + y) % 2 === 0 ? "light" : "dark"}`}
            >
              {square.piece && (
                <img
                  src={getPieceImage(square.piece)}
                  alt={square.piece}
                  className="piece"
                />
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default MasterdrezBoard;
