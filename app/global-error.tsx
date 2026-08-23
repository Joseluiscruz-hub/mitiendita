"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="es">
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif", background: "#0f172a", color: "#f8fafc" }}>
        <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: "2rem", textAlign: "center" }}>
          <section style={{ maxWidth: "32rem" }}>
            <h1 style={{ marginBottom: "0.75rem", fontSize: "1.5rem" }}>La aplicación encontró un error</h1>
            <p style={{ marginBottom: "1rem", lineHeight: 1.5, color: "#cbd5e1" }}>
              Vuelve a intentar la carga. Si el problema persiste, revisa los registros de Vercel.
            </p>
            <button
              type="button"
              onClick={() => reset()}
              style={{ border: 0, borderRadius: "9999px", padding: "0.75rem 1.25rem", fontWeight: 700, cursor: "pointer" }}
            >
              Reintentar
            </button>
            <p style={{ marginTop: "1rem", fontSize: "0.875rem", color: "#94a3b8" }}>{error.digest ?? "sin digest"}</p>
          </section>
        </main>
      </body>
    </html>
  );
}
