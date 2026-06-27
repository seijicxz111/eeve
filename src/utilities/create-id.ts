export function createId(prefix = "sui"): string {
  if (globalThis.crypto?.randomUUID) {
    return `${prefix}-${globalThis.crypto.randomUUID()}`;
  }

  const bytes = new Uint8Array(16);
  globalThis.crypto?.getRandomValues(bytes);
  const fallback = Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join(
    ""
  );
  return `${prefix}-${fallback}`;
}
