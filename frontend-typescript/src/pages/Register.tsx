import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import Input from '../components/Input';
import { BookOpen } from 'lucide-react';

const Register: React.FC = () => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');
        setLoading(true);
        try {
            await register(userName, email, password, ['user']);
            navigate('/');
        } catch (err: any) {
            setMessage(err.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
      }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
            <div className="flex flex-col items-center mb-8">
              <div className="bg-brand-50 p-3 rounded-full mb-3">
                <BookOpen className="w-8 h-8 text-brand-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Create Account</h2>
              <p className="text-slate-500 text-sm">Join the BookHaven community</p>
            </div>
    
            {message && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
                {message}
              </div>
            )}
    
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input 
                label="Username" 
                type="text" 
                value={userName} 
                onChange={(e) => setUserName(e.target.value)} 
                required 
                placeholder="Choose a username"
              />
               <Input 
                label="Email" 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                placeholder="Enter your email"
              />
              <Input 
                label="Password" 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                placeholder="Create a password"
              />
              
              <Button type="submit" className="w-full" isLoading={loading}>
                Sign Up
              </Button>
            </form>
    
            <div className="mt-6 text-center text-sm text-slate-600">
              Already have an account?{' '}
              <Link to="/login" className="text-brand-600 font-medium hover:underline">
                Sign in
              </Link>
            </div>
          </div>
        </div>
    );
};

export default Register;