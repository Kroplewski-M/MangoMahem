import { useEffect, useState } from "react";
import { LogoSVG } from "../assets/SVG/LogoSVG";
import { UserSvg } from "../assets/SVG/UserSVG";
import { MenuSVG } from "../assets/SVG/MenuSVG";
import { useNavigate } from "react-router-dom";
import { useUserInfo } from "../context/UserContext";

export const Nav = () => {
  const [openNav, setOpenNav] = useState(false);
  const [windowSize, setWindowSize] = useState<number>(getWindowSize());
  const mobileLimit: number = 768;
  const navigate = useNavigate();
  const { isLoggedIn } = useUserInfo();
  const {userInfo} = useUserInfo();

  function getWindowSize() {
    const innerWidth: number = window.innerWidth;
    return innerWidth;
  }

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  useEffect(() => {
    if (windowSize >= mobileLimit && openNav) {
      setOpenNav(false);
    }
    if (windowSize < mobileLimit) {
      setOpenNav(false);
    }
  }, [windowSize]);

  const navigateUser = () => {
    if (isLoggedIn()) {
      navigate("/userProfile");
      return;
    }
    navigate("/login");
    return;
  };
  return (
    <nav className={`w-[100vw] h-[70px] bg-secondary duration-200 ease-linear flex relative z-[100] sticky top-0 shadow-lg`}>
      <div className="self-center flex pl-[10px] hover:cursor-pointer">
        <LogoSVG width={50} height={50} />
        <p className="font-bold self-center pl-2 text-PrimaryText" onClick={() => navigate("/")}>
          Mango Mayhem
        </p>
      </div>
      <div className={`flex-row ${openNav ? "fixed top-0 right-0 bg-secondary w-[90%] h-[100vh] text-center pt-10 animate-SlideIn" : "hidden"} md:inline-flex self-center w-[380px] mx-auto`}>
        <div className="absolute right-5 top-5 hover:cursor-pointer md:hidden" onClick={() => setOpenNav(false)}>
          X
        </div>
        <p className="font-bold text-PrimaryText hover:underline underline-offset-[5px] decoration-4 hover:cursor-pointer mb-5 md:mb-0 text-[25px] md:text-[16px] md:mr-5">Quizzes</p>
        <p className="font-bold text-PrimaryText hover:underline underline-offset-[5px] decoration-4 hover:cursor-pointer mb-5 md:mb-0 text-[25px] md:text-[16px] md:mr-5">Create</p>
        <p className="font-bold text-PrimaryText hover:underline underline-offset-[5px] decoration-4 hover:cursor-pointer mb-5 md:mb-0 text-[25px] md:text-[16px] md:mr-5">Leaderboard</p>
        <div className="md:absolute top-3 right-10 flex place-content-center">
          <div className={`flex mt-[3px] ${isLoggedIn() ? "" : "hidden"}`}>
            <LogoSVG width={30} height={30} />
            <p className="text-PrimaryText font-bold">{userInfo.score}</p>
          </div>
          <div className="hover:cursor-pointer ml-[15px]" onClick={navigateUser}>
            <UserSvg width={35} height={35} fill="#46230A" />
          </div>
        </div>
      </div>
      <div className={`flex grow flex-row-reverse mr-[10px] self-center md:hidden hover:cursor-pointer ${openNav ? "hidden" : ""}`} onClick={() => setOpenNav(true)}>
        <MenuSVG width={40} height={40} fill="#46230A" />
      </div>
    </nav>
  );
};
