import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function LoadingStar() {
  const ref = useRef(null);
  useEffect(() => {
    const timeline = gsap.timeline({ repeat: -1 });
    timeline.to(ref.current, { scale: 1.4 }).to(ref.current, { scale: 1.0 });
  }, []);

  return <div ref={ref}></div>;
}
