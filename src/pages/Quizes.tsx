import { useNavigate } from "react-router-dom";
import { useUserInfo } from "../context/UserContext";


export const Quizes = () => {
    const navigate = useNavigate();
    const {userInfo} = useUserInfo();
    return (
        <div>
            <p>{userInfo.displayName}</p>
            <p>{userInfo.email}</p>
            <p>{userInfo.score}</p>
        </div>
    )
}