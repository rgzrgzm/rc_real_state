import React, { useState } from 'react';

const PropertyCardPublic = ({ property }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const typeColor = property.type === 'Venta' ? 'bg-green-700' : 'bg-blue-700';
  const statusColor = {
    'Disponible': 'bg-green-500',
    'Apartada': 'bg-yellow-500',
    'Vendida': 'bg-red-500'
  }[property.status] || 'bg-gray-500';
  
  const priceFormatted = `$${parseFloat(property.price).toLocaleString('es-MX')}`;

  // Mock images for demonstration - replace with actual property.images
  const propertyImages = property.images && property.images.length > 0 
    ? property.images 
    : [
        { url: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=300&fit=crop' },
        { url: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=300&fit=crop' },
        { url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop' }
      ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % propertyImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + propertyImages.length) % propertyImages.length);
  };

  return (
    <div className="card property-card max-h-[600px] overflow-auto flex flex-col transition-all duration-300 hover:scale-[1.02]">
      {/* Image Gallery Section */}
      <div className="relative">
        {/* Main Image */}
        <div className="aspect-video bg-gray-800 relative overflow-hidden">
          <img
            src={propertyImages[currentImageIndex].url}
            alt={property.name}
            className="w-full h-full object-cover transition-opacity duration-300"
          />
          
          {/* Image Navigation */}
          {propertyImages.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
              >
                ‹
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
              >
                ›
              </button>
            </>
          )}

          {/* Image Counter */}
          {propertyImages.length > 1 && (
            <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
              {currentImageIndex + 1} / {propertyImages.length}
            </div>
          )}

          {/* Status Badge */}
          <div className={`absolute top-3 left-3 ${statusColor} text-white text-xs font-semibold px-2 py-1 rounded-full`}>
            {property.status}
          </div>

          {/* Type Badge */}
          <div className={`absolute top-3 right-3 ${typeColor} text-white text-xs font-semibold px-2 py-1 rounded-full`}>
            {property.type}
          </div>
        </div>

        {/* Thumbnail Strip */}
        {propertyImages.length > 0 && (
          <div className="flex space-x-1 p-2 bg-gray-800/50 overflow-x-auto">
            {propertyImages.map((image, index) => (
              <button
                key={index}
                onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(index); }}
                className={`flex-shrink-0 w-12 h-12 rounded border-2 transition-all ${
                  index === currentImageIndex ? 'border-blue-500' : 'border-transparent'
                }`}
              >
                <img
                  src={image.url}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover rounded"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Property Details Section */}
      <div className="p-4">
        {/* Header */}
        <div className="flex justify-between items-start mb-2">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-1">{property.name}</h3>
            <div className="flex items-center text-gray-400 text-sm">
              <span className="mr-2">📍</span>
              <span>{property.location}</span>
            </div>
          </div>
        </div>

        {/* Price */}
        <div className="mb-3">
          <p className="text-2xl font-extrabold text-white">{priceFormatted} MXN</p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="text-center p-2 bg-white/5 rounded-lg">
            <div className="text-lg">🛌</div>
            <div className="text-sm text-white font-semibold">{property.bedrooms}</div>
            <div className="text-xs text-gray-400">Recámaras</div>
          </div>
          <div className="text-center p-2 bg-white/5 rounded-lg">
            <div className="text-lg">🚽</div>
            <div className="text-sm text-white font-semibold">{property.bathrooms}</div>
            <div className="text-xs text-gray-400">Baños</div>
          </div>
          <div className="text-center p-2 bg-white/5 rounded-lg">
            <div className="text-lg">⭐</div>
            <div className="text-sm text-white font-semibold">{property.status}</div>
            <div className="text-xs text-gray-400">Estado</div>
          </div>
        </div>

        {/* Notes */}
        {property.notes && (
          <div className="mt-3 pt-3 border-t border-gray-700">
            <p className="text-sm text-gray-300 italic">"{property.notes}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyCardPublic;