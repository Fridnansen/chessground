import React, { useState, FC } from "react";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./masterdrez.css";

type PieceColor = "white" | "black" | "red" | "blue";
type PieceType = "K" | "Q" | "R" | "B" | "N" | "P";

interface Piece {
  color: PieceColor;
  type: PieceType;
}

interface Square {
  x: number;
  y: number;
  piece?: Piece;
  playable: boolean;
}

const BOARD_SIZE = 16;

const generateBoard = (): Square[][] => {
  const board: Square[][] = [];
  for (let y = 0; y < BOARD_SIZE; y++) {
    const row: Square[] = [];
    for (let x = 0; x < BOARD_SIZE; x++) {
      const playable = (x >= 4 && x <= 11) || (y >= 4 && y <= 11);
      row.push({
        x,
        y,
        playable,
        piece: undefined,
      });
    }
    board.push(row);
  }

  // Ejemplo: colocar algunas piezas iniciales
  board[0][6].piece = { color: "red", type: "K" };
  board[13][7].piece = { color: "blue", type: "K" };
  board[6][0].piece = { color: "white", type: "K" };
  board[7][13].piece = { color: "black", type: "K" };

  return board;
};

// Componente para pieza arrastrable
const PieceComponent: FC<{ piece: Piece }> = ({ piece }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "PIECE",
    item: { piece },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className="piece"
      style={{ opacity: isDragging ? 0.5 : 1, color: piece.color }}
    >
      {piece.type}
    </div>
  );
};

// Componente para cada casilla
const SquareComponent: FC<{
  square: Square;
  onDropPiece: (x: number, y: number) => void;
}> = ({ square, onDropPiece }) => {
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: "PIECE",
    drop: () => onDropPiece(square.x, square.y),
    canDrop: () => square.playable,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const bgClass = !square.playable
    ? "empty"
    : (square.x + square.y) % 2 === 0
    ? "light"
    : "dark";

  return (
    <div
      ref={drop}
      className={`square ${bgClass}`}
      style={{
        outline: isOver && canDrop ? "2px solid yellow" : "none",
      }}
    >
      {square.piece && <PieceComponent piece={square.piece} />}
    </div>
  );
};

// Componente principal
const MasterdrezBoard: FC = () => {
  const [board, setBoard] = useState<Square[][]>(generateBoard);

  const movePiece = (x: number, y: number, piece: Piece) => {
    setBoard((prev) => {
      const newBoard = prev.map((row) => row.map((sq) => ({ ...sq })));
      // Remover la pieza de su posición actual
      for (let row of newBoard) {
        for (let sq of row) {
          if (sq.piece === piece) sq.piece = undefined;
        }
      }
      // Colocar en la nueva casilla
      newBoard[y][x].piece = piece;
      return newBoard;
    });
  };

  const handleDrop = (x: number, y: number) => {
    const piece = board.flat().find((sq) => sq.piece && sq.piece); // Se obtiene la pieza arrastrada
    if (piece) movePiece(x, y, piece.piece!);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="masterdrez-board">
        {board.map((row, y) =>
          row.map((square, x) => (
            <SquareComponent
              key={`${x}-${y}`}
              square={square}
              onDropPiece={handleDrop}
            />
          ))
        )}
      </div>
    </DndProvider>
  );
};

export default MasterdrezBoard;
