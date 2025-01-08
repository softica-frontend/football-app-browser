import gsap from "gsap";
import { useEffect } from "react";

const ErrorAlert = ({ children }) => {
  useEffect(() => {
    const anim = gsap.to("#error-alert", { translateY: 0 });
    const timeout = setTimeout(() => {
      gsap.to("#error-alert", { translateY: "-100px" });
    }, 2000);
    return () => {
      anim.kill();
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div
      id="error-alert"
      className="fixed inset-0 w-screen z-10 bg-gray-600/80 h-max py-4 text-center text-white rounded-b-[20px] transform -translate-y-[100px]"
    >
      {children}
    </div>
  );
};

export default ErrorAlert;
