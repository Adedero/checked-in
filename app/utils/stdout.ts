const handler: ProxyHandler<Console> = {
  get: (target, property) => {
    if (
      property in target &&
      typeof target[property as keyof Console] === 'function'
    ) {
      return (...args: unknown[]) => {
        (target[property as keyof Console] as (args: unknown[]) => void)(args);
        sendToAPI(property as string, args);
      };
    }
    return target[property as keyof Console];
  }
};

async function sendToAPI(method: string, args: unknown[]) {
  try {
    $fetch('/api/log', {
      method: 'POST',
      body: {
        method,
        args,
      }
    });
  } catch (error) {
    console.error('Failed to send log to API:', error);
  }
}

export const stdout = new Proxy(console, handler);
