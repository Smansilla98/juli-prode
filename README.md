# Prode de Nacimiento

Una aplicación web simple desarrollada con Next.js y TailwindCSS que permite realizar predicciones sobre un nacimiento y guardarlas en localStorage.

## 🚀 Características

- Formulario completo con todos los campos requeridos
- Interfaz moderna y responsive con TailwindCSS
- Guardado de datos en localStorage (sin backend)
- Tabla para visualizar todos los prodes guardados
- Eliminación de entradas individuales
- Toggle animado para seleccionar tipo de parto
- Diseño centrado y card con bordes suaves

## 📋 Requisitos

- Node.js 18+ 
- npm o yarn

## 🛠️ Instalación

1. Clona el repositorio o descarga los archivos
2. Instala las dependencias:

```bash
npm install
```

## 🏃 Ejecutar en desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📦 Build para producción

```bash
npm run build
npm start
```

## 🚢 Desplegar en Vercel

### Opción 1: Desde el Dashboard de Vercel

1. Ve a [vercel.com](https://vercel.com) e inicia sesión
2. Haz clic en "New Project"
3. Conecta tu repositorio de GitHub/GitLab/Bitbucket o sube los archivos manualmente
4. Vercel detectará automáticamente que es un proyecto Next.js
5. Haz clic en "Deploy" (no necesitas cambiar ninguna configuración)

### Opción 2: Desde la línea de comandos

1. Instala Vercel CLI globalmente:

```bash
npm i -g vercel
```

2. En la raíz del proyecto, ejecuta:

```bash
vercel
```

3. Sigue las instrucciones en pantalla para autenticarte y desplegar

### Configuración en Vercel

- **Framework Preset**: Next.js (se detecta automáticamente)
- **Build Command**: `npm run build` (por defecto)
- **Output Directory**: `.next` (por defecto)
- **Install Command**: `npm install` (por defecto)

No se requiere configuración adicional. Vercel detectará automáticamente Next.js y configurará todo correctamente.

## 📁 Estructura del Proyecto

```
prode-nacimiento/
├── app/
│   ├── globals.css          # Estilos globales con Tailwind
│   ├── layout.tsx           # Layout principal
│   └── page.tsx             # Página principal con el formulario
├── package.json
├── next.config.js
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## 🎨 Campos del Formulario

- **Nombre**: Nombre de quien realiza el prode
- **Fecha del nacimiento**: Selector de fecha
- **Hora del nacimiento**: Selector de hora
- **Peso**: Input numérico en kilogramos
- **Longitud**: Input numérico en centímetros
- **Tipo de parto**: Toggle entre Natural/Cesárea
- **Número de habitación**: Input de texto

## 💾 Almacenamiento

Los datos se guardan en `localStorage` del navegador con la clave `prodeNacimiento`. Los datos persisten entre sesiones pero son específicos del navegador y dispositivo. Puedes guardar múltiples entradas y visualizarlas todas en la tabla. Cada entrada tiene un botón para eliminarla individualmente.

## 🛠️ Tecnologías Utilizadas

- **Next.js 14**: Framework de React
- **React 18**: Biblioteca de UI
- **TypeScript**: Tipado estático
- **TailwindCSS**: Framework de estilos
- **PostCSS**: Procesador de CSS

## 📝 Notas

- La aplicación funciona completamente en el cliente (client-side)
- No requiere backend ni base de datos
- Los datos se guardan localmente en el navegador
- Compatible con todos los navegadores modernos

## 📄 Licencia

Este proyecto es de código abierto y está disponible para uso personal y comercial.

