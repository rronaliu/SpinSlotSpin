import React from 'react';
import { GAME } from '../../GAME';


interface AudioModalProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function AudioModal({ isVisible, onClose }: AudioModalProps) {
  if (!isVisible) return null;

  const handleYesClick = () => {
    onClose();
    GAME.events.enableSound.dispatch(true);
  };

  const handleNoClick = () => {
    onClose();
    GAME.events.enableSound.dispatch(false);
  };

  return (
    <div className="game-ui__popup">
      Play with sound enabled?<br />
      <div className="game-ui__button" onClick={handleNoClick}>
        NO
      </div>
      <div className="game-ui__button" onClick={handleYesClick}>
        YES
      </div>
    </div>
  );
} 