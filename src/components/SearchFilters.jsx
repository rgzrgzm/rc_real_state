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
    <div className="animate-fade-in">
      <div className="text-center mb-8 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-indigo-500/20 blur-[50px] rounded-full pointer-events-none"></div>
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-pink-600 mb-4 shadow-lg shadow-indigo-500/30 animate-float">
          <span className="text-2xl">🔍</span>
        </div>
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
          Encuentra tu Hogar Ideal
        </h2>
        <p className="text-slate-400 mt-2 font-medium">
          Explora nuestras propiedades exclusivas
        </p>
      </div>

      <div className="space-y-6">
        {/* Transaction Type */}
        <div className="group">
          <label
            htmlFor="searchType"
            className="block text-sm font-semibold text-slate-300 mb-2 group-focus-within:text-indigo-400 transition-colors"
          >
            Tipo de Transacción
          </label>
          <div className="relative">
            <select
              id="searchType"
              name="type"
              value={filters.type}
              onChange={handleChange}
              className="w-full px-4 py-3.5 rounded-xl glass-input text-white focus:outline-none appearance-none cursor-pointer"
            >
              <option value="" className="bg-slate-900 text-slate-400">
                Seleccionar tipo...
              </option>
              <option value="Venta" className="bg-slate-900">
                🏠 Venta
              </option>
              <option value="Renta" className="bg-slate-900">
                🔑 Renta
              </option>
            </select>
          </div>
        </div>

        {/* Location Search */}
        <div className="group">
          <label
            htmlFor="searchLocation"
            className="block text-sm font-semibold text-slate-300 mb-2 group-focus-within:text-pink-400 transition-colors"
          >
            Ubicación o Modelo
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <input
              type="text"
              id="searchLocation"
              name="location"
              value={filters.location}
              onChange={handleChange}
              placeholder="Ej: Lussela, Perlino o Anáhuac"
              className="w-full pl-11 pr-4 py-3.5 rounded-xl glass-input placeholder-slate-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Price Range */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-300">
            Rango de Precio
          </label>
          <div className="grid grid-cols-2 gap-4">
            <div className="group">
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">
                  $
                </span>
                <input
                  type="number"
                  name="minPrice"
                  value={filters.minPrice}
                  onChange={handleChange}
                  placeholder="Mínimo"
                  className="w-full pl-8 pr-4 py-3.5 rounded-xl glass-input placeholder-slate-500 focus:outline-none"
                />
              </div>
            </div>
            <div className="group">
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">
                  $
                </span>
                <input
                  type="number"
                  name="maxPrice"
                  value={filters.maxPrice}
                  onChange={handleChange}
                  placeholder="Máximo"
                  className="w-full pl-8 pr-4 py-3.5 rounded-xl glass-input placeholder-slate-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bedrooms and Bathrooms */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-300">
            Características (Mínimo)
          </label>
          <div className="grid grid-cols-2 gap-4">
            <div className="group">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <span className="text-lg">🛏️</span>
                </div>
                <input
                  type="number"
                  name="bedrooms"
                  value={filters.bedrooms}
                  onChange={handleChange}
                  placeholder="Recámaras"
                  className="w-full pl-10 pr-4 py-3.5 rounded-xl glass-input placeholder-slate-500 focus:outline-none"
                />
              </div>
            </div>
            <div className="group">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <span className="text-lg">�</span>
                </div>
                <input
                  type="number"
                  name="bathrooms"
                  value={filters.bathrooms}
                  onChange={handleChange}
                  placeholder="Baños"
                  className="w-full pl-10 pr-4 py-3.5 rounded-xl glass-input placeholder-slate-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-6">
          <button
            onClick={onSearch}
            className="w-full py-4 px-6 rounded-xl btn-gradient-primary text-white font-bold text-lg 
                     shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transform hover:-translate-y-0.5 active:translate-y-0 
                     transition-all duration-200 flex items-center justify-center gap-2 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <span className="relative">Buscar Propiedades</span>
            <svg className="w-5 h-5 relative group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>

          {isLogged && (
            <button
              onClick={onExport}
              className="w-full py-3.5 px-6 rounded-xl bg-slate-800 border border-slate-700 hover:bg-slate-700 
                       text-slate-300 font-semibold shadow-lg hover:text-white transition-all duration-200 
                       flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Exportar a Excel
            </button>
          )}
        </div>

        {/* Quick Stats */}
        <div className="border-t border-white/10 pt-6">
          <div className="grid grid-cols-2 gap-3">
            <div className="relative group p-4 rounded-2xl bg-slate-800/50 border border-white/5 hover:bg-slate-800 transition-colors cursor-default">
              <div className="text-3xl font-bold text-white mb-1 group-hover:scale-110 transition-transform origin-left">
                {properties.length}
              </div>
              <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">Total</div>
              <div className="absolute right-3 top-3 w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                📁
              </div>
            </div>
            <div className="relative group p-4 rounded-2xl bg-slate-800/50 border border-white/5 hover:bg-slate-800 transition-colors cursor-default">
              <div className="text-3xl font-bold text-pink-500 mb-1 group-hover:scale-110 transition-transform origin-left">
                {filteredProperties.length}
              </div>
              <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">Resultados</div>
              <div className="absolute right-3 top-3 w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-400">
                🎯
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
