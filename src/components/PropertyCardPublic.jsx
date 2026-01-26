import React, { useState } from 'react';

const PropertyCardPublic = ({ property }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const typeConfig = property.type === 'Venta' 
    ? { color: 'bg-emerald-500', icon: '🏠' } 
    : { color: 'bg-indigo-500', icon: '🔑' };
    
  const statusConfig = {
    'Disponible': { color: 'bg-emerald-500', text: 'Disponible' },
    'Apartada': { color: 'bg-amber-500', text: 'Apartada' },
    'Vendida': { color: 'bg-rose-500', text: 'Vendida' }
  }[property.status] || { color: 'bg-slate-500', text: property.status };
  
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
    <div 
      className="group relative bg-slate-800 rounded-2xl overflow-hidden border border-white/5 shadow-xl transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Gallery Section */}
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-900">
        <div 
          className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
          style={{
            backgroundImage: `url(${propertyImages[currentImageIndex].url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
        </div>
          
        {/* Navigation Arrows - Only visible on hover */}
        {propertyImages.length > 1 && (
          <div className={`absolute inset-0 flex items-center justify-between px-2 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="p-2 rounded-full bg-black/50 text-white backdrop-blur-sm hover:bg-black/70 transition-colors transform hover:scale-110"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="p-2 rounded-full bg-black/50 text-white backdrop-blur-sm hover:bg-black/70 transition-colors transform hover:scale-110"
            >
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}

        {/* Image Dots */}
        {propertyImages.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-1.5">
            {propertyImages.map((_, idx) => (
              <div 
                key={idx}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentImageIndex ? 'bg-white w-3' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}

        {/* Status Badge */}
        <div className="absolute top-3 left-3 flex gap-2">
          <div className={`${statusConfig.color} text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg backdrop-blur-sm bg-opacity-90`}>
            {statusConfig.text}
          </div>
        </div>

        {/* Type Badge */}
        <div className={`absolute top-3 right-3 ${typeConfig.color} text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg backdrop-blur-sm bg-opacity-90 flex items-center gap-1`}>
          <span>{typeConfig.icon}</span>
          {property.type}
        </div>
      </div>

      {/* Property Details Section */}
      <div className="p-5">
        <div className="mb-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-xl font-bold text-white mb-1 leading-tight group-hover:text-indigo-400 transition-colors">
                {property.name}
              </h3>
              <div className="flex items-center text-slate-400 text-sm">
                <svg className="w-4 h-4 mr-1 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {property.location}
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                {priceFormatted}
              </p>
              <p className="text-xs text-slate-500">MXN</p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-slate-700/30 rounded-xl p-2.5 text-center border border-white/5">
            <span className="text-lg block mb-1">🛏️</span>
            <div className="font-bold text-white text-sm">{property.bedrooms}</div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wide">Recámaras</div>
          </div>
          <div className="bg-slate-700/30 rounded-xl p-2.5 text-center border border-white/5">
            <span className="text-lg block mb-1">🚿</span>
            <div className="font-bold text-white text-sm">{property.bathrooms}</div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wide">Baños</div>
          </div>
          <div className="bg-slate-700/30 rounded-xl p-2.5 text-center border border-white/5">
            <span className="text-lg block mb-1">📏</span>
            <div className="font-bold text-white text-sm">--</div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wide">m²</div>
          </div>
        </div>

        {/* Filtered-out Thumbnails Strip for clean look, but keep functionality if needed later */}
        
        {/* Footer/Action */}
        <div className="pt-4 border-t border-white/5 flex justify-between items-center">
          <button className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1">
            Ver detalles
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
          <span className="text-xs text-slate-500">
            {new Date(property.created_at).toLocaleDateString('es-MX', { month: 'short', day: 'numeric' })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PropertyCardPublic;
