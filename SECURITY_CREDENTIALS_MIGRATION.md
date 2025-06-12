# 🔒 Migración de Credenciales de Google - GUÍA URGENTE

## ⚠️ ACCIÓN INMEDIATA REQUERIDA

Las credenciales de Google fueron expuestas públicamente en el repositorio. **DEBES SEGUIR ESTOS PASOS INMEDIATAMENTE**.

## 🚨 PASO 1: Revocar credenciales comprometidas (URGENTE)

1. Ve a **Google Cloud Console**: https://console.cloud.google.com/
2. Navega a **IAM & Admin** > **Service Accounts**
3. Busca la cuenta: `quality-blinds-reviews@quality-blinds-462703.iam.gserviceaccount.com`
4. **ELIMINA esta cuenta de servicio inmediatamente**
5. Si hay recursos críticos dependiendo de ella, primero crea una nueva y luego elimina la antigua

## 🔧 PASO 2: Crear nuevas credenciales

### Opción A: Nueva cuenta de servicio

1. En Google Cloud Console, ve a **IAM & Admin** > **Service Accounts**
2. Clic en **Create Service Account**
3. Nombre: `quality-blinds-secure-service`
4. Asigna solo los permisos mínimos necesarios
5. Crea y descarga la clave JSON

### Opción B: Usar API Key (más simple para APIs públicas)

1. Ve a **APIs & Services** > **Credentials**
2. Clic en **Create Credentials** > **API Key**
3. Restringe la clave a IPs específicas y APIs necesarias

## 🛠️ PASO 3: Configurar variables de entorno

### Para desarrollo local:

1. Copia `env.example` a `.env.local`:

   ```bash
   cp env.example .env.local
   ```

2. **Opción 1 - Variables individuales (RECOMENDADO):**

   ```bash
   GOOGLE_CLIENT_EMAIL=nueva-cuenta@tu-proyecto.iam.gserviceaccount.com
   GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----
   TU_CLAVE_PRIVADA_AQUI
   -----END PRIVATE KEY-----"
   GOOGLE_PRIVATE_KEY_ID=tu-private-key-id
   GOOGLE_CLIENT_ID=tu-client-id
   GOOGLE_CLOUD_PROJECT_ID=tu-proyecto-id
   ```

3. **Opción 2 - JSON completo:**
   ```bash
   GOOGLE_SERVICE_ACCOUNT_KEY='{"type":"service_account","project_id":"..."}'
   ```

### Para producción (Netlify):

1. Ve a tu dashboard de Netlify
2. Site settings > Environment variables
3. Añade las mismas variables que configuraste localmente

## 🔍 PASO 4: Verificar seguridad

Ejecuta estos comandos para verificar que no hay información sensible:

```bash
# Verificar que google-credentials.json fue eliminado
ls -la | grep google-credentials.json

# Buscar cualquier clave privada restante
grep -r "PRIVATE KEY" --exclude-dir=node_modules .

# Verificar que las credenciales están en .gitignore
grep -n "google-credentials" .gitignore
```

## 🚀 PASO 5: Probar la nueva configuración

1. Reinicia tu servidor de desarrollo:

   ```bash
   npm run dev
   ```

2. Verifica que los endpoints que usan Google funcionan correctamente

## 📋 PASO 6: Limpieza del historial de Git (OPCIONAL pero recomendado)

⚠️ **ADVERTENCIA**: Esto reescribirá el historial. Coordina con tu equipo.

```bash
# Eliminar el archivo del historial completo
git filter-repo --path google-credentials.json --invert-paths

# O usar BFG (alternativa)
# java -jar bfg.jar --delete-files google-credentials.json
```

## ✅ CHECKLIST DE VERIFICACIÓN

- [ ] Credenciales antiguas revocadas/eliminadas
- [ ] Nuevas credenciales creadas con permisos mínimos
- [ ] Variables de entorno configuradas localmente
- [ ] Variables de entorno configuradas en producción
- [ ] `google-credentials.json` eliminado del repositorio
- [ ] `google-credentials.json` añadido al `.gitignore`
- [ ] Aplicación probada y funcionando
- [ ] Equipo notificado del cambio

## 🔄 MEJORES PRÁCTICAS A FUTURO

1. **Nunca** comitear archivos de credenciales
2. Usar **variables de entorno** siempre
3. **Rotar credenciales** cada 90 días
4. **Monitorear** el uso de las APIs
5. **Restringir** IPs y dominios en las API keys
6. **Revisar permisos** regularmente

## 📞 CONTACTO DE EMERGENCIA

Si tienes problemas con esta migración:

1. Contacta inmediatamente al administrador del proyecto
2. Revisa los logs de Google Cloud Console para actividad sospechosa
3. Considera cambiar las credenciales de otros servicios por precaución

---

**IMPORTANTE**: No ignores esta guía. La exposición de credenciales puede resultar en:

- Acceso no autorizado a servicios
- Facturación fraudulenta
- Compromiso de datos de clientes
- Violaciones de compliance
