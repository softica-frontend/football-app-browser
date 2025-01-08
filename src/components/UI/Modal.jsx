import gsap from "gsap";
import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

export default function Modal({ isOpen, children }) {
  const content = useRef(null);

  useEffect(() => {
    if (isOpen && content.current) {
      gsap.fromTo(
        content.current,
        { y: 150, opacity: 0 },
        { y: 0, opacity: 1 },
      );
    }
  }, [isOpen]);

  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <>
      <div
        className="fixed w-screen h-[100dvh] top-0 left-0 flex items-start pt-20 justify-center z-10 bg-black/80"
        // onClick={onClose}
      >
        <div
          ref={content}
          className={`bg-[#37C100] px-4 py-8 text-center text-[20px] w-[90%]  border-[#E7FF2B] border-2 rounded-[23px]`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col items-center">{children}</div>
        </div>
      </div>
    </>,
    document.getElementById("modal-root"),
  );
}
