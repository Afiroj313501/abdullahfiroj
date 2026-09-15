import { useState } from "react";
import Preloader from "./components/Preloader";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Toolkit from "./components/Toolkit";
import SelectedWork from "./components/SelectedWork";
import Research from "./components/Research";
import Hobbies from "./components/Hobbies";
import Contact from "./components/Contact";
import AskAbdullah from "./components/AskAbdullah";
import Journey from "./components/Journey";
import Atmosphere from "./components/Atmosphere";

export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <Preloader onComplete={() => setLoaded(true)} />}
      {loaded && (
        <div className="relative isolate">
          <Atmosphere />
          <Nav />
          <main className="relative z-10">
            <Hero />
            <About />
            <AskAbdullah />
            <Toolkit />
            <SelectedWork />
            <Research />
            <Journey />
            <Hobbies />
            <Contact />
          </main>
        </div>
      )}
    </>
  );
}