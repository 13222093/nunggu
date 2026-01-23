/**
 * API Key Authentication Helpers
 *
 * Validates the X-API-Key header against the configured WEBHOOK_API_KEY.
 * Used to protect webhook endpoints for bot integration.
 */

/**
 * Helper function to validate API key
 */
export function validateApiKey(apiKey: string | null | undefined): boolean {
  const validKey = process.env.WEBHOOK_API_KEY || 'dev-api-key';
  return apiKey === validKey;
}

/**
 * Get the valid API key (for documentation purposes)
 */
export function getValidApiKey(): string {
  return process.env.WEBHOOK_API_KEY || 'dev-api-key';
}
