import { useState } from "react";
import Modal from "./Modal";

export default function Modal_Test() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded bg-blue-600 px-4 py-2 text-white"
      >
        Open Modal
      </button>

      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Delete User"
      >
        <p>Are you sure you want to delete this user?</p>

        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={() => setOpen(false)}
            className="rounded border px-4 py-2"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              console.log("Deleted");
              setOpen(false);
            }}
            className="rounded bg-red-600 px-4 py-2 text-white"
          >
            Delete
          </button>
        </div>
      </Modal>
    </>
  );
}