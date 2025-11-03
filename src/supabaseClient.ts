import { createClient, SupabaseClient } from '@supabase/supabase-js';

// --- CONFIGURACIÓN PARA PRODUCCIÓN ---
// Leemos las variables de entorno para una conexión segura.
// Estas variables las configurarás en tu servicio de hosting (ej. Vercel).
// FIX: Cast `import.meta` to `any` to resolve TypeScript error about missing 'env' property.
const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL;
const supabaseAnonKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY;

export let supabase: SupabaseClient | null = null;
export let supabaseInitializationError: string | null = null;

try {
    if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error("Las variables de entorno VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY no están definidas. Asegúrate de configurarlas en tu hosting (Vercel).");
    }
    supabase = createClient(supabaseUrl, supabaseAnonKey);
} catch (e) {
    console.error("Error al crear el cliente de Supabase:", e);
    supabaseInitializationError = `Error al inicializar Supabase: ${e instanceof Error ? e.message : 'Error desconocido'}. Revisa las variables de entorno.`;
}

/*
-- --- INSTRUCCIONES DE CONFIGURACIÓN DE SUPABASE (EDITOR DE SQL) ---
--
-- ¡MUY IMPORTANTE! DEBES EJECUTAR ESTE SCRIPT ACTUALIZADO PARA QUE EL LOGIN FUNCIONE.
--
-- 1. Ve a tu proyecto de Supabase -> SQL Editor -> + New query.
-- 2. Copia y pega TODO el código de abajo y haz clic en "RUN".
--
-- Este script configura la seguridad para que solo los administradores (usuarios con sesión iniciada)
-- puedan guardar cambios en la página.
--

-- 1. CREAR LA TABLA (si no existe)
CREATE TABLE IF NOT EXISTS public.landing_pages (
    id TEXT PRIMARY KEY,
    content_data JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. ACTIVAR RLS (Row Level Security)
ALTER TABLE public.landing_pages ENABLE ROW LEVEL SECURITY;

-- 3. BORRAR POLÍTICAS ANTIGUAS (para una re-ejecución segura del script)
DROP POLICY IF EXISTS "Allow anonymous full access to landing pages" ON public.landing_pages;
DROP POLICY IF EXISTS "Allow anonymous read access" ON public.landing_pages;
DROP POLICY IF EXISTS "Allow authenticated write access" ON public.landing_pages;

-- 4. CREAR POLÍTICA DE LECTURA PÚBLICA (para visitantes)
-- Cualquiera (rol 'anon') puede LEER el contenido de la página.
CREATE POLICY "Allow anonymous read access"
ON public.landing_pages FOR SELECT
TO anon
USING (true);

-- 5. CREAR POLÍTICA DE ESCRITURA PRIVADA (para ti, el administrador)
-- Solo los usuarios que han iniciado sesión (rol 'authenticated') pueden crear, actualizar o borrar.
CREATE POLICY "Allow authenticated write access"
ON public.landing_pages FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- --- POLÍTICAS DE ALMACENAMIENTO (STORAGE) ---
-- (Estas se mantienen igual, el acceso al panel de admin ya protege las subidas)

DROP POLICY IF EXISTS "Allow anonymous uploads to landing-images" ON storage.objects;
DROP POLICY IF EXISTS "Allow anonymous access to landing-images" ON storage.objects;

-- Permite que cualquiera suba imágenes.
CREATE POLICY "Allow anonymous uploads to landing-images"
ON storage.objects FOR INSERT
TO anon
WITH CHECK ( bucket_id = 'landing-images' );

-- Permite que cualquiera vea las imágenes.
CREATE POLICY "Allow anonymous access to landing-images"
ON storage.objects FOR SELECT
TO anon
USING ( bucket_id = 'landing-images' );

-- --- PASO FINAL: CREA TU USUARIO ---
-- 1. Ve a Supabase -> Authentication -> Users.
-- 2. Haz clic en "Add user".
-- 3. Crea tu usuario con un email y contraseña. Estas serán tus credenciales para la página /login.
*/
