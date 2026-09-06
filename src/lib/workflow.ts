/**
 * Normalizes a workflow test route ensuring that diagnostic tests
 * are correctly prefixed with `/tests/`.
 */
export function normalizeWorkflowPath(p: string): string {
  if (!p || typeof p !== "string") return "";
  const trimmed = p.trim();
  if (trimmed.startsWith("/tests/") || trimmed.startsWith("/guides/") || trimmed.startsWith("/monitor-inspection/")) {
    return trimmed;
  }
  return trimmed.startsWith("/") ? `/tests${trimmed}` : `/tests/${trimmed}`;
}