import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'JuliProde',
  description: 'Formulario para realizar predicciones sobre un nacimiento',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
        {children}
      </body>
    </html>
  )
}

