import React from "react";
const Modal = ({ closeModal, children, imageUrl }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center  ">
      <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
      <div className="relative bg-white border w-96 p-6 rounded-lg shadow-xl">
        <button
          className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-800"
          onClick={closeModal}>
          &times;
        </button>
        {imageUrl && (
          <div className="mb-4">
            <img
              src={imageUrl}
              alt="ModalImage"
              className="w-full rounded-lg"
            />
          </div>
        )}
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
