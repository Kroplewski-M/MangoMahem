import { FruitBowlSVG } from "../assets/SVG/FruitBowlSVG";
import { useNavigate } from "react-router-dom";
export const Register = () => {
  const navigate = useNavigate();
  return (
    <section className="w-[100vw] min-h-[100vh] flex flex-col flex-col-reverse md:flex-row">
      <div className="md:w-[50%] w-[100%] h-[100vh] flex relative svgBg">
        <div className="flex self-center flex-col text-center w-[100%] -mt-16">
          <div className="width-[300px] height-[300px] mx-auto absolute opacity-[0.5]">
            <FruitBowlSVG width={300} height={300} fill="#FFFFFF" />
          </div>
          <p className="text-[40px] font-bold text-PrimaryText z-[50]">Already have an account?</p>
          <p className="text-[30px] font-bold text-PrimaryText z-[50]">Log in now</p>
          <div className="mx-auto w-[150px] h-[35px] mt-5 z-[50]">
            <button className="w-[100%] h-[100%] bg-PrimaryText hover:font-bold rounded shadow-md text-gray-100" onClick={() => navigate("/login")}>
              Log in
            </button>
          </div>
        </div>
      </div>
      <div className="md:w-[50%] w-[100%] h-[100vh] bg-red-100 flex relative">
        <div className="flex self-center flex-col w-[100%]">
          <p className="text-[40px] font-bold text-PrimaryText z-[50] text-center mb-5">Register an account</p>
          <form action="" className="w-[300px] mx-auto ">
            <div className="flex flex-col ">
              <label htmlFor="firstname" className="text-[20px] font-bold">
                First name
              </label>
              <input type="text" name="firstname" className="w-[300px] h-[35px] rounded-md mx-auto pl-[5px] border-b-[5px] border-b-secondary bg-transparent focus:outline-none" placeholder="John" />
            </div>
            <div className="mt-[10px]">
              <label htmlFor="lastname" className="text-[20px] font-bold">
                Last name
              </label>
              <input type="text" name="lastname" className="w-[300px] h-[35px] rounded-md mx-auto pl-[5px] border-b-[5px] border-b-secondary bg-transparent focus:outline-none" placeholder="Doe" />
            </div>
            <div className="mt-[10px]">
              <label htmlFor="email" className="text-[20px] font-bold">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="w-[300px] h-[35px] rounded-md mx-auto pl-[5px] border-b-[5px] border-b-secondary bg-transparent focus:outline-none"
                placeholder="johndoe@gmail.com"
              />
            </div>
            <div className="mt-[10px]">
              <label htmlFor="password" className="text-[20px] font-bold">
                Password
              </label>
              <input
                type="password"
                name="password"
                className="w-[300px] h-[35px] rounded-md mx-auto pl-[5px] border-b-[5px] border-b-secondary bg-transparent focus:outline-none"
                placeholder="Password"
              />
            </div>
            <div className="mt-[10px]">
              <label htmlFor="passwordConf" className="text-[20px] font-bold">
                Confirm password
              </label>
              <input
                type="text"
                name="passwordConf"
                className="w-[300px] h-[35px] rounded-md mx-auto pl-[5px] border-b-[5px] border-b-secondary bg-transparent focus:outline-none"
                placeholder="Confirm Password"
              />
            </div>
            <div className="w-[170px] h-[35px] mx-auto mt-5">
              <button className="w-[100%] h-[100%] bg-secondary rounded-md hover:font-bold">Register</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
