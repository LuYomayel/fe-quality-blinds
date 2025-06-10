# Guía de Despliegue en Netlify

## Configuración de Netlify

### 1. Configuración del Sitio

1. Conecta tu repositorio de GitHub/GitLab a Netlify
2. **Build Command**: `npm run build`
3. **Publish Directory**: `.next`
4. **Node Version**: `18.18.2`

### 2. Variables de Entorno

En el panel de Netlify, ve a `Site Settings > Environment Variables` y añade:

#### Requeridas:

```
OPENAI_API_KEY=sk-your-openai-api-key-here
```

#### Opcionales:

```
NEXTAUTH_SECRET=your-random-secret-string
NEXTAUTH_URL=https://your-site-name.netlify.app
GOOGLE_ANALYTICS_ID=GA-XXXXXXXXX
HOTJAR_ID=your-hotjar-id
```

### 3. Plugins de Netlify

El archivo `netlify.toml` ya incluye la configuración necesaria:

- **@netlify/plugin-nextjs**: Para optimizar Next.js en Netlify
- **Funciones Serverless**: Para manejar APIs (chat, contacto)

### 4. Funciones Serverless

Las siguientes APIs están configuradas como funciones de Netlify:

- `/api/chat` → `/.netlify/functions/chat`
- `/api/contact` → `/.netlify/functions/contact`

### 5. Configuración de OpenAI API Key

#### Opción 1: A través del Panel de Netlify

1. Ve a `Site Settings > Environment Variables`
2. Añadir nueva variable:
   - **Key**: `OPENAI_API_KEY`
   - **Value**: `sk-your-actual-api-key`
3. Hacer redeploy del sitio

#### Opción 2: A través de Netlify CLI

```bash
netlify env:set OPENAI_API_KEY "sk-your-actual-api-key"
```

### 6. Build Hooks (Opcional)

Para deployments automáticos, configura build hooks en:
`Site Settings > Build & Deploy > Build Hooks`

### 7. Domain Configuration

Para usar un dominio personalizado:

1. Ve a `Site Settings > Domain Management`
2. Añade tu dominio personalizado
3. Configura DNS records según las instrucciones

## Comandos de Desarrollo Local

```bash
# Instalar dependencias
npm install

# Desarrollo local
npm run dev

# Build de producción
npm run build

# Servir build localmente
npm start
```

## Estructura de Archivos para Netlify

```
/
├── netlify.toml              # Configuración de Netlify
├── netlify/functions/        # Funciones serverless
│   ├── chat.js              # API de chat con OpenAI
│   ├── contact.js           # API de formulario de contacto
│   └── package.json         # Dependencias de funciones
├── next.config.ts           # Configuración de Next.js
└── env.example              # Ejemplo de variables de entorno
```

## Verificación Post-Despliegue

1. ✅ El sitio carga correctamente
2. ✅ Las imágenes se muestran
3. ✅ El chat funciona (requiere OPENAI_API_KEY)
4. ✅ Los formularios de contacto funcionan
5. ✅ La navegación entre páginas funciona
6. ✅ Los productos se cargan dinámicamente

## Troubleshooting

### Error: "OpenAI API key not configured"

- Verifica que `OPENAI_API_KEY` esté configurada en Environment Variables
- Haz redeploy después de añadir la variable

### Build failures

- Verifica que Node.js sea versión 18.18.2
- Ejecuta `npm run build` localmente para identificar errores

### 404 en rutas dinámicas

- Verifica que `netlify.toml` esté en la raíz del proyecto
- Las rutas dinámicas deberían funcionar automáticamente con Next.js

## Monitoreo

- **Netlify Analytics**: Habilitado automáticamente
- **Function Logs**: Disponibles en `Functions > Logs`
- **Deploy Logs**: Disponibles en `Deploys > [Deploy] > Deploy log`
