import { useEffect, useRef } from "react";
import { StarIcon } from "./icons";
import gsap from "gsap";

export default function Star() {
  const starRef = useRef(null);

  useEffect(() => {
    gsap.to(starRef.current, {
      rotate: 360,
      repeat: -1,
      duration: 5,
      ease: "none",
    });
  }, []);

  return (
    <div className="w-full flex items-center justify-center">
      <div ref={starRef}>
        <StarIcon />
      </div>
    </div>
  );
}
