import React, { useState, useEffect } from "react";
import { supabase } from "./hooks/useSupabase"; // Add this import
import Login from "./components/Login";
import { useAuth } from "./hooks/useAuth";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import PublicView from "./components/PublicView";
import AgentDashboard from "./components/AgentDashboard";

function App() {
  const { user, loading: authLoading, signOut } = useAuth(); // Use useAuth instead

  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [filters, setFilters] = useState({
    type: "",
    location: "",
    minPrice: "",
    maxPrice: "",
    bedrooms: "",
    bathrooms: "",
  });

  // Fetch properties when user is authenticated
  useEffect(() => {
    fetchProperties();
  }, []);

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

  // Image upload utility functions
  const uploadPropertyImages = async (propertyId, images, userId) => {
    try {

      const uploadedImages = [];

      for (const imageData of images) {
        try {
          const imageUrl = await uploadSingleImage(
            propertyId,
            imageData.file,
            userId
          );
          uploadedImages.push({
            url: imageUrl,
            name: imageData.file.name,
            size: imageData.file.size,
            type: imageData.file.type,
          });
        } catch (error) {
          console.error("Failed to upload image:", imageData.file.name, error);
          // Continue with other images even if one fails
        }
      }

      return uploadedImages;
    } catch (error) {
      console.error("Error in uploadPropertyImages:", error);
      throw error;
    }
  };

  const uploadSingleImage = async (propertyId, imageFile, userId) => {
    // Create unique file name to avoid conflicts
    const fileExt = imageFile.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(2)}.${fileExt}`;
    const filePath = `${userId}/${propertyId}/${fileName}`;


    const { data, error } = await supabase.storage
      .from("images")
      .upload(filePath, imageFile, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("Error uploading image:", error);
      throw error;
    }

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from("images").getPublicUrl(filePath);

    return publicUrl;
  };

  const deletePropertyImages = async (propertyId, userId) => {
    try {
      // List all files in the property folder
      const { data: files, error } = await supabase.storage
        .from("images")
        .list(`${userId}/${propertyId}`);

      if (error) {
        console.error("Error listing files:", error);
        return;
      }

      if (files && files.length > 0) {
        // Delete all files
        const filePaths = files.map(
          (file) => `${userId}/${propertyId}/${file.name}`
        );

        const { error: deleteError } = await supabase.storage
          .from("images")
          .remove(filePaths);

        if (deleteError) {
          console.error("Error deleting files:", deleteError);
        } else {
          console.log("✅ Successfully deleted images");
        }
      }
    } catch (error) {
      console.error("Error in deletePropertyImages:", error);
    }
  };

  const handleAddProperty = async (propertyData) => {
    try {
      setLoading(true);

      // Extract images from propertyData
      const { images, ...propertyInfo } = propertyData;

      const { data, error } = await supabase
        .from("properties")
        .insert([
          {
            ...propertyData,
            price: parseFloat(propertyData.price),
            bedrooms: parseFloat(propertyData.bedrooms),
            bathrooms: parseFloat(propertyData.bathrooms),
            user_id: user.id, // Now using real user ID
            created_at: new Date().toISOString(),
            images: [],
          },
        ])
        .select();

      if (error) throw error;

      const newPropertyId = data[0].id;
      let uploadedImages = [];

      if (images && images.length > 0) {
        uploadedImages = await uploadPropertyImages(
          newPropertyId,
          images,
          user.id
        );

        // Update property with image URLs
        const { error: updateError } = await supabase
          .from("properties")
          .update({ images: uploadedImages })
          .eq("id", newPropertyId);

        if (updateError) {
          console.error("Error updating property with images:", updateError);
        }
      }

      showMessage("¡Propiedad guardada exitosamente!", "success");
      fetchProperties();
    } catch (error) {
      console.error("Error adding property:", error);
      showMessage(`Error al guardar: ${error.message}`, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProperty = async (propertyId, updatedData) => {
    try {
      setLoading(true);

      // Extract images from updatedData (they're just metadata for now)
      const { images, ...propertyData } = updatedData;

      let uploadedImages = [];

      // TODO: Handle image uploads to Supabase Storage here
      if (images && images.length > 0) {
        uploadedImages = await uploadPropertyImages(
          propertyId,
          images,
          user.id
        );
      }

      // Get existing images and merge with new ones
      const { data: existingProperty } = await supabase
        .from("properties")
        .select("images")
        .eq("id", propertyId)
        .single();

      const allImages = [
        ...(existingProperty?.images || []),
        ...uploadedImages,
      ];

      const { data, error } = await supabase
        .from("properties")
        .update({
          ...propertyData,
          price: parseFloat(propertyData.price),
          bedrooms: parseFloat(propertyData.bedrooms),
          bathrooms: parseFloat(propertyData.bathrooms),
          images: allImages, // Up
          updated_at: new Date().toISOString(),
        })
        .eq("id", propertyId)
        .eq("user_id", user.id) // Security: only update own properties
        .select();

      if (error) throw error;

      showMessage("✅ Propiedad actualizada exitosamente!", "success");
      fetchProperties(); // Refresh the list
    } catch (error) {
      console.error("Error updating property:", error);
      showMessage(`Error al actualizar: ${error.message}`, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProperty = async (propertyId) => {
    try {
      setLoading(true);
      await deletePropertyImages(propertyId, user.id);
      
      const { error } = await supabase
        .from("properties")
        .delete()
        .eq("id", propertyId)
        .eq("user_id", user.id); // Security: only delete own properties

      if (error) throw error;

      showMessage("✅ Propiedad eliminada exitosamente!", "success");
      fetchProperties(); // Refresh the list
    } catch (error) {
      console.error("Error deleting property:", error);
      showMessage(`Error al eliminar: ${error.message}`, "error");
    } finally {
      setLoading(false);
    }
  };

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
      "ID",
      "Nombre",
      "Tipo",
      "Ubicacion",
      "Precio",
      "Recamaras",
      "Banos",
      "Estado",
      "Notas",
      "FechaCreacion",
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
      case "success":
        return "bg-green-600";
      case "error":
        return "bg-red-600";
      case "info":
        return "bg-blue-600";
      default:
        return "bg-gray-700";
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
  return (
    <Router>
      <Routes>
        {/* Public Route - No login required */}
        <Route path="/" element={
          <PublicView
            properties={properties}
            filteredProperties={filteredProperties}
            loading={loading}
            filters={filters}
            setFilters={setFilters}
            handleSearch={handleSearch}
            exportToCSV={exportToCSV}
          />
        } />

        {/* Login Route */}
        <Route path="/login" element={
          user ? <Navigate to="/dashboard" replace /> : <Login />
        } />

        {/* Agent Dashboard - Protected Route */}
        <Route path="/dashboard" element={
          user ? (
            <AgentDashboard
              user={user}
              signOut={signOut}
              properties={properties}
              filteredProperties={filteredProperties}
              loading={loading}
              filters={filters}
              setFilters={setFilters}
              handleSearch={handleSearch}
              exportToCSV={exportToCSV}
              handleAddProperty={handleAddProperty}
              handleUpdateProperty={handleUpdateProperty}
              handleDeleteProperty={handleDeleteProperty}
              message={message}
              getMessageClass={getMessageClass}
            />
          ) : (
            <Navigate to="/login" replace />
          )
        } />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
