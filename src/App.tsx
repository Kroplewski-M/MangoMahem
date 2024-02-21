import { Route, Routes } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Nav } from "./components/Nav";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { UserContext } from "./context/UserContext";
import { Quizes } from "./pages/Quizes";

function App() {
  return (
    <div>
      <section className="min-h-[100vh] bg-mainBg">
        <UserContext>
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/quizes" element={<Quizes />} />
          </Routes>
        </UserContext>
      </section>
      <Footer />
    </div>
  );
}

export default App;
