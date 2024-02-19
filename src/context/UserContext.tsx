import { createContext, ReactNode, useContext, useState } from "react";

interface userProps {
  uid: string;
  email: string;
  displayName: string;
}
interface UserProvider {
  userInfo: userProps;
  loginUser: (info: userProps) => void;
  logoutUser: () => void;
  isLoggedIn: () => boolean;
}
interface userProviderProps {
  children: ReactNode;
}
const UserProvider = createContext({} as UserProvider);

export const useUserInfo = () => {
  return useContext(UserProvider);
};
export const UserContext = ({ children }: userProviderProps) => {
  const [userInfo, setUserInfo] = useState<userProps>({ uid: "", email: "", displayName: "" });

  const loginUser = (info: userProps) => {
    setUserInfo({
      uid: info.uid,
      email: info.email,
      displayName: info.displayName,
    });
  };
  const logoutUser = () => {
    setUserInfo({ uid: "", email: "", displayName: "" });
  };
  const isLoggedIn = () => {
    if (userInfo.uid != "") {
      return true;
    }
    return false;
  };

  return <UserProvider.Provider value={{ loginUser, logoutUser, userInfo, isLoggedIn }}>{children}</UserProvider.Provider>;
};
