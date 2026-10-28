# 🤝 Súmate App

## 📌 Información del Proyecto

* **Materia:** Interacción Hombre-Computadora (IHC)
* **Tipo de Proyecto:** Sistema Web
* **Modalidad:** Individual
* **Alumno:** Santos Castro Roberto Anjel

---

## 📝 Descripción del Proyecto

**Súmate App** es una plataforma web diseñada para conectar estudiantes universitarios y voluntarios con causas sociales, actividades comunitarias y convocatorias de voluntariado.

La plataforma permite a los usuarios:
* 🔍 **Buscar y explorar convocatorias** filtrando por palabras clave, organización, causa social (medio ambiente, educación, salud, bienestar animal, etc.), modalidad (presencial/virtual) y rango de fechas.
* 📍 **Búsqueda por cercanía y ubicación:** Encontrar actividades cercanas calculando la distancia en kilómetros según la zona y ubicación geográfica del voluntario.
* 👥 **Inscripción y cupos en tiempo real:** Unirse a convocatorias con disponibilidad inmediata y control de aforo.
* 📅 **Gestión y seguimiento:** Publicar y gestionar actividades, consultar historial de participaciones y estado de convocatorias en "Mi trayectoria".

El objetivo principal es reducir las barreras de participación juvenil en causas comunitarias y facilitar que las organizaciones y estudiantes encuentren iniciativas donde realmente puedan colaborar y generar impacto.

---

## 💻 Tecnologías y Stack

* **Frontend:**
  * **Framework:** Next.js 16 (React 19, App Router)
  * **Lenguaje:** TypeScript 5
  * **Estilos:** Tailwind CSS v4
  * **Autenticación:** Better Auth (JWT con firma asimétrica EdDSA / JWKS)
  * **Iconos y UI:** Lucide React, Radix UI / Shadcn
  * **Gestor de Paquetes:** `pnpm` (preferente)

* **Backend:**
  * **Framework:** FastAPI (Python 3.12+)
  * **ORM & Modelado:** SQLModel / SQLAlchemy 2.0
  * **Migraciones:** Alembic
  * **Base de Datos:** PostgreSQL (con soporte de fallback a SQLite local para desarrollo rápido)
  * **Almacenamiento Multimedia:** Cloudinary (imágenes de portada de actividades)
  * **Servidor ASGI:** Uvicorn

---

## ⚙️ Requisitos Previos

Antes de comenzar, asegúrate de tener instaladas las siguientes herramientas en tu sistema:

* **Node.js:** v20.x o v22.x LTS (Recomendado).
* **pnpm:** Gestor de paquetes preferente para el frontend (`npm install -g pnpm` o `corepack enable`).
* **Python:** 3.12 o superior con `pip` y `venv`.
* **PostgreSQL:** Base de datos activa (local, Docker, o en la nube mediante Neon / Supabase).
* **Git:** Para control de versiones.

---

## 📁 Estructura del Repositorio

```text
sumate-app/
└── application/
    ├── client/               # Aplicación Frontend (Next.js)
    │   ├── src/              # Código fuente (App Router, Features, Components)
    │   ├── .env.example      # Plantilla de variables de entorno frontend
    │   └── package.json      # Dependencias y scripts de pnpm
    │
    └── server/               # Servidor Backend (FastAPI)
        ├── app/              # Módulos de dominio, aplicación e infraestructura
        ├── alembic/          # Migraciones de base de datos
        ├── scripts/          # Scripts de utilidades (seed de causas temáticas)
        ├── .env.example      # Plantilla de variables de entorno backend
        └── requirements.txt  # Dependencias de Python
```

---

## 🚀 Guía de Configuración e Inicio

Para ejecutar el proyecto completo en tu entorno local, sigue los pasos a continuación: primero configurarás el **Backend** y luego el **Frontend**.

---

### 1️⃣ Configuración del Backend (FastAPI)

Navega a la carpeta del servidor:

```bash
cd application/server
```

#### Paso 1.1: Crear el entorno virtual (`venv`)
Crea un entorno virtual aislado de Python:

```bash
python3 -m venv venv
```

#### Paso 1.2: Activar el entorno virtual
* **Linux / macOS:**
  ```bash
  source venv/bin/activate
  ```
* **Windows (PowerShell):**
  ```powershell
  .\venv\Scripts\Activate.ps1
  ```
* **Windows (CMD):**
  ```cmd
  venv\Scripts\activate.bat
  ```

#### Paso 1.3: Instalar dependencias
Instala los paquetes requeridos dentro del entorno virtual:

