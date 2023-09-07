"use client";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { MdOutlineEmail, MdContentCopy } from "react-icons/md";

const GeneratButtons = ({ content, copyToClipboard }) => {
  return (
    <div className="flex justify-end bg-gray-50 w-full flex-row py-1 gap-1 bottom-0 right-0 border-b-2">
      <button
        className="text-xl p-2 hover:bg-gray-200 rounded-full text-black"
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
