import { createContext, ReactNode, useContext,useEffect,useState } from "react";

enum NotificationType {
    success = "success",
    error = "error",
    warning = "warning",
    info = "info"
}
interface Notification {
    message: string;
    type: NotificationType;
}
interface NotificationsProvider {
    notifications: Notification[];
    PushNotifictionMessage: (message: string, type: NotificationType) => void;
    RemoveFirstNotification: () => void;
}
interface NotificationsProviderProps { 
    children: ReactNode;
}
const NotificationsProvider = createContext({} as NotificationsProvider);

export const useNotifications = () => {
    return useContext(NotificationsProvider);
};

export const NotificationsContext = ({ children }: NotificationsProviderProps) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [size,setSize] = useState(0);

    const PushNotifictionMessage = (message: string, type: NotificationType) => {
        setNotifications([...notifications, { message, type }]);
        setSize(size+1);
    }
    const RemoveFirstNotification = () => {
        setNotifications(notifications.slice(0,-1));
        setSize(size-1);
    }
    useEffect(()=>{
        while(notifications.length>0){
            const interval = setInterval(() => {
                RemoveFirstNotification();
            },500);
            return () => clearInterval(interval);
        }
    },[size])
    
    return <NotificationsProvider.Provider value={{notifications,PushNotifictionMessage,RemoveFirstNotification}}>
        {children}
    </NotificationsProvider.Provider>
}