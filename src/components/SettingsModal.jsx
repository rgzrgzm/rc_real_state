import React, { useEffect, useState } from "react";
import { supabase } from "../hooks/useSupabase";
import toast from "react-hot-toast";

const SettingsModal = ({
  isSettingsOpen,
  setIsSettingsOpen,
  selectedSection,
  setSelectedSection,
  user,
}) => {
  const [loadingPendingUsers, setLoadingPendingUsers] = useState(false);
  const [pendingUserList, setPendingUserList] = useState([]);

  useEffect(() => {
    const fetchPendingUsers = async () => {
      try {
        setLoadingPendingUsers(true);
        const { data, error } = await supabase.functions.invoke(
          "get-pending-users"
        );

        if (error) throw error;

        setPendingUserList(data || []);
      } catch (error) {
        console.error("Error fetching pending users:", error);
        toast.error("Error al cargar usuarios pendientes");
      } finally {
        setLoadingPendingUsers(false);
      }
    };

    if (isSettingsOpen && selectedSection === "approval") {
      fetchPendingUsers();
    }
  }, [isSettingsOpen, selectedSection]);

  const approveUser = async (object) => {
    try {
      const userId = object.pending_user.user_id;

      const { data, error } = await supabase
        .from("white_list")
        .insert([{ user_id: userId }]);

      if (error) throw error;

      const { data: pendingUserData, error: pendingUserError } = await supabase
        .from("pending_users")
        .delete()
        .eq("user_id", userId);

      if (pendingUserError) throw pendingUserError;

      setPendingUserList((prev) =>
        prev.filter((item) => item.pending_user.user_id !== userId)
      );

      toast.success("Usuario aprobado correctamente");
    } catch (error) {
      console.error("Error approving user:", error);
      toast.error("Error al aprobar usuario: " + error.message);
    }
  };

  const rejectUser = async (object) => {
    try {
      const userId = object.pending_user.user_id;

      const { data: pendingUserData, error: pendingUserError } = await supabase
        .from("pending_users")
        .delete()
        .eq("user_id", userId);

      if (pendingUserError) throw pendingUserError;

      setPendingUserList((prev) =>
        prev.filter((item) => item.pending_user.user_id !== userId)
      );

      toast.success("Usuario rechazado correctamente");
    } catch (error) {
      console.error("Error rejecting user:", error);
      toast.error("Error al rechazar usuario: " + error.message);
    }
  };

  return (
    isSettingsOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-gray-800 rounded-xl w-full max-w-4xl h-[90vh] sm:h-96 flex flex-col sm:flex-row">
          {/* Mobile Header - Only shown on mobile */}
          <div className="sm:hidden flex justify-between items-center p-4 border-b border-gray-700">
            <h2 className="text-lg font-bold text-white">Configuración</h2>
            <button
              onClick={() => {
                setIsSettingsOpen(false);
                setSelectedSection("account");
              }}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg
                className="w-6 h-6"
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

          {/* Left Sidebar */}
          <div className="w-full sm:w-64 bg-gray-900 rounded-t-xl sm:rounded-l-xl sm:rounded-tr-none p-4">
            <h3 className="text-white font-semibold mb-4 hidden sm:block">
              Configuración
            </h3>
            <nav className="flex sm:flex-col space-x-2 sm:space-x-0 sm:space-y-2 overflow-x-auto sm:overflow-visible">
              <button
                onClick={() => setSelectedSection("account")}
                className={`flex items-center space-x-2 min-w-max sm:min-w-0 sm:w-full text-left px-3 py-2 rounded-lg transition-colors ${
                  selectedSection === "account"
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-gray-700"
                }`}
              >
                <svg
                  className="w-4 h-4 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span className="hidden xs:inline">Datos de Cuenta</span>
                <span className="xs:hidden">Cuenta</span>
              </button>
              <button
                onClick={() => setSelectedSection("approval")}
                className={`flex items-center space-x-2 min-w-max sm:min-w-0 sm:w-full text-left px-3 py-2 rounded-lg transition-colors ${
                  selectedSection === "approval"
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-gray-700"
                }`}
              >
                <svg
                  className="w-4 h-4 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                <span className="hidden xs:inline">Aprobación de Usuarios</span>
                <span className="xs:hidden">Aprobación</span>
              </button>
            </nav>
          </div>

          {/* Right Content */}
          <div className="flex-1 flex flex-col">
            {/* Desktop Header - Only shown on desktop */}
            <div className="hidden sm:flex justify-between items-center p-6 border-b border-gray-700">
              <h2 className="text-xl font-bold text-white">
                {selectedSection === "account"
                  ? "Datos de Cuenta"
                  : "Aprobación de Usuarios"}
              </h2>
              <button
                onClick={() => setIsSettingsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg
                  className="w-6 h-6"
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

            {/* Modal Content */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
              {selectedSection === "account" && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 sm:hidden">
                    <svg
                      className="w-5 h-5 text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <h3 className="text-lg font-semibold text-white">
                      Información de la Cuenta
                    </h3>
                  </div>
                  <h3 className="text-lg font-semibold text-white hidden sm:block">
                    Información de la Cuenta
                  </h3>

                  <div className="bg-gray-700 rounded-lg p-4 space-y-3">
                    <div className="flex items-center space-x-3">
                      <svg
                        className="w-4 h-4 text-gray-400 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <div>
                        <p className="text-white font-medium">Email</p>
                        <p className="text-gray-300 text-sm">{user.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <svg
                        className="w-4 h-4 text-gray-400 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      <div>
                        <p className="text-white font-medium">Rol</p>
                        <p className="text-gray-300 text-sm">Agente</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {selectedSection === "approval" && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 sm:hidden">
                    <svg
                      className="w-5 h-5 text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                    <h3 className="text-lg font-semibold text-white">
                      Aprobación de Usuarios
                    </h3>
                  </div>
                  <h3 className="text-lg font-semibold text-white hidden sm:block">
                    Aprobación de Usuarios
                  </h3>

                  <p className="text-gray-400 text-sm">
                    Gestiona los usuarios pendientes de aprobación
                  </p>

                  <div className="space-y-3">
                    {loadingPendingUsers ? (
                      <div className="flex justify-center items-center py-8">
                        <div className="flex flex-col items-center space-y-3">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                          <p className="text-gray-400 text-sm">
                            Cargando usuarios...
                          </p>
                        </div>
                      </div>
                    ) : pendingUserList.length > 0 ? (
                      pendingUserList.map((item, index) => {
                        const userEmail = item.pending_user.user_metadata.email;
                        return (
                          <div
                            key={index}
                            className="bg-gray-700 rounded-lg p-4"
                          >
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0">
                              <div className="flex items-center space-x-3">
                                <svg
                                  className="w-5 h-5 text-gray-400 flex-shrink-0"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                  />
                                </svg>
                                <div>
                                  <p className="text-white font-medium">
                                    {userEmail}
                                  </p>
                                  <p className="text-gray-400 text-sm flex items-center space-x-1">
                                    <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
                                    <span>Pendiente de aprobación</span>
                                  </p>
                                </div>
                              </div>
                              <div className="flex space-x-2 justify-end">
                                <button
                                  onClick={() => approveUser(item)}
                                  className="flex items-center space-x-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded transition-colors text-sm"
                                >
                                  <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M5 13l4 4L19 7"
                                    />
                                  </svg>
                                  <span className="hidden xs:inline">
                                    Aprobar
                                  </span>
                                </button>
                                <button
                                  onClick={() => {
                                    rejectUser(item);
                                  }}
                                  className="flex items-center space-x-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded transition-colors text-sm"
                                >
                                  <svg
                                    className="w-4 h-4"
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
                                  <span className="hidden xs:inline">
                                    Rechazar
                                  </span>
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-400">
                          No hay usuarios pendientes
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default SettingsModal;