```bash
pip install -r requirements.txt
```

#### Paso 1.4: Configurar variables de entorno (`.env`)
Crea tu archivo `.env` copiando la plantilla:

```bash
cp .env.example .env
```

Abre `.env` y configura tus credenciales:
* `DATABASE_URL`: Cadena de conexión a PostgreSQL (ej. `postgresql://usuario:contraseña@localhost:5432/sumate_db`) o SQLite local (`sqlite:///./dev.db`).
* `FRONTEND_URL`: `http://localhost:3000` (necesario para verificar el endpoint de claves públicas JWKS de Better Auth).
* `CORS_ORIGINS`: `http://localhost:3000,http://localhost:5173`.
* `CLOUDINARY_*`: Credenciales de tu cuenta de Cloudinary para permitir la subida de imágenes de portada.

#### Paso 1.5: Ejecutar las migraciones de Base de Datos (Alembic)
Aplica el esquema de tablas en la base de datos:

```bash
alembic upgrade head
```

#### Paso 1.6: Poblar las causas temáticas iniciales (Seed)
Ejecuta el script para insertar el catálogo de causas (Salud, Educación, Medio Ambiente, etc.):

```bash
python scripts/seed_causes.py
```

#### Paso 1.7: Iniciar el servidor FastAPI
Inicia el servidor en modo desarrollo con recarga automática:

```bash
uvicorn main:app --reload --port 8000
```

* **API Base:** `http://localhost:8000`
* **Documentación interactiva Swagger:** `http://localhost:8000/docs`
* **Documentación alternativa Redoc:** `http://localhost:8000/redoc`

---

### 2️⃣ Configuración del Frontend (Next.js)

En una **nueva terminal**, navega a la carpeta del cliente:

```bash
cd application/client
```

#### Paso 2.1: Instalar dependencias con `pnpm`
Se recomienda utilizar `pnpm` como gestor de paquetes del proyecto:

```bash
pnpm install
```

*(Si no tienes `pnpm` instalado, puedes habilitarlo con `corepack enable` o instalarlo globalmente con `npm install -g pnpm`).*

#### Paso 2.2: Configurar variables de entorno (`.env`)
Copia la plantilla de variables de entorno para el cliente:

```bash
cp .env.example .env
```

Abre `.env` y ajusta las variables según tu entorno:
* `DATABASE_URL`: Cadena de conexión de PostgreSQL utilizada por Better Auth (debe apuntar a la misma base de datos para sincronizar usuarios y sesiones).
* `BETTER_AUTH_SECRET`: Clave secreta para Better Auth (puedes generar una cadena aleatoria).
* `BETTER_AUTH_URL`: `http://localhost:3000`
* `NEXT_PUBLIC_APP_URL`: `http://localhost:3000`
* `NEXT_PUBLIC_BACKEND_URL`: `http://localhost:8000/api` (apunta a la API de FastAPI).
* `GOOGLE_CLIENT_ID` y `GOOGLE_CLIENT_SECRET`: Credenciales OAuth de Google Cloud (opcional, para habilitar login social).
* `BREVO_API_KEY`: Clave de API de Brevo para envío de correos de verificación y restablecimiento de contraseña.

#### Paso 2.3: Iniciar el servidor de desarrollo
Ejecuta el cliente Next.js:

```bash
pnpm dev
```

Abre tu navegador en:
👉 **[http://localhost:3000](http://localhost:3000)**

---

## ⚡ Resumen Rápido de Inicio (Cheat Sheet)

Una vez configurados los `.env`, puedes iniciar todo rápidamente en dos terminales:

### Terminal 1 — Backend
```bash
cd application/server
source venv/bin/activate
uvicorn main:app --reload --port 8000
```

### Terminal 2 — Frontend
```bash
cd application/client
pnpm dev
```

---

## 🛠️ Comandos Útiles Adicionales

### Backend
* **Ejecutar tests unitarios (pytest):**
  ```bash
  pytest tests/unit/test_participations_and_capacity.py
  ```
* **Crear una nueva migración con Alembic:**
  ```bash
  alembic revision -m "nombre_de_la_migracion"
  ```

### Frontend
* **Validación y compilación de producción:**
  ```bash
  pnpm build
  ```
* **Chequeo de tipos estático:**
  ```bash
  pnpm exec tsc --noEmit
  ```
* **Linter:**
  ```bash
  pnpm lint
  ```
* **Previsualización de plantillas de Email (React Email):**
  ```bash
  pnpm email:dev
  ```