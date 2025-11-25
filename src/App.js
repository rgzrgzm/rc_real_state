import React, { useState, useEffect } from "react";
import { supabase } from "./hooks/useSupabase";
import Login from "./components/Login";
import { useAuth } from "./hooks/useAuth";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import PublicView from "./components/PublicView";
import AgentDashboard from "./components/AgentDashboard";
import PendingApproval from "./components/PendingApproval";
import { Toaster } from "react-hot-toast";

function App() {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loadingProperties, setLoadingProperties] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [filters, setFilters] = useState({
    type: "",
    location: "",
    minPrice: "",
    maxPrice: "",
    bedrooms: "",
    bathrooms: "",
  });
  const [isApproved, setIsApproved] = useState(null);
  const { user, loading, signIn, signUp, signOut, isUserApproved } =
    useAuth(setIsApproved);

  const authLoading = loading;

  useEffect(() => {
    fetchProperties();
  }, []);

  useEffect(() => {
    isUserApproved(user?.id);
  }, [user]);

  const fetchProperties = async () => {
    try {
      setLoadingProperties(true);
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
      setLoadingProperties(false);
    }
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

  // 🔥 Logout handler that ALSO resets approval state
  const handleLogout = async () => {
    await signOut();
    setIsApproved(null);
  };

  // 🔥 Prevent flashing by waiting for auth state
  if (authLoading) {
    return (
      <div style={{backgroundColor:'#1a1a1a'}} className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-white text-lg font-medium">
            Cargando aplicación...
          </p>
          <p className="text-gray-400 mt-2">Por favor espere</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* PUBLIC VIEW */}
        <Route
          path="/"
          element={
            <PublicView
              properties={properties}
              filteredProperties={filteredProperties}
              loading={loadingProperties}
              filters={filters}
              setFilters={setFilters}
              handleSearch={() => {}}
              exportToCSV={() => {}}
            />
          }
        />

        {/* PENDING PAGE */}
        <Route path="/pending" element={<PendingApproval />} />

        {/* LOGIN */}
        <Route
          path="/login"
          element={<Login signIn={signIn} signUp={signUp} loading={loading} />}
        />

        {/* DASHBOARD - ONLY APPROVED USERS */}
        <Route
          path="/dashboard"
          element={
            !user ? (
              <Navigate to="/login" replace />
            ) : (
              isApproved && (
                <AgentDashboard
                  user={user}
                  signOut={handleLogout}
                  properties={properties}
                  filteredProperties={filteredProperties}
                  loading={loadingProperties}
                  filters={filters}
                  setFilters={setFilters}
                  handleSearch={() => {}}
                  exportToCSV={() => {}}
                  handleAddProperty={() => {}}
                  handleUpdateProperty={() => {}}
                  handleDeleteProperty={() => {}}
                  message={message}
                  getMessageClass={getMessageClass}
                />
              )
            )
          }
        />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#1f2937",
            color: "#fff",
            border: "1px solid #374151",
          },
        }}
      />
    </Router>
  );
}

export default App;
