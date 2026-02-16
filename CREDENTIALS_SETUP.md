# 🔑 Setup Credenciales - Guía Paso a Paso

## ⚠️ IMPORTANTE

El archivo `.env.local` contiene credenciales **de prueba solamente**.  
Es seguro de compartir porque son valores placeholder.

Para que la app funcione, debes reemplazar estos valores con tus credenciales reales de:
- **Firebase** (Google)
- **Cloudflare R2** (Cloudflare)

## 🚀 Paso 1: Firebase Setup

### 1.1 Crear Proyecto Firebase
1. Ve a [Firebase Console](https://console.firebase.google.com)
2. Haz clic en **"Add project"**
3. Nombre: `charmstar` (o tu preferencia)
4. Habilita Google Analytics (opcional)
5. Espera a que se cree el proyecto

### 1.2 Obtener Credenciales Firebase
1. En el proyecto, ve a **⚙️ Project Settings**
2. Ve a la pestaña **"Service Accounts"** o **"Apps"**
3. Copia el objeto de configuración Firebase (bajo "SDK setup and configuration")
4. Deberá verse así:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "charmstar-xxx.firebaseapp.com",
  projectId: "charmstar-xxx",
  storageBucket: "charmstar-xxx.appspot.com",
  messagingSenderId: "123456789...",
  appId: "1:123456789...:web:abc..."
};
```

### 1.3 Habilitar Authentication
1. En el proyecto Firebase, ve a **Authentication**
2. Haz clic en **"Get started"**
3. Selecciona **"Email/Password"**
4. Habilita "Email/Password Sign-in"
5. Crea un usuario:
   - Email: `admin@charmstar.com` (o el que prefieras)
   - Password: (crea uno seguro)

### 1.4 Crear Firestore Database
1. En Firebase, ve a **Firestore Database**
2. Haz clic en **"Create database"**
3. Modo: **"Start in production mode"** (o testing para desarrollo)
4. Ubicación: Elige la más cercana
5. Crea la base de datos

### 1.5 Actualizar `.env.local`
Reemplaza en `.env.local`:
```env
VITE_FIREBASE_API_KEY=AIzaSy...           # Tu apiKey
VITE_FIREBASE_AUTH_DOMAIN=charmstar-xxx.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=charmstar-xxx    # Tu projectId
VITE_FIREBASE_STORAGE_BUCKET=charmstar-xxx.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789...
VITE_FIREBASE_APP_ID=1:123456789...:web:abc...
```

---

## ☁️ Paso 2: Cloudflare R2 Setup

### 2.1 Crear Bucket R2
1. Ve a [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Ve a **R2** (en el menú lateral)
3. Haz clic en **"Create bucket"**
4. Nombre: `charmstar-products` (o similar)
5. Ubicación: Automática
6. Crear bucket

### 2.2 Crear API Token
1. En Cloudflare, ve a **Account → API Tokens**
2. Haz clic en **"Create Token"** (si no está, usa "Create API Token")
3. Selecciona plantilla **"Edit Cloudflare Workers"** o **"Custom token"**
4. Permisos necesarios:
   - `account.r2:*` (acceso a R2)
   - O específicamente: `account.r2.bucket.contents:edit`
5. Recursos: **"All accounts"** (o tu cuenta específica)
6. TTL: Sin expiración (o 12 meses)
7. Copia el token (solo se muestra una vez)

### 2.3 Obtener Credenciales R2
1. En Cloudflare, ve a **R2 → Settings** (tu bucket)
2. Busca **"Endpoint"** - verás algo como:
   ```
   https://a1b2c3d4e5f6g7h8i9j0k1l2.r2.cloudflarestorage.com
   ```
3. El Account ID es la parte antes de `.r2.cloudflarestorage.com`

El API Token que creaste tiene:
- **Access Key ID**: Primer parte del token
- **Secret Access Key**: Segunda parte (parte privada)

### 2.4 Configurar Dominio Público (Opcional)
Si quieres URLs públicas sin exponentes los tokens:
1. En R2 settings, busca **"Custom domain"**
2. Agrega un dominio personalizado o usa Cloudflare Pages
3. Esto genera URLs públicas como `https://images.charmstar.com/products/...`

### 2.5 Actualizar `.env.local`
Reemplaza en `.env.local`:
```env
VITE_R2_ACCOUNT_ID=a1b2c3d4e5f6g7h8i9j0k1l2
VITE_R2_ACCESS_KEY_ID=your_access_key_here
VITE_R2_SECRET_ACCESS_KEY=your_secret_key_here
VITE_R2_BUCKET_NAME=charmstar-products
VITE_R2_ENDPOINT=https://a1b2c3d4e5f6g7h8i9j0k1l2.r2.cloudflarestorage.com
VITE_R2_PUBLIC_ENDPOINT=https://r2.charmstar.com  # O tu dominio público
```

---

## ✅ Verificar Setup

### Test Local
```bash
pnpm dev
# Abre http://localhost:5173/admin/login
# Intenta login con: admin@charmstar.com + tu password
```

### Test Crear Producto
1. Login exitoso → vas a dashboard
2. Haz clic en "+ Add New Product"
3. Completa el formulario
4. Sube una imagen
5. Guarda

Si todo funciona sin errores: ✅ ¡Credenciales correctas!

---

## 🔒 Seguridad

### NO HAGAS:
❌ Commitear `.env.local` con credenciales reales  
❌ Compartir tokens en chat o email  
❌ Usar la misma contraseña que otros servicios  
❌ Exponer los tokens en el frontend sin permiso  

### BUENAS PRÁCTICAS:
✅ El `.env.local` ya está en `.gitignore`  
✅ Para Vercel, configura env vars en UI  
✅ Rota tokens regularmente  
✅ Usa tokens con permisos específicos  
✅ Monitorea el uso de R2  

---

## 🐛 Troubleshooting

### Error: "Failed to initialize Firebase"
→ Verifica que los valores `VITE_FIREBASE_*` están correctos  
→ Verifica que el proyecto Firebase está activo  

### Error: "Failed to upload image"
→ Verifica credenciales R2  
→ Verifica que el bucket existe  
→ Verifica permisos del API token  

### Error: "Login failed"
→ Verifica que el usuario existe en Firebase Auth  
→ Verifica que email/password son correctos  
→ Ve a Firebase Console → Authentication → Users  

### Error: "Firestore permission denied"
→ En Firestore, ve a Rules  
→ Reemplaza con reglas más permisivas para testing:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /products/{document=**} {
      allow read, write: if true;  // Solo para testing!
    }
  }
}
```

---

## 🎯 Siguientes Pasos

1. ✅ Crear `.env.local` (YA HECHO)
2. ⬜ Reemplazar valores con tus credenciales
3. ⬜ Crear usuario admin en Firebase
4. ⬜ Test en local: `pnpm dev`
5. ⬜ Si todo funciona: push a GitHub
6. ⬜ Connectar a Vercel
7. ⬜ Configurar env vars en Vercel
8. ⬜ Deploy

---

## 📝 Checklist

- [ ] Tengo credenciales Firebase
- [ ] Tengo credenciales Cloudflare R2
- [ ] `.env.local` actualizado con valores reales
- [ ] Usuario admin creado en Firebase
- [ ] Test local funciona
- [ ] Puedo hacer login
- [ ] Puedo crear un producto
- [ ] Puedo subir imagen
- [ ] El producto se guarda en Firestore

Si marcaste todo ✅ entonces está **100% listo para Vercel**.
