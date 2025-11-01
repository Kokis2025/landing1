
import { createClient, SupabaseClient } from '@supabase/supabase-js';

// --- VISTA PREVIA: Claves insertadas para que funcione aquí ---
// RECUERDA: El código que subas a Vercel debe usar process.env, 
// como lo tenías en tu captura de pantalla. ¡Ese ya está correcto!

const supabaseUrl = 'https://wzhjxxvowyicxxwohgpm.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind6aGp4eHZvd3lpY3h4d29oZ3BtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE1MDE4MDMsImV4cCI6MjA3NzA3NzgwM30.EiOooVjK00I2OKFy6JCgtO017barr-w77TRP1tATRiU';

export let supabase: SupabaseClient | null = null;
export let supabaseInitializationError: string | null = null;

// Inicializamos el cliente de Supabase directamente
try {
    if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error("Las claves de Supabase no están definidas.");
    }
    supabase = createClient(supabaseUrl, supabaseAnonKey);
} catch (e) {
    console.error("Error creating Supabase client:", e);
    supabaseInitializationError = `Error al inicializar Supabase: ${e instanceof Error ? e.message : 'Error desconocido'}.`;
}

// El resto de las instrucciones de SQL son para referencia y no afectan el código.
/*
-- --- INSTRUCCIONES DE CONFIGURACIÓN (EDITOR DE SQL) ---
-- 1. En tu proyecto de Supabase, ve al "Editor de SQL" (SQL Editor) en el menú de la izquierda.
-- 2. Haz clic en "+ New query".
-- 3. Copia TODO el código de abajo, pégalo en el editor de SQL y haz clic en "RUN".
--    Este script configura todo lo necesario: la tabla, el almacenamiento (storage) y la seguridad.
... (SQL Omitido por brevedad) ...
*/