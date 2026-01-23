export function wait(ms: number, signal: AbortSignal) {
  return new Promise<void>((resolve) => {
    const timeout = setTimeout(() => {
      resolve();
    }, ms);

    signal.addEventListener('abort', () => {
      clearTimeout(timeout);
    });
  });
}
