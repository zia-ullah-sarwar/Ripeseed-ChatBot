"use client";
import { useEffect, useState, useRef } from "react";
import Footer from "@/Components/Footer";
import { MdPlayCircleFilled, MdClear, MdOutlineSync } from "react-icons/md";
import Image from "next/image";
import Logo from "../../public/assets/Images/ripeseed.io.png";
import { Tooltip as ReactTooltip } from "react-tooltip";
import GeneratButtons from "@/Components/GeneratButtons";
import { useChat } from "ai/react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

export default function Home() {
  const [clearBtnShow, setClearBtnShow] = useState(false);
  const { messages, input, setInput, handleInputChange, handleSubmit } =
    useChat();

  const ref = useRef(null);
  const characterCount = input.length;
  const aiResponses = messages.filter((m) => m.role !== "user");
  messages[
    {
      role: "system",
      content:
        "Please convert the below text into a professional letter. You should not add anything on your own to the letter. The response should be in a professional tone and same context as the text given to you.",
    }
  ];
  useEffect(() => {
    if (input.length > 0) {
      setClearBtnShow(true);
    } else {
      setClearBtnShow(false);
    }
  }, [input]);

  useEffect(() => {
    ref.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [aiResponses]);

  const clickClearTextHandler = () => {
    setInput("");
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(messages.content)
      .then(() => {
        console.log("Text copied to clipboard!");
      })
      .catch((error) => {
        console.error("Failed to copy text: ", error);
      });
  };
  return (
    <main className="flex flex-col min-h-screen gap-7 bg-slate-50 p-10 md:p-24 md:pb-0">
      <Image src={Logo} alt="Picture of Logo" width={170} height={170}></Image>

      <form
        className="flex flex-col justify-between gap-3"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-row justify-between items-center">
          <p className="text-sm font-semibold w-[100px] text-gray-700">
            Your text
          </p>
          <div className="relative">
            {/* <div role="status" className="absolute top-1 right-1">
              <svg
                aria-hidden="true"
                class="inline w-10 h-10 animate-spin dark:text-gray-300 fill-[#199f87]"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span class="sr-only">Loading...</span>
            </div> */}
            <button className="text-5xl text-[#199f87]" type="submit">
              <MdPlayCircleFilled />
            </button>
          </div>
          <p className="text-sm font-semibold w-[100px] text-gray-700">
            Suggested text
          </p>
        </div>
        <div className="flex flex-row justify-between">
          <div className="flex flex-col justify-end w-full gap-2 relative">
            <div className="rounded-md border-gray-300 border border-r-0 p-5 rounded-r-none h-96 ">
              {clearBtnShow === true ? (
                <>
                  <button
                    class="text-xl p-2 absolute hover:bg-gray-200 rounded-full right-[1%] top-[2%]  text-black"
                    onClick={clickClearTextHandler}
                    data-tooltip-id="clear-btn"
                  >
                    <MdClear />
                  </button>
                  <ReactTooltip
                    id="clear-btn"
                    place="bottom-start"
                    content="Clear source text"
                    style={{
                      background: "gray",
                      fontSize: "12px",
                      padding: "2px 10px",
                      borderRadius: "10px",
                      zIndex: "9999",
                    }}
                  />
                </>
              ) : (
                <></>
              )}
              <textarea
                className="bg-transparent border-none focus:outline-none resize-none w-full h-full pr-10 text-black scrollbar-thumb-[#199f87] scrollbar-rounded* scrollbar-thin scrollbar-track-gray-300"
                value={input}
                onChange={handleInputChange}
                maxLength={250}
                placeholder="Type here..."
              ></textarea>
            </div>

            <p className="absolute right-3 -bottom-8 text-sm  text-black">
              {characterCount} / 250
            </p>
          </div>
          <div className="rounded-md border-gray-300 border rounded-l-none h-96 overflow-x-hidden overflow-auto w-full relative scrollbar-thumb-[#199f87] scrollbar-rounded* scrollbar-thin scrollbar-track-gray-300">
            {aiResponses.map((m) => (
              <div
                key={m.id}
                className="bg-transparent border-none text-black border-b-2 border-black"
              >
                <p className="p-3 pr-8 m-3 rounded-md  w-full">
                  <ReactMarkdown rehypePlugins={[]}>{m.content}</ReactMarkdown>
                </p>
                <GeneratButtons
                  content={m.content}
                  copyToClipboard={copyToClipboard}
                />
              </div>
            ))}
            <div ref={ref} />
          </div>
        </div>
      </form>
      <Footer />
    </main>
  );
}
