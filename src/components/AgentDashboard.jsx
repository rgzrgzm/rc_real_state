import React, { useState } from "react";
import PropertyForm from "./PropertyForm";
import SearchFilters from "./SearchFilters";
import PropertyCard from "./PropertyCard";

const AgentDashboard = ({
  user,
  signOut,
  properties,
  filteredProperties,
  loading,
  filters,
  setFilters,
  handleSearch,
  exportToCSV,
  handleAddProperty,
  handleUpdateProperty,
  handleDeleteProperty,
  message,
  getMessageClass,
}) => {
  const [activeTab, setActiveTab] = useState("search");

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Agent Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3 sm:py-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white">
                RC Real Estate
              </h1>
              <p className="text-gray-400 text-xs sm:text-sm">
                Panel de Agentes
              </p>
            </div>
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="text-right">
                <p className="text-xs sm:text-sm text-gray-300">Bienvenido</p>
                <p className="font-medium text-sm sm:text-base">{user.email}</p>
              </div>
              <button
                onClick={signOut}
                className="bg-red-600 hover:bg-red-700 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors text-sm sm:text-base flex items-center justify-center"
              >
                {/* Icon for mobile */}
                <svg
                  className="w-4 h-4 sm:hidden"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>

                {/* Text for larger screens */}
                <span className="hidden sm:inline">Cerrar Sesión</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-4 md:p-8">
        {message.text && (
          <div
            className={`p-3 rounded-lg text-center font-semibold mb-4 transition-opacity duration-300 ${getMessageClass(
              message.type
            )}`}
          >
            {message.text}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Management Panel */}
          <div className="lg:col-span-1 space-y-8 glass-panel rounded-2xl backdrop-blur-lg border border-white/10 shadow-2xl">
            {/* Tabs */}
            <div className="flex bg-white/5 border-b border-white/10 p-3">
              <button
                className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  activeTab === "search"
                    ? "bg-gradient-to-r from-indigo-500 to-pink-500 text-white shadow-lg"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
                onClick={() => setActiveTab("search")}
              >
                <div className="flex items-center justify-center gap-2">
                  <span className="text-lg">🔍</span>
                  <span className="hidden sm:inline">Búsqueda</span>
                </div>
              </button>

              <button
                className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  activeTab === "add"
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
                onClick={() => setActiveTab("add")}
              >
                <div className="flex items-center justify-center gap-2">
                  <span className="text-lg">➕</span>
                  <span className="hidden sm:inline">Añadir</span>
                </div>
              </button>
            </div>

            <div className="p-6">
              {activeTab === "add" ? (
                <div className="animate-fade-in">
                  <PropertyForm
                    onSubmit={handleAddProperty}
                    loading={loading}
                  />
                </div>
              ) : (
                <div className="animate-fade-in">
                  <SearchFilters
                    filters={filters}
                    onFilterChange={setFilters}
                    onSearch={handleSearch}
                    onExport={exportToCSV}
                    properties={properties}
                    filteredProperties={filteredProperties}
                    isLogged={user.id}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Properties List */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold mb-4 border-b border-gray-700 pb-2 text-white">
              📄 Mis Propiedades ({filteredProperties.length})
            </h2>
            <div className="space-y-4">
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                  <p className="mt-2 text-gray-400">Cargando propiedades...</p>
                </div>
              ) : filteredProperties.length === 0 ? (
                <p className="text-center py-4 text-gray-400">
                  {properties.length === 0
                    ? "No hay propiedades guardadas."
                    : "No se encontraron propiedades que coincidan con los filtros."}
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
                    {
                        filteredProperties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    user={user}
                    onUpdate={handleUpdateProperty}
                    onDelete={handleDeleteProperty}
                  />
                ))
                    }
                </div>
                
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDashboard;
