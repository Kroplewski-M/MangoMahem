import { useUserInfo } from "../context/UserContext";

export const UserProfile = () => {
    const {userInfo} = useUserInfo();
    return (
        <div className="grid place-content-center">
            <div className="w-[500px] rounded h-[350px] bg-secondary mt-16">
                <p className="font-bold text-[30px] text-PrimaryText text-center mt-5">User Info</p>
                <div className="flex flex-col mt-5 text-[20px]">
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
                    <button className="bg-red-700 w-[100%] h-[100%] rounded text-gray-200 hover:font-bold">Log out</button>
                </div>
            </div>
        </div>
    )
}