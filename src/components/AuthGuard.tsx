import { Outlet, Navigate } from 'react-router-dom';
import { useUserInfo } from '../context/UserContext';

const Authguard = () => {
    const {userInfo} = useUserInfo();

    return(
        userInfo.uid!=='' ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default Authguard;