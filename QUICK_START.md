# 🚀 QUICK START GUIDE - Admin Panel

## Resumen Rápido ⚡

Se implementó un **panel administrativo completo** con:
- ✅ Autenticación con Firebase
- ✅ CRUD de productos con Firestore
- ✅ Subida de imágenes a Cloudflare R2
- ✅ Búsqueda y filtros
- ✅ Listo para Vercel

## 3 Pasos para Empezar

### 1️⃣ Obtener Credenciales
```
Firebase:   https://console.firebase.google.com
Cloudflare: https://dash.cloudflare.com
```

Copia las 13 variables de `.env.example`

### 2️⃣ Crear `.env.local` (desarrollo)
```bash
cp .env.example .env.local
# Edita .env.local con tus credenciales
```

### 3️⃣ Ejecutar en Local
```bash
pnpm install  # Si no lo hiciste
pnpm dev      # Inicia servidor
# Abre http://localhost:5173/admin/login
```

## URLs Importantes

| Ruta | URL |
|------|-----|
| **Admin Login** | `/admin/login` |
| **Dashboard** | `/admin` (protegido) |

## Flujo Principal

```
1. Ir a /admin/login
2. Ingresar email/password creados en Firebase Auth
3. Dashboard muestra lista de productos
4. Crear producto:
   - Llenar formulario
   - Subir imagen a R2
   - Guardar en Firestore
5. Buscar/Filtrar productos
6. Eliminar productos
```

## Variables de Entorno

### Mínimas Necesarias (6)
```env
VITE_FIREBASE_API_KEY=xxx
VITE_FIREBASE_AUTH_DOMAIN=xxx
VITE_FIREBASE_PROJECT_ID=xxx
VITE_R2_ENDPOINT=xxx
VITE_R2_ACCESS_KEY_ID=xxx
VITE_R2_SECRET_ACCESS_KEY=xxx
```

Ver `.env.example` para todas las 13 variables.

## Firebase Setup (5 min)

```
1. Crear proyecto en https://console.firebase.google.com
2. Auth → Email/Password → Habilitar
3. Firestore → Crear base de datos
4. Project Settings → Copiar SDK config
5. Crear usuario con email/password
```

## Cloudflare R2 Setup (5 min)

```
1. Crear bucket en R2
2. Account → API Tokens → New Token
3. Permiso: account.r2:* | All buckets
4. Copiar credenciales
5. Obtener endpoint en R2 → Settings
```

## Vercel Deployment (2 min)

```
1. git push al repositorio
2. Connectar a Vercel
3. Settings → Environment Variables
4. Agregar todas las variables del .env.example
5. Deploy automático
```

Más detalles: `VERCEL_DEPLOYMENT.md`

## Archivos Importantes

| Archivo | Propósito |
|---------|-----------|
| `ADMIN_SETUP.md` | Guía completa de configuración |
| `VERCEL_DEPLOYMENT.md` | Instrucciones para Vercel |
| `IMPLEMENTATION_SUMMARY.md` | Resumen técnico |
| `.env.example` | Plantilla de variables |

## Estructura Básica

```
Admin Panel
├─ Login (/admin/login)
└─ Dashboard (/admin)
   ├─ Tabla de productos
   │  ├─ Search
   │  ├─ Filter by category
   │  ├─ Edit
   │  └─ Delete
   └─ Formulario crear
      ├─ Nombre, Precio, Categoría
      ├─ Upload imagen → R2
      └─ Guardar → Firestore
```

## Comandos Útiles

```bash
# Desarrollo
pnpm dev

# Build para producción
pnpm build

# Ver preview del build
pnpm preview

# Linting
pnpm lint
```

## Estado del Proyecto

✅ **Build**: Exitoso (TypeScript sin errores)  
✅ **Rutas**: 2 rutas admin implementadas  
✅ **CRUD**: Completo (C-R-D, U estructurado)  
✅ **Imágenes**: Integración R2 lista  
✅ **Auth**: Firebase Auth implementado  
✅ **UI**: Responsive, dark mode  
✅ **Documentación**: Completa  

## ¿Qué Sigue?

```
1. Setup credenciales (5-10 min)
2. Test local (login → crear producto)
3. Deploy a Vercel
4. Integrar productos en shop
5. Agregar features (reportes, edición, etc)
```

## Soporte Rápido

**Build falla:**  
→ Verifica que `.env.local` tenga las variables correctas

**Login no funciona:**  
→ Verifica que el usuario existe en Firebase Auth

**Imagen no se sube:**  
→ Verifica credenciales de R2 y permisos

**Producto no se guarda:**  
→ Verifica que Firestore está habilitado

---

🎉 **¡Tu admin panel está listo!**

Próximo paso: Configurar credenciales y hacer git push a Vercel.
