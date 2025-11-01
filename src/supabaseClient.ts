import { createClient, SupabaseClient } from '@supabase/supabase-js';

// --- CÓDIGO PARA PUBLICACIÓN EN VERCEL ---
// Este código está diseñado para leer las claves de las "Environment Variables"
// que configuraste en el panel de Vercel.

// Asegúrate de haber configurado 'VITE_SUPABASE_URL' y 'VITE_SUPABASE_ANON_KEY'
// en el panel de configuración de tu proyecto en Vercel.

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;


export let supabase: SupabaseClient | null = null;
export let supabaseInitializationError: string | null = null;

// Verificamos que las claves no estén vacías (es una buena práctica).
if (!supabaseUrl || !supabaseAnonKey) {
  supabaseInitializationError = "Error de Configuración: Las claves de Supabase no se encontraron en las variables de entorno.";
} else {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
  } catch (e) {
    console.error("Error creating Supabase client:", e);
    supabaseInitializationError = `Error al inicializar Supabase: ${e instanceof Error ? e.message : 'Error desconocido'}.`;
  }
}

// El resto de las instrucciones de SQL son para referencia y no afectan el código.
/*
-- --- INSTRUCCIONES DE CONFIGURACIÓN (EDITOR DE SQL) ---
-- 1. En tu proyecto de Supabase, ve al "Editor de SQL" (SQL Editor) en el menú de la izquierda.
-- 2. Haz clic en "+ New query".
-- 3. Copia TODO el código de abajo, pégalo en el editor de SQL y haz clic en "RUN".
--    Este script configura todo lo necesario: la tabla, el almacenamiento (storage) y la seguridad.

-- 1. CREAR LA TABLA 'landing_pages'
-- Este código crea la tabla si aún no existe, de forma segura.
CREATE TABLE IF NOT EXISTS public.landing_pages (
    id TEXT PRIMARY KEY,
    content_data JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
COMMENT ON TABLE public.landing_pages IS 'Almacena el contenido JSON de las páginas de destino.';

-- 2. CONFIGURAR SEGURIDAD (ROW LEVEL SECURITY - RLS)
-- Es una buena práctica tener RLS activado. Estas políticas permitirán que la app funcione correctamente.
-- Primero, activamos RLS en la tabla si no está activado ya.
ALTER TABLE public.landing_pages ENABLE ROW LEVEL SECURITY;

-- Borramos políticas antiguas para evitar duplicados al correr el script varias veces.
DROP POLICY IF EXISTS "Allow anonymous full access to landing pages" ON public.landing_pages;
DROP POLICY IF EXISTS "Allow anonymous uploads to landing-images" ON storage.objects;
DROP POLICY IF EXISTS "Allow anonymous access to landing-images" ON storage.objects;

-- Creamos UNA política que permite leer, insertar y actualizar a usuarios anónimos (anon).
-- Esto es necesario para que tu panel de administración pueda guardar los cambios.
CREATE POLICY "Allow anonymous full access to landing pages"
ON public.landing_pages FOR ALL
TO anon
USING (true)
WITH CHECK (true);

-- 3. CONFIGURAR ALMACENAMIENTO (STORAGE) PARA IMÁGENES
-- El bucket debe ser público para que las imágenes se puedan ver en la web.
-- Si aún no has creado el bucket 'landing-images', estas políticas darán error.
-- Primero, crea el bucket desde la interfaz de Supabase:
--   - Ve a "Storage".
--   - "Create a new bucket", nómbralo 'landing-images'.
--   - Marca la casilla "This bucket is public".
--   - Luego, ejecuta estas políticas.

-- Política para SUBIR (INSERT): Permite que CUALQUIERA (anon) suba archivos al bucket 'landing-images'.
CREATE POLICY "Allow anonymous uploads to landing-images"
ON storage.objects FOR INSERT
TO anon
WITH CHECK ( bucket_id = 'landing-images' );

-- Política para VER/DESCARGAR (SELECT): Permite que CUALQUIERA (anon) vea archivos del bucket 'landing-images'.
CREATE POLICY "Allow anonymous access to landing-images"
ON storage.objects FOR SELECT
TO anon
USING ( bucket_id = 'landing-images' );

*/
