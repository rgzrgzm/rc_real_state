import React from "react";

const SettingsModal = ({
  isSettingsOpen,
  setIsSettingsOpen,
  selectedSection,
  setSelectedSection,
  user,
}) => {
  return (
    isSettingsOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-gray-800 rounded-xl w-full max-w-4xl h-[90vh] sm:h-96 flex flex-col sm:flex-row">
          {/* Mobile Header - Only shown on mobile */}
          <div className="sm:hidden flex justify-between items-center p-4 border-b border-gray-700">
            <h2 className="text-lg font-bold text-white">Configuración</h2>
            <button
              onClick={() => {
                setIsSettingsOpen(false)
                setSelectedSection("account")
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
                    {/* 
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
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <div>
                        <p className="text-white font-medium">Miembro desde</p>
                        <p className="text-gray-300 text-sm">Enero 2024</p>
                      </div>
                    </div> */}
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
                    {/* User 1 */}
                    <div className="bg-gray-700 rounded-lg p-4">
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
                              usuario1@example.com
                            </p>
                            <p className="text-gray-400 text-sm flex items-center space-x-1">
                              <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
                              <span>Pendiente de aprobación</span>
                            </p>
                          </div>
                        </div>
                        <div className="flex space-x-2 justify-end">
                          <button className="flex items-center space-x-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded transition-colors text-sm">
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
                            <span className="hidden xs:inline">Aprobar</span>
                          </button>
                          <button className="flex items-center space-x-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded transition-colors text-sm">
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
                            <span className="hidden xs:inline">Rechazar</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* User 2 */}
                    <div className="bg-gray-700 rounded-lg p-4">
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
                              usuario2@example.com
                            </p>
                            <p className="text-gray-400 text-sm flex items-center space-x-1">
                              <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
                              <span>Pendiente de aprobación</span>
                            </p>
                          </div>
                        </div>
                        <div className="flex space-x-2 justify-end">
                          <button className="flex items-center space-x-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded transition-colors text-sm">
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
                            <span className="hidden xs:inline">Aprobar</span>
                          </button>
                          <button className="flex items-center space-x-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded transition-colors text-sm">
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
                            <span className="hidden xs:inline">Rechazar</span>
                          </button>
                        </div>
                      </div>
                    </div>
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
