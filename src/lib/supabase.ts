/**
 * Supabase Client Configuration
 * Uses centralized env config
 */

import { createClient } from '@supabase/supabase-js';
import { env } from '@/core/config/env';

export const supabase = createClient(env.supabaseUrl, env.supabaseAnonKey);

export const supabaseAdmin = typeof window === 'undefined' && env.supabaseServiceRoleKey
  ? createClient(env.supabaseUrl, env.supabaseServiceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
  : null;
