# 🖼️ Image Upload Fix - Pre-signed URLs

## 🔧 Problema y Solución

### El Problema Original
El código anterior intentaba subir imágenes directamente desde el frontend usando credenciales de R2, lo cual:
1. ❌ Expone las credenciales al navegador (SEGURIDAD)
2. ❌ No funciona con credenciales placeholder
3. ❌ Viola las políticas de CORS de Cloudflare R2

### La Solución Implementada ✅
Ahora usamos **Pre-signed URLs** generadas por un endpoint backend:
1. Frontend solicita URL de carga al backend
2. Backend genera URL firmada (pre-signed URL)
3. Frontend sube directamente a R2 con esa URL
4. Las credenciales nunca se exponen al navegador

## 📁 Archivos Nuevos

### `/api/upload-url.ts`
Endpoint Vercel Serverless Function que:
- ✅ Genera pre-signed URLs para subidas a R2
- ✅ Mantiene las credenciales seguras en el servidor
- ✅ Retorna URL de carga y URL pública
- ✅ Valida filename y fileType
- ✅ Configura CORS automáticamente

## 🔄 Flujo de Subida

```
FRONTEND                          BACKEND                    R2
   |                                |                         |
   |-- POST /api/upload-url  ------>|                         |
   |   { fileName, fileType }       |                         |
   |                                |-- Generate URL -------->|
   |<------ { uploadUrl, ... } ------|<--- Pre-signed URL ----|
   |                                |                         |
   |-- PUT uploadUrl + file ------>R2                         |
   |   (con pre-signed URL)         |                         |
   |<------ 200 OK ---------------R2                         |
   |                                |                         |
```

## 🚀 Cómo Funciona

### Paso 1: Frontend solicita URL
```typescript
fetch('/api/upload-url', {
  method: 'POST',
  body: JSON.stringify({
    fileName: 'image.jpg',
    fileType: 'image/jpeg'
  })
})
```

### Paso 2: Backend genera pre-signed URL
```typescript
// En /api/upload-url.ts
const command = new PutObjectCommand({...})
const uploadUrl = await getSignedUrl(r2Client, command, {
  expiresIn: 3600  // Válida por 1 hora
})
```

### Paso 3: Frontend sube directamente a R2
```typescript
fetch(uploadUrl, {
  method: 'PUT',
  body: file,
  headers: { 'Content-Type': file.type }
})
```

## ✨ Ventajas

| Aspecto | Antes | Ahora |
|--------|-------|-------|
| **Seguridad** | Credenciales expuestas | Credenciales en servidor |
| **CORS** | Problemas | Manejado en backend |
| **Credenciales** | Necesarias en frontend | Solo en backend |
| **URLs** | Hardcodeadas | Dinámicas y firmadas |
| **Control** | Frontend | Backend |

## 🔐 Seguridad

✅ Credenciales nunca se exponen al navegador
✅ URLs pre-firmadas expiran en 1 hora
✅ Validación en el servidor
✅ CORS configurado correctamente
✅ Método PUT seguro

## 🛠️ Instalación

Ya realizada:
```bash
pnpm add @aws-sdk/s3-request-presigner
```

## 📝 Cambios en cloudflareR2.ts

- ❌ Eliminado: S3Client creado en frontend
- ✅ Agregado: Llamada a `/api/upload-url`
- ✅ Agregado: Upload con fetch y pre-signed URL
- ✅ Agregado: Manejo de errores

## 🧪 Cómo Probar

1. Asegúrate de tener configuradas las variables R2 en `vercel.json` o `.env.local`
2. Inicia el servidor: `pnpm dev`
3. Ve a `/admin`
4. Login y crea un producto
5. Intenta subir una imagen
6. Debería funcionar sin errores

## 🐛 Si Sigue Sin Funcionar

### Error: "Failed to get upload URL"
- Verifica que `/api/upload-url.ts` existe
- Verifica VITE_R2_* variables en .env.local
- Abre la consola del navegador para ver el error

### Error: "Failed to upload file"
- Las credenciales R2 podrían ser inválidas
- El bucket podría no existir
- Verifica los permisos del API Token en Cloudflare

### CORS Error
- El endpoint debería tener CORS habilitado (ya está)
- Si persiste, revisa los headers en la respuesta

## 📚 Documentación

Para más info sobre pre-signed URLs:
- [AWS S3 Pre-signed URLs](https://docs.aws.amazon.com/AmazonS3/latest/userguide/PresignedUrlUploadObject.html)
- [Cloudflare R2 + AWS SDK](https://developers.cloudflare.com/r2/api/s3/api/#aws-sdk)

## 🔄 Variables Necesarias

Asegúrate de tener estas en tu `vercel.json` o `.env.local`:

```env
VITE_R2_ENDPOINT=https://xxxx.r2.cloudflarestorage.com
VITE_R2_ACCESS_KEY_ID=your_access_key
VITE_R2_SECRET_ACCESS_KEY=your_secret_key
VITE_R2_BUCKET_NAME=your_bucket
VITE_R2_PUBLIC_ENDPOINT=https://r2.charmstar.com
```

---

Con esta implementación, la subida de imágenes debería funcionar correctamente en desarrollo y producción (Vercel).
