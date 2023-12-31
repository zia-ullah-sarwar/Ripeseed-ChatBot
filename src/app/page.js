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
  const [openaiKey, setOpenaiKey] = useState(null);
  const { messages, input, setInput, handleInputChange, handleSubmit, error } =
    useChat({
      headers: { "x-openai-key": openaiKey },
      onError: (error) => {
        let key;
        if (
          error?.message.includes(
            "OPENAI_API_KEY environment variable is missing or empty"
          )
        ) {
          key = window.prompt("Paste your OpenAI API key here");
        } else if (error?.message.includes("Incorrect API key provided")) {
          key = window.prompt(
            "Incorrect API key provided. Please enter a valid API key"
          );
        }
        localStorage.setItem("OPENAI_API_KEY", key);
        setOpenaiKey(key);
      },
    });

  const ref = useRef(null);
  const characterCount = input.length;
  const aiResponses = messages.filter((m) => m.role !== "user");

  useEffect(() => {
    let key = localStorage.getItem("OPENAI_API_KEY");
    setOpenaiKey(key);
    while (!key) {
      key = window.prompt("Please provide OpenAI API key to proceed");
      localStorage.setItem("OPENAI_API_KEY", key);
    }
  }, []);

  const clickClearTextHandler = () => {
    setInput("");
  };

  return (
    <main className="flex flex-col min-h-screen gap-7 bg-slate-50 dark:bg-slate-900 p-10 md:p-24 md:pb-0">
      <Image src={Logo} alt="Picture of Logo" width={170} height={170}></Image>

      <form
        className="flex flex-col justify-between gap-3"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-row justify-between items-center">
          <p className="text-sm font-semibold w-[100px] text-gray-700 dark:text-gray-300">
            Your text
          </p>
          <div className="relative">
            <button className="text-5xl text-[#199f87]" type="submit">
              <MdPlayCircleFilled />
            </button>
          </div>
          <p className="text-sm font-semibold w-[100px] text-gray-700 dark:text-gray-300">
            Suggested text
          </p>
        </div>
        <div className="flex flex-row justify-between">
          <div className="flex flex-col justify-end w-full gap-2 relative">
            <div className="rounded-md border-gray-300 border border-r-0 p-5 rounded-r-none h-96 ">
              {input.length > 0 && (
                <>
                  <button
                    class="text-xl p-2 absolute hover:bg-gray-200 dark:hover:bg-slate-700 rounded-full right-[1%] top-[2%] text-black dark:text-gray-300"
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
              )}
              <textarea
                className="bg-transparent border-none focus:outline-none resize-none w-full h-full pr-10 text-black dark:text-gray-300 scrollbar-thumb-[#199f87] scrollbar-rounded* scrollbar-thin scrollbar-track-gray-300"
                value={input}
                onChange={handleInputChange}
                maxLength={250}
                placeholder="Type here..."
              ></textarea>
            </div>

            <p className="absolute right-3 -bottom-8 text-sm text-black dark:text-gray-300">
              {characterCount} / 250
            </p>
          </div>
          <div className="rounded-md border-gray-300 border rounded-l-none h-96 overflow-x-hidden overflow-auto w-full relative scrollbar-thumb-[#199f87] scrollbar-rounded* scrollbar-thin scrollbar-track-gray-300">
            {aiResponses.reverse().map((m) => (
              <div key={m.id} className="bg-transparent text-black border-b-2">
                <GeneratButtons content={m.content} />
                <p className="p-3 pr-8 m-3 rounded-md w-full dark:text-gray-300">
                  <ReactMarkdown rehypePlugins={[]}>{m.content}</ReactMarkdown>
                </p>
              </div>
            ))}
            {/* <div ref={ref} /> */}
          </div>
        </div>
      </form>
      <Footer />
    </main>
  );
}
