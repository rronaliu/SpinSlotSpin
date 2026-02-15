import React from 'react';

interface InsufficientFundsModalProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function InsufficientFundsModal({ isVisible, onClose }: InsufficientFundsModalProps) {
  if (!isVisible) return null;

  const handleOkClick = () => {
    onClose();
    location.reload();
  };

  return (
    <div className="game-ui__popup">
      Insufficient funds<br />
      Top up your balance to continue
      <div className="game-ui__button" onClick={handleOkClick}>
        OK
      </div>
    </div>
  );
} 