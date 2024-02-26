import { FruitBowlSVG } from "../assets/SVG/FruitBowlSVG";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useUserInfo } from "../context/UserContext";
import { db } from "../firebase";
import { NotificationType, useNotifications } from "../context/NotificationsContext";

type Inputs = {
  Email: string;
  Password: string;
};
export const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { loginUser } = useUserInfo();
  const { PushNotifictionMessage } = useNotifications();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    PushNotifictionMessage("Logging in please wait...", NotificationType.Info);
    try {
      const auth = getAuth();
      const user = await signInWithEmailAndPassword(auth, data.Email, data.Password);
      const userDocRef = doc(db, "users", user.user.uid);
      const userDocSnap = await getDoc(userDocRef);
      const pointsDocRef = doc(db, "userScores", user.user.uid);
      const pointsDocSnap = await getDoc(pointsDocRef);

      if (userDocSnap.exists() && pointsDocSnap.exists()) {
        loginUser({
          uid: user.user.uid,
          displayName: userDocSnap.data().DisplayName,
          email: user.user.email != null ? user.user.email : "",
          score: pointsDocSnap.data().Score,
        });
      }
      PushNotifictionMessage("Successfully logged in", NotificationType.Success);
      navigate("/quizes");
    } catch (e) {
      console.error(e);
      PushNotifictionMessage("Error occured...", NotificationType.Error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-[100vw] min-h-[100vh] flex flex-col flex-col-reverse md:flex-row md:flex-row-reverse">
      <div className="md:w-[50%] w-[100%] h-[100vh] flex relative svgBg">
        <div className="flex self-center flex-col text-center w-[100%] -mt-16">
          <div className="width-[300px] height-[300px] mx-auto absolute opacity-[0.5]">
            <FruitBowlSVG width={300} height={300} fill="#FFFFFF" />
          </div>
          <p className="text-[40px] font-bold text-PrimaryText z-[50]">Don't have an account?</p>
          <p className="text-[30px] font-bold text-PrimaryText z-[50]">Register now</p>
          <div className="mx-auto w-[150px] h-[35px] mt-5 z-[50]">
            <button className="w-[100%] h-[100%] bg-PrimaryText hover:font-bold rounded shadow-md text-gray-100" onClick={() => navigate("/register")}>
              Register
            </button>
          </div>
        </div>
      </div>
      <div className="md:w-[50%] w-[100%] h-[100vh] bg-red-100 flex relative">
        <div className="flex self-center flex-col w-[100%]">
          <p className="text-[40px] font-bold text-PrimaryText z-[50] text-center mb-5">Login</p>
          <form onSubmit={handleSubmit(onSubmit)} className="w-[300px] mx-auto ">
            <div className="mt-[10px]">
              <label htmlFor="email" className="text-[20px] font-bold">
                Email
              </label>
              <input
                type="email"
                className="w-[300px] h-[35px] rounded-md mx-auto pl-[5px] border-b-[5px] border-b-secondary bg-transparent focus:outline-none"
                placeholder="johndoe@gmail.com"
                {...register("Email", { required: "Required" })}
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
                placeholder="Password"
                {...register("Password", { required: "Required" })}
              />
              <p className="font-light text-red-700">{errors.Password?.message}</p>
            </div>
            <div className="w-[170px] h-[35px] mx-auto mt-5">
              <button disabled={loading} className="w-[100%] h-[100%] bg-secondary rounded-md hover:font-bold">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
