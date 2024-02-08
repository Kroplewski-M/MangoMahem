import { Nav } from "./components/Nav";
import { Home } from "./pages/Home";

function App() {
  return (
    <section className="min-h-[100vh] bg-mainBg pb-16">
      <Nav />
      <Home />
    </section>
  );
}

export default App;
