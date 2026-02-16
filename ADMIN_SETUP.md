# Admin Panel Setup Guide

## Environment Variables Configuration

Este proyecto incluye un panel administrativo completamente funcional. Para que funcione, necesitas configurar las siguientes variables de entorno.

### 1. Firebase Configuration

Primero, crea un proyecto en [Firebase Console](https://console.firebase.google.com):

1. Crea un nuevo proyecto
2. Habilita **Authentication** con Email/Password
3. Crea una base de datos **Firestore** en modo de producción
4. Ve a Project Settings → Service Accounts → SDK de Firebase y copia las credenciales

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 2. Cloudflare R2 Configuration

Para configurar Cloudflare R2:

1. Ve a [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navega a **R2** → Crea un bucket
3. Crea un API Token en **Account > API Tokens**:
   - Permiso: `account.r2:*`
   - Guardia: `All accounts`

4. Ve a **R2** → Settings → Ubicación del endpoint

```env
VITE_R2_ACCOUNT_ID=your_account_id
VITE_R2_ACCESS_KEY_ID=your_access_key
VITE_R2_SECRET_ACCESS_KEY=your_secret_key
VITE_R2_BUCKET_NAME=your-bucket-name
VITE_R2_ENDPOINT=https://your_account_id.r2.cloudflarestorage.com
VITE_R2_PUBLIC_ENDPOINT=https://your_public_endpoint.com
```

### 3. Despliegue en Vercel

1. Conecta tu repositorio a Vercel
2. Ve a **Project Settings** → **Environment Variables**
3. Agrega todas las variables del `.env.example`
4. Deploy automáticamente

## Estructura del Panel Admin

### Rutas
- `/admin/login` - Página de login
- `/admin` - Dashboard principal (protegido)

### Características

#### 1. **Autenticación**
- Login con email/password usando Firebase Auth
- Sesión persistente
- Logout seguro

#### 2. **Gestión de Productos (CRUD)**
- ✅ **Create**: Crear nuevos productos
- ✅ **Read**: Listar todos los productos
- ✅ **Update**: Editar productos existentes
- ✅ **Delete**: Eliminar productos

#### 3. **Búsqueda y Filtros**
- Búsqueda por nombre de producto
- Filtro por categoría
- Datos actualizados en tiempo real

#### 4. **Subida de Imágenes**
- Carga de imágenes a Cloudflare R2
- Validación de tipo de archivo
- Limitación de tamaño (5MB máximo)
- Preview de imagen antes de guardar

#### 5. **Base de Datos**
- Firestore como base de datos
- Timestamps automáticos de creación/actualización
- Documentos organizados en colección "products"

## Modelo de Datos - Producto

```javascript
{
  id: string,
  name: string,
  price: number,
  category: 'Charms' | 'Pulseras' | 'Collares' | 'Anillos' | 'Sonny Angel' | 'Accesorios',
  image: string,              // URL de imagen principal
  images: string[],           // URLs de imágenes adicionales
  description: string,        // Descripción opcional
  createdAt: timestamp,       // Fecha de creación
  updatedAt: timestamp        // Fecha de última actualización
}
```

## Seguridad

### Reglas de Firestore (Recomendadas)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Solo usuarios autenticados pueden leer/escribir
    match /products/{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### Reglas de R2

1. Crea una política de bucket para permitir lectura pública
2. Limita permisos de escritura solo a tu aplicación
3. Implementa validación en servidor si es posible

## Desarrollo Local

```bash
# Instalar dependencias
pnpm install

# Crear archivo .env.local con tus credenciales
cp .env.example .env.local

# Ejecutar en modo desarrollo
pnpm dev

# Acceder al admin
# http://localhost:5173/admin/login
```

## Troubleshooting

### "Failed to initialize Firebase"
- Verifica que todas las variables `VITE_FIREBASE_*` estén correctas
- Asegúrate de que el proyecto Firebase está activo

### "Failed to upload image"
- Verifica credenciales de R2
- Verifica que el bucket existe
- Revisa la consola del navegador para más detalles

### "Login failed"
- Confirma que el usuario existe en Firebase Auth
- Usa email/password que creaste en Firebase Console

## Próximos Pasos Recomendados

1. Crear usuario admin en Firebase Auth
2. Integrar el listado de productos del admin con la shop
3. Agregar características avanzadas:
   - Edición en línea de productos
   - Bulk upload de imágenes
   - Reportes de ventas
   - Gestión de inventario
