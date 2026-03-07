# QuieroQuejarme.es

**Ventanilla única de incidencia ciudadana**

Tu derecho a quejarte. Tu poder para cambiar las cosas.

---

## Cómo poner la web en marcha (paso a paso)

### Requisitos previos

Solo necesitas instalar **Node.js** en tu ordenador:

1. Ve a **https://nodejs.org**
2. Descarga la versión **LTS** (la de la izquierda, la recomendada)
3. Instálala (siguiente, siguiente, siguiente...)
4. Para comprobar que funciona, abre la **Terminal**:
   - En **Mac**: busca "Terminal" en Spotlight (Cmd + Espacio)
   - En **Windows**: busca "PowerShell" en el menú de inicio
5. Escribe `node --version` y pulsa Enter. Si sale un número (ej: v20.11.0), está instalado.

### Paso 1: Descomprime este archivo

Descomprime el ZIP en una carpeta de tu ordenador. Por ejemplo, en el Escritorio.

### Paso 2: Abre la Terminal en esa carpeta

**En Mac:**
- Abre Terminal
- Escribe `cd ` (con espacio después) y arrastra la carpeta "quieroquejarme" a la Terminal
- Pulsa Enter

**En Windows:**
- Abre la carpeta "quieroquejarme" en el Explorador de Archivos
- Haz clic derecho en un espacio vacío → "Abrir en Terminal" (o "Abrir PowerShell aquí")

### Paso 3: Instala las dependencias

Escribe este comando y pulsa Enter:

```
npm install
```

Espera a que termine (puede tardar 1-2 minutos). Verá que se crea una carpeta `node_modules`.

### Paso 4: Arranca la web en tu ordenador

```
npm run dev
```

Verás un mensaje como:

```
▲ Next.js 14.2.x
- Local: http://localhost:3000
```

### Paso 5: Ábrela en el navegador

Abre tu navegador (Chrome, Firefox, Safari...) y ve a:

**http://localhost:3000**

¡Ya tienes la web funcionando en tu ordenador!

---

## Cómo publicarla en Internet (gratis)

### Opción A: Vercel (recomendada, la más fácil)

1. Crea una cuenta en **https://github.com** (gratis)
2. Crea una cuenta en **https://vercel.com** (gratis, usa tu cuenta de GitHub)
3. Sube este proyecto a GitHub:
   - En GitHub, crea un nuevo repositorio (botón "+", "New repository")
   - Llámalo "quieroquejarme"
   - Sigue las instrucciones de GitHub para subir los archivos
   - (O usa **GitHub Desktop** — https://desktop.github.com — que es más fácil)
4. En Vercel:
   - Haz clic en "Add New..." → "Project"
   - Selecciona tu repositorio "quieroquejarme"
   - Haz clic en "Deploy"
   - ¡Listo! Tu web estará en algo como: quieroquejarme.vercel.app

### Conectar tu dominio (quieroquejarme.es)

1. Compra el dominio en **https://porkbun.com** o **https://namecheap.com** (~10€/año)
2. En Vercel → tu proyecto → Settings → Domains → Escribe "quieroquejarme.es"
3. Vercel te dirá qué registros DNS configurar
4. Ve a tu registrador de dominio y añade esos registros DNS
5. Espera 5-30 minutos. ¡Tu web estará en quieroquejarme.es!

---

## Estructura del proyecto

```
quieroquejarme/
├── app/
│   ├── layout.js      ← Configuración general (título, idioma)
│   └── page.js        ← TODO el código de la web (landing + chat + recursos)
├── public/            ← Aquí van las plantillas e infografías para descarga
├── package.json       ← Dependencias del proyecto
├── next.config.js     ← Configuración de Next.js
├── .gitignore         ← Archivos que no se suben a GitHub
└── README.md          ← Este archivo
```

## Licencia

Código: MIT · Contenido: CC BY 4.0

---

*QuieroQuejarme.es — Para que nadie se quede sin voz por no saber a quién hablar.*
