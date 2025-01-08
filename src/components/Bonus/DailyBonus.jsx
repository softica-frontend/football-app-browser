import { useLayoutEffect, useState } from "react";
import DailyBonusItem from "./DailyBonusItem";
import { useDispatch, useSelector } from "react-redux";
import ErrorAlert from "../UI/errorAlert";
import ConfettiExplosion from "react-confetti-explosion";
import { dailyBonusUse, getUserInfo } from "../../util/back/requests";
import { setUser } from "../../store/auth-slice";
import gsap from "gsap";
import dayjs from "dayjs";
import utc from "dayjs-plugin-utc";
dayjs.extend(utc);

const DailyBonus = () => {
  const user = useSelector((state) => state.auth);
  const locked = !user.dailyBonusAvailable;
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sucess, setSucess] = useState(false);
  const dispatch = useDispatch();

  function hoursUntilUnlock(targetDateStr) {
    const targetDate = dayjs.utc(targetDateStr);
    const currentDate = dayjs.utc();

    const timeDifference = targetDate.diff(currentDate, "hour", true); // Третій аргумент `true` враховує дробову частину
    return Math.ceil(timeDifference); // Округлює вгору до цілого числа
  }

  useLayoutEffect(() => {
    const anim = gsap.to(".daily-bonus-item", {
      translateY: 0,
      opacity: 1,
      stagger: 0.2,
      duration: 0.3,
    });
    return () => anim.kill();
  }, []);

  const hoursToUnlock = hoursUntilUnlock(user.dailyBonusUnlock);

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await dailyBonusUse(user.telegramId);
    if (response) {
      setSucess(true);
      const newData = await getUserInfo(user.telegramId);
      dispatch(setUser(newData));
    } else {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2500);
    }
    setIsLoading(false);
  };

  return (
    <>
      {error && <ErrorAlert>Algo salió mal...</ErrorAlert>}
      {sucess && <ConfettiExplosion></ConfettiExplosion>}
      <form
        className="grid grid-cols-4 relative bg-[#E7FF2B] rounded-[28px] mt-[40px] max-xsmall:mt-[20px]  pt-[15px] pb-[30px] max-xsmall:pb-[15px]"
        onSubmit={submitHandler}
      >
        <div className="absolute left-1/2 -translate-x-1/2 -top-2 bg-[#FFFFFF] text-[#37C100] rounded-[28px] w-max px-[20px] text-[11px]">
          Consigue una bonificación cada 24 horas
        </div>
        <DailyBonusItem price={1} locked={user.dailyBonus < 1} />
        <DailyBonusItem price={2} locked={user.dailyBonus < 2} />
        <DailyBonusItem price={3} locked={user.dailyBonus < 3} />
        <DailyBonusItem price={4} locked={user.dailyBonus < 4} />
        <button
          type="submit"
          disabled={locked}
          className="absolute left-1/2 -translate-x-1/2 -bottom-4 py-2 bg-[#FFFFFF] text-[#37C100] rounded-[28px] w-max px-[20px] text-[11px]"
        >
          {locked ? (
            <span className="text-[#1E1E1E80]">
              {hoursToUnlock ? Math.ceil(hoursToUnlock) : "24"}:00 h
            </span>
          ) : !isLoading ? (
            "Get a bonus"
          ) : (
            "Getting..."
          )}
        </button>
      </form>
    </>
  );
};

export default DailyBonus;
