/**
 * Redis Client Configuration
 * Uses centralized env config
 */

import { Redis } from '@upstash/redis';
import { env } from '@/core/config/env';

const redis = new Redis({
  url: env.redisUrl,
  token: env.redisToken,
});

export default redis;
