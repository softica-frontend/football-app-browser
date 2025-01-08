import { useNavigate } from "react-router-dom";

const SuccessfulText = () => {
  const navigate = useNavigate();
  return (
    <div className="text-[18px] text-center">
      Si lo consigue, recibirá su dinero en 3-5 minutos.
      <div className="flex gap-2 w-full items-center  mt-4">
        <button
          onClick={() => {
            navigate("/menu/wallet");
          }}
          className="bg-[#E7FF2B] rounded-md w-full text-[#37C100] py-1"
        >
          Ok
        </button>
      </div>
    </div>
  );
};

export default SuccessfulText;
