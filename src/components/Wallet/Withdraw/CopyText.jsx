import { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { MdContentCopy } from "react-icons/md";

const CopyTextElement = ({ text, children }) => {
  const [isCopied, setIsCopied] = useState();

  return (
    <CopyToClipboard text={text}>
      <div
        className="w-full rounded-[28px] flex py-[20px]  max-xsmall:py-[10px] px-4 justify-between items-center bg-[#FFFFFF66]"
        onClick={() => {
          setIsCopied(true);
          setTimeout(() => {
            setIsCopied(false);
          }, 2000);
        }}
      >
        <div>{children}</div>
        <div>
          {isCopied ? (
            "Copied"
          ) : (
            <span className="text-[150%]">
              <MdContentCopy />
            </span>
          )}
        </div>
      </div>
    </CopyToClipboard>
  );
};

export default CopyTextElement;
