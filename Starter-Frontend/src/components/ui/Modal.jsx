import { useEffect } from "react";
import { createPortal } from "react-dom";

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  className = "",
}) {
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    // Lock body scroll
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-xs" />

      {/* Modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl ${className}`}
      >
        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          {title && (
            <h2 className="text-xl font-bold text-gray-800">{title}</h2>
          )}

          <button
            onClick={onClose}
            className="rounded-lg p-2 transition hover:bg-gray-100"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div>{children}</div>
      </div>
    </div>,
    document.body
  );
}