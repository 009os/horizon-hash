/**
 * Environment configuration with validation
 */

class EnvConfig {
  private validateEnvVar(name: string, value: string | undefined): string {
    if (!value) {
      throw new Error(`Missing required environment variable: ${name}`);
    }
    return value;
  }

  get supabaseUrl(): string {
    return this.validateEnvVar('NEXT_PUBLIC_SUPABASE_URL', process.env.NEXT_PUBLIC_SUPABASE_URL);
  }

  get supabaseAnonKey(): string {
    return this.validateEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  }

  get supabaseServiceRoleKey(): string | null {
    return process.env.SUPABASE_SERVICE_ROLE_KEY || null;
  }

  get redisUrl(): string {
    return this.validateEnvVar('UPSTASH_REDIS_REST_URL', process.env.UPSTASH_REDIS_REST_URL);
  }

  get redisToken(): string {
    return this.validateEnvVar('UPSTASH_REDIS_REST_TOKEN', process.env.UPSTASH_REDIS_REST_TOKEN);
  }

  get isDevelopment(): boolean {
    return process.env.NODE_ENV === 'development';
  }

  get jwtSecret(): string {
    return process.env.JWT_SECRET || this.supabaseAnonKey;
  }
}

export const env = new EnvConfig();

