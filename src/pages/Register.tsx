import { FruitBowlSVG } from "../assets/SVG/FruitBowlSVG";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { useUserInfo } from "../context/UserContext";
import { NotificationType, useNotifications } from "../context/NotificationsContext";

type Inputs = {
  FirstName: string;
  LastName: string;
  Email: string;
  Password: string;
};

export const Register = () => {
  const navigate = useNavigate();
  const { loginUser } = useUserInfo();
  const { PushNotifictionMessage } = useNotifications();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    PushNotifictionMessage("Creating Account...", NotificationType.Info);
    const user = await createUserWithEmailAndPassword(auth, data.Email, data.Password);
    try {
      await setDoc(doc(db, "users", user.user.uid), {
        UID: user.user.uid,
        DisplayName: `${data.FirstName} ${data.LastName}`,
        FirstName: data.FirstName,
        LastName: data.LastName,
        Email: data.Email,
      });
      await setDoc(doc(db, "userScores", user.user.uid), {
        UID: user.user.uid,
        Score: 0,
      });
      setLoading(false);
      loginUser({
        uid: user.user.uid,
        displayName: `${data.FirstName} ${data.LastName}`,
        email: user.user.email != null ? user.user.email : "",
        score: 0,
      });
      navigate("/quizes");
      PushNotifictionMessage("Acccount Created Successfully", NotificationType.Success);
    } catch (error) {
      PushNotifictionMessage("Error occured, please try again later...", NotificationType.Error);
    }
  };
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
          <form onSubmit={handleSubmit(onSubmit)} className="w-[300px] mx-auto ">
            <div className="flex flex-col">
              <label htmlFor="firstname" className="text-[20px] font-bold">
                First name
              </label>
              <input
                type="text"
                className="w-[300px] h-[35px] rounded-md mx-auto pl-[5px] border-b-[5px] border-b-secondary bg-transparent focus:outline-none"
                {...register("FirstName", { required: "Required" })}
                placeholder="John"
              />
              <p className="font-light text-red-700">{errors.FirstName?.message}</p>
            </div>
            <div className="mt-[10px]">
              <label htmlFor="lastname" className="text-[20px] font-bold">
                Last name
              </label>
              <input
                type="text"
                className="w-[300px] h-[35px] rounded-md mx-auto pl-[5px] border-b-[5px] border-b-secondary bg-transparent focus:outline-none"
                {...register("LastName", { required: "Required" })}
                placeholder="Doe"
              />
              <p className="font-light text-red-700">{errors.LastName?.message}</p>
            </div>
            <div className="mt-[10px]">
              <label htmlFor="email" className="text-[20px] font-bold">
                Email
              </label>
              <input
                type="email"
                className="w-[300px] h-[35px] rounded-md mx-auto pl-[5px] border-b-[5px] border-b-secondary bg-transparent focus:outline-none"
                {...register("Email", { required: "Required" })}
                placeholder="johndoe@gmail.com"
              />
              <p className="font-light text-red-700">{errors.Email?.message}</p>
            </div>
            <div className="mt-[10px]">
              <label htmlFor="password" className="text-[20px] font-bold">
                Password
              </label>
              <input
                type="password"
                className="w-[300px] h-[35px] rounded-md mx-auto pl-[5px] border-b-[5px] border-b-secondary bg-transparent focus:outline-none"
                {...register("Password", {
                  required: "Required",
                  minLength: {
                    value: 6,
                    message: "Min characters:6",
                  },
                })}
                placeholder="Password"
              />
              <p className="font-light text-red-700">{errors.Password?.message}</p>
            </div>
            <div className="w-[170px] h-[35px] mx-auto mt-5">
              <button type="submit" disabled={loading} className="w-[100%] h-[100%] bg-secondary rounded-md hover:font-bold">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
