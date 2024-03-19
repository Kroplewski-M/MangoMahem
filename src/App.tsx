import { Route, Routes } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Nav } from "./components/Nav";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { useUserInfo } from "./context/UserContext";
import { Quizes } from "./pages/Quizes";
import Authguard from "./components/AuthGuard";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { UserProfile } from "./pages/UserProfile";
import { NotificationType, useNotifications } from "./context/NotificationsContext";
import { CreateQuiz } from "./pages/CreateQuiz";
import { Leaderboard } from "./pages/Leaderboard";
import { QuizInfo } from "./pages/QuizInfo";
import { useCompletedQuizes } from "./context/CompletedQuizesContext";

function App() {
  const navigate = useNavigate();
  const { loginUser } = useUserInfo();
  const {fetchCompletedQuizes} = useCompletedQuizes();
  const { notifications,PushNotifictionMessage } = useNotifications();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        PushNotifictionMessage("Logged in successfully", NotificationType.Success);
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);
        const pointsDocRef = doc(db, "userScores", user.uid);
        const pointsDocSnap = await getDoc(pointsDocRef);

        //fetch user data
        if (userDocSnap.exists() && pointsDocSnap.exists()) {
          loginUser({
            uid: user.uid,
            displayName: userDocSnap.data().DisplayName,
            email: user.email != null ? user.email : "",
            score: pointsDocSnap.data().Score,
          });
        }
        //fetch completed quizes
        fetchCompletedQuizes(user.uid);
        navigate("/quizes");
      }
    });
  }, []);
  const getNotificationStyle = (type: NotificationType) => {
    if (type == NotificationType.Error) {
      return "bg-ErrorNotification text-gray-200";
    } else if (type == NotificationType.Success) {
      return "bg-SuccessNotification text-[#333333]";
    } else if (type == NotificationType.Info) {
      return "bg-InfoNotification text-[#333333]";
    } else {
      return "bg-WarningNotificartion text-[#333333]";
    }
  };
  return (
    <div>
      <section className="min-h-[100vh] bg-mainBg pb-5">
        <Nav />
        <div className="flex flex-col fixed top-10 right-10 z-[110]">
          {notifications.map((notification) => (
            <div className={`${getNotificationStyle(notification.type)} p-3 font-bold mt-3 rounded-[5px]`} key={notification.message}>
              <p className="text-[20px]">{notification.message}</p>
            </div>
          ))}
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<Authguard />}>
            <Route path="/quizes" element={<Quizes />} />
            <Route path="/userProfile" element={<UserProfile />} />
            <Route path="/create-quiz" element={<CreateQuiz />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/quizInfo/:id" element={<QuizInfo />} />
          </Route>
        </Routes>
      </section>
      <Footer />
    </div>
  );
}

export default App;
