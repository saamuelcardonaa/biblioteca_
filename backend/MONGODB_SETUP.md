# 🗃️ GUÍA COMPLETA: Configuración de MongoDB Atlas

## 📝 Paso 1: Crear Cuenta en MongoDB Atlas

1. Abre tu navegador y ve a: **https://www.mongodb.com/cloud/atlas**
2. Haz clic en **"Try Free"** o **"Start Free"**
3. Completa el formulario de registro:
   - Email
   - Contraseña (guárdala bien)
4. Verifica tu email
5. Inicia sesión en MongoDB Atlas

---

## 📦 Paso 2: Crear un Cluster Gratuito

1. Una vez dentro, verás el Dashboard
2. Haz clic en **"Build a Database"** o **"Create"**
3. Selecciona **"M0 FREE"** (Shared)
   - ✅ Es completamente gratis
   - ✅ 512 MB de almacenamiento
   - ✅ Perfecto para desarrollo
4. Configuración del cluster:
   - **Cloud Provider:** AWS (recomendado)
   - **Region:** Selecciona la más cercana a ti (ejemplo: Frankfurt, Ireland, Virginia)
   - **Cluster Name:** Deja `Cluster0` (default)
5. Haz clic en **"Create"**
6. Espera 3-5 minutos mientras se crea el cluster

---

## 👤 Paso 3: Crear Usuario de Base de Datos

1. Verás un modal **"Security Quickstart"**
2. En la sección **"How would you like to authenticate your connection?"**:
   - Selecciona **"Username and Password"**
   - Username: `pokedex_admin`
   - Password: Haz clic en **"Autogenerate Secure Password"** o crea una
   - **⚠️ IMPORTANTE:** Copia y guarda esta contraseña, la necesitarás después
3. Haz clic en **"Create User"**

Si ya cerraste el modal:
1. Ve al menú izquierdo → **"Database Access"**
2. Clic en **"Add New Database User"**
3. Configura:
   - Authentication Method: **Password**
   - Username: `pokedex_admin`
   - Password: Crea una y guárdala
   - Built-in Role: **"Atlas admin"**
4. Clic en **"Add User"**

---

## 🌍 Paso 4: Configurar Acceso de Red (Whitelist IP)

1. En el mismo modal o ve a **"Network Access"** (menú izquierdo)
2. Haz clic en **"Add IP Address"**
3. Selecciona **"Allow Access from Anywhere"**
   - Esto agregará: `0.0.0.0/0`
   - ⚠️ Solo para desarrollo, en producción usa IPs específicas
4. Haz clic en **"Confirm"**

---

## 🔗 Paso 5: Obtener Connection String

1. Ve a **"Database"** en el menú izquierdo
2. Verás tu `Cluster0` - Haz clic en **"Connect"**
3. Selecciona **"Connect your application"**
4. Configuración:
   - **Driver:** Node.js
   - **Version:** 5.5 or later
5. Verás un string de conexión como este:

```
mongodb+srv://pokedex_admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

6. **COPIA** este string completo

---

## ⚙️ Paso 6: Configurar el Proyecto

1. Abre el archivo `backend/.env` en tu editor
2. Reemplaza la línea `MONGO_URI` con tu connection string
3. **IMPORTANTE:** Modifica dos cosas:

   **Antes:**
   ```
   mongodb+srv://pokedex_admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

   **Después:**
   ```
   mongodb+srv://pokedex_admin:TU_PASSWORD_REAL@cluster0.xxxxx.mongodb.net/pokedex_db?retryWrites=true&w=majority
   ```

   **Cambios:**
   - Reemplaza `<password>` con tu contraseña real (la que guardaste)
   - Reemplaza `xxxxx` con el ID de tu cluster (aparece en el string)
   - Agrega `/pokedex_db` antes del `?` para especificar la base de datos

4. **Ejemplo final:**
   ```env
   PORT=3000
   MONGO_URI=mongodb+srv://pokedex_admin:MiPassword123@cluster0.abc123.mongodb.net/pokedex_db?retryWrites=true&w=majority
   NODE_ENV=development
   ```

---

## 🌱 Paso 7: Poblar la Base de Datos (Seed)

1. Abre una terminal en la carpeta `backend`
2. Ejecuta:
   ```bash
   npm run seed
   ```
3. Deberías ver:
   ```
   🌱 Iniciando seed de la base de datos...
   ✅ Conectado a MongoDB
   🗑️  Colección limpiada
   ✅ 25 Pokémons insertados exitosamente
   🎉 Seed completado exitosamente!
   ```

---

## 🚀 Paso 8: Iniciar el Servidor

1. En la terminal (carpeta `backend`):
   ```bash
   npm run dev
   ```
2. Deberías ver:
   ```
   ✅ MongoDB conectado: cluster0.xxxxx.mongodb.net
   📚 Base de datos: pokedex_db
   🚀 Servidor corriendo en puerto 3000
   📍 http://localhost:3000/api/v1
   ```

---

## ✅ Paso 9: Verificar en MongoDB Atlas

1. Ve a MongoDB Atlas → **"Database"**
2. Haz clic en **"Browse Collections"** en tu Cluster0
3. Verás:
   - Base de datos: `pokedex_db`
   - Colección: `pokemones`
   - Documentos: 25 pokémons

---

## 🧪 Paso 10: Probar la API

Abre tu navegador o Postman:

**GET - Ver documentación:**
```
http://localhost:3000/api/v1
```

**GET - Ver todos los pokémons:**
```
http://localhost:3000/api/v1/pokemones/get/all
```

**GET - Ver con paginación:**
```
http://localhost:3000/api/v1/pokemones/get/all?page=1&limit=10
```

**GET - Filtrar por tipo:**
```
http://localhost:3000/api/v1/pokemones/get/all?tipo=fuego
```

---

## 🆘 Solución de Problemas Comunes

### Error: "MongoServerError: bad auth"
- ✅ Verifica que la contraseña en `.env` sea correcta
- ✅ Asegúrate de NO tener caracteres especiales sin codificar
- ✅ Si tu contraseña tiene `@`, `#`, etc., codifícalos: `@` = `%40`, `#` = `%23`

### Error: "MongooseServerSelectionError: connect ETIMEDOUT"
- ✅ Verifica que agregaste `0.0.0.0/0` en Network Access
- ✅ Revisa tu conexión a internet
- ✅ Espera unos minutos, el cluster puede estar iniciándose

### Error: "MongoParseError: Invalid connection string"
- ✅ Verifica que agregaste `/pokedex_db` antes del `?`
- ✅ Asegúrate de no tener espacios en el string
- ✅ Verifica que no tengas `<password>` literal, debe ser tu contraseña real

### La base de datos no muestra datos
- ✅ Ejecuta el seed: `npm run seed`
- ✅ Verifica que el servidor esté corriendo
- ✅ Revisa la consola por errores

---

## 📌 Resumen de Comandos

```bash
# Ir a la carpeta backend
cd backend

# Instalar dependencias (ya hecho)
npm install

# Poblar base de datos
npm run seed

# Iniciar servidor en modo desarrollo
npm run dev

# Iniciar en modo producción
npm start
```

---

## 🎯 ¡Listo!

Ahora tienes:
- ✅ MongoDB Atlas configurado
- ✅ Base de datos con 25 Pokémons
- ✅ API REST funcionando
- ✅ Endpoints CRUD completos

**Siguiente paso:** Probar todos los endpoints con Postman o el navegador.

