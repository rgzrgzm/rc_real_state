import React, { useState } from "react";

const PropertyCard = ({ property, user, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: property.name,
    type: property.type,
    location: property.location,
    price: property.price,
    bedrooms: property.bedrooms,
    bathrooms: property.bathrooms,
    status: property.status,
    notes: property.notes || "",
  });
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const typeColor = property.type === "Venta" ? "bg-green-700" : "bg-blue-700";
  const priceFormatted = `$${parseFloat(property.price).toLocaleString(
    "es-MX"
  )}`;

  const handleEditClick = () => {
    if (user.id === property.user_id) {
      setIsEditing(true);
      setEditData({
        name: property.name,
        type: property.type,
        location: property.location,
        price: property.price,
        bedrooms: property.bedrooms,
        bathrooms: property.bathrooms,
        status: property.status,
        notes: property.notes || "",
      });
      // If property has existing images, you could load them here
      setImages([]);
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    // Validate file types
    const validFiles = files.filter(
      (file) => file.type.startsWith("image/") && file.size <= 5 * 1024 * 1024 // 5MB limit
    );

    if (validFiles.length !== files.length) {
      alert(
        "Algunos archivos no son válidos. Solo se permiten imágenes menores a 5MB."
      );
    }

    // Create preview URLs
    const newImages = validFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(2) + " MB",
    }));

    setImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (index) => {
    URL.revokeObjectURL(images[index].preview);
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const updateData = {
        ...editData,
        images: images.map((img) => ({
          name: img.file.name,
          size: img.file.size,
          type: img.file.type,
          // In real app: upload files and store URLs
        })),
      };

      await onUpdate(property.id, updateData);
      setIsEditing(false);

      // Clean up image previews
      images.forEach((img) => URL.revokeObjectURL(img.preview));
      setImages([]);
    } catch (error) {
      console.error("Error updating property:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({
      name: property.name,
      type: property.type,
      location: property.location,
      price: property.price,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      status: property.status,
      notes: property.notes || "",
    });

    // Clean up image previews
    images.forEach((img) => URL.revokeObjectURL(img.preview));
    setImages([]);
  };

  const handleChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDelete = async () => {
    if (
      window.confirm("¿Estás seguro de que quieres eliminar esta propiedad?")
    ) {
      setLoading(true);
      try {
        await onDelete(property.id);
      } catch (error) {
        console.error("Error deleting property:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  if (isEditing) {
    return (
      <div className="card p-4 property-card border-2 border-blue-500/50">
        {/* Edit Form */}
        <div className="space-y-4">
          {/* Property Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              ✨ Nombre de la Propiedad
            </label>
            <input
              type="text"
              name="name"
              value={editData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:bg-white/10 focus:border-blue-500/50"
              placeholder="Ej: Modelo LUX Premium"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              📸 Agregar Imágenes
            </label>

            {/* File Input */}
            <div className="border-2 border-dashed border-white/20 rounded-xl p-4 text-center hover:border-green-400/50 transition-colors duration-300">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id={`edit-images-${property.id}`}
              />
              <label
                htmlFor={`edit-images-${property.id}`}
                className="cursor-pointer block"
              >
                <div className="text-2xl mb-1">📁</div>
                <p className="text-gray-300 text-sm">
                  Haz clic para agregar imágenes
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  PNG, JPG, WEBP hasta 5MB
                </p>
                <p className="text-green-400 text-xs mt-1">
                  {images.length}{" "}
                  {images.length === 1
                    ? "imagen seleccionada"
                    : "imágenes seleccionadas"}
                </p>
              </label>
            </div>

            {/* Image Previews */}
            {images.length > 0 && (
              <div className="mt-3">
                <h4 className="text-sm font-semibold text-gray-300 mb-2">
                  Nuevas imágenes:
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {images.map((image, index) => (
                    <div key={index} className="relative group/image">
                      <img
                        src={image.preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-16 object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="bg-red-500 hover:bg-red-600 text-white p-1 rounded-full transition-colors"
                        >
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Type and Status */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                📊 Tipo
              </label>
              <select
                name="type"
                value={editData.type}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
              >
                <option value="Venta">Venta</option>
                <option value="Renta">Renta</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                📈 Estado
              </label>
              <select
                name="status"
                value={editData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
              >
                <option value="Disponible">Disponible</option>
                <option value="Apartada">Apartada</option>
                <option value="Vendida">Vendida</option>
              </select>
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              📍 Ubicación
            </label>
            <input
              type="text"
              name="location"
              value={editData.location}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
              placeholder="Ej: Lussela, Anáhuac"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              💰 Precio (MXN)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
                $
              </span>
              <input
                type="number"
                name="price"
                value={editData.price}
                onChange={handleChange}
                className="w-full pl-8 pr-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
              />
            </div>
          </div>

          {/* Bedrooms and Bathrooms */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                🛌 Recámaras
              </label>
              <input
                type="number"
                name="bedrooms"
                step="0.5"
                value={editData.bedrooms}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                🚽 Baños
              </label>
              <input
                type="number"
                name="bathrooms"
                step="0.5"
                value={editData.bathrooms}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              📝 Notas
            </label>
            <textarea
              name="notes"
              value={editData.notes}
              onChange={handleChange}
              rows="2"
              className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white resize-none"
              placeholder="Notas adicionales..."
            />
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-2">
            <button
              onClick={handleSave}
              disabled={loading}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg disabled:opacity-50 transition-colors"
            >
              {loading ? "Guardando..." : "Guardar"}
            </button>
            <button
              onClick={handleCancel}
              disabled={loading}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg disabled:opacity-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleDelete}
              disabled={loading}
              className="px-4 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg disabled:opacity-50 transition-colors"
              title="Eliminar propiedad"
            >
              🗑️
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Normal View (Read-only)
  return (
    <div
      className={`card p-4 property-card transition-all duration-300 ${
        user?.id === property.user_id
          ? "cursor-pointer hover:border-blue-500/50 hover:scale-[1.02]"
          : ""
      }`}
      onClick={user?.id === property.user_id ? handleEditClick : undefined}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-secondary">{property.name}</h3>
          <p className="text-sm text-gray-400 mb-2">{property.location}</p>
        </div>
        <div className="flex items-center space-x-2">
          {user?.id === property.user_id && (
            <span className="text-xs text-blue-400 bg-blue-400/20 px-2 py-1 rounded-full">
              Tu propiedad
            </span>
          )}
          <span
            className={`${typeColor} text-white text-xs font-semibold px-3 py-1 rounded-full`}
          >
            {property.type.toUpperCase()}
          </span>
        </div>
      </div>

      <p className="text-2xl font-extrabold text-white my-1">
        {priceFormatted} MXN
      </p>

      <div className="flex text-sm space-x-4 mt-2 border-t border-gray-700 pt-2">
        <p title="Recámaras">🛌 {property.bedrooms} Rec.</p>
        <p title="Baños">🚽 {property.bathrooms} Baños</p>
        <p title="Estado">⭐ {property.status}</p>
      </div>

      <p className="text-xs text-gray-500 mt-2 italic">
        {property.notes || "Sin notas adicionales."}
      </p>

      {/* IMAGES DISPLAY - ADD THIS SECTION */}
      {property.images && property.images.length > 0 && (
        <div className="mt-3">
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {property.images.slice(0, 3).map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={`Imagen ${index + 1} de ${property.name}`}
                className="w-16 h-16 object-cover rounded-lg border border-gray-600"
              />
            ))}
            {property.images.length > 3 && (
              <div className="w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center text-xs text-gray-400">
                +{property.images.length - 3}
              </div>
            )}
          </div>
        </div>
      )}

      {user?.id === property.user_id && (
        <div className="mt-3 pt-3 border-t border-gray-700">
          <p className="text-xs text-blue-400 text-center">
            👆 Haz clic para editar
          </p>
        </div>
      )}
    </div>
  );
};

export default PropertyCard;
