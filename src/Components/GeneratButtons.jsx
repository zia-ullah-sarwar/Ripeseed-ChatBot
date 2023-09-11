"use client";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { MdOutlineEmail, MdContentCopy } from "react-icons/md";

const GeneratButtons = ({ content }) => {
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(content)
      .then(() => {
        console.log("Text copied to clipboard!");
      })
      .catch((error) => {
        console.error("Failed to copy text: ", error);
      });
  };
  return (
    <div className="flex justify-end  w-full flex-row gap-1 bottom-10 right-0 ">
      <button
        className="text-xl p-2 hover:bg-gray-300 rounded-full text-black dark:text-gray-300 dark:hover:bg-gray-700 mt-3 mr-3"
        data-tooltip-id="copy-btn"
        onClick={copyToClipboard}
      >
        <MdContentCopy />
      </button>
      <ReactTooltip
        id="copy-btn"
        place="bottom-end"
        content="Copy generated text"
        style={{
          background: "gray",
          fontSize: "12px",
          padding: "2px 10px",
          borderRadius: "10px",
        }}
      />
      {/* <button
        className=" text-xl p-2 hover:bg-gray-200 rounded-full text-black "
        data-tooltip-id="email-btn"
      >
        <MdOutlineEmail />
      </button>
      <ReactTooltip
        id="email-btn"
        place="bottom-end"
        content="Email generated text"
        style={{
          background: "gray",
          fontSize: "12px",
          padding: "2px 10px",
          borderRadius: "10px",
          border: "1px solid red",
        }}
      /> */}
    </div>
  );
};

export default GeneratButtons;
