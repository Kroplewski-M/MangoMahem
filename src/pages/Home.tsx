import { MangoSVG } from "../assets/SVG/MangoSVG";
import { useNavigate } from "react-router-dom";
import { useUserInfo } from "../context/UserContext";

export const Home = () => {
  const navigate = useNavigate();
  const {userInfo} = useUserInfo();
  
  const navigateUser = ()=>{
    if(userInfo.uid!==''){
      navigate('/quizes');
    }else{
      navigate('/register');
    }
  }
  return (
    <section>
      <div className="absolute md:right-[40vw] right-[10vw] opacity-[0.7]">
        <MangoSVG width={500} height={500} />
      </div>
      <div className="relative z-50 mt-5">
        <h1 className="text-[40px] md:text-[55px] text-center font-bold text-PrimaryText">Mango Mayhem</h1>
        <div className="w-[200px] h-[50px] mx-auto mt-5">
          <button className="w-[100%] h-[100%] border border-[#333333] bg-secondary hover:bg-secondary/70 rounded" onClick={navigateUser}>
            Get Started
          </button>
        </div>
        <div className="flex md:px-5 mt-[70px] md:justify-around flex-col md:flex-row space-y-4 md:space-y-0">
          <div className="w-[300px] h-[300px] bg-secondary rounded shadow-lg mx-auto md:mx-0">
            <p className="text-PrimaryText text-center mt-[5px] font-bold text-[40px]">Create</p>
          </div>
          <div className="w-[300px] h-[300px] bg-secondary rounded shadow-lg mx-auto md:mx-0">
            <p className="text-PrimaryText text-center mt-[5px] font-bold text-[40px]">Play</p>
          </div>
          <div className="w-[300px] h-[300px] bg-secondary rounded shadow-lg mx-auto md:mx-0">
            <p className="text-PrimaryText text-center mt-[5px] font-bold text-[40px]">Compete</p>
          </div>
        </div>
      </div>
    </section>
  );
};
