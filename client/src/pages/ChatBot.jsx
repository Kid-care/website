import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendChatMessageAsync } from "../store/slices/chatBotSlice";
import Navbar from "../components/Navbar";
import Modal from "../components/Modal.jsx";
import info from "../assets/info.svg";
import record from "../assets/record.svg";
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
      <div className="relative overflow-y-hidden overflow-x-hidden">
        <header>
          <Navbar />
        </header>
        <section>
          <div className="flex flex-col py-32 h-screen items-center bg-white ">
            <div className="flex flex-col overflow-y-auto gap-16  p-9  min-w-[1000px] min-h-full bg-[#28CC9E33] ">
              <div className="animate-pulse  relative font-sans font-bold rounded-[20px] text-[20px] mt-8  leading-[35px]    tracking-[0.25px]   bg-[#E6E6E6] w-fit p-10 ">
                مرحبا! انا مساعدك الطبي ماهو سؤالك ؟{" "}
                <div dir="rtl" className="absolute top-[-50px] left-0 ">
                  <img src={robot} alt="Chat bot" />
                </div>
              </div>
              {chatMessages.map((message, index) => (
                <div
                  dir="rtl"
                  key={index}
                  className={`relative font-sans font-light rounded-[20px] text-[18px] leading-[35px] max-w-[700px]   tracking-[0.25px] p-7  ${
                    message.type === "user"
                      ? "bg-[#28CC9E4D] text-right mr-auto"
                      : "bg-[#E6E6E6] text-right ml-auto "
                  }`}>
                  <div dir="rtl" className="absolute top-[-50px] left-0 ">
                    {message.type !== "user" && (
                      <img src={robot} alt="Chat bot" />
                    )}
                  </div>
                  {message.content}
                </div>
              ))}
              {loading && (
                <div className="m-auto  ">
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
            <div className="flex gap-6 items-center  justify-center absolute bottom-0 p-10 bg-white w-full">
              <div className="">
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
              <div className=" " dir="rtl">
                <input
                  type="text"
                  className="flex-grow font-[Roboto] font-light text-[18px] leading-[20px] tracking-[0.25px] outline-none border border-1 border-[#196B69] rounded-[20px] p-5  w-[900px] h-[51] "
                  placeholder="سؤالك......"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                />
              </div>
              <div className="bg-[#196B69] rounded-full w-[51px] h-[52.24px] flex items-center justify-center p-3 cursor-pointer ">
                <img
                  src={send}
                  alt="send"
                  onClick={handleMessageSend}
                  className=""
                />
              </div>
            </div>
          </div>
        </section>
      </div>

      {showModal && (
        <Modal closeModal={closeModal} width="900px" height="450px">
          <div className="flex items-center gap-8 " dir="rtl">
            <div className="flex flex-col">
              <h2 className="text-2xl font-bold mb-2">
                {modalContent.paragraph1}
              </h2>
              <p className="text-lg">{modalContent.paragraph2}</p>
            </div>
            <img src={imageUrl} alt="Chat bot" />
          </div>
        </Modal>
      )}
    </>
  );
};

export default ChatBot;
