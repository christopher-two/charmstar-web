# Vercel Deployment Configuration

Este archivo contiene las instrucciones para desplegar la aplicación en Vercel.

## Pasos para desplegar:

### 1. Conectar repositorio a Vercel
1. Ve a [Vercel Dashboard](https://vercel.com)
2. Haz clic en "Add New..." → "Project"
3. Importa tu repositorio de GitHub
4. Selecciona `charmstar-web` como proyecto

### 2. Configurar Variables de Entorno

En Vercel, ve a **Settings** → **Environment Variables** y agrega todas las variables del archivo `.env.example`:

#### Firebase Variables
```
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
```

#### Cloudflare R2 Variables
```
VITE_R2_ACCOUNT_ID
VITE_R2_ACCESS_KEY_ID
VITE_R2_SECRET_ACCESS_KEY
VITE_R2_BUCKET_NAME
VITE_R2_ENDPOINT
VITE_R2_PUBLIC_ENDPOINT
```

#### Admin Variables
```
VITE_ADMIN_DEFAULT_EMAIL
```

### 3. Configurar Build Settings

Las configuraciones por defecto deberían funcionar:
- **Framework Preset**: Vite
- **Build Command**: `pnpm build` (automático)
- **Output Directory**: `dist` (automático)
- **Install Command**: `pnpm install` (automático)

### 4. Desplegar

Una vez configuradas las variables de entorno:
1. Haz clic en "Deploy"
2. Vercel automáticamente:
   - Clona el repositorio
   - Instala dependencias
   - Compila el proyecto
   - Despliega en tu dominio

## Variables de Entorno en Detalle

### Firebase Configuration
Las variables de Firebase se obtienen de:
1. Firebase Console → Proyecto → Project Settings
2. Copia el objeto de configuración que aparece bajo "SDK setup and configuration"

### Cloudflare R2 Configuration
Obtén estas credenciales de:
1. Cloudflare Dashboard → R2 → Create Bucket (si no existe)
2. Account → API Tokens → Create Token
   - Permiso: `account.r2:*`
   - Recursos: Todos los buckets
3. R2 → Settings → Bucket Details
   - `Endpoint`: Copia la URL S3 API
   - `Public Endpoint`: Si configuraste un dominio personalizado, úsalo aquí

## Deployment automático

Después de la configuración inicial:
- **Push a `main`** → Deployment automático
- **Pull Requests** → Preview deployment automático
- **Rollback fácil** a deployments anteriores desde Vercel Dashboard

## Monitoreo

En Vercel Dashboard puedes:
- Ver logs en tiempo real
- Revisar el historial de deployments
- Configurar notificaciones
- Monitorear rendimiento y analíticas

## Troubleshooting Vercel

### Build falló con error de Firebase
- Verifica que todas las variables `VITE_FIREBASE_*` estén presentes
- No incluyas `NEXT_PUBLIC_` en nombres de variables (usa `VITE_` para Vite)

### Imágenes no cargan
- Verifica el `VITE_R2_PUBLIC_ENDPOINT`
- Asegúrate que la política de bucket permite lectura pública

### Login no funciona
- Verifica que Firebase Auth esté habilitado
- Confirma que existe un usuario en Firebase Console
- Revisa la consola del navegador para más detalles

## Dominios Personalizados

Para usar un dominio personalizado:
1. Ve a Vercel Project → Domains
2. Agrega tu dominio
3. Sigue las instrucciones de configuración de DNS
4. Espera a que se propague (puede tomar hasta 48 horas)

## Certificado SSL/TLS

Vercel proporciona certificados SSL/TLS automáticamente con Let's Encrypt.
No requiere configuración adicional.
