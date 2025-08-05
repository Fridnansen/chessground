declare module "react-chessground" {
  import { ComponentType } from "react";

  export interface ChessgroundProps {
    width?: number;
    height?: number;
    config?: any; // puedes refinar este tipo si conoces la estructura
  }

  const Chessground: ComponentType<ChessgroundProps>;
  export default Chessground;
}
