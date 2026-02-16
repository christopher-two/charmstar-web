# charmstar-web

E-commerce de accesorios con panel administrativo completo.

## 🚀 Quick Start

```bash
# 1. Instalar dependencias
pnpm install

# 2. Configurar credenciales (ver CREDENTIALS_SETUP.md)
cp .env.example .env.local
# Edita .env.local con tus credenciales

# 3. Iniciar desarrollo
pnpm dev

# 4. Acceder a admin
# http://localhost:5173/admin/login
```

## 📦 Estructura del Proyecto

```
charmstar-web/
├── src/
│   ├── pages/           # Páginas (Landing, Shop, Admin)
│   ├── components/      # Componentes reutilizables
│   │   └── admin/       # Componentes del panel admin
│   ├── context/         # React Context (Cart, Auth)
│   ├── lib/             # Servicios (Firebase, R2)
│   ├── types/           # Tipos TypeScript
│   └── data/            # Datos estáticos
├── public/              # Assets estáticos
├── dist/                # Build producción
└── CREDENCIALES_SETUP.md  # Guía de credenciales
```

## ✨ Características

### 🛍️ Shop Pública
- Catálogo de productos
- Filtros por categoría
- Carrito de compras
- Diseño responsive

### 👨‍💼 Panel Admin
- **Login**: Autenticación con Firebase
- **CRUD**: Gestión completa de productos
- **Búsqueda**: Por nombre y categoría
- **Imágenes**: Subida a Cloudflare R2
- **Base de datos**: Firestore

## 🔧 Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS, Vite
- **Routing**: React Router v7
- **Auth**: Firebase Authentication
- **Database**: Firebase Firestore
- **Storage**: Cloudflare R2
- **Forms**: React Hook Form + Zod
- **UI**: Lucide Icons, React Hot Toast

## 📚 Documentación

| Archivo | Descripción |
|---------|-------------|
| `QUICK_START.md` | Inicio rápido en 3 pasos |
| `CREDENTIALS_SETUP.md` | Guía para obtener credenciales |
| `ADMIN_SETUP.md` | Configuración detallada del admin |
| `VERCEL_DEPLOYMENT.md` | Cómo desplegar en Vercel |
| `IMPLEMENTATION_SUMMARY.md` | Resumen técnico completo |
| `.env.example` | Template de variables de entorno |

## 🔐 Setup Credenciales

Para que funcione el admin panel necesitas:

1. **Firebase** (Auth + Firestore)
   - Ve a [Firebase Console](https://console.firebase.google.com)
   - Crea un nuevo proyecto
   - Habilita Email/Password Auth
   - Crea Firestore Database
   - Obtén las credenciales

2. **Cloudflare R2** (Almacenamiento de imágenes)
   - Ve a [Cloudflare Dashboard](https://dash.cloudflare.com)
   - Crea un bucket R2
   - Crea un API Token
   - Obtén Access Key y Secret Key

Ver `CREDENTIALS_SETUP.md` para instrucciones paso a paso.

## 🚀 Despliegue

### Local
```bash
pnpm dev          # Inicia servidor
pnpm build        # Build de producción
pnpm preview      # Vista previa del build
pnpm lint         # Validar código
```

### Vercel
1. Push a GitHub
2. Conecta en Vercel
3. Configura environment variables
4. Deploy automático

Ver `VERCEL_DEPLOYMENT.md` para detalles completos.

## 🔑 Variables de Entorno

Necesitas configurar 13 variables en `.env.local`:

**Firebase (6):**
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`

**Cloudflare R2 (6):**
- `VITE_R2_ACCOUNT_ID`
- `VITE_R2_ACCESS_KEY_ID`
- `VITE_R2_SECRET_ACCESS_KEY`
- `VITE_R2_BUCKET_NAME`
- `VITE_R2_ENDPOINT`
- `VITE_R2_PUBLIC_ENDPOINT`

**Admin (1):**
- `VITE_ADMIN_DEFAULT_EMAIL`

Ver `.env.example` para template.

## 📖 Admin Panel Routes

| Ruta | Descripción | Acceso |
|------|-------------|--------|
| `/admin/login` | Página de login | Público |
| `/admin` | Dashboard | Protegido |

## 🎯 Próximos Pasos

1. ✅ Clonar repositorio
2. ⬜ Instalar dependencias: `pnpm install`
3. ⬜ Configurar credenciales (ver `CREDENTIALS_SETUP.md`)
4. ⬜ Crear `.env.local` con tus valores
5. ⬜ Test en local: `pnpm dev`
6. ⬜ Crear usuario admin en Firebase
7. ⬜ Deploy a Vercel

## 📝 Licencia

Privado - Proyecto de Charmstar

## 🤝 Contribuciones

Cambios solo mediante pull requests en este repositorio.

---

Para empezar: Ver `QUICK_START.md` o `CREDENTIALS_SETUP.md`
