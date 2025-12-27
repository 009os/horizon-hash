/**
 * Diagnostic utilities for troubleshooting connection issues
 */

import { env } from '@/core/config/env';
import { logger } from './logger';

export function diagnoseSupabaseConnection(): void {
  try {
    const url = env.supabaseUrl;
    const key = env.supabaseAnonKey;

    logger.info('=== Supabase Connection Diagnostics ===');
    logger.info(`URL: ${url ? url : 'MISSING'}`);
    logger.info(`Key: ${key ? `${key.substring(0, 30)}...` : 'MISSING'}`);

    if (!url) {
      logger.error('❌ NEXT_PUBLIC_SUPABASE_URL is missing!');
      return;
    }

    if (!key) {
      logger.error('❌ NEXT_PUBLIC_SUPABASE_ANON_KEY is missing!');
      return;
    }

    if (!url.startsWith('https://')) {
      logger.warn('⚠️  Supabase URL should start with https://');
    }

    if (!url.includes('.supabase.co')) {
      logger.warn('⚠️  Supabase URL should contain .supabase.co');
      logger.warn('   Current URL format might be incorrect');
    }

    // Extract project ID from URL for verification
    const projectIdMatch = url.match(/https:\/\/([^.]+)\.supabase\.co/);
    if (projectIdMatch) {
      logger.info(`✓ Project ID: ${projectIdMatch[1]}`);
    } else {
      logger.warn('⚠️  Could not extract project ID from URL');
    }

    logger.info('=== Troubleshooting Steps ===');
    logger.info('1. Verify your Supabase project is active (not paused)');
    logger.info('2. Check your internet connection');
    logger.info('3. Verify the URL in your .env.local file');
    logger.info('4. Try accessing the Supabase dashboard');
    logger.info('5. Check if your firewall/proxy is blocking requests');
  } catch (error) {
    logger.error('Error during diagnostics', error);
  }
}

