"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import useClickOutside from "../hooks/useClickOutside";
import CloseIcon from "../icons/CloseIcon";

interface ModalProps {
  isOpen?: boolean;
  title: string;
  onClose: () => void;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  disabled?: boolean;
}

const Modal = ({
  title,
  isOpen,
  onClose,
  body,
  footer,
  disabled,
}: ModalProps) => {
  const [isShown, setIsShown] = useState(isOpen);

  useEffect(() => {
    setIsShown(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) return;

    setIsShown(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  const modalRef = useRef<HTMLDivElement>(null);
  useClickOutside(modalRef, handleClose);

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all ${
        isShown ? "bg-gray-400/30 " : "bg-transparent"
      } `}
    >
      <div
        ref={modalRef}
        className={`flex h-full w-full flex-col gap-3 rounded-md bg-white p-3  duration-300 md:h-auto md:w-[500px]
      ${isShown ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}
      `}
      >
        <div className="flex items-center justify-center py-2">
          <button
            onClick={handleClose}
            className="absolute left-3 rounded-full p-1.5 transition-colors duration-200 hover:bg-gray-200"
          >
            <CloseIcon />
          </button>
          <h2 className="text-lg">{title}</h2>
        </div>
        <div className="">{body}</div>
        <hr />
        <div className="">{footer}</div>
      </div>
    </div>
  );
};

export default Modal;
