import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { useNavigate } from 'react-router-dom';
import { Lock, User } from 'lucide-react';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useContent();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        const result = await login(email, password);

        if (result.success) {
            navigate('/admin/dashboard');
        } else {
            setError(result.error);
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-nude-50 px-4">
            <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl max-w-md w-full border border-nude-100">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-serif text-nude-900 mb-2">Admin Access</h2>
                    <p className="text-nude-900/60">Enter your secure credentials</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                        <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-nude-300" />
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full bg-nude-50/50 border border-nude-200 rounded-lg py-3 pl-12 pr-4 text-nude-900 focus:outline-none focus:border-gold-400"
                        />
                    </div>

                    <div className="relative">
                        <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-nude-300" />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full bg-nude-50/50 border border-nude-200 rounded-lg py-3 pl-12 pr-4 text-nude-900 focus:outline-none focus:border-gold-400"
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm text-center bg-red-50 py-2 rounded">{error}</p>}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-nude-900 text-gold-100 py-4 rounded-lg uppercase tracking-widest text-sm hover:bg-gold-600 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex justify-center"
                    >
                        {isLoading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : (
                            "Login"
                        )}
                    </button>

                    <div className="text-center">
                        <span className="text-[10px] text-nude-900/30 uppercase tracking-widest">Secured by MockJWT Implementation</span>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
