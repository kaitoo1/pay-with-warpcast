/**
 * Generates a cryptographically secure random nonce string
 * @param length The length of the nonce in bytes (default: 32)
 * @returns A hex string representation of the nonce
 */
export function generateNonce(length: number = 32): string {
  // Create a new Uint8Array with the specified length
  const randomBytes = new Uint8Array(length);

  // Fill it with cryptographically secure random values
  crypto.getRandomValues(randomBytes);

  // Convert to hex string
  return Array.from(randomBytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
