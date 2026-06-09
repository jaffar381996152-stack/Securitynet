export function authFieldStyle(focused, hasError) {
  return {
    width: "100%",
    background: "var(--bg-tertiary)",
    border: `1px solid ${
      hasError ? "var(--c-danger)" : focused ? "var(--gold)" : "var(--border-sub)"
    }`,
    borderRadius: 0,
    color: "var(--text-primary)",
    fontFamily: "var(--font-mono)",
    fontSize: "0.875rem",
    letterSpacing: "0.04em",
    padding: "0.75rem 1rem",
    outline: "none",
    boxShadow: focused && !hasError ? "0 0 0 2px rgba(212,175,110,0.12)" : "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
  };
}
