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
    <div className="min-h-screen bg-gray-900">
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 sm:py-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white">
                RC Real Estate
              </h1>
              <p className="text-gray-400 text-xs sm:text-sm">
                Catálogo de Propiedades
              </p>
            </div>
            <a
              href="/login"
              className="flex items-center justify-center gap-2 sm:gap-3 bg-white/10 backdrop-blur-md border border-white/20 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-xl font-medium transition-all duration-300 hover:bg-white/20 hover:border-white/30 shadow-lg hover:shadow-xl text-sm sm:text-base"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
                fill="none"
                stroke="#1D9BF0"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              <span>Acceso Agentes</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Search Panel */}
          <div className="lg:col-span-1 space-y-8 glass-panel rounded-2xl backdrop-blur-lg border border-white/10 shadow-2xl">
            <div className="p-6">
              <SearchFilters
                filters={filters}
                onFilterChange={setFilters}
                onSearch={handleSearch}
                onExport={exportToCSV}
                properties={properties}
                filteredProperties={filteredProperties}
              />
            </div>
          </div>

          {/* Properties List */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold border-b border-gray-700 pb-2 text-white w-full">
                📄 Propiedades Disponibles ({filteredProperties.length})
              </h2>
            </div>

            <div className="space-y-4 ">
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                  <p className="mt-2 text-gray-400">Cargando propiedades...</p>
                </div>
              ) : filteredProperties.length === 0 ? (
                <p className="text-center py-4 text-gray-400">
                  {properties.length === 0
                    ? "No hay propiedades disponibles en este momento."
                    : "No se encontraron propiedades que coincidan con los filtros."}
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6 max-h-[1000px] overflow-auto pr-[10px]">
                  {filteredProperties.map((property) => (
                    <PropertyCardPublic
                      key={property.id}
                      property={property}
                      user={null} // No user for public view
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
