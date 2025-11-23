import { useNavigate } from "react-router-dom";

const PendingApproval = () => {
  const navigate = useNavigate();

  return (
  <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
  <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl text-center max-w-md w-full border border-gray-700 shadow-2xl">
    {/* Clock icon for waiting */}
    <div className="flex justify-center mb-6">
      <div className="w-16 h-16 bg-orange-500/20 rounded-2xl flex items-center justify-center rotate-12">
        <svg 
          className="w-8 h-8 text-orange-400" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={1.5} 
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
          />
        </svg>
      </div>
    </div>

    <h2 className="text-2xl font-bold text-white mb-4">
      Account Pending Approval
    </h2>
    
    <p className="text-gray-300 mb-6 leading-relaxed">
      Thanks for joining! Our team is reviewing your application. 
      You'll receive an email notification once your account is activated.
    </p>

    {/* Progress steps */}
    <div className="space-y-3 mb-6">
      <div className="flex items-center space-x-3 text-sm">
        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <span className="text-green-400">Registration Complete</span>
      </div>
      <div className="flex items-center space-x-3 text-sm">
        <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
          <div className="w-2 h-2 bg-yellow-200 rounded-full animate-pulse"></div>
        </div>
        <span className="text-yellow-400">Admin Review</span>
      </div>
      <div className="flex items-center space-x-3 text-sm">
        <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center">
          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
        </div>
        <span className="text-gray-400">Account Activated</span>
      </div>
    </div>

    {/* Back button */}
    <button
      type="button"
      onClick={() => {
        navigate("/");
        Object.keys(localStorage).forEach((key) => {
          if (key.startsWith("sb-") && key.endsWith("-auth-token")) {
            localStorage.removeItem(key);
          }
        });
      }}
      className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 backdrop-blur-sm flex items-center justify-center gap-3 group"
    >
      <svg
        className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-300"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 19l-7-7m0 0l7-7m-7 7h18"
        />
      </svg>
      Return to Homepage
    </button>
  </div>
</div>
  );
};

export default PendingApproval;
