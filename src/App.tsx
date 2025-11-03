import React, { useState, useEffect } from 'react';
import { Session } from '@supabase/supabase-js';
import Login from './components/Login';
import LandingPage from './components/LandingPage';
import { supabase, supabaseInitializationError } from './supabaseClient';

const App: React.FC = () => {
    const [session, setSession] = useState<Session | null>(null);
    const [authLoading, setAuthLoading] = useState(true);

    useEffect(() => {
        if (supabaseInitializationError) {
            setAuthLoading(false);
            return;
        }
        if (supabase) {
            // Check initial session
            supabase.auth.getSession().then(({ data: { session } }) => {
                setSession(session);
                setAuthLoading(false); // Auth check is complete
            });

            // Listen for future changes
            const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
                setSession(session);
            });

            return () => subscription.unsubscribe();
        } else {
            // No supabase client, probably an init error handled elsewhere
            setAuthLoading(false);
        }
    }, []);

    // While checking auth, show a full-page loader to prevent content flash
    if (authLoading) {
        return (
            <div className="flex items-center justify-center h-screen bg-amber-50">
                <style>{`
                    @keyframes bounce { 0%, 20%, 50%, 80%, 100% { transform: translateY(0); } 40% { transform: translateY(-30px); } 60% { transform: translateY(-15px); } }
                    .capybara-loader { animation: bounce 2s infinite; }
                `}</style>
                <div className="text-center">
                    <div className="relative w-32 h-32 mx-auto mb-4 capybara-loader" aria-label="Cargando...">
                        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" role="img"><title>Cargando...</title><path fill="#8c5a2b" d="M165.7,96.3c0,32.5-29.8,58.9-66.5,58.9S32.7,128.8,32.7,96.3c0-32.5,29.8-58.9,66.5-58.9 S165.7,63.8,165.7,96.3z" /><path fill="#7a4e24" d="M125.1,155.2c-15.1,5.1-31.5,5.1-46.6,0c-1.3-0.4-2.7,0.5-3.1,1.8c-0.4,1.3,0.5,2.7,1.8,3.1 c16.6,5.6,34.8,5.6,51.4,0c1.3-0.4,2.2-1.8,1.8-3.1C127.8,155.7,126.4,154.8,125.1,155.2z" /><circle fill="#442a12" cx="78.8" cy="89.4" r="7.2"/><circle fill="#442a12" cx="120.4" cy="89.4" r="7.2"/><path fill="#442a12" d="M99.6,112.5c-6.1,0-11,4.9-11,11c0,1.3,1.1,2.4,2.4,2.4h17.2c1.3,0,2.4-1.1,2.4-2.4 C110.6,117.4,105.7,112.5,99.6,112.5z"/><path fill="#d3a06a" d="M60.1,70.6c0,0-12.2-22.3-0.5-36.2s25.6-14.7,25.6-14.7s-3.7,20.8-12.2,32.5 C64.6,63.5,60.1,70.6,60.1,70.6z"/><path fill="#d3a06a" d="M139.1,70.6c0,0,12.2-22.3,0.5-36.2s-25.6-14.7-25.6-14.7s3.7,20.8,12.2,32.5 C134.6,63.5,139.1,70.6,139.1,70.6z"/></svg>
                    </div>
                </div>
            </div>
        );
    }

    // After auth check, decide what to render
    if (window.location.pathname === '/login') {
        return <Login />;
    }

    return <LandingPage session={session} />;
};

export default App;
