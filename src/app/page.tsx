export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "1rem",
        backgroundColor: "var(--bg-primary)",
        color: "var(--text-primary)",
        fontFamily: "var(--font-jakarta)",
      }}
    >
      <h1
        style={{
          fontSize: "2rem",
          fontWeight: 700,
          color: "var(--accent-primary)",
        }}
      >
        SafeMGM
      </h1>
      <p style={{ color: "var(--text-secondary)" }}>
        AI-Powered Public Safety Intelligence — Montgomery, AL
      </p>
      <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>
        Dashboard loading... Feature 3 will replace this page.
      </p>
    </main>
  );
}
