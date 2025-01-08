import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadImages } from "../util/front/loadImages";
import { imagesToLoad } from "../util/front/imagesToLoad";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllBalls,
  getAllPlayers,
  getBoughtBalls,
  getBoughtPlayers,
  getUserInfo,
  TG_ID,
} from "../util/back/requests";
import { setUser } from "../store/auth-slice";
import { setStatic } from "../store/static-slice";

export default function Loading() {
  const [isReady, setIsReady] = useState();
  const [error, setIsError] = useState();
  const [imagesReady, setImagesReady] = useState();
  const userInfo = useSelector((state) => state.auth);
  const balls = useSelector((state) => state.static.balls);
  const players = useSelector((state) => state.static.players);
  const dispatch = useDispatch();
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("token");

  const FallbackNavigate = ({ to }) => {
    const navigate = useNavigate();
    useEffect(() => {
      navigate(to);
    }, [to, navigate]);
    return null;
  };

  useEffect(() => {
    const fetchData = async () => {
      const user = await getUserInfo(TG_ID);
      const balls = await getAllBalls();
      const players = await getAllPlayers();
      const boughtPlayers = await getBoughtPlayers(TG_ID);
      const boughtBalls = await getBoughtBalls(TG_ID);
      if (user && balls && players && boughtPlayers && boughtBalls) {
        dispatch(setUser(user));
        dispatch(
          setStatic({
            balls: balls,
            players: players,
            boughtPlayers: boughtPlayers,
            boughtBalls: boughtBalls,
          }),
        );
      }
    };
    if (username && token) {
      fetchData();
    }
  }, []);

  useEffect(() => {
    loadImages(imagesToLoad)
      .then(() => {
        setImagesReady(true);
      })
      .catch(() => {
        setIsError(true);
      });
  }, []);

  useEffect(() => {
    if (imagesReady && balls && players && userInfo && userInfo !== "error") {
      setIsReady(true);
    } else if (userInfo == "error") {
      setIsError(true);
    }
  }, [imagesReady, userInfo, balls, players]);
  if (!username || !token) {
    return <FallbackNavigate to="/auth" />;
  }

  return (
    <>
      <main
        className="relative flex items-center justify-center flex-col h-screen w-screen overflow-hidden"
        id="loading-layout"
      >
        <div className="text-center w-full">
          {error ? (
            <div className="text-red-500 px-4 text-[24px] bg-gray-600/70">
              Algo ha ido mal. Intenta recargar la aplicación
            </div>
          ) : (
            <div className="text-xl w-full text-center flex flex-col items-center justify-center gap-4">
              {/* <LoadingStar /> */}
              <div className="w-[375px] max-phone:w-screen max-phone:min-h-[100dvh] h-[100dvh] max-phone:min-w-[100dvh] flex items-center justify-center relative">
                <img
                  src="./images/loading.png"
                  alt="loading"
                  className="object-cover w-[375px] max-phone:w-screen max-phone:min-w-screen max-phone:min-h-[100dvh]"
                />
              </div>
            </div>
          )}
        </div>
      </main>

      {isReady && <FallbackNavigate to="/menu/home" />}
    </>
  );
}
