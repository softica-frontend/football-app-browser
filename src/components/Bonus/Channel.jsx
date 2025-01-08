import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../store/auth-slice";
import { checkChannel } from "../../util/back/requests";
import ConfettiExplosion from "react-confetti-explosion";
import { TelegramIcon } from "../UI/icons";

const Channel = () => {
  const user = useSelector((state) => state.auth);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState();
  const success = user.telegramBonus;
  const [first, setFirst] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setFirst(true);
    const response = await checkChannel(first, user.telegramId);
    if (response) {
      setError(false);
      setConfetti(true);
      dispatch(
        setUser({ ...user, balance: user.balance + 5, telegramBonus: true }),
      );
    } else {
      setError(true);
    }
    setIsLoading(false);
  };

  return (
    <>
      <form
        onSubmit={submitHandler}
        className={`relative border-[3px]  rounded-[28px] px-[10px] pt-[20px] max-xsmall:pt-[10px] pb-[26px] bg-[#FFFFFF] flex flex-col items-center  ${error ? "border-red-600" : success ? "border-green-400" : "border-[#007ED2]"}`}
      >
        {confetti && <ConfettiExplosion></ConfettiExplosion>}
        <h1 className="text-[#E7FF2B] text-[25px] max-xsmall:text-[18px]">
          <TelegramIcon />
        </h1>
        <p className="text-[11px] text-[#007ED2]">
          Suscríbete a telegram y recibe +5 USD
        </p>
        <a
          className="bg-[#007ED2] w-full rounded-[28px] mt-[11px] text-[11px] py-[10px] w-max px-[16px]"
          href="https://t.me/+A9trRtbQz89kMDcy"
          target="_blanc"
          // onClick={() => {
          //   const url = `https://t.me/+A9trRtbQz89kMDcy`;
          //   WebApp.openTelegramLink(url);
          //   window.location.href =
          // }}
        >
          Suscríbase
        </a>
        <button
          disabled={success}
          type="submit"
          className="absolute left-1/2 -translate-x-1/2 -bottom-4 py-2 bg-[#E7FF2B] text-[#37C100] rounded-[28px] w-max px-[20px] text-[11px]"
        >
          {isLoading
            ? "Envío de..."
            : success
              ? "Recibido"
              : "Consigue una bonificación "}
        </button>
      </form>
    </>
  );
};

export default Channel;
