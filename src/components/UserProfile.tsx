import React from 'react';
import { LogOut, LogIn } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface UserProfileProps {
  onShowLogin?: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ onShowLogin }) => {
  const { user, logout } = useAuth();

  // Show for both logged-in and guest users with consistent height
  if (user) {
    // Logged-in user view
    return (
      <div className="bg-white rounded-xl shadow-lg p-4 mb-6 min-h-[80px]">
        <div className="flex items-center justify-between h-full">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              Welcome back, {user.displayName || user.email?.split('@')[0] || 'Player'}! 👋
            </h3>
          </div>
          
          <button
            onClick={logout}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            title="Sign Out"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div> 
    );
  } else {
    // Guest user view
    return (
      <div className="bg-white rounded-xl shadow-lg p-4 mb-6 min-h-[80px]">
        <div className="flex items-center justify-between h-full">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              Log In to compete in the leaderboard! 🏆
            </h3>
          </div>
          
          <button
            onClick={onShowLogin}
            className="ml-4 px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors whitespace-nowrap"
          >
            Log In
          </button>
        </div>
      </div>
    );
  }
};

export default UserProfile;