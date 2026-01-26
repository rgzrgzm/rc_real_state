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
      <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
        <div className="glass-panel w-full max-w-5xl h-[85vh] rounded-3xl flex overflow-hidden shadow-2xl border border-white/10">
          
          {/* Sidebar */}
          <div className="w-full md:w-72 bg-slate-900/50 border-r border-white/5 flex flex-col">
            <div className="p-6 border-b border-white/5">
              <h2 className="text-xl font-bold text-white flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                  ⚙️
                </span>
                Configuración
              </h2>
            </div>
            
            <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
              <button
                onClick={() => setSelectedSection("account")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  selectedSection === "account"
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="font-medium">Mi Cuenta</span>
              </button>
              
              <button
                onClick={() => setSelectedSection("approval")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  selectedSection === "approval"
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <div className="relative">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  {pendingUserList.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-pink-500 rounded-full animate-pulse border border-slate-900"></span>
                  )}
                </div>
                <span className="font-medium">Aprobaciones</span>
                {pendingUserList.length > 0 && (
                  <span className="ml-auto bg-pink-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {pendingUserList.length}
                  </span>
                )}
              </button>
            </nav>

            <div className="p-4 border-t border-white/5">
              <button 
                onClick={() => setIsSettingsOpen(false)}
                className="w-full py-2 px-4 rounded-xl border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 transition-colors text-sm font-medium"
              >
                Cerrar Panel
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 bg-slate-900/30 flex flex-col min-w-0">
            {/* Header */}
            <div className="p-8 pb-4">
              <h2 className="text-2xl font-bold text-white mb-2">
                {selectedSection === "account" ? "Perfil de Usuario" : "Gestión de Accesos"}
              </h2>
              <p className="text-slate-400">
                {selectedSection === "account" 
                  ? "Gestiona tu información personal y preferencias" 
                  : "Administra las solicitudes de acceso de nuevos agentes"}
              </p>
            </div>

            {/* Content Scrollable */}
            <div className="flex-1 overflow-y-auto p-8 pt-0">
              {selectedSection === "account" && (
                <div className="space-y-6 max-w-2xl animate-fade-in">
                  <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-6">
                    <div className="flex items-center gap-6">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-3xl shadow-lg border-4 border-slate-800">
                        👤
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">Tu Perfil</h3>
                        <p className="text-slate-400 text-sm">Información visible para administradores</p>
                      </div>
                    </div>

                    <div className="grid gap-6">
                      <div className="group">
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Correo Electrónico</label>
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/50 border border-white/10 group-hover:border-indigo-500/30 transition-colors">
                          <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <span className="text-white font-medium">{user.email}</span>
                        </div>
                      </div>

                      <div className="group">
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Rol del Sistema</label>
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/50 border border-white/10 group-hover:border-purple-500/30 transition-colors">
                          <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                          <span className="text-white font-medium">Agente Verificado</span>
                          <span className="ml-auto px-2 py-1 rounded bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase">Activo</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {selectedSection === "approval" && (
                <div className="space-y-4 animate-fade-in">
                  {loadingPendingUsers ? (
                    <div className="flex flex-col items-center justify-center py-20">
                      <div className="w-10 h-10 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mb-4"></div>
                      <p className="text-slate-400">Cargando solicitudes...</p>
                    </div>
                  ) : pendingUserList.length > 0 ? (
                    <div className="grid gap-4">
                      {pendingUserList.map((item, index) => {
                        const userEmail = item.pending_user.user_metadata.email;
                        return (
                          <div
                            key={index}
                            className="group glass-panel p-4 rounded-xl border border-white/5 hover:border-indigo-500/30 transition-all duration-300 hover:-translate-y-1"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                              <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-xl text-slate-400 group-hover:bg-indigo-500/20 group-hover:text-indigo-400 transition-colors">
                                  👤
                                </div>
                                <div>
                                  <h4 className="text-white font-bold mb-1">{userEmail}</h4>
                                  <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                                    <span className="text-xs text-amber-400 font-medium uppercase tracking-wide">Solicitud Pendiente</span>
                                  </div>
                                </div>
                              </div>

                              <div className="flex gap-3 pt-4 sm:pt-0 border-t sm:border-0 border-white/5">
                                <button
                                  onClick={() => approveUser(item)}
                                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-white border border-emerald-500/20 transition-all duration-300"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                  <span className="font-semibold text-sm">Aprobar</span>
                                </button>
                                <button
                                  onClick={() => rejectUser(item)}
                                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white border border-rose-500/20 transition-all duration-300"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                  <span className="font-semibold text-sm">Rechazar</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-20 rounded-3xl border border-dashed border-white/10 bg-white/5">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-800 flex items-center justify-center text-2xl opacity-50">
                        📭
                      </div>
                      <h3 className="text-white font-bold text-lg mb-1">Todo al día</h3>
                      <p className="text-slate-400">No hay solicitudes de acceso pendientes.</p>
                    </div>
                  )}
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
