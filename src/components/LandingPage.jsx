import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-slate-900 font-outfit text-white overflow-x-hidden">
      {/* Navbar with floating glass effect */}
      <nav className="fixed top-0 w-full z-50 transition-all duration-300 py-4 px-4 md:py-6 md:px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center bg-slate-900/40 backdrop-blur-md rounded-2xl px-4 py-3 md:px-6 md:py-4 border border-white/10 shadow-lg">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center shrink-0">
              <span className="font-bold text-white text-sm md:text-base">RC</span>
            </div>
            <span className="text-lg md:text-xl font-bold tracking-tight whitespace-nowrap">RC Real Estate</span>
          </div>
          {/* <div className="hidden md:flex gap-8">
            <button className="text-sm font-medium hover:text-indigo-400 transition-colors">Propiedades</button>
            <button className="text-sm font-medium hover:text-indigo-400 transition-colors">Nosotros</button>
            <button className="text-sm font-medium hover:text-indigo-400 transition-colors">Servicios</button>
            <button className="text-sm font-medium hover:text-indigo-400 transition-colors">Contacto</button>
          </div> */}
          <Link
            to="/login"
            className="flex items-center justify-center gap-2 px-3 py-2 md:px-5 md:py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 transition-all text-xs md:text-sm font-medium whitespace-nowrap group"
          >
            <div className="p-1 rounded-lg bg-indigo-500/20 text-indigo-400 group-hover:text-indigo-300 transition-colors shrink-0">
                <svg
                  className="w-3 h-3 md:w-4 md:h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
            </div>
            Acceso Agentes
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 md:pt-0">
        {/* Background Image with Overlay */}
        {/* <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600596542815-e32c265a65f1?q=80&w=2574&auto=format&fit=crop"
            alt="Luxury Home"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/50 to-slate-900"></div>
        </div> */}

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 md:mt-20">
          <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-sm font-medium mb-6 animate-fade-in shadow-[0_0_15px_rgba(99,102,241,0.3)]">
            ✨ La mejor experiencia inmobiliaria
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight animate-fade-in">
            Encuentra el hogar <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              que siempre soñaste
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in opacity-90">
            Descubre propiedades exclusivas en las mejores ubicaciones. 
            Calidad, diseño y confort en un solo lugar.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in mb-12 md:mb-0">
            <Link
              to="/catalog"
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-pink-600 text-white font-bold text-lg 
                       shadow-[0_0_30px_rgba(79,70,229,0.4)] hover:shadow-[0_0_50px_rgba(79,70,229,0.6)] 
                       transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 group w-full sm:w-auto justify-center"
            >
              Ver Propiedades
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
            <button className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 
                           text-white font-semibold text-lg backdrop-blur-sm transition-all flex items-center gap-2 w-full sm:w-auto justify-center">
              <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm">📞</span>
              Contáctanos
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        {/* <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1">
            <div className="w-1.5 h-1.5 rounded-full bg-white animate-scroll"></div>
          </div>
        </div> */}
      </section>

      {/* Features Grid */}
      <section className="py-20 md:py-32 px-4 relative z-10 bg-slate-900 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-8 rounded-3xl bg-slate-800/50 border border-white/5 hover:border-indigo-500/30 transition-colors group">
              <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300">
                💎
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Propiedades Premium</h3>
              <p className="text-slate-400 leading-relaxed">
                Seleccionamos cuidadosamente cada propiedad para asegurar los más altos estándares de calidad y diseño.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 rounded-3xl bg-slate-800/50 border border-white/5 hover:border-pink-500/30 transition-colors group">
              <div className="w-16 h-16 rounded-2xl bg-pink-500/10 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300">
                📍
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Ubicaciones Privilegiadas</h3>
              <p className="text-slate-400 leading-relaxed">
                Encuentra tu hogar en las zonas más exclusivas y de mayor plusvalía de la ciudad.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 rounded-3xl bg-slate-800/50 border border-white/5 hover:border-purple-500/30 transition-colors group">
              <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300">
                🤝
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Trato Personalizado</h3>
              <p className="text-slate-400 leading-relaxed">
                Te acompañamos en todo el proceso de compra o renta para garantizar tu satisfacción total.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto relative rounded-[3rem] overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2671&auto=format&fit=crop" 
              alt="Interior" 
              className="w-full h-full object-cover opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 to-purple-900/90 mix-blend-multiply"></div>
          </div>
          
          <div className="relative z-10 py-24 px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">¿Listo para encontrar tu próximo hogar?</h2>
            <p className="text-xl text-indigo-200 mb-10 max-w-2xl mx-auto">
              Explora nuestro catálogo completo y descubre las mejores opciones disponibles hoy mismo.
            </p>
            <Link
              to="/catalog"
              className="inline-flex items-center justify-center px-10 py-5 rounded-full bg-white text-indigo-900 font-bold text-lg 
                       hover:bg-indigo-50 transition-all transform hover:scale-105 shadow-2xl"
            >
              Explorar Catálogo
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-white/5 py-12 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-pink-400 font-bold text-2xl">RC Real Estate</span>
          </div>
          <p className="text-slate-500 text-sm">
            © 2024 RC Real Estate. Todos los derechos reservados.
          </p>
          {/* <div className="flex gap-6">
            <a href="#" className="text-slate-400 hover:text-white transition-colors">Instagram</a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors">Facebook</a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors">Twitter</a>
          </div> */}
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
