import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

export const supabaseConfigured = !!url && !!key && !url.includes('YOUR-PROJECT')

export const supabase = createClient(
  supabaseConfigured ? url! : 'http://localhost:54321',
  supabaseConfigured ? key! : 'missing',
  { auth: { persistSession: true, autoRefreshToken: true } },
)
