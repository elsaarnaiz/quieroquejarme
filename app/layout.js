export const metadata = {
  title: "QuieroQuejarme.es — Ventanilla única de incidencia ciudadana",
  description: "Tu derecho a quejarte. Tu poder para cambiar las cosas. Desde PNL en el Congreso hasta alegaciones urbanísticas. Sin jerga, sin burocracia, sin coste.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  )
}
