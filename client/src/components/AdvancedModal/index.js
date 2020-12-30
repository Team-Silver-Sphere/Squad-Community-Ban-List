import React, { useState } from 'react';

export default function (props) {
  const [isOpen, setIsOpen] = useState(props.isOpen || false);

  const open = () => {
    setIsOpen(true);
    if (props.onOpen) props.onOpen();
  };
  const close = () => {
    setIsOpen(false);
    if (props.onClose) props.onClose();
  };

  return <>{props.children({ isOpen, open, close })}</>;
}
