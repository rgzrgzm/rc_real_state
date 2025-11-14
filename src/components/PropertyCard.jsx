import React from 'react'

const PropertyCard = ({ property }) => {
  const typeColor = property.type === 'Venta' ? 'bg-green-700' : 'bg-blue-700'
  const priceFormatted = `$${parseFloat(property.price).toLocaleString('es-MX')}`

  return (
    <div className="card p-4 property-card">
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-bold text-secondary">{property.name}</h3>
        <span className={`${typeColor} text-white text-xs font-semibold px-3 py-1 rounded-full`}>
          {property.type.toUpperCase()}
        </span>
      </div>
      <p className="text-sm text-gray-400 mb-2">{property.location}</p>
      <p className="text-2xl font-extrabold text-white my-1">{priceFormatted} MXN</p>
      
      <div className="flex text-sm space-x-4 mt-2 border-t border-gray-700 pt-2">
        <p title="Recámaras">🛌 {property.bedrooms} Rec.</p>
        <p title="Baños">🚽 {property.bathrooms} Baños</p>
        <p title="Estado">⭐ {property.status}</p>
      </div>
      <p className="text-xs text-gray-500 mt-2 italic">
        {property.notes || 'Sin notas adicionales.'}
      </p>
    </div>
  )
}

export default PropertyCard