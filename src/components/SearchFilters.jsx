import React from "react";

const SearchFilters = ({
  filters,
  onFilterChange,
  onSearch,
  onExport,
  properties = [],
  filteredProperties = [],
  isLogged,
}) => {
  const handleChange = (e) => {
    onFilterChange({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-pink-600 mb-4">
          <span className="text-xl">🔍</span>
        </div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-pink-500 bg-clip-text text-transparent">
          Búsqueda Inteligente
        </h2>
        <p className="text-gray-400 text-sm mt-2">
          Filtra propiedades con precisión
        </p>
      </div>

      <div className="space-y-6">
        {/* Transaction Type */}
        <div className="group">
          <label
            htmlFor="searchType"
            className="block text-sm font-semibold text-gray-300 mb-3 group-focus-within:text-indigo-400 transition-colors"
          >
            📊 Tipo de Transacción
          </label>
          <select
            id="searchType"
            name="type"
            value={filters.type}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white
                     focus:bg-white/10 focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/20 
                     transition-all duration-300 backdrop-blur-sm appearance-none"
          >
            <option value="" className="bg-gray-800">
              🌐 Cualquiera
            </option>
            <option value="Venta" className="bg-gray-800">
              🏠 Venta
            </option>
            <option value="Renta" className="bg-gray-800">
              🔑 Renta
            </option>
          </select>
        </div>

        {/* Location Search */}
        <div className="group">
          <label
            htmlFor="searchLocation"
            className="block text-sm font-semibold text-gray-300 mb-3 group-focus-within:text-purple-400 transition-colors"
          >
            📍 Ubicación/Modelo
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">🔎</span>
            </div>
            <input
              type="text"
              id="searchLocation"
              name="location"
              value={filters.location}
              onChange={handleChange}
              placeholder="Ej: Lussela, Perlino o Anáhuac"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 
                       focus:bg-white/10 focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/20 
                       transition-all duration-300 backdrop-blur-sm"
            />
          </div>
        </div>

        {/* Price Range */}
        <div className="space-y-4">
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            💰 Rango de Precio
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="group">
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
                  $
                </span>
                <input
                  type="number"
                  id="searchMinPrice"
                  name="minPrice"
                  value={filters.minPrice}
                  onChange={handleChange}
                  placeholder="0"
                  className="w-full pl-8 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 
                           focus:bg-white/10 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/20 
                           transition-all duration-300 backdrop-blur-sm"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1 text-center">Mínimo</p>
            </div>
            <div className="group">
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
                  $
                </span>
                <input
                  type="number"
                  id="searchMaxPrice"
                  name="maxPrice"
                  value={filters.maxPrice}
                  onChange={handleChange}
                  placeholder="Máx"
                  className="w-full pl-8 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 
                           focus:bg-white/10 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/20 
                           transition-all duration-300 backdrop-blur-sm"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1 text-center">Máximo</p>
            </div>
          </div>
        </div>

        {/* Bedrooms and Bathrooms */}
        <div className="space-y-4">
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            🏠 Características
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="group">
              <div className="relative">
                <input
                  type="number"
                  id="searchBedrooms"
                  name="bedrooms"
                  value={filters.bedrooms}
                  onChange={handleChange}
                  step="0.5"
                  placeholder="0"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 
                           focus:bg-white/10 focus:border-pink-500/50 focus:ring-4 focus:ring-pink-500/20 
                           transition-all duration-300 backdrop-blur-sm"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1 text-center flex items-center justify-center">
                <span className="mr-1">🛌</span> Recámaras (Mín.)
              </p>
            </div>
            <div className="group">
              <div className="relative">
                <input
                  type="number"
                  id="searchBathrooms"
                  name="bathrooms"
                  value={filters.bathrooms}
                  onChange={handleChange}
                  step="0.5"
                  placeholder="0"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 
                           focus:bg-white/10 focus:border-pink-500/50 focus:ring-4 focus:ring-pink-500/20 
                           transition-all duration-300 backdrop-blur-sm"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1 text-center flex items-center justify-center">
                <span className="mr-1">🚽</span> Baños (Mín.)
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4 pt-4">
          <button
            onClick={onSearch}
            className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 
                     hover:from-indigo-500 hover:to-purple-500 active:scale-95
                     text-white font-bold text-lg shadow-lg hover:shadow-indigo-500/25
                     transition-all duration-300 transform hover:scale-[1.02] group relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center">
              <span className="mr-2">⚡</span>
              Buscar Propiedades
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>

          {isLogged && (
            <button
              onClick={onExport}
              className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 
                     hover:from-emerald-500 hover:to-cyan-500 active:scale-95
                     text-white font-bold text-lg shadow-lg hover:shadow-emerald-500/25
                     transition-all duration-300 transform hover:scale-[1.02] group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center">
                <span className="mr-2">📊</span>
                Exportar a Excel
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          )}
        </div>

        {/* Quick Stats */}
        <div className="mt-6 pt-6 border-t border-white/10">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-3 rounded-lg bg-white/5 backdrop-blur-sm stats-card">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                {properties.length}
              </div>
              <div className="text-xs text-gray-400 mt-1">Total</div>
            </div>
            <div className="p-3 rounded-lg bg-white/5 backdrop-blur-sm stats-card">
              <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {filteredProperties.length}
              </div>
              <div className="text-xs text-gray-400 mt-1">Filtradas</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
