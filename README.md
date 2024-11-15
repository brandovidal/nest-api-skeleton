# 👩‍💻 Nest Api Skeleton

## 📝 Descripción del reto técnico:

Plantilla para un servidor usando NestJS, Typescript, Test, Swagger

## 💫 Instalacion del proyecto

```bash
$ pnpm install
```

## 👩‍💻 Pasos para ejecutar en local (`dev`) el proyecto

```bash
# Para instalar la Base de Datos con Docker
$ pnpm run deps

# Ejecutar el proyecto en modo `dev`
$ pnpm run dev
```

<!-- > ⚠️ Importante: tener declaradas las siguientes variables de entorno, revisar el archivo `.env.example`.

- `PORT`: Puerto del servidor.
- `DATABASE_HOST`: Endpoint de la base de datos.
- `DATABASE_PORT`: Puerto de la base de datos.
- `DATABASE_ROOT_PASSWORD`: Contraseña del usuario root de la base de datos.
- `DATABASE_NAME`: Nombre de la base de datos.
- `DATABASE_USER`: Nombre del usuario de la base de datos.
- `DATABASE_PASSWORD`: Contraseña del usuario de la base de datos. -->

> 🧾 Nota: Se pueden usar los endpoints declarados en la carpeta `requests/`

<!-- Instalar con el plugin de VSCode [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)

```css
├── requests/
|   ├── dev/
|   ├── people/
|   |   ├── bulk-create.rest
|   |   ├── create.rest
|   |   ├── get-all.rest
|   ├── app.rest
└── (...)
``` -->

## 🐛 Pasos para realizar pruebas del proyecto

Pruebas unitarias

```bash
$ pnpm run test
```

Pruebas e2e

```bash
$ pnpm run test:e2e
```

<!-- Ver la documentacion en la siguiente ruta:

```bash
## Modo dev
$ http://localhost:3000/docs
``` -->
