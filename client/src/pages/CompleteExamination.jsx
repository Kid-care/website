import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPhotosAsync,
  postPhotoAsync,
  getPhotosAdminAsync,
} from "../store/slices/authSlice";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Modal from "../components/Modal";
import addImg from "../assets/Group 115.svg";
import imgReport from "../assets/Vector (14).svg";
import Compressor from "compressorjs";


const CompleteExamination = ({ userRole }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const photos = useSelector((state) => state.auth.photos);
  const loading = useSelector((state) => state.auth.loading); // Track loading state
  const [modalContent, setModalContent] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [compressedFile, setCompressedFile] = useState(null);

  const handleCompressedUpload = (e) => {
    const image = e.target.files[0];
    new Compressor(image, {
      width: 500,
      height: 400,
      success: (compressedResult) => {
        // compressedResult has the compressed file.
        // Use the compressed file to upload the images to your server.
        setCompressedFile(compressedResult);
      },
    });
  };

  useEffect(() => {
    if (token) {
      dispatch(getPhotosAsync(token));
    }
  }, [dispatch, token]);

  const openModal = (content) => {
    setModalContent(content);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleImageUpload = (e) => {
    e.preventDefault();

    const file = e.target.files[0];
    if (file && token) {
      const newPhoto = {
        id: Date.now(),
        secure_url: URL.createObjectURL(file),
        filename: file.name,
      };
      dispatch({ type: "ADD_PHOTO_LOCALLY", payload: newPhoto });

      dispatch(postPhotoAsync({ token, photo: file }))
        .then(() => {
          dispatch(getPhotosAsync(token));
        })
        .catch((error) => {
          console.error("Failed to upload photo:", error);
        });
    }
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  if (!photos) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="m-auto">
          <div role="status">
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  const reversedPhotos = [...photos].reverse();

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <header className="mt-32">
          <Navbar />
        </header>
        <main className="flex-grow overflow-y-auto p-10" dir="rtl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div
              className="col-span-1 lg:col-span-1 bg-gradient-to-r from-[#28CC2F2E] to-[#28CC9E4D] text-[#000000] text-[20px] font-semibold rounded-[35px] p-4 h-[364px] items-center justify-center align-middle flex cursor-pointer gap-10"
              onClick={() => openModal("Your modal content here")}>
              <img src={imgReport} alt="report" />
              <p className="text-right">افحص نتائج تحاليلك</p>
            </div>
            {/* Render photos */}
            {Array.isArray(reversedPhotos) && reversedPhotos.length >= 1 ? (
              reversedPhotos.map((photo, index) => (
                <div
                  key={index}
                  className="relative w-full h-[364px] cursor-pointer shadow flex items-center justify-around rounded-[10px]"
                  onClick={() => handleImageClick(photo)}>
                  <img
                    src={photo.secure_url}
                    alt={`Uploaded ${index}`}
                    className="w-[469.46px] h-[277.5px] object-cover rounded-[5px]"
                  />
                  <p className="absolute bottom-0 left-0 right-0 text-center shadow bg-opacity-50 py-1 pb-2">
                    {photo.filename}
                  </p>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 mt-8">
                No photos uploaded yet.
              </div>
            )}
            {userRole !== "admin" && (
              <label className="relative w-[503px] h-[364px] rounded-[10px] shadow cursor-pointer">
                <input
                  type="file"
                  className="hidden"
                  onChange={handleImageUpload}
                />
                <img src={addImg} alt="Add" className="w-full h-full" />
              </label>
            )}
          </div>
        </main>
        <Footer />
      </div>
      {/* Modal for displaying selected image or other content */}
      {showModal && (
        <Modal closeModal={closeModal} width="1000px" height="500px">
          <div>
            {selectedImage && selectedImage.secure_url ? (
              <img src={selectedImage.secure_url} alt="Uploaded Image" />
            ) : (
              modalContent
            )}
          </div>
        </Modal>
      )}
    </>
  );
};

export default CompleteExamination;