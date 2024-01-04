export const isNodeJsError = (err: unknown): err is NodeJS.ErrnoException => {
  if (err instanceof Error) {
    return true;
  } else {
    return false;
  }
};
