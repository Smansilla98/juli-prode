# Guía de Configuración de Supabase

## Pasos para configurar Supabase

### 1. Crear cuenta en Supabase
- Ve a [supabase.com](https://supabase.com)
- Haz clic en "Sign Up"
- Crea una nueva cuenta con GitHub o correo

### 2. Crear nuevo proyecto
- Haz clic en "New Project"
- Dale un nombre (ej: "juli-prode")
- Crea una contraseña segura para la base de datos
- Selecciona la región más cercana
- Espera a que se cree el proyecto (toma unos minutos)

### 3. Obtener las credenciales
- Ve a **Settings > API**
- Copia:
  - **Project URL** → será tu `NEXT_PUBLIC_SUPABASE_URL`
  - **anon public** → será tu `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 4. Crear la tabla en Supabase
- Ve a **SQL Editor**
- Haz clic en "New Query"
- Copia y pega este SQL:

```sql
-- Crear tabla prodes
CREATE TABLE prodes (
  id BIGSERIAL PRIMARY KEY,
  nombre TEXT NOT NULL,
  fecha_nacimiento DATE NOT NULL,
  hora_nacimiento TIME NOT NULL,
  peso DECIMAL(5,2) NOT NULL,
  longitud DECIMAL(5,2) NOT NULL,
  tipo_parto TEXT NOT NULL CHECK (tipo_parto IN ('Natural', 'Cesárea')),
  numero_habitacion TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Crear índice para ordenamiento más rápido
CREATE INDEX idx_prodes_created_at ON prodes(created_at DESC);

-- Habilitar RLS (Row Level Security)
ALTER TABLE prodes ENABLE ROW LEVEL SECURITY;

-- Crear política para leer todos los registros
CREATE POLICY "Allow public read" ON prodes
  FOR SELECT USING (true);

-- Crear política para insertar sin autenticación
CREATE POLICY "Allow public insert" ON prodes
  FOR INSERT WITH CHECK (true);

-- Crear política para eliminar sin autenticación
CREATE POLICY "Allow public delete" ON prodes
  FOR DELETE USING (true);
```

- Haz clic en "Run"

### 5. Configurar variables de entorno
- Copia el archivo `.env.local.example` a `.env.local`:
  ```bash
  cp .env.local.example .env.local
  ```

- Edita `.env.local` y reemplaza:
  - `NEXT_PUBLIC_SUPABASE_URL` con tu Project URL
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY` con tu anon key

### 6. Prueba la conexión
- Inicia el servidor: `npm run dev`
- La app debería conectarse a Supabase automáticamente
- Los datos nuevos se guardarán en la base de datos

## Notas importantes
- Las variables `NEXT_PUBLIC_*` son públicas (se envían al cliente)
- Esto es seguro porque Supabase tiene Row Level Security habilitado
- Los datos se pueden leer, crear y eliminar públicamente (puedes cambiar esto en las políticas)

## Troubleshooting
- **Error de conexión**: Verifica que las variables de entorno estén correctas
- **Error de tabla no encontrada**: Ejecuta el SQL de crear tabla nuevamente
- **Permisos denegados**: Comprueba que las políticas RLS están habilitadas
