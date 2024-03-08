import { getAuth, signOut } from "firebase/auth";
import { useUserInfo } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { UserSvg } from "../assets/SVG/UserSVG";
import { NotificationType, useNotifications } from "../context/NotificationsContext";

export const UserProfile = () => {
    const {userInfo,logoutUser} = useUserInfo();
    const {PushNotifictionMessage} = useNotifications();
    const navigate = useNavigate();

    const logOut = async() => {
        const auth = getAuth();
        try{
            await signOut(auth);
            logoutUser();
            PushNotifictionMessage("Logged out successfully", NotificationType.Success);
            navigate('/');
        }catch{
            PushNotifictionMessage("Error while logging out", NotificationType.Error);
        }
    };
    return (
        <div className="grid place-content-center">
            <div className="w-[300px] md:w-[500px] rounded h-[350px] bg-secondary mt-16">
                <div className="flex w-[200px] mx-auto">
                    <div className="width-[50px] height-[50px] flex self-center">
                        <UserSvg width={50} height={50} fill="#46230A" />
                    </div>
                    <p className="font-bold text-[30px] text-PrimaryText text-center mt-5">User Info</p>
                </div>
                <div className="flex flex-col mt-5 md:text-[20px] text-[16px]">
                    <div className="bg-mainBg w-[70%] mx-auto rounded p-2">
                        <p className="font-bold text-PrimaryText text-center">Name: {userInfo.displayName}</p>
                    </div>
                    <div className="bg-mainBg w-[70%] mx-auto rounded p-2 mt-4">
                        <p className="font-bold text-PrimaryText text-center">Email: {userInfo.email}</p>
                    </div>
                    <div className="bg-mainBg w-[70%] mx-auto rounded p-2 mt-4">
                        <p className="font-bold text-PrimaryText text-center">Score: {userInfo.score}</p>
                    </div>
                </div>
                <div className="w-[200px] h-[30px] mx-auto mt-5">
                    <button className="bg-red-700 w-[100%] h-[100%] rounded text-gray-200 hover:font-bold" onClick={logOut}>Log out</button>
                </div>
            </div>
        </div>
    )
}