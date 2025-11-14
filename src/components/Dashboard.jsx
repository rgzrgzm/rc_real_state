import React from 'react'
import { useAuth } from '../hooks/useAuth'

const Dashboard = () => {
  const { user, signOut } = useAuth()

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-2xl p-8 text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold mb-4">Welcome to RC Real Estate!</h2>
          <p className="text-gray-300 mb-6">
            You are successfully logged in as <strong>{user.email}</strong>
          </p>
          <p className="text-gray-400">
            User ID: <code className="bg-gray-800 px-2 py-1 rounded">{user.id}</code>
          </p>
          
          <div className="mt-8 p-6 bg-white/5 rounded-xl">
            <h3 className="text-xl font-semibold mb-4">Next Steps:</h3>
            <ul className="text-gray-300 space-y-2 text-left">
              <li>✅ User authentication is working</li>
              <li>🔜 Create the properties table</li>
              <li>🔜 Build the property management interface</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard