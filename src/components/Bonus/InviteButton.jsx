import { useEffect, useState } from "react";
import { InviteIcon } from "../UI/icons";
import { getUrlLink } from "../../util/back/requests";

const InviteButton = () => {
  const [link, setLink] = useState();

  useEffect(() => {
    const fetchUrl = async () => {
      const response = await getUrlLink();
      setLink(response);
    };
    fetchUrl();
  }, []);

  // const inviteFriend = () => {
  //   const url = `https://t.me/share/url?url=&text=${encodeURIComponent(link)}`;
  //   WebApp.openTelegramLink(url);
  // };

  return (
    <>
      <a
        href={`https://t.me/share/url?url=&text=${encodeURIComponent(link)}`}
        target="_blanc"
        // onClick={inviteFriend}
        className="text-[#37C100] bg-[#E7FF2B] mt-[40px] max-xsmall:mt-[30px] rounded-[28px] py-3 w-full flex items-center justify-center gap-[20px]"
      >
        <p className="text-[18px] pt-1 max-xsmall:text-[14px]">
          Invitar a un amigo
        </p>
        <div>
          <InviteIcon />
        </div>
      </a>
      <div className="text-[11px] w-full text-center mt-2">
        Invita a 10 personas y recibe 4 USD de bonificación por ello
      </div>
    </>
  );
};

export default InviteButton;
