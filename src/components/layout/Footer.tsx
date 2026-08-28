import { portfolioData } from '../../data/portfolioData';
import logo from '../../assets/logojs-transparent.png';

export function Footer() {
  return (
    <footer className="relative z-10 py-12 bg-black font-mono mt-0">
      {/* Thin black gradient separator */}
      <div className="absolute -top-4 left-0 right-0 h-4 bg-gradient-to-t from-black to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-start md:items-center justify-between">
        <div className="mb-8 md:mb-0">
          <a href="#" className="flex items-center mb-2">
            <img src={logo} alt="Julio Santana Logo" className="h-10 w-auto opacity-75 hover:opacity-100 transition-opacity" />
          </a>
          <p className="text-gray-500 text-[13px] mt-2">© {new Date().getFullYear()} {portfolioData.personal.name}. All systems operational.</p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-[14px]">
          <a href="https://wa.me/51917983492?text=Estimado%20Julio%2C%20he%20revisado%20su%20portafolio%20profesional%20y%20me%20gustar%C3%ADa%20conversar%20acerca%20de%20una%20posible%20oportunidad%20de%20colaboraci%C3%B3n." target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white hover:underline decoration-white underline-offset-4 transition-none float-1 hover-scale inline-block">WhatsApp</a>
          <a href="https://www.linkedin.com/in/julio-santana-131527417/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white hover:underline decoration-white underline-offset-4 transition-none float-2 hover-scale inline-block">LinkedIn</a>
          <a href="mailto:juliosantana.dev@gmail.com" className="text-gray-500 hover:text-white hover:underline decoration-white underline-offset-4 transition-none float-3 hover-scale inline-block">Email</a>
        </div>
      </div>
    </footer>
  );
}
