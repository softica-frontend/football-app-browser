import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGesture } from "@use-gesture/react";
import { setUser } from "../../store/auth-slice";
import gsap from "gsap";
import ErrorAlert from "../UI/errorAlert";
import { plusClick, resetClicks } from "../../store/clicks-slice";
import { updateBalance } from "../../util/back/requests";

export default function MainImage() {
  const staticData = useSelector((state) => state.static);
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth);
  const clicks = useSelector((state) => state.clicks);
  const [isError, setIsError] = useState(false);
  const [floatingTexts, setFloatingTexts] = useState([]);
  const nextIdRef = useRef(0);
  const timeoutIdsRef = useRef([]);
  const timerRef = useRef(null);

  const activePlayer = useMemo(
    () => staticData.players.find((el) => el.id === userInfo.currentPlayerId),
    [staticData.players, userInfo.currentPlayerId],
  );
  const activeBall = useMemo(
    () => staticData.balls.find((el) => el.id === userInfo.currentBallId),
    [staticData.balls, userInfo.currentBallId],
  );

  useLayoutEffect(() => {
    const animLeft = gsap.to("#home-right-text", {
      translateX: 0,
      opacity: 1,
    });
    const animRight = gsap.to("#home-left-text", {
      translateX: 0,
      opacity: 1,
    });

    const ballAnim = gsap.to("#ball-image", { translateY: 0, opacity: 1 });
    const playerAnim = gsap.timeline({ duration: 0.1 });

    playerAnim
      .to("#player-image", { translateX: 10, duration: 0.2 })
      .to("#player-image", { translateX: -10, duration: 0.2 })
      .to("#player-image", { translateX: 0, duration: 0.2 });

    return () => {
      animRight.kill();
      animLeft.kill();
      ballAnim.kill();
      playerAnim.kill();
    };
  }, []);
  const clicksUpdate = async () => {
    if (clicks > 0) {
      const response = await updateBalance(userInfo.telegramId, clicks);
      if (response) {
        if (
          response.energy !== userInfo.energy
          // response.balance.toFixed(2) !== userInfo.balance.toFixed(2)
        )
          dispatch(
            setUser({
              ...userInfo,
              // balance: response.balance,
              energy: response.energy,
            }),
          );
        dispatch(resetClicks());
      }
    }
  };

  const clickHandler = useCallback(
    (e) => {
      if (userInfo.energy == 0) {
        if (!isError) {
          setIsError(true);
          setTimeout(() => {
            setIsError(false);
          }, 2500);
        }
        return;
      }
      //timer update

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      // Встановлюємо новий таймер на 2 секунди
      timerRef.current = setTimeout(() => {
        clicksUpdate(); // Скидаємо лічильник після відправлення
        timerRef.current = null; // Очищуємо таймер після виконання
      }, 1000);

      const clicksSubmit = async () => {
        const response = await updateBalance(userInfo.telegramId, clicks);
        if (response) {
          dispatch(resetClicks());
        }
      };
      dispatch(plusClick());
      gsap.to(e.currentTarget, {
        rotation: "+=180",
        duration: 0.6,
        ease: "power2.inOut",
      });

      dispatch(
        setUser({
          ...userInfo,
          energy: clicks == 500 ? userInfo.energy - 1 : userInfo.energy,
          balance: userInfo.balance + activePlayer.value,
        }),
      );
      if (clicks == 500) {
        clicksSubmit();
      }
      const { clientX: x, clientY: y } = e;
      const newText = { id: nextIdRef.current, x: x - 50, y: y - 50 };
      setFloatingTexts((prev) => [...prev, newText]);
      nextIdRef.current += 1;

      const timeoutId = setTimeout(() => {
        setFloatingTexts((prev) =>
          prev.filter((text) => text.id !== newText.id),
        );
      }, 2000);
      timeoutIdsRef.current.push(timeoutId);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activePlayer.value, dispatch, userInfo, isError, clicks],
  );

  const click = useGesture({
    onPointerDown: ({ event }) => {
      clickHandler(event);
    },
  });

  return (
    <>
      {isError && (
        <ErrorAlert>Sin energía. 1 energía = 10 min reset</ErrorAlert>
      )}
      <div
        className="h-[60%] max-h-[419px] w-[298px] select-none"
        id="main-container-for-plus"
      >
        {floatingTexts.map((text) => (
          <span
            className="floating-text z-10 font-semibold text-[24px] white"
            key={text.id}
            style={{ top: text.y, left: text.x, position: "absolute" }}
          >
            +{activePlayer.value}
          </span>
        ))}

        <div className="h-full relative w-full">
          <div className="absolute w-full h-full">
            <div className="h-[12%]"></div>
            <div
              className="h-[88%] rounded-t-[20px]"
              style={{
                background: 'url("./images/background.png") no-repeat bottom',
              }}
            ></div>
          </div>
          <div className="w-full h-full flex flex-col items-center absolute">
            {/* NEED TO UPDATE */}

            <img
              id="player-image"
              src={`./images/person/${activePlayer.id}.png`}
              alt="person"
              className="w-[35vh] max-h-[70%] max-xsmall:w-[30vh]"
            />
            <div className="bg-[#37C100] w-[52%] text-center py-[9px] rounded-[48px] max-xsmall:py-[2px]">
              {activePlayer.value} USD
            </div>
            <h1 className="text-[#1A5B00] text-[26px]">{activePlayer.name}</h1>
          </div>
          <div className="absolute -bottom-[85px] rounded-[50%] flex items-center justify-center w-full">
            <p
              className="text-[14px] absolute left-0 w-1/3 px-2 -translate-x-[100px] opacity-0"
              id="home-left-text"
            >
              Haga clic en la pelota
            </p>
            {/* NEED TO UPDATE */}
            <img
              id="ball-image"
              {...click()}
              src={`./images/ball/${activeBall.id}.png`}
              alt="ball"
              draggable="false"
              className="rounded-[50%] max-w-[33%]  -translate-y-[100px] opacity-0"
            />
            <p
              className="text-[14px] absolute right-0 w-1/4 px-2 translate-x-[100px] opacity-0"
              id="home-right-text"
            >
              Para progresar
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
