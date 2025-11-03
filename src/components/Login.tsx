import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!supabase) {
            setError("El cliente de Supabase no está disponible.");
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const { error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) throw error;
            window.location.href = '/'; // Redirigir a la página principal tras el éxito
        } catch (err: any) {
            setError(err.error_description || err.message || "Correo o contraseña incorrectos.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ fontFamily: "'Nunito', sans-serif" }} className="min-h-screen flex items-center justify-center bg-amber-50 antialiased">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg m-4">
                <div className="text-center">
                    <img src="https://i.imgur.com/3Z6k85v.png" alt="Logo Capi y Hely" className="w-24 h-auto mx-auto" />
                    <h2 className="mt-4 text-3xl font-extrabold text-stone-900">
                        Acceso de Administración
                    </h2>
                    <p className="mt-2 text-sm text-stone-600">
                        Inicia sesión para editar el contenido de la página.
                    </p>
                </div>
                <form className="space-y-6" onSubmit={handleLogin}>
                    <div>
                        <label htmlFor="email" className="text-sm font-bold text-stone-600 block">
                            Correo Electrónico
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full mt-1 px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="text-sm font-bold text-stone-600 block">
                            Contraseña
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full mt-1 px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    {error && (
                        <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg text-center">{error}</p>
                    )}
                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 transition-colors"
                        >
                            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
