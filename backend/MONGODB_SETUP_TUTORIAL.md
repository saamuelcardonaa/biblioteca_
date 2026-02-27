# 📘 Tutorial: Conectar MongoDB Atlas a tu Proyecto

Esta guía paso a paso te mostrará cómo crear y conectar una base de datos MongoDB Atlas (gratuita) a tu proyecto.

---

## 📋 Paso 1: Crear Cuenta en MongoDB Atlas

1. Ve a: **https://www.mongodb.com/cloud/atlas/register**
2. Completa el formulario de registro (puedes usar Google/GitHub)
3. Verifica tu email
4. Inicia sesión en MongoDB Atlas

---

## 🗄️ Paso 2: Crear un Cluster (Base de Datos)

1. Una vez dentro, click en **"Build a Database"** o **"Create"**

2. Selecciona el plan **FREE (M0)**:
   - ✅ Shared (Gratis)
   - ✅ 512 MB de almacenamiento
   - ✅ Ideal para desarrollo

3. Configuración del cluster:
   - **Cloud Provider**: AWS (recomendado)
   - **Region**: Selecciona la más cercana (ej: `us-east-1` o `europe-west1`)
   - **Cluster Name**: `Cluster0` (o el nombre que prefieras)

4. Click en **"Create Cluster"** (tomará 1-3 minutos)

---

## 👤 Paso 3: Crear Usuario de Base de Datos

1. En el menú lateral, ve a **"Database Access"** (bajo Security)

2. Click en **"Add New Database User"**

3. Configuración del usuario:
   ```
   Authentication Method: Password
   Username: biblioteca
   Password: [Genera una contraseña segura o crea la tuya]
   ```
   
   ⚠️ **IMPORTANTE**: Guarda esta contraseña, la necesitarás más adelante

4. En **"Database User Privileges"**, selecciona:
   - ✅ **Read and write to any database**

5. Click en **"Add User"**

---

## 🌐 Paso 4: Configurar Acceso de Red

1. En el menú lateral, ve a **"Network Access"** (bajo Security)

2. Click en **"Add IP Address"**

3. Para desarrollo, tienes dos opciones:

   **Opción A - Permitir cualquier IP (más fácil para desarrollo):**
   ```
   IP Address: 0.0.0.0/0
   Description: Allow access from anywhere
   ```

   **Opción B - Solo tu IP actual (más seguro):**
   ```
   Click en "Add Current IP Address"
   ```

4. Click en **"Confirm"**

---

## 🔗 Paso 5: Obtener Connection String

1. Ve a **"Database"** en el menú lateral

2. En tu cluster, click en **"Connect"**

3. Selecciona **"Connect your application"**

4. Configuración:
   - **Driver**: Node.js
   - **Version**: 5.5 or later (o la más reciente)

5. Copia el **Connection String**, se verá así:
   ```
   mongodb+srv://biblioteca:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

6. **MODIFICA el connection string**:
   
   **Antes:**
   ```
   mongodb+srv://biblioteca:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
   
   **Después:**
   ```
   mongodb+srv://biblioteca:TU_PASSWORD_REAL@cluster0.xxxxx.mongodb.net/biblioteca?retryWrites=true&w=majority
   ```
   
   Cambios importantes:
   - ✅ Reemplaza `<password>` con tu contraseña real del usuario
   - ✅ Agrega `/biblioteca` antes del `?` (nombre de la base de datos)
   - ✅ NO dejes los caracteres `<` `>`

---

## ⚙️ Paso 6: Configurar el Proyecto

1. Ve a la carpeta `backend` de tu proyecto:
   ```bash
   cd backend
   ```

2. Abre (o crea) el archivo `.env`

3. Agrega tu connection string:
   ```env
   PORT=3000
   MONGODB_URI=mongodb+srv://biblioteca:TU_PASSWORD@cluster0.xxxxx.mongodb.net/biblioteca?retryWrites=true&w=majority
   NODE_ENV=development
   ```

4. **Guarda el archivo**

---

## ✅ Paso 7: Verificar Conexión

1. Instala las dependencias (si no lo has hecho):
   ```bash
   npm install
   ```

2. Intenta conectar ejecutando el seed:
   ```bash
   npm run seed
   ```

3. Si todo está bien, deberías ver:
   ```
   🌱 Iniciando seed de la base de datos...
   ✅ Conectado a MongoDB
   🗑️  Colección limpiada
   ✅ 25 Libros insertados exitosamente
   ```

4. Inicia el servidor:
   ```bash
   npm run dev
   ```

5. Deberías ver:
   ```
   ✅ MongoDB conectado: cluster0.xxxxx.mongodb.net
   📚 Base de datos: biblioteca
   🚀 Servidor corriendo en puerto 3000
   ```

---

## 🔍 Paso 8: Ver tus Datos en MongoDB Atlas

1. Ve a **"Database"** en MongoDB Atlas

2. Click en **"Browse Collections"** en tu cluster

3. Verás tu base de datos **"biblioteca"** con la colección **"libros"**

4. Click en **"libros"** para ver los 25 libros insertados

---

## 🐛 Solución de Problemas

### ❌ Error: "Authentication failed"
**Causa:** Contraseña incorrecta  
**Solución:** 
- Verifica que la contraseña en el `.env` sea correcta
- Si la contraseña tiene caracteres especiales (@, #, %, etc.), codifícalos:
  - `@` → `%40`
  - `#` → `%23`
  - `%` → `%25`

### ❌ Error: "ENOTFOUND cluster0.xxxxx.mongodb.net"
**Causa:** Error de conexión a internet o DNS  
**Solución:**
- Verifica tu conexión a internet
- Intenta cambiar de red o usar móvil como hotspot

### ❌ Error: "IP not whitelisted"
**Causa:** Tu IP no está autorizada  
**Solución:**
- Ve a "Network Access" en MongoDB Atlas
- Agrega `0.0.0.0/0` para permitir todas las IPs (desarrollo)

### ❌ Error: "The uri parameter must be a string"
**Causa:** La variable `MONGODB_URI` está vacía o mal configurada  
**Solución:**
- Verifica que el archivo `.env` existe en la carpeta `backend`
- Verifica que la línea `MONGODB_URI=...` no tiene espacios antes del `=`
- Reinicia el servidor después de editar el `.env`

---

## 📚 Recursos Adicionales

- **Documentación MongoDB Atlas**: https://docs.atlas.mongodb.com/
- **Connection String Format**: https://docs.mongodb.com/manual/reference/connection-string/
- **Node.js Driver Docs**: https://docs.mongodb.com/drivers/node/

---

## 🎯 Resumen del Connection String

Formato completo:
```
mongodb+srv://[usuario]:[password]@[cluster].[id].mongodb.net/[database]?retryWrites=true&w=majority
```

Ejemplo real:
```
mongodb+srv://biblioteca:MiPassword123@cluster0.t2wrxn9.mongodb.net/biblioteca?retryWrites=true&w=majority
```

Partes:
- `biblioteca` → Nombre de usuario
- `MiPassword123` → Contraseña del usuario
- `cluster0.t2wrxn9` → ID de tu cluster
- `biblioteca` → Nombre de la base de datos

---

**¡Listo! Ahora tienes MongoDB Atlas configurado y conectado. 🎉**

Si tienes más problemas, verifica los logs del servidor con `npm run dev` para ver mensajes de error detallados.

