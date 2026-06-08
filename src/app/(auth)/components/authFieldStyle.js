/**
 * Shared glass-input styling for the auth route group — mirrors the
 * field treatment established in contact-us/components/ContactForm.js
 * so every form in the app shares the same focus/error language.
 */
export function authFieldStyle(focused, hasError) {
  return {
    width: "100%",
    background: "var(--bg-tertiary)",
    border: `1px solid ${
      hasError ? "rgba(239,68,68,0.70)" : focused ? "var(--brand-mid)" : "var(--border-subtle)"
    }`,
    borderRadius: "0.875rem",
    color: "var(--text-primary)",
    fontSize: "0.875rem",
    padding: "0.75rem 1rem",
    outline: "none",
    boxShadow: focused && !hasError ? "0 0 0 3px rgba(108,92,231,0.15)" : "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
  };
}
