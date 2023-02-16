import {
  FaChessQueen,
  FaChessRook,
  FaChessKnight,
  FaChessBishop,
} from 'react-icons/fa'

export default function getScoreIcon(score) {
  if (score >= 100000) return [<FaChessQueen />, 'Queen']
  if (score >= 30000) return [<FaChessRook />, 'Rook']
  if (score >= 3000) return [<FaChessKnight />, 'Knight']
  return [<FaChessBishop />, 'Bishop']
}
