# 🚀 Guía Rápida de Despliegue en Vercel

## Opción 1: Desplegar desde GitHub/GitLab/Bitbucket (Recomendado)

1. **Sube tu código a un repositorio Git:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <tu-repositorio-url>
   git push -u origin main
   ```

2. **En Vercel:**
   - Ve a [vercel.com](https://vercel.com) e inicia sesión
   - Haz clic en "New Project"
   - Conecta tu repositorio
   - Vercel detectará automáticamente Next.js
   - Haz clic en "Deploy"
   - ¡Listo! Tu app estará en línea en menos de 2 minutos

## Opción 2: Desplegar desde la línea de comandos

1. **Instala Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **En la carpeta del proyecto, ejecuta:**
   ```bash
   vercel
   ```

3. **Sigue las instrucciones:**
   - Inicia sesión con tu cuenta de Vercel
   - Confirma la configuración (presiona Enter para aceptar los valores por defecto)
   - Espera a que termine el despliegue

4. **Para actualizaciones futuras:**
   ```bash
   vercel --prod
   ```

## ✅ Checklist antes de desplegar

- [x] El proyecto compila correctamente (`npm run build`)
- [x] No hay errores de TypeScript
- [x] Todos los archivos necesarios están en el repositorio
- [x] El `.gitignore` está configurado correctamente

## 📝 Notas importantes

- **No necesitas configuración adicional**: Vercel detecta automáticamente Next.js
- **Build automático**: Cada push a la rama principal despliega automáticamente
- **Variables de entorno**: Si necesitas agregar variables de entorno, hazlo en el dashboard de Vercel
- **Dominio personalizado**: Puedes agregar un dominio personalizado desde el dashboard

## 🔗 URLs después del despliegue

Después del despliegue, Vercel te proporcionará:
- Una URL de producción: `https://tu-proyecto.vercel.app`
- Una URL de preview para cada pull request (si usas Git)

¡Tu aplicación estará lista para usar! 🎉

