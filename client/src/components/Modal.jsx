import React from "react";
const Modal = ({ closeModal, children, imageUrl, width, height }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center  ">
      <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
      <div
        className="relative bg-white border  p-5 rounded-lg shadow-xl"
        style={{ maxWidth: width, maxHeight: height }}>
        {" "}
        <button
          className="absolute top-0 right-0 m-7 p-2 text-[30px] text-gray-500 hover:text-gray-800"
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