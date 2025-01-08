import gsap from "gsap";
import { useLayoutEffect } from "react";
import { useSelector } from "react-redux";

const BonusHeader = () => {
  const balance = useSelector((state) => state.auth.balance);
  useLayoutEffect(() => {
    const animLeft = gsap.to("#right-promo-text", {
      translateX: 0,
      opacity: 1,
    });
    const animRight = gsap.to("#left-promo-text", {
      translateX: 0,
      opacity: 1,
    });

    return () => {
      animLeft.kill();
      animRight.kill();
    };
  }, []);

  return (
    <header className="flex w-full flex justify-between">
      <h1
        className="text-[22px] leading-[24.15px] w-[60%] max-xsmall:text-[18px] -translate-x-[100px] opacity-0"
        id="left-promo-text"
      >
        Código promocional y bonificaciones{" "}
      </h1>
      <div
        className="bg-[#E7FF2B] flex items-center h-max rounded-[28px] px-[10px] translate-x-[100px] opacity-0"
        id="right-promo-text"
      >
        <h3 className="text-[#37C100]">{balance.toFixed(2)}</h3>
        <img src="./images/cash.png" alt="cash" className="w-[32px] h-[32px]" />
      </div>
    </header>
  );
};

export default BonusHeader;
