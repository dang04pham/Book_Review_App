import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BookOpen, LogOut, User as UserIcon, ShieldCheck } from 'lucide-react';

const Navbar: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    if (!user) return null;

    const isAdmin = user.roles.includes('admin') || user.roles.includes('ROLE_ADMIN');

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (!user) return null;

    return (
        <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 text-brand-600 hover:text-brand-700 transition-colors">
              <BookOpen className="w-8 h-8" />
              <span className="text-xl font-bold tracking-tight">Bookrev</span>
            </Link>
    
            <div className="flex items-center space-x-6">
               {location.pathname !== '/' && (
                 <Link to="/" className="text-slate-600 hover:text-brand-600 font-medium text-sm">
                   Browse Books
                 </Link>
               )}

                {isAdmin && (
                  <Link 
                    to="/admin" 
                    className={`flex items-center text-sm font-medium ${location.pathname === '/admin' ? 'text-brand-600' : 'text-slate-600 hover:text-brand-600'}`}
                  >
                    <ShieldCheck className="w-4 h-4 mr-1" />
                    Admin
                  </Link>
              )}     
               
               <div className="flex items-center space-x-4 border-l border-slate-200 pl-6">
                 <div className="flex items-center space-x-2 text-slate-700">
                   <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-700">
                     <UserIcon size={16} />
                   </div>
                   <span className="text-sm font-medium hidden sm:block">{user.username}</span>
                 </div>
                 
                 <button 
                   onClick={handleLogout}
                   className="text-slate-400 hover:text-red-500 transition-colors p-2"
                   title="Sign out"
                 >
                   <LogOut size={20} />
                 </button>
               </div>
            </div>
          </div>
        </nav>
    );
};

export default Navbar;