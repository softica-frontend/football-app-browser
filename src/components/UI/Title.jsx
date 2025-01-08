import gsap from "gsap";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function Title() {
  const textRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    const textAnim = gsap.timeline({ repeat: -1 });
    const leftAnim = gsap.timeline({ repeat: -1 });
    const rightAnim = gsap.timeline({ repeat: -1 });
    textAnim
      .to(textRef.current, { scale: 1.05 })
      .to(textRef.current, { scale: 1.0 });
    leftAnim.to(leftRef.current, { x: -5 }).to(leftRef.current, { x: 0 });
    rightAnim.to(rightRef.current, { x: 5 }).to(rightRef.current, { x: 0 });

    return () => {
      textAnim.kill();
      leftAnim.kill();
      rightAnim.kill();
    };
  }, []);

  return (
    <Link to="/menu/invest/how-it-works">
      <h1
        className="w-full text-center text-[30px] py-[15px] 
      border-b-[1px] border-[#FFFFFF33] tracking-[-0.04rem] 
      max-small:text-[24px] max-small:py-[8px]
      flex items-center justify-center gap-4"
      >
        <p ref={leftRef}>[</p> <p ref={textRef}>how to start</p>{" "}
        <p ref={rightRef}>]</p> *
      </h1>
    </Link>
  );
}
