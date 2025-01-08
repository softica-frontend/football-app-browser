import { useEffect, useRef, useState } from "react";
import { checkPromo } from "../../util/back/requests";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../store/auth-slice";
import ConfettiExplosion from "react-confetti-explosion";

const Promocode = () => {
  const user = useSelector((state) => state.auth);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState();
  const inputRef = useRef(null);
  const [isLoading, setIsLoading] = useState();
  const [success, setIsSuccess] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    setError(false);
  }, [inputValue]);

  const handleDivClick = () => {
    inputRef.current.focus();
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (inputValue == "") {
      return setError(true);
    }
    setIsLoading(true);

    const response = await checkPromo(user.telegramId, inputValue);
    if (response) {
      setIsSuccess(true);
      dispatch(setUser({ ...user, balance: user.balance + 3 }));
    } else {
      setError(true);
    }
    setIsLoading(false);
  };
  return (
    <>
      {success && <ConfettiExplosion></ConfettiExplosion>}
      <form
        className={`relative border-[3px]  rounded-[28px] px-[20px] pt-[20px] max-xsmall:pt-[10px] pb-[26px] bg-[#FFFFFF66] ${error ? "border-red-600" : success ? "border-green-600" : "border-[#E7FF2B]"}`}
        onSubmit={submitHandler}
      >
        <h1 className="text-[#E7FF2B] text-[25px] max-xsmall:text-[18px]">
          +3 USD
        </h1>
        <p className="text-[11px] text-[#E7FF2B]">
          Activación del código promocional
        </p>
        <div
          className="bg-[#FFFFFF66] w-full rounded-[28px] mt-[11px] py-[10px] text-[11px] flex items-center justify-center "
          onClick={handleDivClick}
        >
          <input
            className="w-[40px]"
            ref={inputRef}
            maxLength={4}
            placeholder="- - - -"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
        <button
          className="absolute left-1/2 -translate-x-1/2 -bottom-4 py-2 bg-[#E7FF2B] text-[#37C100] rounded-[28px] w-max px-[20px] text-[11px]"
          onClick={submitHandler}
        >
          {isLoading ? "Sending..." : "Consigue una bonificación"}
        </button>
      </form>
    </>
  );
};

export default Promocode;
