import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { Services } from './components/sections/Services';
import { Projects } from './components/sections/Projects';
import { Skills } from './components/sections/Skills';
import { About } from './components/sections/About';

function App() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Projects />
        <Skills />
        <About />
      </main>
      <Footer />
    </div>
  );
}

export default App;
