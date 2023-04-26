"use client";

import { useCallback, useEffect, useState } from "react";
import CloseIcon from "../icons/CloseIcon";

interface ModalProps {
  isOpen?: boolean;
  title: string;
  onClose: () => void;
  onSubmit: () => void;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  disabled?: boolean;
  actionLabel: string;
}

const Modal = ({
  title,
  isOpen,
  onClose,
  onSubmit,
  body,
  footer,
  actionLabel,
  disabled,
}: ModalProps) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) return;

    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) return;
    onSubmit();
  }, [onSubmit, disabled]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-400/30 ">
      <div
        className={`h-full w-full rounded-md bg-white duration-300 md:h-auto md:w-[500px]
      ${isOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}
      `}
      >
        <div className="flex items-center justify-center">
          <button
            onClick={handleClose}
            className="absolute left-1 rounded-full p-1.5 transition-colors duration-200 hover:bg-gray-200"
          >
            <CloseIcon />
          </button>
          <h2 className="text-lg">{title}</h2>
        </div>

        <div className="">{body}</div>
        <div className="">{footer}</div>
      </div>
    </div>
  );
};

export default Modal;
