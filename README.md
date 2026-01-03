# 📱 Guía rápida – Expo + EAS (Docker / Contenedor)

Esta guía sirve para **clonar el proyecto en otra PC / contenedor** y poder:
- Ejecutar la app con Expo
- Publicar cambios
- Generar APK Android

> ⚠️ **Regla clave del entorno**
> - ❌ No usar `npx`
> - ❌ No usar instalaciones globales
> - ✅ Usar dependencias locales + `npm exec --`

---

## 1️⃣ Instalación inicial

Desde la raíz del proyecto:

```bash
npm install
```

---

## 2️⃣ Login en Expo / EAS

Instalar EAS como dependencia del proyecto:

```bash
npm install --save-dev eas-cli@latest
```

Verificar que el binario existe:

```bash
ls node_modules/.bin | grep eas
```

Login (Expo + EAS):

```bash
npm exec eas login
```

---

## 3️⃣ Verificación del proyecto Expo (solo la primera vez)

> ⚠️ Estos comandos **no se corren siempre**, solo si el proyecto da problemas

```bash
npm exec expo doctor
```

Opcional (si hay errores graves de config):

```bash
npm exec expo prebuild --clean
npm exec expo install expo-dev-client
npm exec expo config --type public
```

---

## 4️⃣ Ejecutar la app (desarrollo)

Para correr la app y compartirla por QR (tunnel):

```bash
npm exec expo start --tunnel
npm exec -- expo start --host tunnel --clear
npm exec -- expo start --clear --tunnel
```

- Usar **Expo Go** en el celular
- Los cambios se recargan automáticamente

---

## 5️⃣ Publicar cambios sin recompilar (OTA Updates)

Para subir cambios de **JS / UI / lógica**:

```bash
npm exec eas update
```

✔ No genera APK
✔ Las apps instaladas se actualizan solas

---

## 6️⃣ Generar APK Android (build)

### APK descargable (preview)

```bash
npm exec eas -- build --platform android --profile preview
```

### Build estándar (AAB / producción)

```bash
npm exec eas -- build --platform android
```

> 📌 **Importante**: con `npm exec` siempre usar `--` antes del comando real

---

## 🧠 Resumen rápido

| Acción | Comando |
|------|--------|
Instalar dependencias | `npm install` |
Login | `npm exec eas login` |
Correr app | `npm exec expo start --tunnel` |
Subir cambios OTA | `npm exec eas update` |
Generar APK | `npm exec eas -- build --platform android --profile preview` |

---

## ✅ Regla de oro (guardar)

> **En contenedores: nada global, nada npx, todo local con `npm exec --`**

