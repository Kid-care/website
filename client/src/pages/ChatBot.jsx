import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendChatMessageAsync } from "../store/slices/chatBotSlice";
import Navbar from "../components/Navbar";
import Modal from "../components/Modal.jsx";
import info from "../assets/info.svg";
import imageUrl from "../assets/Chat bot-bro 1.svg";
import send from "../assets/send.svg";
import robot from "../assets/Robot.svg";

const ChatBot = () => {
  const dispatch = useDispatch();
  const { messages, loading } = useSelector((state) => state.chat);
  const [inputMessage, setInputMessage] = useState("");
  const [modalContent, setModalContent] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    const newMessage = messages[messages.length - 1];

    if (newMessage) {
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { type: newMessage.type, content: newMessage.text },
      ]);
    }
  }, [messages]);

  const openModal = (paragraph1, paragraph2) => {
    setModalContent({ paragraph1, paragraph2 });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleMessageSend = async () => {
    if (inputMessage.trim() === "") return;

    setChatMessages([...chatMessages, { type: "user", content: inputMessage }]);

    await dispatch(sendChatMessageAsync(inputMessage));

    setInputMessage("");
  };

  return (
    <>
      <div className="relative overflow-hidden">
        <header>
          <Navbar />
        </header>
        <section className="flex flex-col h-screen items-center bg-white py-32 px-4">
          <div className="flex flex-col overflow-y-auto gap-8 p-6 w-full max-w-3xl h-screen bg-gradient-to-r from-[#CFEED2] to-[#B9E9DC]  rounded-2xl shadow-lg mt-5 ">
            <div className="animate-pulse relative font-sans font-bold rounded-2xl text-lg mt-8 leading-8 tracking-wide bg-gray-300 p-6 w-fit ">
              مرحبا! انا مساعدك الطبي ماهو سؤالك ؟
              <div dir="rtl" className="absolute top-[-50px] left-0">
                <img src={robot} alt="Chat bot" />
              </div>
            </div>
            {chatMessages.map((message, index) => (
              <div
                dir="rtl"
                key={index}
                className={`relative font-sans font-light rounded-2xl text-base leading-8 max-w-full tracking-wide p-4 ${
                  message.type === "user"
                    ? "bg-[#28CC9E] text-right mr-auto"
                    : "bg-white text-right ml-auto"
                }`}>
                <div dir="rtl" className="absolute top-[-50px] left-0">
                  {message.type !== "user" && (
                    <img src={robot} alt="Chat bot" />
                  )}
                </div>
                {message.content}
              </div>
            ))}
            {loading && (
              <div className="flex justify-center">
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
            )}
          </div>
          <div
            className="flex gap-4 items-center justify-center w-full max-w-3xl mt-4 px-4 py-10 bg-white fixed bottom-0 left-1/2 transform -translate-x-1/2"
            dir="rtl">
            <div className="bg-green-700 rounded-full w-12 h-12 flex items-center justify-center p-2 cursor-pointer">
              <img src={send} alt="send" onClick={handleMessageSend} />
            </div>
            <input
              type="text"
              className="flex-grow font-light text-base leading-5 tracking-wide outline-none border border-1 border-green-700 rounded-full p-3"
              placeholder="سؤالك......"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
            />

            <img
              src={info}
              alt="info"
              className="cursor-pointer"
              onClick={() =>
                openModal(
                  "رفيق صحتك الالكتروني",
                  "رفيق صحتك الالكتروني,يجيب عل جميع استفساراتك وتساؤلاتك الطبيه بشكل متكامل ودقيق"
                )
              }
            />
          </div>
        </section>
      </div>
      {showModal && (
        <Modal closeModal={closeModal} width="700px" height="500px">
          <div
            className="flex flex-col md:flex-row items-center  gap-4 p-4 md:p-8"
            dir="rtl">
            <div className="flex flex-col gap-4 items-center justify-around text-center">
              <h2 className="text-xl md:text-2xl font-bold mb-2">
                {modalContent.paragraph1}
              </h2>
              <p className="text-base md:text-lg">{modalContent.paragraph2}</p>
            </div>
            <img
              src={imageUrl}
              alt="Chat bot"
              className="mt-6 w-[300px] md:w-auto"
            />
          </div>
        </Modal>
      )}
    </>
  );
};

export default ChatBot;
