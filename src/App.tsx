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
import { useNavigate } from "react-router-dom";import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { UserProfile } from "./pages/UserProfile";

function App() {
  const navigate = useNavigate();
  const {loginUser} = useUserInfo();

  useEffect(()=>{
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);
        const pointsDocRef = doc(db, "userScores", user.uid);
        const pointsDocSnap = await getDoc(pointsDocRef);
  
        if(userDocSnap.exists() && pointsDocSnap.exists()){
          loginUser({
            uid:user.uid,
            displayName:userDocSnap.data().DisplayName,
            email:user.email!=null?user.email:"", 
            score:pointsDocSnap.data().Score
          });
        }
      navigate('/quizes');
      } 
    });
  },[])
  return (
    <div>
      <section className="min-h-[100vh] bg-mainBg pb-5">
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<Authguard/>}>
              <Route path="/quizes" element={<Quizes />} />
              <Route path="/userProfile" element={<UserProfile />} />
            </Route>
          </Routes>
      </section>
      <Footer />
    </div>
  );
}

export default App;
