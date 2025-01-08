import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import { useLayoutEffect, useMemo, useRef } from "react";
import { chunkArray } from "../util/front/func";
import { ButtonLeft, ButtonRight } from "../components/UI/icons";
import { Pagination } from "swiper/modules";
import "swiper/css/pagination";
import { useSelector } from "react-redux";
import BallItem from "../components/Store/BallItem";
import gsap from "gsap";

export default function StorePlayers() {
  const balls = useSelector((state) => state.static.balls);
  const swiperRef = useRef(null);

  useLayoutEffect(() => {
    const ballItems = gsap.utils.toArray(".ball-item");

    const anim = gsap.fromTo(
      ballItems,
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
  const groupedBalls = useMemo(() => chunkArray(balls, 6), [balls]);
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
        {groupedBalls.map((group, index) => (
          <SwiperSlide key={index}>
            <div className="grid grid-cols-2 grid-rows-3 gap-[6px] h-full pb-[40px]">
              {group.map((ball, idx) => (
                <BallItem key={idx} ball={ball} />
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
            // onClick={() => swiperRef.current?.slidePrev()}
          >
            <ButtonLeft />
          </button>
          <button
            className="bg-[#E7FF2B] w-[84px] h-[30px] rounded-[28px] flex items-center justify-center"
            // onClick={() => swiperRef.current?.slideNext()}
          >
            <ButtonRight />
          </button>
        </div>
      </div>
    </>
  );
}
