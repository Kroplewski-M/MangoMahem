import { Footer } from "./components/Footer";
import { Nav } from "./components/Nav";
import { Home } from "./pages/Home";
import { Register } from "./pages/Register";

function App() {
  return (
    <div>
      <section className="min-h-[100vh] bg-mainBg">
        <Nav />
        {/* <Home /> */}
        <Register />
      </section>
      <Footer />
    </div>
  );
}

export default App;
