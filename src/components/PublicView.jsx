import SearchFilters from "./SearchFilters";
import PropertyCardPublic from "./PropertyCardPublic";

const PublicView = ({
  properties,
  filteredProperties,
  loading,
  filters,
  setFilters,
  handleSearch,
  exportToCSV,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-[100px] translate-y-1/2"></div>
      </div>

      <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-white/5 shadow-lg shadow-indigo-500/5 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex justify-between items-center py-3 md:py-4">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 shrink-0">
                <span className="text-sm md:text-xl font-bold text-white">RC</span>
              </div>
              <div className="flex flex-col">
                <h1 className="text-lg md:text-xl font-bold text-white tracking-tight whitespace-nowrap">
                  RC Real Estate
                </h1>
                <p className="hidden md:block text-slate-400 text-xs font-medium uppercase tracking-wider">
                  Catálogo Premium
                </p>
              </div>
            </div>
            <a
              href="/login"
              className="flex items-center justify-center gap-2 px-3 py-2 md:px-5 md:py-2.5 rounded-xl bg-white/5 border border-white/10 
                       text-white font-medium transition-all duration-300 hover:bg-white/10 hover:border-indigo-500/30 
                       hover:shadow-lg hover:shadow-indigo-500/10 group whitespace-nowrap"
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
              <span className="text-xs md:text-sm">Acceso Agentes</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 p-4 md:p-8 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar Search Panel */}
          <div className="lg:col-span-4 xl:col-span-3">
            <div className="sticky top-24">
              <div className="glass-panel rounded-2xl p-6 shadow-2xl backdrop-blur-xl border border-white/10 max-h-[calc(100vh-8rem)] overflow-y-auto custom-scrollbar">
                <SearchFilters
                  filters={filters}
                  onFilterChange={setFilters}
                  onSearch={handleSearch}
                  onExport={exportToCSV}
                  properties={properties}
                  filteredProperties={filteredProperties}
                />
              </div>
              
              {/* Footer Links */}
              <div className="mt-8 text-center">
                <p className="text-slate-500 text-sm">
                  © 2024 RC Real Estate. <br />Todos los derechos reservados.
                </p>
              </div>
            </div>
          </div>

          {/* Properties Grid */}
          <div className="lg:col-span-8 xl:col-span-9">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 bg-slate-800/30 p-4 rounded-2xl border border-white/5 backdrop-blur-sm">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-2xl">🏡</span>
                Propiedades Disponibles 
                <span className="px-3 py-1 bg-indigo-500/20 text-indigo-400 text-sm rounded-full">
                  {filteredProperties.length}
                </span>
              </h2>
              
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <span>Ordenar por:</span>
                <select className="bg-slate-800 border-none text-white rounded-lg px-3 py-1 focus:ring-2 focus:ring-indigo-500 cursor-pointer">
                  <option>Más recientes</option>
                  <option>Menor Precio</option>
                  <option>Mayor Precio</option>
                </select>
              </div>
            </div>

            <div className="min-h-[500px]">
              {loading ? (
                <div className="flex flex-col items-center justify-center h-64 space-y-4">
                  <div className="relative w-16 h-16">
                    <div className="absolute inset-0 border-4 border-indigo-500/30 rounded-full animate-pulse"></div>
                    <div className="absolute inset-0 border-4 border-t-indigo-500 rounded-full animate-spin"></div>
                  </div>
                  <p className="text-slate-400 animate-pulse">Buscando las mejores opciones...</p>
                </div>
              ) : filteredProperties.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-96 bg-slate-800/30 rounded-3xl border border-dashed border-white/10 p-8 text-center">
                  <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center mb-4">
                    <span className="text-4xl opacity-50">🔍</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">No se encontraron resultados</h3>
                  <p className="text-slate-400 max-w-md mx-auto">
                    {properties.length === 0
                      ? "Aún no hay propiedades registradas en el sistema."
                      : "Intenta ajustar tus filtros de búsqueda para encontrar lo que necesitas."}
                  </p>
                  <button 
                    onClick={() => setFilters({ type: "", location: "", minPrice: "", maxPrice: "", bedrooms: "", bathrooms: "" })}
                    className="mt-6 px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors border border-white/10"
                  >
                    Borrar filtros
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-6 animate-fade-in">
                  {filteredProperties.map((property) => (
                    <PropertyCardPublic
                      key={property.id}
                      property={property}
                      user={null}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicView;
