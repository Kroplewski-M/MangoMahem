import { FruitBowlSVG } from "../assets/SVG/FruitBowlSVG";

export const Register = () => {
  return (
    <section className="w-[100vw] min-h-[100vh] flex flex-col flex-col-reverse md:flex-row">
      <div className="md:w-[50%] w-[100%] h-[100vh] bg-secondary/50 flex relative">
        <div className="flex self-center flex-col text-center w-[100%] -mt-16">
          <div className="width-[300px] height-[300px] mx-auto absolute opacity-[0.5]">
            <FruitBowlSVG width={300} height={300} fill="#FFFFFF" />
          </div>
          <p className="text-[40px] font-bold text-PrimaryText z-[50]">Already have an account?</p>
          <p className="text-[30px] font-bold text-PrimaryText z-[50]">Log in now</p>
          <div className="mx-auto w-[150px] h-[35px] mt-5 z-[50]">
            <button className="w-[100%] h-[100%] bg-secondary hover:font-bold rounded shadow-md ">Log in</button>
          </div>
        </div>
      </div>
      <div className="md:w-[50%] w-[100%] h-[100vh] bg-red-200 flex relative">
        <div className="flex self-center flex-col text-center w-[100%]">
          <p className="text-[40px] font-bold text-PrimaryText z-[50]">Register an account</p>
          <form action="">
            <div>
              <label htmlFor="firstname">First name</label>
              <input type="text" name="firstname" />
            </div>
            <div>
              <label htmlFor="lastname">Last name</label>
              <input type="text" name="lasttname" />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input type="email" name="email" />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input type="password" name="password" />
            </div>
            <div>
              <label htmlFor="passwordConf">Confirm password</label>
              <input type="text" name="passwordConf" />
            </div>
            <div>
              <button>Register</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
