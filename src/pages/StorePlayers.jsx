import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import { useCallback, useLayoutEffect, useMemo, useRef } from "react";
import { chunkArray } from "../util/front/func";
import { ButtonLeft, ButtonRight } from "../components/UI/icons";
import { Pagination } from "swiper/modules";
import "swiper/css/pagination";
import PlayerItem from "../components/Store/PlayerItem";
import { useSelector } from "react-redux";
import gsap from "gsap";

export default function StorePlayers() {
  const players = useSelector((state) => state.static.players);
  const swiperRef = useRef(null);

  const groupedPlayers = useMemo(() => chunkArray(players, 4), [players]);

  useLayoutEffect(() => {
    const footballPlayers = gsap.utils.toArray(".football-player");
    const anim = gsap.fromTo(
      footballPlayers,
      {
        translateY: 30,
        opacity: 0,
      },
      {
        translateY: 0,
        opacity: 1,
        stagger: 0.07,
      },
    );
    return () => anim.kill();
  }, []);

  const handlePrev = useCallback(() => swiperRef.current?.slidePrev(), []);
  const handleNext = useCallback(() => swiperRef.current?.slideNext(), []);

  return (
    <>
      <Swiper
        spaceBetween={50}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        slidesPerView={1}
        pagination={{ clickable: true }}
        modules={[Pagination]}
        className="h-full"
        style={{ height: "calc(100% - 30px)" }}
      >
        {groupedPlayers.map((group, index) => (
          <SwiperSlide key={index}>
            <div className="grid grid-cols-2 grid-rows-2 gap-[6px] h-full pb-[40px]">
              {group.map((player, idx) => (
                <PlayerItem key={idx} player={player} />
              ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="pb-[18px] flex flex-col items-center justify-center">
        <div></div>
        <div className="flex gap-[10px]">
          <button
            className="bg-[#E7FF2B] w-[84px] h-[30px] rounded-[28px] flex items-center justify-center"
            onClick={handlePrev}
          >
            <ButtonLeft />
          </button>
          <button
            className="bg-[#E7FF2B] w-[84px] h-[30px] rounded-[28px] flex items-center justify-center"
            onClick={handleNext}
          >
            <ButtonRight />
          </button>
        </div>
      </div>
    </>
  );
}
