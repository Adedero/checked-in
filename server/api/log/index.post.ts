import * as z from 'zod';
import { logger } from '~~/server/lib/logger';

const schema = z.object({
  method: z.string(),
  args: z.array(z.any())
});

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, schema.safeParse);

  if (!body.success) {
    return { error: 'Invalid request body' };
  }

  const { method, args } = body.data;

  if (method in logger) {
    logger[method as keyof typeof logger](...args);

    return { success: true };
  }

  if (
    method in console &&
    typeof console[method as keyof Console] === 'function'
  ) {
    if (process.env.NODE_ENV === 'development') {
      (console[method as keyof Console] as (...args: unknown[]) => void)(
        ...args
      );
    }

    return { success: true };
  }

  return { success: false };
});
