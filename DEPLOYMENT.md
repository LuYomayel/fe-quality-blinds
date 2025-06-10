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

- **@netlify/plugin-nextjs**: Para optimizar Next.js en Netlify y manejar API routes automáticamente

### 4. API Routes

Las siguientes APIs funcionan como rutas nativas de Next.js:

- `/api/chat` - Chat con OpenAI
- `/api/contact` - Formulario de contacto
- `/api/reviews/user` - Reseñas de usuarios
- `/api/chat-summary` - Resumen de chat
- `/api/samples` - Solicitud de muestras

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
├── src/app/api/              # API routes de Next.js
│   ├── chat/route.ts        # Chat con OpenAI
│   ├── contact/route.ts     # Formulario de contacto
│   └── reviews/             # Sistema de reseñas
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

### Error: "The model does not exist"

- Verifica que tengas acceso al modelo `gpt-4o-mini` en tu cuenta de OpenAI
- Como alternativa, cambia el modelo a `gpt-3.5-turbo` en `src/app/api/chat/route.ts`

### Build failures

- Verifica que Node.js sea versión 18.18.2
- Ejecuta `npm run build` localmente para identificar errores

### 404 en rutas dinámicas

- Verifica que `netlify.toml` esté en la raíz del proyecto
- Las rutas dinámicas deberían funcionar automáticamente con Next.js

### API routes devuelven 500

- Verifica los logs en `Functions > Logs` en Netlify
- Asegúrate de que las variables de entorno estén configuradas correctamente

## Monitoreo

- **Netlify Analytics**: Habilitado automáticamente
- **Function Logs**: Disponibles en `Functions > Logs`
- **Deploy Logs**: Disponibles en `Deploys > [Deploy] > Deploy log`

## Debugging del Chat

Si el chat no funciona:

1. **Verifica la API key**:

   ```bash
   # En Netlify CLI
   netlify env:list
   ```

2. **Prueba localmente**:

   ```bash
   # Añade tu API key a .env.local
   echo "OPENAI_API_KEY=sk-your-key" >> .env.local
   npm run dev
   ```

3. **Verifica los logs**:

   - Ve a Netlify Dashboard > Functions > chat
   - Revisa los logs de errores

4. **Modelo alternativo** (si tienes problemas con gpt-4o-mini):
   ```typescript
   // En src/app/api/chat/route.ts, cambia:
   model: "gpt-3.5-turbo", // En lugar de "gpt-4o-mini"
   ```
