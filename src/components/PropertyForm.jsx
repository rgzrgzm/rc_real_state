import React, { useState } from "react";

const PropertyForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "Venta",
    location: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    status: "Disponible",
    notes: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      name: "",
      type: "Venta",
      location: "",
      price: "",
      bedrooms: "",
      bathrooms: "",
      status: "Disponible",
      notes: "",
    });
  };

  return (
    <div 
    
    // className="glass-panel rounded-2xl p-8 backdrop-blur-lg border border-white/10 shadow-2xl"
    >
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 mb-4">
          <span className="text-xl">🏠</span>
        </div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Añadir Nueva Propiedad
        </h2>
        <p className="text-gray-400 text-sm mt-2">
          Completa los detalles de la propiedad
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Property Name */}
        <div className="group">
          <label
            htmlFor="name"
            className="block text-sm font-semibold text-gray-300 mb-3 group-focus-within:text-blue-400 transition-colors"
          >
            ✨ Nombre de la Propiedad
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Ej: Modelo LUX Premium"
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 
                 focus:bg-white/10 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/20 
                 transition-all duration-300 backdrop-blur-sm"
          />
        </div>

        {/* Type and Status - Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="group">
            <label
              htmlFor="type"
              className="block text-sm font-semibold text-gray-300 mb-3 group-focus-within:text-purple-400 transition-colors"
            >
              📊 Tipo de Operación
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white
                   focus:bg-white/10 focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/20 
                   transition-all duration-300 backdrop-blur-sm appearance-none"
            >
              <option value="Venta">🏠 Venta</option>
              <option value="Renta">🔑 Renta</option>
            </select>
          </div>

          <div className="group">
            <label
              htmlFor="status"
              className="block text-sm font-semibold text-gray-300 mb-3 group-focus-within:text-pink-400 transition-colors"
            >
              📈 Estado
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white
                   focus:bg-white/10 focus:border-pink-500/50 focus:ring-4 focus:ring-pink-500/20 
                   transition-all duration-300 backdrop-blur-sm appearance-none"
            >
              <option value="Disponible">🟢 Disponible</option>
              <option value="Apartada">🟡 Apartada</option>
              <option value="Vendida">🔴 Vendida/Rentada</option>
            </select>
          </div>
        </div>

        {/* Location */}
        <div className="group">
          <label
            htmlFor="location"
            className="block text-sm font-semibold text-gray-300 mb-3 group-focus-within:text-indigo-400 transition-colors"
          >
            📍 Ubicación / Colonia
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            placeholder="Ej: Lussela, Anáhuac, Perlino"
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 
                 focus:bg-white/10 focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/20 
                 transition-all duration-300 backdrop-blur-sm"
          />
        </div>

        {/* Price */}
        <div className="group">
          <label
            htmlFor="price"
            className="block text-sm font-semibold text-gray-300 mb-3 group-focus-within:text-blue-400 transition-colors"
          >
            💰 Precio (MXN)
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              $
            </span>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              step="any"
              required
              placeholder="0.00"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 
                   focus:bg-white/10 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/20 
                   transition-all duration-300 backdrop-blur-sm"
            />
          </div>
        </div>

        {/* Bedrooms and Bathrooms */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="group">
            <label
              htmlFor="bedrooms"
              className="block text-sm font-semibold text-gray-300 mb-3 group-focus-within:text-purple-400 transition-colors"
            >
              🛌 Recámaras (Mín.)
            </label>
            <div className="relative">
              <input
                type="number"
                id="bedrooms"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
                step="0.5"
                required
                placeholder="0"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 
                     focus:bg-white/10 focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/20 
                     transition-all duration-300 backdrop-blur-sm"
              />
            </div>
          </div>

          <div className="group">
            <label
              htmlFor="bathrooms"
              className="block text-sm font-semibold text-gray-300 mb-3 group-focus-within:text-pink-400 transition-colors"
            >
              🚽 Baños (Mín.)
            </label>
            <div className="relative">
              <input
                type="number"
                id="bathrooms"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleChange}
                step="0.5"
                required
                placeholder="0"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 
                     focus:bg-white/10 focus:border-pink-500/50 focus:ring-4 focus:ring-pink-500/20 
                     transition-all duration-300 backdrop-blur-sm"
              />
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="group">
          <label
            htmlFor="notes"
            className="block text-sm font-semibold text-gray-300 mb-3 group-focus-within:text-indigo-400 transition-colors"
          >
            📝 Notas Adicionales
          </label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="4"
            placeholder="Ej: Acepta todos los créditos, A/C incluido, Estacionamiento cubierto..."
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 
                 focus:bg-white/10 focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/20 
                 transition-all duration-300 backdrop-blur-sm resize-none"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 
               hover:from-blue-500 hover:to-purple-500 active:scale-95
               disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed
               text-white font-bold text-lg shadow-lg hover:shadow-blue-500/25
               transition-all duration-300 transform hover:scale-[1.02] group relative overflow-hidden"
        >
          <span className="relative z-10 flex items-center justify-center">
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                Guardando...
              </>
            ) : (
              <>
                <span className="mr-2">🚀</span>
                Guardar Propiedad
              </>
            )}
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
      </form>
    </div>
  );
};

export default PropertyForm;
