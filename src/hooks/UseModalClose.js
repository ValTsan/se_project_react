import { useEffect } from "react";

function useModalClose(isOpen, onClose) {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    const handleOverlay = (e) => {
      if (e.target.classList.contains("modal")) {
        e.preventDefault();
        e.stopPropagation();
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape, false);
    document.addEventListener("mousedown", handleOverlay, true);

    return () => {
      document.removeEventListener("keydown", handleEscape, false);
      document.removeEventListener("mousedown", handleOverlay, true);
    };
  }, [isOpen, onClose]);
}

export default useModalClose;
