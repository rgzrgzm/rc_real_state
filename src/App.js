import React, { useState, useEffect } from "react";
import PropertyForm from "./components/PropertyForm";
import SearchFilters from "./components/SearchFilters";
import PropertyCard from "./components/PropertyCard";
import { supabase } from './hooks/useSupabase';  // Add this import
import Login from "./components/Login";
import { useAuth } from "./hooks/useAuth";

function App() {
  const { user, loading: authLoading, signOut } = useAuth();  // Use useAuth instead
  
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [activeTab, setActiveTab] = useState("search");
  const [filters, setFilters] = useState({
    type: "",
    location: "",
    minPrice: "",
    maxPrice: "",
    bedrooms: "",
    bathrooms: "",
  });

  // Remove the testSupabaseConnection and anonymous sign-in

  // Fetch properties when user is authenticated
  useEffect(() => {
    if (user) {
      fetchProperties();
    }
  }, [user]);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setProperties(data || []);
      setFilteredProperties(data || []);
    } catch (error) {
      console.error("Error fetching properties:", error);
      showMessage("Error al cargar propiedades", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleAddProperty = async (propertyData) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("properties")
        .insert([
          {
            ...propertyData,
            price: parseFloat(propertyData.price),
            bedrooms: parseFloat(propertyData.bedrooms),
            bathrooms: parseFloat(propertyData.bathrooms),
            user_id: user.id,  // Now using real user ID
            created_at: new Date().toISOString(),
          },
        ])
        .select();

      if (error) throw error;

      showMessage("¡Propiedad guardada exitosamente!", "success");
      fetchProperties();
    } catch (error) {
      console.error("Error adding property:", error);
      showMessage(`Error al guardar: ${error.message}`, "error");
    } finally {
      setLoading(false);
    }
  };

  // Keep all your existing functions (handleSearch, exportToCSV, etc.)
  const handleSearch = () => {
    let filtered = properties;

    if (filters.type) {
      filtered = filtered.filter((property) => property.type === filters.type);
    }

    if (filters.location) {
      filtered = filtered.filter((property) =>
        property.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.minPrice) {
      filtered = filtered.filter(
        (property) => property.price >= parseFloat(filters.minPrice)
      );
    }

    if (filters.maxPrice) {
      filtered = filtered.filter(
        (property) => property.price <= parseFloat(filters.maxPrice)
      );
    }

    if (filters.bedrooms) {
      filtered = filtered.filter(
        (property) => property.bedrooms >= parseFloat(filters.bedrooms)
      );
    }

    if (filters.bathrooms) {
      filtered = filtered.filter(
        (property) => property.bathrooms >= parseFloat(filters.bathrooms)
      );
    }

    setFilteredProperties(filtered);
    showMessage(
      `Búsqueda completada: ${filtered.length} resultados encontrados.`,
      "info"
    );
  };

  const exportToCSV = () => {
    if (properties.length === 0) {
      showMessage("No hay propiedades para exportar.", "error");
      return;
    }

    const headers = [
      "ID", "Nombre", "Tipo", "Ubicacion", "Precio", "Recamaras", "Banos", "Estado", "Notas", "FechaCreacion",
    ];

    const csvRows = properties.map((property) =>
      [
        `"${property.id}"`,
        `"${property.name}"`,
        `"${property.type}"`,
        `"${property.location}"`,
        property.price,
        property.bedrooms,
        property.bathrooms,
        `"${property.status}"`,
        `"${(property.notes || "").replace(/"/g, '""')}"`,
        `"${new Date(property.created_at).toLocaleDateString("es-MX")}"`,
      ].join(",")
    );

    const csvContent = [headers.join(","), ...csvRows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "Catalogo_RCRealEstate.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showMessage("¡Catálogo exportado! Revisa tus descargas.", "success");
  };

  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "" }), 4000);
  };

  const getMessageClass = (type) => {
    switch (type) {
      case "success": return "bg-green-600";
      case "error": return "bg-red-600";
      case "info": return "bg-blue-600";
      default: return "bg-gray-700";
    }
  };

  // Add authentication check at the top
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    // You'll need to create and import the Login component
    return <Login />;
  }
  console.log('USER', user)
  // Your existing UI but with auth header
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Auth Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-white">RC Real Estate</h1>
              <p className="text-gray-400 text-sm">Property Management System</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-300">Welcome back</p>
                <p className="font-medium">{user.email}</p>
              </div>
              <button
                onClick={signOut}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Your existing property management UI */}
      <div className="p-4 md:p-8">
        {message.text && (
          <div className={`p-3 rounded-lg text-center font-semibold mb-4 transition-opacity duration-300 ${getMessageClass(message.type)}`}>
            {message.text}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-8 glass-panel rounded-2xl backdrop-blur-lg border border-white/10 shadow-2xl">
            {/* Your existing tabs */}
            <div className="flex bg-white/5 border-b border-white/10 p-3">
              <button
                className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  activeTab === "search"
                    ? "bg-gradient-to-r from-indigo-500 to-pink-500 text-white shadow-lg"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
                onClick={() => setActiveTab("search")}
                title="Búsqueda Inteligente"
              >
                <div className="flex items-center justify-center gap-2">
                  <span className="text-lg">🔍</span>
                  <span className="hidden sm:inline">Búsqueda</span>
                  <span className="sm:hidden">Buscar</span>
                </div>
              </button>
             
              <button
                className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  activeTab === "add"
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
                onClick={() => setActiveTab("add")}
                title="Añadir Nueva Propiedad"
              >
                <div className="flex items-center justify-center gap-2">
                  <span className="text-lg">➕</span>
                  <span className="hidden sm:inline">Añadir Propiedad</span>
                  <span className="sm:hidden">Añadir</span>
                </div>
              </button>
            </div>

            <div className="p-8 sm:p-6">
              {activeTab === "add" && (
                <div className="animate-fade-in">
                  <PropertyForm onSubmit={handleAddProperty} loading={loading} />
                </div>
              )}
              {activeTab === "search" && (
                <div className="animate-fade-in">
                  <SearchFilters
                    filters={filters}
                    onFilterChange={setFilters}
                    onSearch={handleSearch}
                    onExport={exportToCSV}
                    properties={properties}
                    filteredProperties={filteredProperties}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Remove display: "none" to show properties */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold mb-4 border-b border-gray-700 pb-2 text-white-400">
              📄 Catálogo de Propiedades ({filteredProperties.length})
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
                filteredProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;